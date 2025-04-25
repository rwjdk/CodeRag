using CodeRag.Shared.EntityFramework.DbModels;
using CodeRag.Shared.VectorStore;

namespace CodeRag.Shared.Ingestion;

public abstract class IngestionCommand(VectorStoreCommand vectorStoreCommand) : ProgressNotificationBase
{
    public VectorStoreCommand VectorStoreCommand { get; } = vectorStoreCommand;
    public abstract Task Ingest(ProjectEntity project, ProjectSourceEntity source);
}