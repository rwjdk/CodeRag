using System.Text;
using JetBrains.Annotations;
using Shared.EntityFramework.DbModels;
using Shared.RawFiles.Models;

namespace Shared.RawFiles;

[UsedImplicitly]
public class RawFileLocalQuery : RawFileQuery, IScopedService
{
    public override async Task<RawFile[]?> GetRawContentForSourceAsync(ProjectEntity project, ProjectSourceEntity source, string fileExtensionType)
    {
        SharedGuards(source, expectedLocation: ProjectSourceLocation.Local);

        List<RawFile> result = [];

        string[] files = Directory.GetFiles(source.Path, "*." + fileExtensionType, source.Recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly);
        NotifyNumberOfFilesFound(files.Length);

        List<string> ignoredFiles = [];
        int counter = 0;
        foreach (string path in files)
        {
            if (source.IgnoreFile(path))
            {
                ignoredFiles.Add(path);
                continue;
            }

            counter++;
            OnNotifyProgress("Parsing Local files from Disk", counter, files.Length);
            var pathWithoutRoot = path.Replace(source.Path, string.Empty);
            string content = await File.ReadAllTextAsync(path, Encoding.UTF8);
            result.Add(new RawFile(path, content, pathWithoutRoot));
        }

        NotifyIgnoredFiles(ignoredFiles);

        return result.ToArray();
    }
}