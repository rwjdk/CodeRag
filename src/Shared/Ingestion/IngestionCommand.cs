using Shared.EntityFramework.DbModels;
using Shared.VectorStore;

namespace Shared.Ingestion;

public abstract class IngestionCommand(VectorStoreCommand vectorStoreCommand) : ProgressNotificationBase
{
    public VectorStoreCommand VectorStoreCommand { get; } = vectorStoreCommand;
    public abstract Task IngestAsync(ProjectEntity project, ProjectSourceEntity source);
}