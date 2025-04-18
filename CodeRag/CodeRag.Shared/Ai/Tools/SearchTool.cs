using System.Text;
using CodeRag.Shared.Configuration;
using CodeRag.Shared.VectorStore;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.Ai.Tools;

public class SearchTool<T>(Project project, ITextEmbeddingGenerationService embeddingGenerationService, IVectorStoreRecordCollection<Guid, T> collection, int numberOfResultsBack, double scoreShouldBeBelowThis, ProgressNotificationBase parent) where T : VectorEntity
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string[]> Search(string searchQuery)
    {
        string projectToSearch = project.Id.ToString();
        List<string> searchResults = [];
        ReadOnlyMemory<float> searchVector = await embeddingGenerationService.GenerateEmbeddingAsync(searchQuery);
        VectorSearchResults<T> searchResult = await collection.VectorizedSearchAsync(searchVector, new VectorSearchOptions<T>
        {
            Top = numberOfResultsBack,
            Filter = entity => entity.ProjectId == projectToSearch,
            IncludeVectors = false
        });

        List<VectorSearchResult<T>>? results = [];
        await foreach (VectorSearchResult<T> record in searchResult.Results.Where(x => x.Score < scoreShouldBeBelowThis))
        {
            results.Add(record);
            StringBuilder sb = new();
            sb.AppendLine($"Citation: {record.Record.GetUrl(project)} \n***\n" + record.Record.Content);
            sb.AppendLine("***");

            searchResults.Add(sb.ToString());
        }

        ProgressNotification notification = new(DateTimeOffset.UtcNow, $"{typeof(T).Name} Search Called ({results.Count} Results)")
        {
            //todo - return results somehow
        };
        parent.OnNotifyProgress(notification);
        return searchResults.ToArray();
    }
}