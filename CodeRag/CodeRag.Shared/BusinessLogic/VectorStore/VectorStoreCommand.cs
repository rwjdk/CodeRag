using CodeRag.Shared.BusinessLogic.Ai;
using CodeRag.Shared.BusinessLogic.VectorStore.Models;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.BusinessLogic.VectorStore;

public class VectorStoreCommand(ITextEmbeddingGenerationService textEmbeddingGenerationService)
{
    //todo - can we make a base-class so we can make this Generic instead of 2 Methods?
    public async Task Upsert(IVectorStoreRecordCollection<string, DocumentationVectorEntity> collection, DocumentationVectorEntity entry)
    {
        try
        {
            if (!string.IsNullOrWhiteSpace(entry.Id)) //todo - stop doing this
            {
                entry.Id = Guid.NewGuid().ToString();
            }

            ReadOnlyMemory<float> vector = await textEmbeddingGenerationService.GenerateEmbeddingAsync(entry.Content);
            entry.Vector = vector;
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

    public async Task Upsert(IVectorStoreRecordCollection<string, SourceCodeVectorEntity> collection, SourceCodeVectorEntity entry)
    {
        try
        {
            if (!string.IsNullOrWhiteSpace(entry.Id))
            {
                entry.Id = Guid.NewGuid().ToString(); //todo - stop doing this
            }

            ReadOnlyMemory<float> vector = await textEmbeddingGenerationService.GenerateEmbeddingAsync(entry.Content);
            entry.Vector = vector;
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