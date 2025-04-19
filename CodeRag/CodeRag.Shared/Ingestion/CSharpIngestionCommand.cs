using System.Text;
using System.Text.RegularExpressions;
using CodeRag.Shared.Chunking.CSharp;
using CodeRag.Shared.EntityFramework.DbModels;
using CodeRag.Shared.VectorStore;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Octokit;

namespace CodeRag.Shared.Ingestion;

[UsedImplicitly]
public class CSharpIngestionCommand(CSharpChunker chunker, VectorStoreCommand vectorStoreCommand, VectorStoreQuery vectorStoreQuery) : IngestionCommand(vectorStoreCommand), IScopedService
{
    public override async Task Ingest(ProjectEntity project, ProjectSourceEntity source)
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
        var existingData = await vectorStoreQuery.GetExisting(project.Id, source.Id);

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
                OnNotifyProgress("Skipped as data is up to date");
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

    private async Task<List<CSharpChunk>> GetCodeEntitiesFromLocalSourceCode(ProjectSourceEntity source)
    {
        List<CSharpChunk> codeEntities = [];
        if (string.IsNullOrWhiteSpace(source.Path))
        {
            return codeEntities; //todo - exception instead?
        }

        string[] sourceCodeFiles = Directory.GetFiles(source.Path, "*.cs", source.PathSearchRecursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly);
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

    private async Task<List<CSharpChunk>> GetCodeEntitiesFromPublicGithubRepo(ProjectEntity project, ProjectSourceEntity source)
    {
        List<CSharpChunk> codeEntities = [];
        if (string.IsNullOrWhiteSpace(source.Path))
        {
            return codeEntities; //todo - exception instead?
        }

        GitHubClient client = new GitHubClient(new ProductHeaderValue(Constants.AppName))
        {
            Credentials = new Credentials(project.GitHubToken)
        };

        var gitHubOwner = project.GitHubOwner;
        var gitHubRepo = project.GitHubRepo;
        var repo = await client.Repository.Get(gitHubOwner, gitHubRepo);
        var defaultBranch = repo.DefaultBranch; //todo - support other branches

        var reference = await client.Git.Reference.Get(gitHubOwner, gitHubRepo, $"heads/{defaultBranch}");
        var commit = await client.Git.Commit.Get(gitHubOwner, gitHubRepo, reference.Object.Sha);
        TreeResponse? tree;
        if (source.PathSearchRecursive)
        {
            tree = await client.Git.Tree.GetRecursive(gitHubOwner, gitHubRepo, commit.Tree.Sha);
        }
        else
        {
            tree = await client.Git.Tree.Get(gitHubOwner, gitHubRepo, commit.Tree.Sha); //todo - have not tested this
        }

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
            byte[]? fileContent = await client.Repository.Content.GetRawContent(gitHubOwner, gitHubRepo, sourceCodeFilePath);
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

    private bool IgnoreFile(ProjectSourceEntity source, string path)
    {
        //todo - this have not tested: Should be done so a bunch
        return (source.FileIgnorePatterns ?? []).All(regExPattern => !Regex.IsMatch(path, regExPattern.Pattern, RegexOptions.IgnoreCase));
    }
}