using JetBrains.Annotations;
using SimpleRag.Abstractions;
using SimpleRag.Abstractions.Models;
using SimpleRag.FileRetrieval;
using SimpleRag.FileRetrieval.Models;
using SimpleRag.Source.JavaScript.Models;

namespace SimpleRag.Source.JavaScript;

[UsedImplicitly]
public class JavaScriptSourceCommand(RawFileLocalQuery rawRagFileLocalQuery) : ProgressNotificationBase
{
    public async Task IngestAsync(JavaScriptSource source)
    {
        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new SourceException("Source Path is not defined");
        }

        RawFileQuery rawFileContentQuery;
        switch (source.Location)
        {
            case SourceLocation.Local:
                rawFileContentQuery = rawRagFileLocalQuery;
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(source.Location));
        }

        rawFileContentQuery.NotifyProgress += OnNotifyProgress;

        RawFile[]? files = await rawFileContentQuery.GetRawContentForSourceAsync(source.AsRagFileSource(), "ts");
        if (files == null)
        {
            OnNotifyProgress("Nothing new to Ingest so skipping");
            return;
        }

        // Write all files to a folder called code
        string codeRoot = Path.Combine(Directory.GetCurrentDirectory(), "code");
        Directory.CreateDirectory(codeRoot);

        int written = 0;
        foreach (var file in files)
        {
            var fileName = file.PathWithoutRoot;
            // Ensure subdirectories are created
            var targetPath = codeRoot + fileName;
            var targetDir = Path.GetDirectoryName(targetPath);
            if (!string.IsNullOrEmpty(targetDir))
                Directory.CreateDirectory(targetDir);

            await File.WriteAllTextAsync(targetPath, file.Content);
            written++;
            OnNotifyProgress($"Wrote: {file.Path}", written, files.Length);
        }
        
        OnNotifyProgress("Done");
    }
}