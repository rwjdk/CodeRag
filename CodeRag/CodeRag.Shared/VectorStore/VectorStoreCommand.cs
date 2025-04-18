using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.VectorStore;

public class VectorStoreCommand(ITextEmbeddingGenerationService textEmbeddingGenerationService)
{
    public async Task Upsert<T>(Guid projectId, Guid sourceId, IVectorStoreRecordCollection<Guid, T> collection, T entry) where T : VectorEntity
    {
        try
        {
            entry.Id = Guid.NewGuid();
            entry.ProjectId = projectId.ToString();
            entry.SourceId = sourceId.ToString();
            ReadOnlyMemory<float> vector = await textEmbeddingGenerationService.GenerateEmbeddingAsync(entry.Content);
            entry.Vector = vector.ToArray();
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