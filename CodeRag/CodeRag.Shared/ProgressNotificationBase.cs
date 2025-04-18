using CodeRag.Shared.VectorStore;
using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared;

public class ProgressNotificationBase
{
    public event Action<ProgressNotification>? NotifyProgress;

    protected void OnNotifyProgress(string message, int current = 0, int total = 0)
    {
        NotifyProgress?.Invoke(new ProgressNotification(DateTimeOffset.UtcNow, message, current, total));
    }

    public void OnNotifyProgress(ProgressNotification notification)
    {
        NotifyProgress?.Invoke(notification);
    }
}

public record ProgressNotification(DateTimeOffset Timestamp, string Message, int Current = 0, int Total = 0)
{
    public List<VectorSearchResult<CSharpCodeEntity>>? SourceCodeSearchResults { get; set; }
    public List<VectorSearchResult<MarkdownVectorEntity>>? DocumentSearchResults { get; set; }
    public bool HasNoDetails => SourceCodeSearchResults?.Count is null or 0 && DocumentSearchResults?.Count is null or 0;
}