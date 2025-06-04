using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Shared.Chunking.Markdown;
using Shared.EntityFramework.DbModels;
using Shared.RawFiles;
using Shared.RawFiles.Models;
using Shared.VectorStores;
using System.Text.RegularExpressions;

namespace Shared.Ingestion;

[UsedImplicitly]
public class IngestionMarkdownCommand(
    MarkdownChunker chunker,
    VectorStoreQuery vectorStoreQuery,
    VectorStoreCommand vectorStoreCommand,
    RawFileGitHubQuery gitHubRawFileContentQuery,
    RawFileLocalQuery rawFileLocalQuery) : IngestionCommand(vectorStoreCommand), IScopedService
{
    public override async Task IngestAsync(ProjectEntity project, ProjectSourceEntity source)
    {
        if (source.Kind != ProjectSourceKind.Markdown)
        {
            throw new IngestionException($"Invalid Kind. Expected '{nameof(ProjectSourceKind.Markdown)}' but received {source.Kind}");
        }

        RawFileQuery rawFileContentQuery;
        switch (source.Location)
        {
            case ProjectSourceLocation.GitHub:
                rawFileContentQuery = gitHubRawFileContentQuery;
                break;
            case ProjectSourceLocation.Local:
                rawFileContentQuery = rawFileLocalQuery;
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(source.Location));
        }

        rawFileContentQuery.NotifyProgress += OnNotifyProgress;

        RawFile[]? rawFiles = await rawFileContentQuery.GetRawContentForSourceAsync(project, source, "md");
        if (rawFiles == null)
        {
            OnNotifyProgress("Nothing new to Ingest so skipping");
            return;
        }

        VectorStoreCollection<Guid, VectorEntity> collection = vectorStoreQuery.GetCollection();

        await collection.EnsureCollectionExistsAsync();

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
                    Kind = "Markdown",
                    Content = $"{fileNameWithoutExtension} - {x.Name}{newLine}---{newLine}{x.Content}",
                    SourcePath = rawFile.PathWithoutRoot,
                    Id = x.ChunkId,
                    Name = x.Name,
                }));
            }
            else
            {
                entries.Add(new VectorEntity
                {
                    Kind = "Markdown",
                    Content = $"{fileNameWithoutExtension}{newLine}---{newLine}{content}",
                    SourcePath = rawFile.PathWithoutRoot,
                    Name = fileNameWithoutExtension,
                });
            }
        }

        var existingData = await vectorStoreQuery.GetExistingAsync(project.Id, source.Id);

        int counter = 0;
        List<Guid> idsToKeep = [];
        foreach (var entry in entries)
        {
            counter++;
            OnNotifyProgress("Embedding Data", counter, entries.Count);
            var existing = existingData.FirstOrDefault(x => x.GetContentCompareKey() == entry.GetContentCompareKey());
            if (existing == null)
            {
                await Retry.ExecuteWithRetryAsync(async () => { await VectorStoreCommand.Upsert(project.Id, source, collection, entry); }, 3, TimeSpan.FromSeconds(30));
            }
            else
            {
                idsToKeep.Add(existing.VectorId);
            }
        }

        var idsToDelete = existingData.Select(x => x.VectorId).Except(idsToKeep).ToList();
        if (idsToDelete.Count != 0)
        {
            OnNotifyProgress("Removing entities that are no longer in source");
            await collection.DeleteAsync(idsToDelete);
        }

        OnNotifyProgress("Done");
    }
}