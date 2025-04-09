using CodeRag.Shared.VectorStore.Documentation;
using CodeRag.Shared.VectorStore.SourceCode;
using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared;

public class ProgressNotificationBase
{
    public event Action<ProgressNotification>? NotifyProgress;

    protected void OnNotifyProgress(string message)
    {
        NotifyProgress?.Invoke(new ProgressNotification(DateTimeOffset.UtcNow, message));
    }

    public void OnNotifyProgress(ProgressNotification notification)
    {
        NotifyProgress?.Invoke(notification);
    }
}

public record ProgressNotification(DateTimeOffset Timestamp, string Message)
{
    public List<VectorSearchResult<SourceCodeVectorEntity>>? SourceCodeSearchResults { get; set; }
    public List<VectorSearchResult<DocumentationVectorEntity>>? DocumentSearchResults { get; set; }
    public bool HasNoDetails => SourceCodeSearchResults?.Count is null or 0 && DocumentSearchResults?.Count is null or 0;
}