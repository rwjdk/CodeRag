using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Embeddings;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;

namespace Shared.VectorStore;

[UsedImplicitly]
public class VectorStoreCommand(Ai.AiConfiguration aiConfiguration, SqlServerCommand sqlServerCommand) : IScopedService
{
    private readonly AzureOpenAITextEmbeddingGenerationService _embeddingGenerationService = new(aiConfiguration.EmbeddingModelDeploymentName, aiConfiguration.Endpoint, aiConfiguration.Key);

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
                    entry.DataType = nameof(VectorStoreDataType.Code);
                    break;
                case ProjectSourceKind.Markdown:
                    entry.DataType = nameof(VectorStoreDataType.Documentation);
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
            await Task.Delay(10000);
            ReadOnlyMemory<float> vector = await _embeddingGenerationService.GenerateEmbeddingAsync(entry.Content);
            entry.VectorValue = vector;
            await collection.UpsertAsync(entry);
        }
    }

    public async Task DeleteSourceDataAsync(Guid sourceId) //todo - test
    {
        var context = await sqlServerCommand.CreateDbContextAsync();
        context.Vectors.RemoveRange(context.Vectors.Where(x => x.SourceId == sourceId));
        await context.SaveChangesAsync();
    }

    public async Task DeleteProjectData(Guid projectId) //todo - use
    {
        var context = await sqlServerCommand.CreateDbContextAsync();
        context.Vectors.RemoveRange(context.Vectors.Where(x => x.ProjectId == projectId));
        await context.SaveChangesAsync();
    }
}