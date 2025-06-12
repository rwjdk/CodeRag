using SimpleRag.Abstractions.Models;
using SimpleRag.FileRetrieval.Models;

namespace SimpleRag.Source.CSharp.Models;

public class CSharpSource
{
    public required string CollectionId { get; set; }
    public required string Id { get; set; }
    public required bool Recursive { get; set; }
    public required string Path { get; set; }
    public required string? FileIgnorePatterns { get; set; }
    public required SourceLocation Location { get; set; }
    public required string? GitHubOwner { get; set; }
    public required string? GitHubRepo { get; set; }
    public required DateTimeOffset? GitHubLastCommitTimestamp { get; set; }
    public required int? IgnoreFileIfMoreThanThisNumberOfLines { get; set; }

    public RawFileSource AsRagFileSource()
    {
        return new RawFileSource
        {
            FileIgnorePatterns = FileIgnorePatterns,
            GitHubLastCommitTimestamp = GitHubLastCommitTimestamp,
            GitHubOwner = GitHubOwner,
            GitHubRepo = GitHubRepo,
            Location = Location,
            Path = Path,
            Recursive = Recursive
        };
    }
}