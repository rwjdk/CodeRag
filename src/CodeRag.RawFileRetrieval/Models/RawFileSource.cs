using System.Text.RegularExpressions;

namespace CodeRag.RawFileRetrieval.Models;

public class RawFileSource
{
    public required bool Recursive { get; set; }
    public required string Path { get; set; }
    public required string? FileIgnorePatterns { get; set; }
    public required RawFileLocation Location { get; set; }
    public string? GitHubOwner { get; set; }
    public string? GitHubRepo { get; set; }
    public DateTimeOffset? GitHubLastCommitTimestamp { get; set; }

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