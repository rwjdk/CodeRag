using CodeRag.Shared.Models;
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

namespace CodeRag.Shared.Ingestion.Documentation.Markdown;

[UsedImplicitly]
public class MarkdownIngestionCommand(MarkdownChunker chunker, SemanticKernelQuery semanticKernelQuery, IDbContextFactory<SqlDbContext> dbContextFactory) : ProgressNotificationBase, IScopedService
{
    //todo - should multiple sources be supported at the same time (I so we need a column in table to identify source and only delete for that source)?
    public async Task Ingest(Project settings, bool deletePreviousDataInCollection)
    {
        switch (settings.MarkdownIngestionSettings.Source)
        {
            case DocumentationIngestionSource.LocalMarkdown:
                await IngestFromLocal(settings, deletePreviousDataInCollection);
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
    }

    private async Task IngestFromLocal(Project settings, bool deletePreviousDataInCollection)
    {
        MarkdownIngestionSettings ingestionSettings = settings.MarkdownIngestionSettings;
        VectorStoreSettings settingsVectorSettings = settings.VectorSettings;
        ITextEmbeddingGenerationService embeddingGenerationService = semanticKernelQuery.GetTextEmbeddingGenerationService(settings.AzureOpenAiCredentials, settings.AzureOpenAiEmbeddingsDeploymentName);
        VectorStoreCommand vectorStoreCommand = new(embeddingGenerationService);
        VectorStoreQuery vectorStoreQuery = new(settingsVectorSettings, dbContextFactory);
        IVectorStoreRecordCollection<string, DocumentationVectorEntity> collection = vectorStoreQuery.GetCollection<DocumentationVectorEntity>(settingsVectorSettings.DocumentationCollectionName);

        await collection.CreateCollectionIfNotExistsAsync();

        if (deletePreviousDataInCollection)
        {
            string[] ids = await vectorStoreQuery.GetDocumentationIdsForProject(settings.Id);
            await collection.DeleteBatchAsync(ids);
        }

        if (ingestionSettings.IncludeMarkdownInSourceCodeRepoRoot && !string.IsNullOrWhiteSpace(settings.LocalSourceCodeRepoRoot))
        {
            await IngestRootKnownMdFiles(settings, vectorStoreCommand, collection);
        }

        string[] mdFilePaths = Directory.GetFiles(ingestionSettings.SourcePath, "*.md", SearchOption.AllDirectories);
        List<string> filesToIgnore = ingestionSettings.FilesToIgnore;
        int counter = 0;
        foreach (string mdFilePath in mdFilePaths)
        {
            counter++;
            string fileName = Path.GetFileName(mdFilePath);
            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(mdFilePath);
            if (filesToIgnore.Contains(fileNameWithoutExtension))
            {
                continue;
            }

            Console.WriteLine($"{counter}/{mdFilePaths.Length} processing: '{fileNameWithoutExtension}'");

            string url = ingestionSettings.RootUrl;
            if (ingestionSettings.FilenameEqualDocUrlSubpage)
            {
                url += $"/{fileNameWithoutExtension}";
            }

            string content = await File.ReadAllTextAsync(mdFilePath, Encoding.UTF8);

            if (ingestionSettings.IgnoreCommentedOutContent)
            {
                //Remove Any Commented out parts
                content = Regex.Replace(content, "<!--[\\s\\S]*?-->", string.Empty);
            }

            if (ingestionSettings.IgnoreImages)
            {
                //Remove Any Images
                content = Regex.Replace(content, @"!\[.*?\]\(.*?\)", string.Empty);
            }

            if (ingestionSettings.IgnoreMicrosoftLearnNoneCsharpContent)
            {
                //Todo - more granular
                content = Regex.Replace(content, "\\A---\\s*[\\s\\S]*?\\s*---\\s*", string.Empty); //Top MD Section //todo: check if this is too aggressive
                content = Regex.Replace(content, ":::\\s*zone\\s+pivot=\"programming-language-python\"\\s*[\\s\\S]*?\\s*:::\\s*zone-end", string.Empty); //todo - SK Python Section - make configurable
                content = Regex.Replace(content, ":::\\s*zone\\s+pivot=\"programming-language-java\"\\s*[\\s\\S]*?\\s*:::\\s*zone-end", string.Empty); //todo - SK Java Section - make configurable
                content = Regex.Replace(content, @"^::: zone pivot=""programming-language-csharp"".*$|^::: zone-end.*$", "", RegexOptions.Multiline);
            }

            content = Regex.Replace(content, @"\r\n[\r\n]+|\r[\r]+|\n[\n]+", Environment.NewLine + Environment.NewLine);
            content = content.Trim();

            var numberOfLine = content.Split([ingestionSettings.LineSplitter], StringSplitOptions.RemoveEmptyEntries).Length;

            if (numberOfLine > ingestionSettings.OnlyChunkIfMoreThanThisNumberOfLines)
            {
                OnNotifyProgress($"Chunking {fileName}");
                //Chunk larger files
                MarkdownChunk[] chunks = chunker.GetChunks(content,
                    ingestionSettings.LineSplitter,
                    ingestionSettings.MarkdownLevelsToChunk,
                    ingestionSettings.ChunkLineContainsToIgnore,
                    ingestionSettings.ChunkLinePrefixesToIgnore,
                    ingestionSettings.ChunkLineRegExPatternsToIgnore,
                    ingestionSettings.IgnoreCommentedOutContent,
                    ingestionSettings.IgnoreImages,
                    ingestionSettings.ChunkIgnoreIfLessThanThisAmountOfChars);
                foreach (MarkdownChunk chunk in chunks)
                {
                    if (!string.IsNullOrWhiteSpace(chunk.Content))
                    {
                        OnNotifyProgress($"- Chunk: '{chunk.Id}'");
                        if (ingestionSettings.FilenameEqualDocUrlSubpage)
                        {
                            url = $"{url}#{chunk}";
                        }

                        await Upsert(chunk.Content, chunk.Title, fileName, url);
                    }
                }
            }
            else
            {
                OnNotifyProgress($"File {fileName}");
                await Upsert(content, fileNameWithoutExtension, fileName, url);
            }
        }

        async Task Upsert(string content, string title, string source, string url)
        {
            DocumentationVectorEntity documentationVectorEntity = new()
            {
                Id = Guid.NewGuid().ToString(),
                Content = title + Environment.NewLine + "---" + Environment.NewLine + content,
                Source = source,
                Name = title,
                Link = url
            };
            await vectorStoreCommand.Upsert(settings.Id, collection, documentationVectorEntity);
        }

        OnNotifyProgress("Done");
    }

    private async Task IngestRootKnownMdFiles(Project settings, VectorStoreCommand vectorStoreCommand, IVectorStoreRecordCollection<string, DocumentationVectorEntity> collection)
    {
        OnNotifyProgress("Ingesting Source Root MD Files");
        string[] rootFiles = Directory.GetFiles(settings.LocalSourceCodeRepoRoot!);
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
                await vectorStoreCommand.Upsert(settings.Id, collection, new DocumentationVectorEntity
                {
                    Id = "ROOT_FILE_" + id,
                    Content = id + Environment.NewLine + "---" + Environment.NewLine + await File.ReadAllTextAsync(path),
                    Name = id,
                    Source = fileName,
                    Link = settings.RepoUrl + "/" + fileName
                });
            }
        }
    }
}