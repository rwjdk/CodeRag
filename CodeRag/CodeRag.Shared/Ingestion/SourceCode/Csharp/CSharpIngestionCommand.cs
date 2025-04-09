using System.Text;
using CodeRag.Shared.Ai.SemanticKernel;
using CodeRag.Shared.Chunking.CSharp;
using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.Ingestion.SourceCode;
using CodeRag.Shared.Interfaces;
using CodeRag.Shared.Models;
using CodeRag.Shared.VectorStore;
using CodeRag.Shared.VectorStore.SourceCode;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.Ingestion.SourceCode.Csharp;

[UsedImplicitly]
public class CSharpIngestionCommand(CSharpChunker chunker, SemanticKernelQuery semanticKernelQuery, IDbContextFactory<SqlDbContext> dbContextFactory) : ProgressNotificationBase, IScopedService
{
    public async Task Ingest(Project settings, bool deletePreviousDataInCollection)
    {
        switch (settings.CSharpSourceCodeIngestionSettings.Source)
        {
            case SourceCodeIngestionSource.LocalCSharpRepo:
                await IngestFromLocal(settings, deletePreviousDataInCollection);
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
    }

    private async Task IngestFromLocal(Project settings, bool deletePreviousDataInCollection)
    {
        CSharpIngestionSettings ingestionSettings = settings.CSharpSourceCodeIngestionSettings;
        VectorStoreSettings settingsVectorSettings = settings.VectorSettings;
        string[] sourceCodeFiles = Directory.GetFiles(ingestionSettings.SourcePath, "*.cs", SearchOption.AllDirectories);
        OnNotifyProgress($"Found {sourceCodeFiles.Length} files");
        ITextEmbeddingGenerationService embeddingGenerationService = semanticKernelQuery.GetTextEmbeddingGenerationService(settings.AzureOpenAiCredentials, settings.AzureOpenAiEmbeddingsDeploymentName);
        VectorStoreCommand vectorStoreCommand = new(embeddingGenerationService);
        VectorStoreQuery vectorStoreQuery = new(settingsVectorSettings, dbContextFactory);
        IVectorStoreRecordCollection<string, SourceCodeVectorEntity> collection = vectorStoreQuery.GetCollection<SourceCodeVectorEntity>(settingsVectorSettings.SourceCodeCollectionName);

        List<string> ignoredFiles = [];
        List<CSharpChunk> codeEntities = [];
        foreach (string sourceCodeFilePath in sourceCodeFiles)
        {
            string fileName = Path.GetFileName(sourceCodeFilePath);

            if (ingestionSettings.CSharpFilesToIgnore.Contains(fileName, StringComparer.InvariantCultureIgnoreCase) ||
                ingestionSettings.CSharpFilesWithTheseSuffixesToIgnore.Any(x => x.EndsWith(fileName, StringComparison.CurrentCultureIgnoreCase)) ||
                ingestionSettings.CSharpFilesWithThesePrefixesToIgnore.Any(x => x.StartsWith(fileName, StringComparison.CurrentCultureIgnoreCase)))
            {
                ignoredFiles.Add(fileName);
                continue;
            }

            string code = await File.ReadAllTextAsync(sourceCodeFilePath);
            List<CSharpChunk> entitiesForFile = chunker.GetCodeEntities(code);
            foreach (CSharpChunk codeEntity in entitiesForFile)
            {
                codeEntity.Filename = fileName;
            }

            codeEntities.AddRange(entitiesForFile);
        }

        if (ignoredFiles.Count > 0)
        {
            OnNotifyProgress($"{ignoredFiles.Count} Files Ignored");
        }

        OnNotifyProgress($"{sourceCodeFiles.Length - ignoredFiles.Count} Files was transformed into {codeEntities.Count} Code Entities for Vector Import");

        //Creating References
        foreach (CSharpChunk codeEntity in codeEntities)
        {
            switch (codeEntity.Kind)
            {
                case CSharpChunkKind.Enum:
                case CSharpChunkKind.Class:
                case CSharpChunkKind.Struct:
                case CSharpChunkKind.Record:
                    codeEntity.References = codeEntities.Where(x => x != codeEntity && x.Dependencies.Any(y => y == codeEntity.Name)).ToList();
                    break;
            }
        }

        await collection.CreateCollectionIfNotExistsAsync();

        if (deletePreviousDataInCollection)
        {
            string[] ids = await vectorStoreQuery.GetSourceCodeIdsForProject(settings.Id);
            await collection.DeleteBatchAsync(ids);
        }

        int counter = 0;
        foreach (CSharpChunk codeEntity in codeEntities)
        {
            counter++;

            OnNotifyProgress($"Processing {counter}/{codeEntities.Count}: {codeEntity.Path}");

            StringBuilder content = new();
            content.AppendLine($"// Namespace: {codeEntity.Namespace}");
            if (codeEntity.ParentKind != CSharpChunkKind.None)
            {
                content.AppendLine($"// {codeEntity.ParentKind}: {codeEntity.Parent}");
            }

            content.AppendLine($"// {codeEntity.KindAsString}: {codeEntity.Name}");
            content.AppendLine("// ---");
            content.AppendLine($"{codeEntity.XmlSummary + codeEntity.Content}");

            if (codeEntity.Dependencies.Count != 0)
            {
                content.AppendLine();
                content.AppendLine("//Dependencies:");
                content.AppendLine(string.Join(Environment.NewLine, codeEntity.Dependencies.Select(x => "- " + x)));
            }

            if (codeEntity.References != null && codeEntity.References.Count != 0)
            {
                content.AppendLine();
                content.AppendLine("//Used by:");
                content.AppendLine(string.Join(Environment.NewLine, codeEntity.References.Select(x => "- " + x.Path)));
            }

            SourceCodeVectorEntity entry = new()
            {
                Id = Guid.NewGuid().ToString(),
                Kind = codeEntity.KindAsString,
                Namespace = codeEntity.Namespace,
                Name = codeEntity.Name,
                Source = codeEntity.Filename!,
                Link = $"{settings.RepoUrlSourceCode}/{codeEntity.Filename}",
                Content = content.ToString(),
            };

            await vectorStoreCommand.Upsert(settings.Id, collection, entry);
        }

        OnNotifyProgress("Done");
    }
}