using System.Text;
using CodeRag.Shared.Configuration;
using CodeRag.Shared.VectorStore;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.Ai.SemanticKernel.Plugins;

public class DocumentationSearchPlugin(Project project, ITextEmbeddingGenerationService embeddingGenerationService, IVectorStoreRecordCollection<Guid, MarkdownVectorEntity> collection, int numberofResultsBack, double scoreShouldBeBelowThis, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string[]> Search(string searchQuery)
    {
        string projectToSearch = project.Id.ToString();
        List<string> searchResults = [];
        ReadOnlyMemory<float> searchVector = await embeddingGenerationService.GenerateEmbeddingAsync(searchQuery);
        VectorSearchResults<MarkdownVectorEntity> searchResult = await collection.VectorizedSearchAsync(searchVector, new VectorSearchOptions<MarkdownVectorEntity>
        {
            Top = numberofResultsBack,
            Filter = entity => entity.ProjectId == projectToSearch,
            IncludeVectors = false
        });

        List<VectorSearchResult<MarkdownVectorEntity>> results = [];
        await foreach (VectorSearchResult<MarkdownVectorEntity> record in searchResult.Results.Where(x => x.Score < scoreShouldBeBelowThis))
        {
            results.Add(record);
            StringBuilder sb = new();
            sb.AppendLine($"Citation: {record.Record.GetUrl(project)} \n***\n" + record.Record.Content);
            sb.AppendLine("***");

            searchResults.Add(sb.ToString());
        }

        ProgressNotification notification = new(DateTimeOffset.UtcNow, $"Documentation Search Called ({results.Count} Results)")
        {
            DocumentSearchResults = results
        };
        parent.OnNotifyProgress(notification);
        return searchResults.ToArray();
    }
}