using Microsoft.Extensions.VectorData;
using Shared.EntityFramework.DbModels;

namespace Shared;

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
    public List<VectorSearchResult<VectorEntity>>? SearchResults { get; set; }
    public bool HasNoDetails => SearchResults?.Count is null or 0;
}