using CodeRag.Shared.BusinessLogic.Ai;
using CodeRag.Shared.BusinessLogic.Chunking;
using CodeRag.Shared.BusinessLogic.Chunking.Models;
using CodeRag.Shared.BusinessLogic.CodeIngestion.Models;
using CodeRag.Shared.BusinessLogic.VectorStore;
using CodeRag.Shared.BusinessLogic.VectorStore.Models;
using Microsoft.Extensions.VectorData;
using System.Text;
using Microsoft.SemanticKernel.Embeddings;

namespace CodeRag.Shared.BusinessLogic.CodeIngestion;

public class CodeIngestionCommand(CSharpCodeChunker chunker, SemanticKernelQuery semanticKernelQuery) : ProgressNotificationBase
{
    public async Task Ingest(CodeIngestionSettings settings)
    {
        switch (settings.Source)
        {
            case CodeIngestionSource.LocalSourceCode:
                await IngestFromLocalSourceCode(settings);
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
    }

    private async Task IngestFromLocalSourceCode(CodeIngestionSettings settings)
    {
        string[] sourceCodeFiles = Directory.GetFiles(settings.SourcePath, "*.cs", SearchOption.AllDirectories);
        OnNotifyProgress($"Found {sourceCodeFiles.Length} files");
        ITextEmbeddingGenerationService embeddingGenerationService = semanticKernelQuery.GetTextEmbeddingGenerationService(settings.AzureOpenAiCredentials, settings.AzureOpenAiEmbeddingDeploymentName);
        VectorStoreCommand vectorStoreCommand = new(embeddingGenerationService);
        VectorStoreQuery vectorStoreQuery = new(settings.Target);
        IVectorStoreRecordCollection<string, SourceCodeVectorEntity> collection = vectorStoreQuery.GetCollection<SourceCodeVectorEntity>();

        List<string> ignoredFiles = [];
        List<CodeEntity> codeEntities = [];
        foreach (string sourceCodeFilePath in sourceCodeFiles)
        {
            string fileName = Path.GetFileName(sourceCodeFilePath);

            if (settings.CSharpFilesToIgnore.Contains(fileName, StringComparer.InvariantCultureIgnoreCase) ||
                settings.CSharpFilesWithTheseSuffixesToIgnore.Any(x => x.EndsWith(fileName, StringComparison.CurrentCultureIgnoreCase)) ||
                settings.CSharpFilesWithThesePrefixesToIgnore.Any(x => x.StartsWith(fileName, StringComparison.CurrentCultureIgnoreCase)))
            {
                ignoredFiles.Add(fileName);
                continue;
            }

            string code = await File.ReadAllTextAsync(sourceCodeFilePath);
            List<CodeEntity> entitiesForFile = chunker.GetCodeEntities(code);
            foreach (CodeEntity codeEntity in entitiesForFile)
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
        foreach (CodeEntity codeEntity in codeEntities)
        {
            switch (codeEntity.Kind)
            {
                case CodeEntityKind.Enum:
                case CodeEntityKind.Class:
                case CodeEntityKind.Struct:
                case CodeEntityKind.Record:
                    codeEntity.References = codeEntities.Where(x => x != codeEntity && x.Dependencies.Any(y => y == codeEntity.Name)).ToList();
                    break;
            }
        }

        //todo - add support 

        if (settings.DeletePreviousDataInCollection)
        {
            await collection.DeleteCollectionAsync();
        }

        await collection.CreateCollectionIfNotExistsAsync();
        int counter = 0;
        foreach (CodeEntity codeEntity in codeEntities)
        {
            counter++;

            OnNotifyProgress($"Processing {counter}/{codeEntities.Count}: {codeEntity.Path}");

            StringBuilder content = new();
            content.AppendLine($"// Namespace: {codeEntity.Namespace}");
            if (codeEntity.ParentKind != CodeEntityKind.None)
            {
                content.AppendLine($"// {codeEntity.ParentKind}: {codeEntity.Parent}");
            }

            content.AppendLine($"// {codeEntity.KindAsString}: {codeEntity.Name}");
            content.AppendLine("// ---");
            content.AppendLine($"{codeEntity.XmlSummary + codeEntity.Content}");
            if (codeEntity.References != null && codeEntity.References.Count != 0)
            {
                content.AppendLine("//---");
                content.AppendLine("//Usage References:");
                content.AppendLine(string.Join(Environment.NewLine, codeEntity.References.Select(x => "- " + x.Path)));
            }

            SourceCodeVectorEntity entry = new()
            {
                Kind = codeEntity.KindAsString,
                Namespace = codeEntity.Namespace,
                Name = codeEntity.Name,
                Filename = codeEntity.Filename, //todo
                Content = content.ToString(),
            };

            await vectorStoreCommand.Upsert(collection, entry);
        }

        OnNotifyProgress("Done");
    }
}