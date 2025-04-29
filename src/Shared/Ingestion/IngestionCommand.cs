using Shared.EntityFramework.DbModels;
using Shared.VectorStore;

namespace Shared.Ingestion;

/// <summary>
/// Abstract Class for Ingesting Data
/// </summary>
/// <param name="vectorStoreCommand">Command to do the ingestion</param>
public abstract class IngestionCommand(VectorStoreCommand vectorStoreCommand) : ProgressNotificationBase
{
    /// <summary>
    /// Command to do the ingestion
    /// </summary>
    protected VectorStoreCommand VectorStoreCommand { get; } = vectorStoreCommand;

    /// <summary>
    /// Performs ingestion for the given project and source
    /// </summary>
    /// <param name="project">The project to ingest data into</param>
    /// <param name="source">The source of the project data</param>
    public abstract Task IngestAsync(ProjectEntity project, ProjectSourceEntity source);
}