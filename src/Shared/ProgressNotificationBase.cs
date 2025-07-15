using SimpleRag;

namespace Shared;

/// <summary>
/// Base class providing progress notification support.
/// </summary>
public class ProgressNotificationBase
{
    /// <summary>Occurs when progress is reported.</summary>
    public event Action<Notification>? NotifyProgress;

    /// <summary>
    /// Raises a progress notification.
    /// </summary>
    protected void OnNotifyProgress(string message, int current = 0, int total = 0, string? details = null)
    {
        NotifyProgress?.Invoke(new Notification(DateTimeOffset.UtcNow, message, current, total, details));
    }

    /// <summary>
    /// Raises the specified notification.
    /// </summary>
    public void OnNotifyProgress(Notification notification)
    {
        NotifyProgress?.Invoke(notification);
    }
}