using System.Text.RegularExpressions;
using SimpleRag.Abstractions.Models;

namespace SimpleRag.FileRetrieval.Models;

public class RawFileSource
{
    public required bool Recursive { get; set; }
    public required string Path { get; set; }
    public required string? FileIgnorePatterns { get; set; }
    public required SourceLocation Location { get; set; }
    public required string? GitHubOwner { get; set; }
    public required string? GitHubRepo { get; set; }
    public required DateTimeOffset? GitHubLastCommitTimestamp { get; set; }

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