using CodeRag.Shared.Configuration;
using CodeRag.Shared.VectorStore;

namespace CodeRag.Shared.Ingestion;

public abstract class IngestionCommand(VectorStoreCommand vectorStoreCommand) : ProgressNotificationBase
{
    public VectorStoreCommand VectorStoreCommand { get; } = vectorStoreCommand;
    public abstract Task Ingest(Project project, ProjectSource source);
}