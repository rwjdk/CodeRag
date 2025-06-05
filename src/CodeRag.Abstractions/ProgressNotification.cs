namespace CodeRag.Abstractions;

public record ProgressNotification(DateTimeOffset Timestamp, string Message, int Current = 0, int Total = 0)
{
    public object? Arguments { get; init; }
}