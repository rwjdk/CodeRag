using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Embeddings;
using System.Text.RegularExpressions;
using System.Text;
using CodeRag.Shared.VectorStore;
using CodeRag.Shared.Ai.SemanticKernel;
using CodeRag.Shared.VectorStore.Documentation;
using CodeRag.Shared.Chunking.Markdown;
using CodeRag.Shared.Interfaces;
using CodeRag.Shared.EntityFramework;
using Microsoft.EntityFrameworkCore;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.Configuration;

namespace CodeRag.Shared.Ingestion.Documentation.Markdown;

[UsedImplicitly]
public class MarkdownIngestionCommand(MarkdownChunker chunker, SemanticKernelQuery semanticKernelQuery, IDbContextFactory<SqlDbContext> dbContextFactory) : ProgressNotificationBase, IScopedService
{
    public async Task Ingest(Project project, DocumentationSource source)
    {
        ITextEmbeddingGenerationService embeddingGenerationService = semanticKernelQuery.GetTextEmbeddingGenerationService(project);
        VectorStoreCommand vectorStoreCommand = new(embeddingGenerationService);
        SqlServerVectorStoreQuery vectorStoreQuery = new(project.SqlServerVectorStoreConnectionString, dbContextFactory);
        IVectorStoreRecordCollection<Guid, DocumentationVectorEntity> collection = vectorStoreQuery.GetCollection<DocumentationVectorEntity>(Constants.VectorCollections.MarkdownVectorCollection);

        await collection.CreateCollectionIfNotExistsAsync();

        switch (source.Type)
        {
            case DocumentationSourceType.GitHubCodeWiki:
                await IngestMarkdown(project, source, vectorStoreQuery, vectorStoreCommand, collection);
                break;
            case DocumentationSourceType.CodeRepoRootMarkdown:
                await IngestCodeRepoRootMarkdown(project, source, vectorStoreCommand, collection);
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        OnNotifyProgress("Done");
    }

    private async Task IngestCodeRepoRootMarkdown(Project project, DocumentationSource source, VectorStoreCommand vectorStoreCommand, IVectorStoreRecordCollection<Guid, DocumentationVectorEntity> collection)
    {
        if (!string.IsNullOrWhiteSpace(source.SourcePath))
        {
            await IngestRootKnownMdFiles(project, source, vectorStoreCommand, collection);
        }
    }

    private async Task IngestMarkdown(Project project, DocumentationSource source, SqlServerVectorStoreQuery vectorStoreQuery, VectorStoreCommand vectorStoreCommand, IVectorStoreRecordCollection<Guid, DocumentationVectorEntity> collection)
    {
        string[] paths = Directory.GetFiles(source.SourcePath, "*.md", SearchOption.AllDirectories);
        List<string> filesToIgnore = source.FilesToIgnore;
        List<DocumentationVectorEntity> entries = [];

        foreach (string path in paths)
        {
            var sourcePath = path.Replace(source.SourcePath, string.Empty);
            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(path);
            if (filesToIgnore.Contains(fileNameWithoutExtension))
            {
                continue;
            }

            string content = await File.ReadAllTextAsync(path, Encoding.UTF8);

            if (source.IgnoreCommentedOutContent)
            {
                //Remove Any Commented out parts
                content = Regex.Replace(content, "<!--[\\s\\S]*?-->", string.Empty);
            }

            if (source.IgnoreImages)
            {
                //Remove Any Images
                content = Regex.Replace(content, @"!\[.*?\]\(.*?\)", string.Empty);
            }

            if (source.IgnoreMicrosoftLearnNoneCsharpContent)
            {
                //Todo - more granular
                content = Regex.Replace(content, "\\A---\\s*[\\s\\S]*?\\s*---\\s*", string.Empty); //Top MD Section //todo: check if this is too aggressive
                content = Regex.Replace(content, ":::\\s*zone\\s+pivot=\"programming-language-python\"\\s*[\\s\\S]*?\\s*:::\\s*zone-end", string.Empty); //todo - SK Python Section - make configurable
                content = Regex.Replace(content, ":::\\s*zone\\s+pivot=\"programming-language-java\"\\s*[\\s\\S]*?\\s*:::\\s*zone-end", string.Empty); //todo - SK Java Section - make configurable
                content = Regex.Replace(content, @"^::: zone pivot=""programming-language-csharp"".*$|^::: zone-end.*$", "", RegexOptions.Multiline);
            }

            content = Regex.Replace(content, @"\r\n[\r\n]+|\r[\r]+|\n[\n]+", Environment.NewLine + Environment.NewLine);
            content = content.Trim();

            var numberOfLine = content.Split([source.LineSplitter], StringSplitOptions.RemoveEmptyEntries).Length;

            if (numberOfLine > source.OnlyChunkIfMoreThanThisNumberOfLines)
            {
                //Chunk larger files
                MarkdownChunk[] chunks = chunker.GetChunks(content,
                    source.LineSplitter,
                    source.MarkdownLevelsToChunk,
                    source.ChunkLineContainsToIgnore,
                    source.ChunkLinePrefixesToIgnore,
                    source.ChunkLineRegExPatternsToIgnore,
                    source.IgnoreCommentedOutContent,
                    source.IgnoreImages,
                    source.ChunkIgnoreIfLessThanThisAmountOfChars);

                entries.AddRange(chunks.Select(x => new DocumentationVectorEntity
                {
                    Content = x.Name + Environment.NewLine + "---" + Environment.NewLine + x.Content,
                    SourcePath = sourcePath,
                    ChunkId = x.ChunkId,
                    Name = x.Name,
                }));
            }
            else
            {
                entries.Add(new DocumentationVectorEntity
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
    }

    private async Task IngestRootKnownMdFiles(Project project, DocumentationSource source, VectorStoreCommand vectorStoreCommand, IVectorStoreRecordCollection<Guid, DocumentationVectorEntity> collection)
    {
        OnNotifyProgress("Ingesting Source Root MD Files");
        string[] rootFiles = Directory.GetFiles(source.SourcePath);
        await IngestSpecialFile("README");
        await IngestSpecialFile("LICENSE");
        await IngestSpecialFile("SECURITY");

        async Task IngestSpecialFile(string id)
        {
            string? path = rootFiles.FirstOrDefault(x => Path.GetFileNameWithoutExtension(x).Equals(id, StringComparison.InvariantCultureIgnoreCase));
            if (!string.IsNullOrWhiteSpace(path))
            {
                Console.WriteLine($"Processing {id}");
                var sourcePath = path.Replace(source.SourcePath, string.Empty);

                await vectorStoreCommand.Upsert(project.Id, source.Id, collection, new DocumentationVectorEntity
                {
                    Content = id + Environment.NewLine + "---" + Environment.NewLine + await File.ReadAllTextAsync(path),
                    Name = id,
                    SourcePath = sourcePath,
                });
            }
        }

        OnNotifyProgress("Done");
    }
}