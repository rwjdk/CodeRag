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

namespace CodeRag.Shared.Ingestion.Documentation.Markdown;

[UsedImplicitly]
public class MarkdownIngestionCommand(MarkdownChunker chunker, SemanticKernelQuery semanticKernelQuery, IDbContextFactory<SqlDbContext> dbContextFactory) : ProgressNotificationBase, IScopedService
{
    public async Task Ingest(Project project, DocumentationSource source, bool reInitializeSource)
    {
        ITextEmbeddingGenerationService embeddingGenerationService = semanticKernelQuery.GetTextEmbeddingGenerationService(project);
        VectorStoreCommand vectorStoreCommand = new(embeddingGenerationService);
        SqlServerVectorStoreQuery vectorStoreQuery = new(project.SqlServerVectorStoreConnectionString, dbContextFactory);
        IVectorStoreRecordCollection<string, DocumentationVectorEntity> collection = vectorStoreQuery.GetCollection<DocumentationVectorEntity>(Constants.VectorCollections.MarkdownVectorCollection);

        await collection.CreateCollectionIfNotExistsAsync();

        if (reInitializeSource)
        {
            string[] ids = await vectorStoreQuery.GetDocumentationIds(project.Id, source.Id);
            await collection.DeleteBatchAsync(ids);
        }

        switch (source.Type)
        {
            case DocumentationSourceType.GitHubCodeWiki:
                string[] paths = Directory.GetFiles(source.SourcePath, "*.md", SearchOption.AllDirectories);
                List<string> filesToIgnore = source.FilesToIgnore;
                int counter = 0;
                foreach (string path in paths)
                {
                    counter++;
                    string fileName = Path.GetFileName(path);
                    var sourcePath = path.Replace(source.SourcePath, string.Empty);
                    string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(path);
                    if (filesToIgnore.Contains(fileNameWithoutExtension))
                    {
                        continue;
                    }

                    OnNotifyProgress($"{counter}/{paths.Length} processing: '{fileNameWithoutExtension}'");

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
                        OnNotifyProgress($"Chunking {fileName}");
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
                        foreach (MarkdownChunk chunk in chunks)
                        {
                            if (!string.IsNullOrWhiteSpace(chunk.Content))
                            {
                                OnNotifyProgress($"- Chunk: '{chunk.Id}'");
                                await Upsert(chunk.Content, chunk.Title, sourcePath, chunk.Id);
                            }
                        }
                    }
                    else
                    {
                        OnNotifyProgress($"File {fileName}");
                        await Upsert(content, fileNameWithoutExtension, sourcePath);
                    }
                }

                break;
            case DocumentationSourceType.CodeRepoRootMarkdown:
                if (!string.IsNullOrWhiteSpace(source.SourcePath))
                {
                    await IngestRootKnownMdFiles(project, source, vectorStoreCommand, collection);
                }
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }


        async Task Upsert(string content, string title, string sourcePath, string? chunkId = null)
        {
            DocumentationVectorEntity documentationVectorEntity = new()
            {
                Content = title + Environment.NewLine + "---" + Environment.NewLine + content,
                SourcePath = sourcePath,
                ChunkId = chunkId,
                Name = title,
            };
            await vectorStoreCommand.Upsert(project.Id, source.Id, collection, documentationVectorEntity);
        }

        OnNotifyProgress("Done");
    }

    private async Task IngestRootKnownMdFiles(Project project, DocumentationSource source, VectorStoreCommand vectorStoreCommand, IVectorStoreRecordCollection<string, DocumentationVectorEntity> collection)
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
                string fileName = Path.GetFileName(path);
                var sourcePath = path.Replace(source.SourcePath, string.Empty);

                await vectorStoreCommand.Upsert(project.Id, source.Id, collection, new DocumentationVectorEntity
                {
                    Content = id + Environment.NewLine + "---" + Environment.NewLine + await File.ReadAllTextAsync(path),
                    Name = id,
                    SourcePath = fileName,
                });
            }
        }
    }
}