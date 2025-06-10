using System.Text;
using JetBrains.Annotations;
using SimpleRag.Abstractions;
using SimpleRag.Abstractions.Models;
using SimpleRag.FileRetrieval.Models;

namespace SimpleRag.FileRetrieval;

[UsedImplicitly]
public class RagFileLocalQuery : RagFileQuery, IScopedService
{
    public override async Task<RagFile[]?> GetRawContentForSourceAsync(RagSource source, string fileExtensionType)
    {
        SharedGuards(source, expectedLocation: RagSourceLocation.Local);

        List<RagFile> result = [];

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
            result.Add(new RagFile(path, content, pathWithoutRoot));
        }

        NotifyIgnoredFiles(ignoredFiles);

        return result.ToArray();
    }
}