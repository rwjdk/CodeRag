using System.Text;
using CodeRag.Shared.VectorStore.Documentation;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.Ai.SemanticKernel.Plugins;

public class DocumentationSearchPlugin(ITextEmbeddingGenerationService embeddingGenerationService, IVectorStoreRecordCollection<string, DocumentationVectorEntity> collection, int numberofResultsBack, double scoreShouldBeBelowThis, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string[]> Search(string searchQuery)
    {
        List<string> searchResults = [];
        ReadOnlyMemory<float> searchVector = await embeddingGenerationService.GenerateEmbeddingAsync(searchQuery);
        VectorSearchResults<DocumentationVectorEntity> searchResult = await collection.VectorizedSearchAsync(searchVector, new VectorSearchOptions<DocumentationVectorEntity>
        {
            Top = numberofResultsBack,
            IncludeVectors = false
        });

        List<VectorSearchResult<DocumentationVectorEntity>> results = [];
        await foreach (VectorSearchResult<DocumentationVectorEntity> record in searchResult.Results.Where(x => x.Score < scoreShouldBeBelowThis))
        {
            results.Add(record);
            StringBuilder sb = new();
            sb.AppendLine(record.Record.Content);
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