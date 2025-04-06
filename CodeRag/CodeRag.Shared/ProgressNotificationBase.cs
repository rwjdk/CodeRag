namespace CodeRag.Shared;

public class ProgressNotificationBase
{
    public event Action<ProgressNotification>? NotifyProgress;

    protected void OnNotifyProgress(string message)
    {
        NotifyProgress?.Invoke(new ProgressNotification(DateTimeOffset.UtcNow, message));
    }
}

public record ProgressNotification(DateTimeOffset Timestamp, string Message);