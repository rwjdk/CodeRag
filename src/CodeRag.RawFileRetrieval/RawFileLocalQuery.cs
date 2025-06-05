using System.Text;
using CodeRag.Abstractions;
using CodeRag.RawFileRetrieval.Models;
using JetBrains.Annotations;

namespace CodeRag.RawFileRetrieval;

[UsedImplicitly]
public class RawFileLocalQuery : RawFileQuery, IScopedService
{
    public override async Task<RawFile[]?> GetRawContentForSourceAsync(RawFileSource source, string fileExtensionType)
    {
        SharedGuards(source, expectedLocation: RawFileLocation.Local);

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