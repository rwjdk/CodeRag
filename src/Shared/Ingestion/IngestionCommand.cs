using CodeRag.Abstractions;
using Shared.EntityFramework.DbModels;
using Shared.VectorStores;

namespace Shared.Ingestion;

public abstract class IngestionCommand(VectorStoreCommandSpecific vectorStoreCommandSpecific) : ProgressNotificationBase
{
    protected VectorStoreCommandSpecific VectorStoreCommandSpecific { get; } = vectorStoreCommandSpecific;

    public abstract Task IngestAsync(ProjectEntity project, ProjectSourceEntity source);
}