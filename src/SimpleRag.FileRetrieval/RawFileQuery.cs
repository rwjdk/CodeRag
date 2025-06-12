using System.Text.RegularExpressions;
using SimpleRag.Abstractions;
using SimpleRag.Abstractions.Models;
using SimpleRag.FileRetrieval.Models;

namespace SimpleRag.FileRetrieval;

public abstract class RawFileQuery : ProgressNotificationBase
{
    public abstract Task<RawFile[]?> GetRawContentForSourceAsync(RawFileSource source, string fileExtensionType);

    protected void SharedGuards(RawFileSource source, SourceLocation expectedLocation)
    {
        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new RawFileException("Path is not defined");
        }

        if (source.Location != expectedLocation)
        {
            throw new RawFileException($"Wrong Location Type. Expected '{expectedLocation}' but got '{source.Location}'");
        }
    }

    protected void NotifyNumberOfFilesFound(int length)
    {
        OnNotifyProgress($"Found {length} files");
    }

    protected void NotifyIgnoredFiles(List<string> ignoredFiles)
    {
        if (ignoredFiles.Count > 0)
        {
            OnNotifyProgress($"{ignoredFiles.Count} Files Ignored");
        }
    }

    public bool IgnoreFile(string path, string fileIgnorePatterns)
    {
        if (string.IsNullOrWhiteSpace(fileIgnorePatterns))
        {
            return false;
        }

        string[] patternsToIgnore = fileIgnorePatterns.Split(';', StringSplitOptions.RemoveEmptyEntries);
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