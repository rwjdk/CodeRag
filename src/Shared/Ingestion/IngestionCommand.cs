using Shared.EntityFramework.DbModels;
using Shared.VectorStores;

namespace Shared.Ingestion;

public abstract class IngestionCommand(VectorStoreCommand vectorStoreCommand) : ProgressNotificationBase
{
    protected VectorStoreCommand VectorStoreCommand { get; } = vectorStoreCommand;

    public abstract Task IngestAsync(ProjectEntity project, ProjectSourceEntity source);
}