using SimpleRag.Abstractions.Models;
using SimpleRag.FileRetrieval.Models;

namespace SimpleRag.Source.Markdown.Models;

public class MarkdownSource
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
    public required bool MarkdownIgnoreCommentedOutContent { get; set; }
    public required bool MarkdownIgnoreImages { get; set; }
    public required bool MarkdownIgnoreMicrosoftLearnNoneCsharpContent { get; set; }
    public required int? MarkdownOnlyChunkIfMoreThanThisNumberOfLines { get; set; }
    public required int MarkdownLevelsToChunk { get; set; }
    public required string? MarkdownChunkLineIgnorePatterns { get; set; }
    public required int? MarkdownChunkIgnoreIfLessThanThisAmountOfChars { get; set; }

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