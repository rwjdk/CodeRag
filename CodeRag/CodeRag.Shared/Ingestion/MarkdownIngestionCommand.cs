using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Embeddings;
using System.Text.RegularExpressions;
using System.Text;
using CodeRag.Shared.VectorStore;
using CodeRag.Shared.Ai.SemanticKernel;
using CodeRag.Shared.Chunking.Markdown;
using CodeRag.Shared.Interfaces;
using CodeRag.Shared.EntityFramework;
using Microsoft.EntityFrameworkCore;
using CodeRag.Shared.Configuration;

namespace CodeRag.Shared.Ingestion;

[UsedImplicitly]
public class MarkdownIngestionCommand(MarkdownChunker chunker, SemanticKernelQuery semanticKernelQuery, IDbContextFactory<SqlDbContext> dbContextFactory) : IngestionCommand, IScopedService
{
    public override async Task Ingest(Project project, ProjectSource source)
    {
        if (source.Kind != ProjectSourceKind.Markdown)
        {
            throw new ArgumentException($"Invalid Kind. Expected '{nameof(ProjectSourceKind.Markdown)}' but received {source.Kind}", nameof(source.Kind));
        }

        if (string.IsNullOrWhiteSpace(project.SqlServerVectorStoreConnectionString))
        {
            OnNotifyProgress("Vector Store ConnectionString is not defined"); //todo - should this be an exception instead?
            return;
        }

        if (string.IsNullOrWhiteSpace(source.Path))
        {
            OnNotifyProgress("Source Path is not defined"); //todo - should this be an exception instead?
            return;
        }

        if (source.Location == ProjectSourceLocation.GitHub)
        {
            OnNotifyProgress("Location not supported"); //todo - should this be an exception instead?
            return;
        }

        ITextEmbeddingGenerationService embeddingGenerationService = semanticKernelQuery.GetTextEmbeddingGenerationService(project);
        VectorStoreCommand vectorStoreCommand = new(embeddingGenerationService);
        SqlServerVectorStoreQuery vectorStoreQuery = new(project.SqlServerVectorStoreConnectionString, dbContextFactory);
        IVectorStoreRecordCollection<Guid, MarkdownVectorEntity> collection = vectorStoreQuery.GetCollection<MarkdownVectorEntity>(Constants.VectorCollections.MarkdownVectorCollection);

        await collection.CreateCollectionIfNotExistsAsync();

        string[] paths = Directory.GetFiles(source.Path, "*.md", source.PathSearchRecursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly);
        List<MarkdownVectorEntity> entries = [];

        foreach (string path in paths)
        {
            var sourcePath = path.Replace(source.Path, string.Empty);
            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(path);
            if (source.FilesToIgnore != null && source.FilesToIgnore.Contains(fileNameWithoutExtension))
            {
                continue;
            }

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
                //Todo - more granular
                content = Regex.Replace(content, "\\A---\\s*[\\s\\S]*?\\s*---\\s*", string.Empty); //Top MD Section //todo: check if this is too aggressive
                content = Regex.Replace(content, ":::\\s*zone\\s+pivot=\"programming-language-python\"\\s*[\\s\\S]*?\\s*:::\\s*zone-end", string.Empty); //todo - SK Python Section - make configurable
                content = Regex.Replace(content, ":::\\s*zone\\s+pivot=\"programming-language-java\"\\s*[\\s\\S]*?\\s*:::\\s*zone-end", string.Empty); //todo - SK Java Section - make configurable
                content = Regex.Replace(content, @"^::: zone pivot=""programming-language-csharp"".*$|^::: zone-end.*$", "", RegexOptions.Multiline);
            }

            content = Regex.Replace(content, @"\r\n[\r\n]+|\r[\r]+|\n[\n]+", Environment.NewLine + Environment.NewLine);
            content = content.Trim();

            var numberOfLine = content.Split([source.MarkdownLineSplitter], StringSplitOptions.RemoveEmptyEntries).Length;

            if (numberOfLine > source.MarkdownOnlyChunkIfMoreThanThisNumberOfLines)
            {
                //Chunk larger files
                MarkdownChunk[] chunks = chunker.GetChunks(content,
                    source.MarkdownLineSplitter,
                    source.MarkdownLevelsToChunk,
                    source.MarkdownChunkLineContainsToIgnore,
                    source.MarkdownChunkLinePrefixesToIgnore,
                    source.MarkdownChunkLineRegExPatternsToIgnore,
                    source.MarkdownIgnoreCommentedOutContent,
                    source.MarkdownIgnoreImages,
                    source.MarkdownChunkIgnoreIfLessThanThisAmountOfChars);

                entries.AddRange(chunks.Select(x => new MarkdownVectorEntity
                {
                    Content = x.Name + Environment.NewLine + "---" + Environment.NewLine + x.Content,
                    SourcePath = sourcePath,
                    ChunkId = x.ChunkId,
                    Name = x.Name,
                }));
            }
            else
            {
                entries.Add(new MarkdownVectorEntity
                {
                    Content = fileNameWithoutExtension + Environment.NewLine + "---" + Environment.NewLine + content,
                    SourcePath = sourcePath,
                    Name = fileNameWithoutExtension,
                });
            }
        }

        var existingData = await vectorStoreQuery.GetDocumentation(project.Id, source.Id);

        int counter = 0;
        List<Guid> idsToKeep = [];
        foreach (var entry in entries)
        {
            counter++;
            OnNotifyProgress($"Processing: '{entry.Name}'", counter, entries.Count);
            var existing = existingData.FirstOrDefault(x => x.GetContentCompareKey() == entry.GetContentCompareKey());
            if (existing == null)
            {
                await vectorStoreCommand.Upsert(project.Id, source.Id, collection, entry);
            }
            else
            {
                OnNotifyProgress("Skipped as data is up to date");
                idsToKeep.Add(existing.Id);
            }
        }

        var idsToDelete = existingData.Select(x => x.Id).Except(idsToKeep).ToList();
        if (idsToDelete.Count != 0)
        {
            OnNotifyProgress("Removing entities that are no longer in source");
            await collection.DeleteBatchAsync(idsToDelete);
        }

        OnNotifyProgress("Done");
    }
}