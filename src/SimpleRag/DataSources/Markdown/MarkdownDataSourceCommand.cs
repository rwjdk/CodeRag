using JetBrains.Annotations;
using SimpleRag.DataSources.Markdown.Models;
using SimpleRag.DataSources.Models;
using SimpleRag.FileContent;
using SimpleRag.VectorStorage;
using SimpleRag.VectorStorage.Models;
using System.Text.RegularExpressions;
using SimpleRag.Helpers;

namespace SimpleRag.DataSources.Markdown;

[UsedImplicitly]
public class MarkdownDataSourceCommand(
    MarkdownChunker chunker,
    VectorStoreQuery vectorStoreQuery,
    VectorStoreCommand vectorStoreCommand,
    FileContentGitHubQuery gitHubFileContentQuery,
    FileContentLocalQuery localFileContentQuery) : ProgressNotificationBase
{
    public const string SourceKind = "Markdown";

    public async Task IngestLocalAsync(MarkdownDataSourceLocal dataSource)
    {
        Guards(dataSource);

        localFileContentQuery.NotifyProgress += OnNotifyProgress;

        FileContent.Models.FileContent[]? rawFiles = await localFileContentQuery.GetRawContentForSourceAsync(dataSource.AsFileContentSource(), "md");
        if (rawFiles == null)
        {
            OnNotifyProgress("Nothing new to Ingest so skipping");
            return;
        }

        await IngestAsync(dataSource, rawFiles);
    }

    public async Task IngestGitHubAsync(MarkdownDataSourceGitHub dataSource)
    {
        Guards(dataSource);

        gitHubFileContentQuery.NotifyProgress += OnNotifyProgress;

        FileContent.Models.FileContent[]? rawFiles = await gitHubFileContentQuery.GetRawContentForSourceAsync(dataSource.AsFileContentSource(), "md");
        if (rawFiles == null)
        {
            OnNotifyProgress("Nothing new to Ingest so skipping");
            return;
        }

        await IngestAsync(dataSource, rawFiles);
    }

    private async Task IngestAsync(MarkdownSource source, FileContent.Models.FileContent[] rawFiles)
    {
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
                    ContentDependencies = null,
                    ContentDescription = null,
                    ContentReferences = null
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
                    ContentDependencies = null,
                    ContentDescription = null,
                    ContentReferences = null
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
                await RetryHelper.ExecuteWithRetryAsync(async () => { await vectorStoreCommand.UpsertAsync(entity); }, 3, TimeSpan.FromSeconds(30));
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


    private static void Guards(DataSource source)
    {
        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new SourceException("Source Path is not defined");
        }
    }
}