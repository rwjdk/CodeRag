using Shared.EntityFramework.DbModels;
using Shared.RawFiles.Models;

namespace Shared.RawFiles;

public abstract class RawFileQuery : ProgressNotificationBase
{
    public abstract Task<RawFile[]?> GetRawContentForSourceAsync(ProjectEntity project, ProjectSourceEntity source, string fileExtensionType);

    protected void SharedGuards(ProjectSourceEntity source, ProjectSourceLocation expectedLocation)
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
}