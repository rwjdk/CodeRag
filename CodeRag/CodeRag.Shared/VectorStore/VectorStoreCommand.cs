using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.VectorStore;

public class VectorStoreCommand(ITextEmbeddingGenerationService textEmbeddingGenerationService)
{
    public async Task Upsert<T>(IVectorStoreRecordCollection<string, T> collection, T entry) where T : VectorEntity
    {
        try
        {
            if (!string.IsNullOrWhiteSpace(entry.Id)) //todo - stop doing this
            {
                entry.Id = Guid.NewGuid().ToString();
            }

            ReadOnlyMemory<float> vector = await textEmbeddingGenerationService.GenerateEmbeddingAsync(entry.Content);
            entry.Vector = vector;
            entry.TimeOfIngestion = DateTime.UtcNow;
            await collection.UpsertAsync(entry);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Rate Limited. Sleeping 10 sec ({e.Message})");
            await Task.Delay(10000); //todo - Do this with Polly
            ReadOnlyMemory<float> vector = await textEmbeddingGenerationService.GenerateEmbeddingAsync(entry.Content);
            entry.Vector = vector;
            await collection.UpsertAsync(entry);
        }
    }
}