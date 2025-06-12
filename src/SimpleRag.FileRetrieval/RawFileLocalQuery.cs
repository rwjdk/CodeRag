using System.Text;
using JetBrains.Annotations;
using SimpleRag.Abstractions.Models;
using SimpleRag.FileRetrieval.Models;

namespace SimpleRag.FileRetrieval;

[UsedImplicitly]
public class RawFileLocalQuery : RawFileQuery
{
    public override async Task<RawFile[]?> GetRawContentForSourceAsync(RawFileSource source, string fileExtensionType)
    {
        SharedGuards(source, expectedLocation: SourceLocation.Local);

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
            string content = await System.IO.File.ReadAllTextAsync(path, Encoding.UTF8);
            result.Add(new RawFile(path, content, pathWithoutRoot));
        }

        NotifyIgnoredFiles(ignoredFiles);

        return result.ToArray();
    }
}