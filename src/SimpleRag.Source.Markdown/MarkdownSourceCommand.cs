using JetBrains.Annotations;
using SimpleRag.Abstractions;
using SimpleRag.Abstractions.Models;
using SimpleRag.FileRetrieval;
using SimpleRag.FileRetrieval.Models;
using SimpleRag.Source.Markdown.Models;
using SimpleRag.VectorStorage;
using SimpleRag.VectorStorage.Models;
using System.Text.RegularExpressions;

namespace SimpleRag.Source.Markdown;

[UsedImplicitly]
public class MarkdownSourceCommand(
    MarkdownChunker chunker,
    VectorStoreQuery vectorStoreQuery,
    VectorStoreCommand vectorStoreCommand,
    RawFileGitHubQuery gitHubRawFileContentQuery,
    RawFileLocalQuery rawFileLocalQuery) : ProgressNotificationBase
{
    public const string SourceKind = "Markdown";

    public async Task IngestAsync(MarkdownSource source)
    {
        RawFileQuery rawFileContentQuery;
        switch (source.Location)
        {
            case SourceLocation.GitHub:
                rawFileContentQuery = gitHubRawFileContentQuery;
                break;
            case SourceLocation.Local:
                rawFileContentQuery = rawFileLocalQuery;
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(source.Location));
        }

        rawFileContentQuery.NotifyProgress += OnNotifyProgress;

        RawFile[]? rawFiles = await rawFileContentQuery.GetRawContentForSourceAsync(source.AsRagFileSource(), "md");
        if (rawFiles == null)
        {
            OnNotifyProgress("Nothing new to Ingest so skipping");
            return;
        }

        List<VectorEntity> entries = [];

        foreach (var rawFile in rawFiles)
        {
            var numberOfLine = rawFile.Content.Split(["\n"], StringSplitOptions.RemoveEmptyEntries).Length;
            if (source.IgnoreFileIfMoreThanThisNumberOfLines.HasValue && numberOfLine > source.IgnoreFileIfMoreThanThisNumberOfLines)
            {
                continue;
            }

            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(rawFile.Path);
            var content = rawFile.Content;
            if (source.MarkdownIgnoreCommentedOutContent)
            {
                //Remove Any Commented out parts
                content = Regex.Replace(content, "<!--[\\s\\S]*?-->", string.Empty);
            }

            if (source.MarkdownIgnoreImages)
            {
                //Remove Any Images
                content = Regex.Replace(content, @"!\[.*?\]\(.*?\)", string.Empty);
            }

            if (source.MarkdownIgnoreMicrosoftLearnNoneCsharpContent)
            {
                content = Regex.Replace(content, "\\A---\\s*[\\s\\S]*?\\s*---\\s*", string.Empty); //Top MD Section
                content = Regex.Replace(content, ":::\\s*zone\\s+pivot=\"programming-language-python\"\\s*[\\s\\S]*?\\s*:::\\s*zone-end", string.Empty);
                content = Regex.Replace(content, ":::\\s*zone\\s+pivot=\"programming-language-java\"\\s*[\\s\\S]*?\\s*:::\\s*zone-end", string.Empty);
                content = Regex.Replace(content, @"^::: zone pivot=""programming-language-csharp"".*$|^::: zone-end.*$", "", RegexOptions.Multiline);
            }

            var newLine = Environment.NewLine;
            content = Regex.Replace(content, @"\r\n[\r\n]+|\r[\r]+|\n[\n]+", newLine + newLine);
            content = content.Trim();

            if (numberOfLine > source.MarkdownOnlyChunkIfMoreThanThisNumberOfLines)
            {
                //Chunk larger files
                MarkdownChunk[] chunks = chunker.GetChunks(content,
                    source.MarkdownLevelsToChunk,
                    source.MarkdownChunkLineIgnorePatterns,
                    source.MarkdownChunkIgnoreIfLessThanThisAmountOfChars);

                entries.AddRange(chunks.Select(x => new VectorEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    ContentKind = "Markdown",
                    Content = $"{fileNameWithoutExtension} - {x.Name}{newLine}---{newLine}{x.Content}",
                    ContentId = x.ChunkId,
                    ContentName = x.Name,
                    SourceId = source.Id,
                    SourceKind = SourceKind,
                    SourceCollectionId = source.CollectionId,
                    SourcePath = rawFile.PathWithoutRoot,
                    ContentParent = null,
                    ContentParentKind = null,
                    ContentNamespace = null,
                }));
            }
            else
            {
                entries.Add(new VectorEntity
                {
                    Id = Guid.NewGuid().ToString(),
                    SourceId = source.Id,
                    SourceKind = SourceKind,
                    SourceCollectionId = source.CollectionId,
                    SourcePath = rawFile.PathWithoutRoot,
                    ContentKind = "Markdown",
                    Content = $"{fileNameWithoutExtension}{newLine}---{newLine}{content}",
                    ContentName = fileNameWithoutExtension,
                    ContentId = null,
                    ContentParent = null,
                    ContentParentKind = null,
                    ContentNamespace = null,
                });
            }
        }

        var existingData = await vectorStoreQuery.GetExistingAsync(x => x.SourceId == source.Id);

        int counter = 0;
        List<string> idsToKeep = [];
        foreach (var entity in entries)
        {
            counter++;
            OnNotifyProgress("Embedding Data", counter, entries.Count);
            var existing = existingData.FirstOrDefault(x => x.GetContentCompareKey() == entity.GetContentCompareKey());
            if (existing == null)
            {
                await Retry.ExecuteWithRetryAsync(async () => { await vectorStoreCommand.UpsertAsync(entity); }, 3, TimeSpan.FromSeconds(30));
            }
            else
            {
                idsToKeep.Add(existing.Id);
            }
        }

        var idsToDelete = existingData.Select(x => x.Id).Except(idsToKeep).ToList();
        if (idsToDelete.Count != 0)
        {
            OnNotifyProgress("Removing entities that are no longer in source");
            await vectorStoreCommand.DeleteAsync(idsToDelete);
        }

        OnNotifyProgress("Done");
    }
}