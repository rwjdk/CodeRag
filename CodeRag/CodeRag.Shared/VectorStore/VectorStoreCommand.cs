using CodeRag.Shared.Ai;
using CodeRag.Shared.Configuration;
using CodeRag.Shared.EntityFramework.DbModels;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.VectorStore;

[UsedImplicitly]
public class VectorStoreCommand(Ai.Ai ai) : IScopedService
{
    private readonly AzureOpenAITextEmbeddingGenerationService _embeddingGenerationService = new(ai.EmbeddingModelDeploymentName, ai.Endpoint, ai.Key);

    public async Task Upsert<T>(Guid projectId, ProjectSourceEntity source, IVectorStoreRecordCollection<Guid, T> collection, T entry) where T : VectorEntity
    {
        try
        {
            entry.VectorId = Guid.NewGuid();
            entry.ProjectId = projectId;
            entry.SourceId = source.Id;

            switch (source.Kind)
            {
                case ProjectSourceKind.CSharpCode:
                    entry.DataType = VectorStoreDataType.Code.ToString();
                    break;
                case ProjectSourceKind.Markdown:
                    entry.DataType = VectorStoreDataType.Documentation.ToString();
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            ReadOnlyMemory<float> vector = await _embeddingGenerationService.GenerateEmbeddingAsync(entry.Content);
            entry.VectorValue = vector.ToArray();
            entry.TimeOfIngestion = DateTime.UtcNow;
            await collection.UpsertAsync(entry);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Rate Limited. Sleeping 10 sec ({e.Message})");
            await Task.Delay(10000); //todo - Do this with Polly
            ReadOnlyMemory<float> vector = await _embeddingGenerationService.GenerateEmbeddingAsync(entry.Content);
            entry.VectorValue = vector;
            await collection.UpsertAsync(entry);
        }
    }
}