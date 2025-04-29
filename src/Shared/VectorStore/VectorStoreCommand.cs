using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Embeddings;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;

namespace Shared.VectorStore;

/// <summary>
/// Command for working with SQL Server as VectorStore
/// </summary>
/// <param name="aiConfiguration">The AI Configuration (For Embeddings)</param>
/// <param name="sqlServerCommand">The General Command for SQL Server</param>
[UsedImplicitly]
public class VectorStoreCommand(Ai.AiConfiguration aiConfiguration, SqlServerCommand sqlServerCommand) : IScopedService
{
    private readonly AzureOpenAITextEmbeddingGenerationService _embeddingGenerationService = new(aiConfiguration.EmbeddingModelDeploymentName, aiConfiguration.Endpoint, aiConfiguration.Key);

    /// <summary>
    /// Inserts or updates a vector entry in the collection for the given project and source
    /// </summary>
    /// <param name="projectId">Identifier of the project
    /// </param>
    /// <param name="source">Source entity of the project
    /// </param>
    /// <param name="collection">Collection of vector records
    /// </param>
    /// <param name="entry">Vector entry to upsert
    /// </param>
    /// <returns>Task representing the asynchronous operation
    /// </returns>
    public async Task Upsert(Guid projectId, ProjectSourceEntity source, IVectorStoreRecordCollection<Guid, VectorEntity> collection, VectorEntity entry)
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
            if (e.Message.Contains("This model's maximum context length is"))
            {
                //Too big. Splitting in two recursive until content fit
                int middle = entry.Content.Length / 2;
                string? name = entry.Name;
                string part1 = entry.Content.Substring(0, middle);
                string part2 = entry.Content.Substring(middle);
                entry.Content = part1;
                entry.Name = name + $" ({Guid.NewGuid()})";
                await Upsert(projectId, source, collection, entry);
                entry.VectorId = Guid.NewGuid();
                entry.Content = part2;
                entry.Name = name + $" ({Guid.NewGuid()})";
                await Upsert(projectId, source, collection, entry);
            }
            else
            {
                Console.WriteLine($"Rate Limited. Sleeping 10 sec ({e.Message})");
                await Task.Delay(10000);
                ReadOnlyMemory<float> vector = await _embeddingGenerationService.GenerateEmbeddingAsync(entry.Content);
                entry.VectorValue = vector;
                await collection.UpsertAsync(entry);
            }
        }
    }

    /// <summary>Deletes source data identified by the source identifier</summary>\n/// <param name="sourceId">The unique identifier of the source to delete</param>\n/// <returns>A task representing the asynchronous delete operation</returns>
    public async Task DeleteSourceDataAsync(Guid sourceId)
    {
        var context = await sqlServerCommand.CreateDbContextAsync();
        context.Vectors.RemoveRange(context.Vectors.Where(x => x.SourceId == sourceId));
        await context.SaveChangesAsync();
    }

    /// <summary>
    /// Deletes data associated with the specified project identifier
    /// </summary>
    /// <param name="projectId">The unique identifier of the project to delete data for</param>
    /// <returns>A task representing the asynchronous operation</returns>
    public async Task DeleteProjectData(Guid projectId)
    {
        var context = await sqlServerCommand.CreateDbContextAsync();
        context.Vectors.RemoveRange(context.Vectors.Where(x => x.ProjectId == projectId));
        await context.SaveChangesAsync();
    }
}