using System.Text;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Octokit;
using Shared.Chunking.CSharp;
using Shared.EntityFramework.DbModels;
using Shared.GitHub;
using Shared.VectorStore;

namespace Shared.Ingestion;

/// <summary>
/// Command for Ingesting C# into a VectorStore
/// </summary>
/// <param name="chunker">The C# Chunker</param>
/// <param name="vectorStoreCommand">The Command for adding data to the Vector Store</param>
/// <param name="vectorStoreQuery">The Query for looking up existing VectorStore Entries</param>
/// <param name="gitHubQuery">GitHubQuery for when Project Source Location is GitHub and not local paths</param>
[UsedImplicitly]
public class CSharpIngestionCommand(CSharpChunker chunker, VectorStoreCommand vectorStoreCommand, VectorStoreQuery vectorStoreQuery, GitHubQuery gitHubQuery) : IngestionCommand(vectorStoreCommand), IScopedService
{
    /// <summary>
    /// Processes ingestion for the given project and source
    /// </summary>
    /// <param name="project">The project to ingest data into</param>
    /// <param name="source">The source of the project data to ingest</param>
    /// <returns>A task representing the ingestion operation</returns>
    public override async Task IngestAsync(ProjectEntity project, ProjectSourceEntity source)
    {
        if (source.Kind != ProjectSourceKind.CSharpCode)
        {
            throw new IngestionException($"Invalid Kind. Expected '{nameof(ProjectSourceKind.CSharpCode)}' but received {source.Kind}");
        }

        List<CSharpChunk> codeEntities;

        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new IngestionException("Source Path is not defined");
        }

        switch (source.Location)
        {
            case ProjectSourceLocation.GitHub:
                codeEntities = await GetCodeEntitiesFromPublicGithubRepo(project, source);
                break;
            case ProjectSourceLocation.Local:
                codeEntities = await GetCodeEntitiesFromLocalSourceCode(source);
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(source.Location));
        }

        IVectorStoreRecordCollection<Guid, VectorEntity> collection = vectorStoreQuery.GetCollection();

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
        var existingData = await vectorStoreQuery.GetExistingAsync(project.Id, source.Id);

        int counter = 0;
        List<Guid> idsToKeep = [];
        foreach (CSharpChunk codeEntity in codeEntities)
        {
            counter++;

            OnNotifyProgress("Step 2: Embedding Data if Content have changed", counter, codeEntities.Count);

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

            VectorEntity entry = new()
            {
                Kind = codeEntity.KindAsString,
                Namespace = codeEntity.Namespace,
                Name = codeEntity.Name,
                Parent = codeEntity.Parent,
                ParentKind = codeEntity.ParentKindAsString,
                Summary = codeEntity.XmlSummary,
                SourcePath = codeEntity.LocalSourcePath!,
                Content = content.ToString(),
            };

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
            OnNotifyProgress("Removing entities that are no longer in source...");
            await collection.DeleteBatchAsync(idsToDelete);
        }

        OnNotifyProgress("Done");
    }

    private async Task<List<CSharpChunk>> GetCodeEntitiesFromLocalSourceCode(ProjectSourceEntity source)
    {
        List<CSharpChunk> codeEntities = [];
        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new IngestionException("Path is not defined");
        }

        string[] sourceCodeFiles = Directory.GetFiles(source.Path, "*.cs", source.Recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly);
        OnNotifyProgress($"Found {sourceCodeFiles.Length} files");
        List<string> ignoredFiles = [];
        int counter = 0;
        foreach (string sourceCodeFilePath in sourceCodeFiles)
        {
            if (source.IgnoreFile(sourceCodeFilePath))
            {
                ignoredFiles.Add(sourceCodeFilePath);
                continue;
            }

            counter++;
            OnNotifyProgress("Step 1: Parsing Local files from Disk", counter, sourceCodeFiles.Length);
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

        OnNotifyProgress($"{sourceCodeFiles.Length - ignoredFiles.Count} Files was transformed into {codeEntities.Count} Code Entities for Vector Import. Preparing Embedding step...");
        return codeEntities;
    }

    private async Task<List<CSharpChunk>> GetCodeEntitiesFromPublicGithubRepo(ProjectEntity project, ProjectSourceEntity source)
    {
        List<CSharpChunk> codeEntities = [];
        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new IngestionException("Path is not defined");
        }

        if (string.IsNullOrWhiteSpace(project.GitHubOwner) || string.IsNullOrWhiteSpace(project.GitHubRepo))
        {
            throw new IngestionException("GitHub Owner and Repo is not defined");
        }

        var gitHubClient = gitHubQuery.GetGitHubClient();
        var treeResponse = await gitHubQuery.GetTreeAsync(gitHubClient, project.GitHubOwner, project.GitHubRepo, source.Recursive);

        string prefix = source.Path;
        if (!prefix.EndsWith("/"))
        {
            prefix += "/";
        }

        var sourceCodeFiles = treeResponse.Tree.Where(x => x.Type == TreeType.Blob && x.Path.StartsWith(prefix) && x.Path.EndsWith(".cs")).ToArray();
        OnNotifyProgress($"Found {sourceCodeFiles.Length} files");
        List<string> ignoredFiles = [];
        int counter = 0;
        foreach (string sourceCodeFilePath in sourceCodeFiles.Select(x => x.Path))
        {
            counter++;
            if (source.IgnoreFile(sourceCodeFilePath))
            {
                ignoredFiles.Add(sourceCodeFilePath);
                continue;
            }

            OnNotifyProgress("Step 1: Downloading files from GitHub", counter, sourceCodeFiles.Length);
            var sourcePath = sourceCodeFilePath.Replace(source.Path, string.Empty);
            var code = await gitHubQuery.GetFileContentAsync(gitHubClient, project.GitHubOwner, project.GitHubRepo, sourceCodeFilePath);
            if (string.IsNullOrWhiteSpace(code))
            {
                continue;
            }

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

        OnNotifyProgress($"{sourceCodeFiles.Length - ignoredFiles.Count} Files was transformed into {codeEntities.Count} Code Entities for Vector Import. Preparing Embedding step...");
        return codeEntities;
    }
}