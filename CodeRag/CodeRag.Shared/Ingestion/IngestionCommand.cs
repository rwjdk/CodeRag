using CodeRag.Shared.Configuration;

namespace CodeRag.Shared.Ingestion;

public abstract class IngestionCommand : ProgressNotificationBase
{
    public abstract Task Ingest(Project project, ProjectSource source);
}