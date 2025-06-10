using System.Text.RegularExpressions;

namespace CodeRag.Abstractions.Models;

public class RagSource
{
    public required string CollectionId { get; set; }
    public required string Id { get; set; }
    public required bool Recursive { get; set; }
    public required string Path { get; set; }
    public required string? FileIgnorePatterns { get; set; }
    public required RagSourceLocation Location { get; set; }
    public required string? GitHubOwner { get; set; }
    public required string? GitHubRepo { get; set; }
    public required DateTimeOffset? GitHubLastCommitTimestamp { get; set; }
    public required RagSourceKind Kind { get; set; }
    public required int? IgnoreFileIfMoreThanThisNumberOfLines { get; set; }
    public required bool MarkdownIgnoreCommentedOutContent { get; set; }
    public required bool MarkdownIgnoreImages { get; set; }
    public required bool MarkdownIgnoreMicrosoftLearnNoneCsharpContent { get; set; }
    public required int? MarkdownOnlyChunkIfMoreThanThisNumberOfLines { get; set; }
    public required int MarkdownLevelsToChunk { get; set; }
    public required string? MarkdownChunkLineIgnorePatterns { get; set; }
    public required int? MarkdownChunkIgnoreIfLessThanThisAmountOfChars { get; set; }

    public bool IgnoreFile(string path)
    {
        if (string.IsNullOrWhiteSpace(FileIgnorePatterns))
        {
            return false;
        }

        string[] patternsToIgnore = FileIgnorePatterns.Split(';', StringSplitOptions.RemoveEmptyEntries);
        foreach (string pattern in patternsToIgnore.Where(x => !string.IsNullOrWhiteSpace(x)))
        {
            if (Regex.IsMatch(path, pattern, RegexOptions.IgnoreCase))
            {
                return true;
            }
        }

        return false;
    }
}