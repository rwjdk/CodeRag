using System.Text;
using CodeRag.Shared.Ai.SemanticKernel;
using CodeRag.Shared.Chunking.CSharp;
using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.Ingestion.SourceCode;
using CodeRag.Shared.Interfaces;
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
    public async Task Ingest(Project project, CodeSource source, bool deletePreviousDataInCollection)
    {
        string[] sourceCodeFiles = Directory.GetFiles(source.SourcePath, "*.cs", SearchOption.AllDirectories);
        OnNotifyProgress($"Found {sourceCodeFiles.Length} files");
        ITextEmbeddingGenerationService embeddingGenerationService = semanticKernelQuery.GetTextEmbeddingGenerationService(project);
        VectorStoreCommand vectorStoreCommand = new(embeddingGenerationService);
        SqlServerVectorStoreQuery vectorStoreQuery = new(project.SqlServerVectorStoreConnectionString, dbContextFactory);
        IVectorStoreRecordCollection<string, CSharpCodeEntity> collection = vectorStoreQuery.GetCollection<CSharpCodeEntity>(Constants.VectorCollections.CSharpCodeVectorCollection);

        List<string> ignoredFiles = [];
        List<CSharpChunk> codeEntities = [];
        foreach (string sourceCodeFilePath in sourceCodeFiles)
        {
            string fileName = Path.GetFileName(sourceCodeFilePath);

            if (source.FilesToIgnore.Contains(fileName, StringComparer.InvariantCultureIgnoreCase) ||
                source.FilesWithTheseSuffixesToIgnore.Any(x => x.EndsWith(fileName, StringComparison.CurrentCultureIgnoreCase)) ||
                source.FilesWithThesePrefixesToIgnore.Any(x => x.StartsWith(fileName, StringComparison.CurrentCultureIgnoreCase)))
            {
                ignoredFiles.Add(fileName);
                continue;
            }

            var sourcePath = sourceCodeFilePath.Replace(source.SourcePath, string.Empty);
            string code = await File.ReadAllTextAsync(sourceCodeFilePath);
            List<CSharpChunk> entitiesForFile = chunker.GetCodeEntities(code);
            foreach (CSharpChunk codeEntity in entitiesForFile)
            {
                codeEntity.LocalSourcePath = sourcePath;
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
                case CSharpKind.Enum:
                case CSharpKind.Class:
                case CSharpKind.Struct:
                case CSharpKind.Record:
                    codeEntity.References = codeEntities.Where(x => x != codeEntity && x.Dependencies.Any(y => y == codeEntity.Name)).ToList();
                    break;
            }
        }

        await collection.CreateCollectionIfNotExistsAsync();

        if (deletePreviousDataInCollection)
        {
            string[] ids = await vectorStoreQuery.GetCSharpCodeIds(project.Id, source.Id);
            await collection.DeleteBatchAsync(ids);
        }

        int counter = 0;
        foreach (CSharpChunk codeEntity in codeEntities)
        {
            counter++;

            OnNotifyProgress($"Processing {counter}/{codeEntities.Count}: {codeEntity.Path}");

            StringBuilder content = new();
            content.AppendLine($"// Namespace: {codeEntity.Namespace}");
            if (codeEntity.ParentKind != CSharpKind.None)
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

            CSharpCodeEntity entry = new()
            {
                Kind = codeEntity.KindAsString,
                Namespace = codeEntity.Namespace,
                Name = codeEntity.Name,
                Parent = codeEntity.Parent,
                ParentKind = codeEntity.ParentKindAsString,
                XmlSummary = codeEntity.XmlSummary,
                SourcePath = codeEntity.LocalSourcePath!,
                Content = content.ToString(),
            };

            await vectorStoreCommand.Upsert(project.Id, source.Id, collection, entry);
        }

        OnNotifyProgress("Done");
    }
}