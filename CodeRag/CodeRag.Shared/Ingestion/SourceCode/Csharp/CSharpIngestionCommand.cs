using System.Text;
using Azure;
using CodeRag.Shared.Ai.SemanticKernel;
using CodeRag.Shared.Chunking.CSharp;
using CodeRag.Shared.Configuration;
using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.Interfaces;
using CodeRag.Shared.VectorStore;
using CodeRag.Shared.VectorStore.SourceCode;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Embeddings;
using Octokit;
using Project = CodeRag.Shared.Configuration.Project;

namespace CodeRag.Shared.Ingestion.SourceCode.Csharp;

[UsedImplicitly]
public class CSharpIngestionCommand(CSharpChunker chunker, SemanticKernelQuery semanticKernelQuery, IDbContextFactory<SqlDbContext> dbContextFactory) : IngestionCommand, IScopedService
{
    public override async Task Ingest(Project project, ProjectSource source)
    {
        List<CSharpChunk> codeEntities;
        switch (source.Location)
        {
            case ProjectSourceLocation.GitHub:
                codeEntities = await GetCodeEntitiesFromPublicGithubRepo(project, source);
                break;
            case ProjectSourceLocation.Local:
                codeEntities = await GetCodeEntitiesFromLocalSourceCode(source);
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        ITextEmbeddingGenerationService embeddingGenerationService = semanticKernelQuery.GetTextEmbeddingGenerationService(project);
        VectorStoreCommand vectorStoreCommand = new(embeddingGenerationService);
        SqlServerVectorStoreQuery vectorStoreQuery = new(project.SqlServerVectorStoreConnectionString, dbContextFactory);
        IVectorStoreRecordCollection<Guid, CSharpCodeEntity> collection = vectorStoreQuery.GetCollection<CSharpCodeEntity>(Constants.VectorCollections.CSharpCodeVectorCollection);

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
        var existingData = await vectorStoreQuery.GetCSharpCode(project.Id, source.Id);

        int counter = 0;
        List<Guid> idsToKeep = [];
        foreach (CSharpChunk codeEntity in codeEntities)
        {
            counter++;

            OnNotifyProgress($"Processing: {codeEntity.Path}", counter, codeEntities.Count);

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

    private async Task<List<CSharpChunk>> GetCodeEntitiesFromLocalSourceCode(ProjectSource source)
    {
        List<CSharpChunk> codeEntities = [];
        if (string.IsNullOrWhiteSpace(source.Path))
        {
            OnNotifyProgress($"Source Path is empty so no files retrieved");
            return codeEntities;
        }

        string[] sourceCodeFiles = Directory.GetFiles(source.Path, "*.cs", SearchOption.AllDirectories);
        OnNotifyProgress($"Found {sourceCodeFiles.Length} files");
        List<string> ignoredFiles = [];
        foreach (string sourceCodeFilePath in sourceCodeFiles)
        {
            if (IgnoreFile(source, sourceCodeFilePath))
            {
                ignoredFiles.Add(sourceCodeFilePath);
                continue;
            }

            var sourcePath = sourceCodeFilePath.Replace(source.Path, string.Empty);
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
        return codeEntities;
    }

    private async Task<List<CSharpChunk>> GetCodeEntitiesFromPublicGithubRepo(Project project, ProjectSource source)
    {
        List<CSharpChunk> codeEntities = [];
        GitHubClient client = new GitHubClient(new ProductHeaderValue("CodeRag"))
        {
            Credentials = new Credentials(project.GitHubToken)
        };

        var repo = await client.Repository.Get(source.GitHubOwner, source.GitHubRepo);
        var defaultBranch = repo.DefaultBranch; //todo - support other branches

        var reference = await client.Git.Reference.Get(source.GitHubOwner, source.GitHubRepo, $"heads/{defaultBranch}");
        var commit = await client.Git.Commit.Get(source.GitHubOwner, source.GitHubRepo, reference.Object.Sha);
        var tree = await client.Git.Tree.GetRecursive(source.GitHubOwner, source.GitHubRepo, commit.Tree.Sha);
        string prefix = source.Path;
        if (!prefix.EndsWith("/"))
        {
            prefix += "/";
        }

        var sourceCodeFiles = tree.Tree.Where(x => x.Type == TreeType.Blob && x.Path.StartsWith(prefix) && x.Path.EndsWith(".cs")).ToArray();
        OnNotifyProgress($"Found {sourceCodeFiles.Length} files");
        List<string> ignoredFiles = [];
        int downloadCounter = 0;
        foreach (string sourceCodeFilePath in sourceCodeFiles.Select(x => x.Path)) //todo - should download of all files not happen upfront, but on the fly to reduce rate limiting and allow partial imports
        {
            downloadCounter++;
            if (IgnoreFile(source, sourceCodeFilePath))
            {
                ignoredFiles.Add(sourceCodeFilePath);
                continue;
            }

            OnNotifyProgress($"{downloadCounter}/{sourceCodeFiles.Length} - Downloading '{sourceCodeFilePath}' from GitHub");
            var sourcePath = sourceCodeFilePath.Replace(source.Path, string.Empty);
            byte[]? fileContent = await client.Repository.Content.GetRawContent(source.GitHubOwner, source.GitHubRepo, sourceCodeFilePath);
            if (fileContent == null)
            {
                continue;
            }

            string code = Encoding.UTF8.GetString(fileContent);
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
        return codeEntities;
    }

    private bool IgnoreFile(ProjectSource source, string path)
    {
        //todo - replace with a general ignore pattern system
        string fileName = Path.GetFileName(path);
        if (source.FilesToIgnore != null && source.FilesToIgnore.Contains(fileName, StringComparer.InvariantCultureIgnoreCase))
        {
            return true;
        }

        if (source.FilesWithTheseSuffixesToIgnore != null && source.FilesWithTheseSuffixesToIgnore.Any(x => x.EndsWith(fileName, StringComparison.CurrentCultureIgnoreCase)))
        {
            return true;
        }

        if (source.FilesWithThesePrefixesToIgnore != null && source.FilesWithThesePrefixesToIgnore.Any(x => x.StartsWith(fileName, StringComparison.CurrentCultureIgnoreCase)))
        {
            return true;
        }

        return false;
    }
}