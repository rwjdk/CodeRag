using System.Text;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.VectorStore.SourceCode;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.Ai.SemanticKernel.Plugins;

public class SourceCodeSearchPlugin(Project project, ITextEmbeddingGenerationService embeddingGenerationService, IVectorStoreRecordCollection<Guid, CSharpCodeEntity> collection, int numberofResultsBack, double scoreShouldBeBelowThis, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string[]> Search(string searchQuery)
    {
        string projectToSearch = project.Id.ToString();
        List<string> searchResults = [];
        ReadOnlyMemory<float> searchVector = await embeddingGenerationService.GenerateEmbeddingAsync(searchQuery);
        VectorSearchResults<CSharpCodeEntity> searchResult = await collection.VectorizedSearchAsync(searchVector, new VectorSearchOptions<CSharpCodeEntity>
        {
            Top = numberofResultsBack,
            Filter = entity => entity.ProjectId == projectToSearch,
            IncludeVectors = false
        });

        List<VectorSearchResult<CSharpCodeEntity>> results = [];
        await foreach (VectorSearchResult<CSharpCodeEntity> record in searchResult.Results.Where(x => x.Score < scoreShouldBeBelowThis))
        {
            results.Add(record);
            StringBuilder sb = new();
            sb.AppendLine($"Citation: {record.Record.GetUrl(project)} \n***\n" + record.Record.Content);
            sb.AppendLine("***");

            searchResults.Add(sb.ToString());
        }

        ProgressNotification notification = new(DateTimeOffset.UtcNow, $"Code Search Called ({results.Count} Results)")
        {
            SourceCodeSearchResults = results
        };
        parent.OnNotifyProgress(notification);
        return searchResults.ToArray();
    }
}