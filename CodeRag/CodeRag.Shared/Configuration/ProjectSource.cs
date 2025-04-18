namespace CodeRag.Shared.Configuration;

public class ProjectSource
{
    public required Guid Id { get; init; }

    public required string Name { get; init; }

    public required ProjectSourceKind Kind { get; set; }

    public required ProjectSourceLocation Location { get; set; }

    public string? Path { get; set; }

    public string? RootUrl { get; set; }

    public string? GitHubOwner { get; set; }

    public string? GitHubRepo { get; set; }

    //todo - folders to ignore //todo - replace with a general ignore pattern
    public List<string>? FilesToIgnore { get; set; } //todo - replace with a general ignore pattern
    public List<string>? FilesWithTheseSuffixesToIgnore { get; set; } //todo - replace with a general ignore pattern
    public List<string>? FilesWithThesePrefixesToIgnore { get; set; } //todo - replace with a general ignore pattern
}