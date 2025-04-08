using System.Text;
using CodeRag.Shared.BusinessLogic.VectorStore.SourceCode;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.BusinessLogic.Ai.SemanticKernel.Plugins;

public class SourceCodeSearchPlugin(ITextEmbeddingGenerationService embeddingGenerationService, IVectorStoreRecordCollection<string, SourceCodeVectorEntity> collection, int numberofResultsBack, double scoreShouldBeBelowThis, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string[]> Search(string searchQuery)
    {
        List<string> searchResults = [];
        ReadOnlyMemory<float> searchVector = await embeddingGenerationService.GenerateEmbeddingAsync(searchQuery);
        VectorSearchResults<SourceCodeVectorEntity> searchResult = await collection.VectorizedSearchAsync(searchVector, new VectorSearchOptions<SourceCodeVectorEntity>
        {
            Top = numberofResultsBack,
            IncludeVectors = false
        });

        List<VectorSearchResult<SourceCodeVectorEntity>> results = [];
        await foreach (VectorSearchResult<SourceCodeVectorEntity> record in searchResult.Results.Where(x => x.Score < scoreShouldBeBelowThis))
        {
            results.Add(record);
            StringBuilder sb = new();
            sb.AppendLine(record.Record.Content);
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