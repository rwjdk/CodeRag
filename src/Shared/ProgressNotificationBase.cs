namespace Shared;

/// <summary>
/// Notification System
/// </summary>
public class ProgressNotificationBase
{
    /// <summary>
    /// Notify Progress
    /// </summary>
    public event Action<ProgressNotification>? NotifyProgress;

    /// <summary>
    /// Invoke of Notify Progress
    /// </summary>
    /// <param name="message">Message</param>
    /// <param name="current">Current Count of Progress</param>
    /// <param name="total">Total count of progress</param>
    protected void OnNotifyProgress(string message, int current = 0, int total = 0)
    {
        NotifyProgress?.Invoke(new ProgressNotification(DateTimeOffset.UtcNow, message, current, total));
    }

    /// <summary>
    /// Handles progress notifications
    /// </summary>
    /// <param name="notification">The progress notification data</param>
    public void OnNotifyProgress(ProgressNotification notification)
    {
        NotifyProgress?.Invoke(notification);
    }
}