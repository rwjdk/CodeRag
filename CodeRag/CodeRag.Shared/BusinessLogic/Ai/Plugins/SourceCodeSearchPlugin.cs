using System.Text;
using CodeRag.Shared.BusinessLogic.VectorStore.Models;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.BusinessLogic.Ai.Plugins;

public class SourceCodeSearchPlugin(
    ITextEmbeddingGenerationService embeddingGenerationService,
    IVectorStoreRecordCollection<string, SourceCodeVectorEntity> collection)
{
    [KernelFunction(Constants.SourceCodeSearchPluginName)]
    [UsedImplicitly]
    public async Task<string[]> SourceCodeSearch(string question, int numberOfResultsBack = 50) //todo - there should properly not be a default
    {
        List<string> searchResults = [];
        ReadOnlyMemory<float> searchVector = await embeddingGenerationService.GenerateEmbeddingAsync(question);
        VectorSearchResults<SourceCodeVectorEntity> searchResult = await collection.VectorizedSearchAsync(searchVector, new VectorSearchOptions<SourceCodeVectorEntity>
        {
            Top = numberOfResultsBack,
            IncludeVectors = false
        });

        await foreach (VectorSearchResult<SourceCodeVectorEntity> record in searchResult.Results.Where(x => x.Score < 0.7)) //todo -score limit should be configurable
        {
            Console.WriteLine($"Score {record.Score}: {record.Record.Filename} ({record.Record.Name}) [{record.Record.Content.Length} chars]");
            StringBuilder sb = new();
            sb.AppendLine(record.Record.Content);
            sb.AppendLine("***");

            searchResults.Add(sb.ToString());
        }

        return searchResults.ToArray();
    }
}