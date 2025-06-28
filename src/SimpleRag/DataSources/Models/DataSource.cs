namespace SimpleRag.DataSources.Models;

public abstract class DataSource
{
    public required string CollectionId { get; set; }
    public required string Id { get; set; }
    public required bool Recursive { get; set; }
    public required string Path { get; set; }
    public required string? FileIgnorePatterns { get; set; }
    public required int? IgnoreFileIfMoreThanThisNumberOfLines { get; set; }
}