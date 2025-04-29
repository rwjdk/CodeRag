using System.Text;
using System.Text.RegularExpressions;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Shared.Chunking.Markdown;
using Shared.EntityFramework.DbModels;
using Shared.VectorStore;

namespace Shared.Ingestion;

[UsedImplicitly]
public class MarkdownIngestionCommand(MarkdownChunker chunker, VectorStoreQuery vectorStoreQuery, VectorStoreCommand vectorStoreCommand) : IngestionCommand(vectorStoreCommand), IScopedService
{
    public override async Task IngestAsync(ProjectEntity project, ProjectSourceEntity source)
    {
        if (source.Kind != ProjectSourceKind.Markdown)
        {
            throw new IngestionException($"Invalid Kind. Expected '{nameof(ProjectSourceKind.Markdown)}' but received {source.Kind}");
        }

        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new IngestionException("Source Path is not defined");
        }

        if (source.Location == ProjectSourceLocation.GitHub)
        {
            throw new NotSupportedException("Location 'GitHub' not yet supported for Markdown Ingestion");
        }

        IVectorStoreRecordCollection<Guid, VectorEntity> collection = vectorStoreQuery.GetCollection();

        await collection.CreateCollectionIfNotExistsAsync();

        string[] paths = Directory.GetFiles(source.Path, "*.md", source.Recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly);
        List<VectorEntity> entries = [];

        int counter = 0;
        foreach (string path in paths)
        {
            counter++;
            var sourcePath = path.Replace(source.Path, string.Empty);
            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(path);
            if (source.IgnoreFile(path))
            {
                continue;
            }


            OnNotifyProgress("Step 1: Parsing Local files from Disk", counter, paths.Length);
            string content = await File.ReadAllTextAsync(path, Encoding.UTF8);

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

            var numberOfLine = content.Split(["\n"], StringSplitOptions.RemoveEmptyEntries).Length;

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
                    SourcePath = sourcePath,
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
                    SourcePath = sourcePath,
                    Name = fileNameWithoutExtension,
                });
            }
        }

        var existingData = await vectorStoreQuery.GetExistingAsync(project.Id, source.Id);

        counter = 0;
        List<Guid> idsToKeep = [];
        foreach (var entry in entries)
        {
            counter++;
            OnNotifyProgress("Step 2: Embedding Data if Content have changed", counter, entries.Count);
            var existing = existingData.FirstOrDefault(x => x.GetContentCompareKey() == entry.GetContentCompareKey());
            if (existing == null)
            {
                await VectorStoreCommand.Upsert(project.Id, source, collection, entry);
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
            await collection.DeleteBatchAsync(idsToDelete);
        }

        OnNotifyProgress("Done");
    }
}