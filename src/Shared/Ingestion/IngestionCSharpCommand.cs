using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Shared.Chunking.CSharp;
using Shared.EntityFramework.DbModels;
using Shared.RawFiles;
using Shared.RawFiles.Models;
using Shared.VectorStores;
using System.Text;
using System.Threading;

namespace Shared.Ingestion;

[UsedImplicitly]
public class IngestionCSharpCommand(
    CSharpChunker chunker,
    VectorStoreCommand vectorStoreCommand,
    VectorStoreQuery vectorStoreQuery,
    RawFileGitHubQuery rawFileGitHubQuery,
    RawFileLocalQuery rawFileLocalQuery) : IngestionCommand(vectorStoreCommand), IScopedService
{
    public override async Task IngestAsync(ProjectEntity project, ProjectSourceEntity source)
    {
        if (source.Kind != ProjectSourceKind.CSharpCode)
        {
            throw new IngestionException($"Invalid Kind. Expected '{nameof(ProjectSourceKind.CSharpCode)}' but received {source.Kind}");
        }

        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new IngestionException("Source Path is not defined");
        }

        RawFileQuery rawFileContentQuery;
        switch (source.Location)
        {
            case ProjectSourceLocation.GitHub:
                rawFileContentQuery = rawFileGitHubQuery;
                break;
            case ProjectSourceLocation.Local:
                rawFileContentQuery = rawFileLocalQuery;
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(source.Location));
        }

        rawFileContentQuery.NotifyProgress += OnNotifyProgress;

        RawFile[] rawFiles = await rawFileContentQuery.GetRawContentForSourceAsync(project, source, "cs");
        List<CSharpChunk> codeEntities = [];

        foreach (RawFile rawFile in rawFiles)
        {
            List<CSharpChunk> entitiesForFile = chunker.GetCodeEntities(rawFile.Content);
            foreach (CSharpChunk codeEntity in entitiesForFile)
            {
                codeEntity.LocalSourcePath = rawFile.PathWithoutRoot;
            }

            codeEntities.AddRange(entitiesForFile);
        }

        OnNotifyProgress($"{rawFiles.Length} Files was transformed into {codeEntities.Count} Code Entities for Vector Import. Preparing Embedding step...");

        VectorStoreCollection<Guid, VectorEntity> collection = vectorStoreQuery.GetCollection();

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

        await collection.EnsureCollectionExistsAsync();
        var existingData = await vectorStoreQuery.GetExistingAsync(project.Id, source.Id);

        int counter = 0;
        List<Guid> idsToKeep = [];
        foreach (CSharpChunk codeEntity in codeEntities)
        {
            counter++;

            OnNotifyProgress("Embedding Data", counter, codeEntities.Count);

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
                await Retry.ExecuteWithRetryAsync(async () => { await VectorStoreCommand.Upsert(project.Id, source, collection, entry); }, 3, TimeSpan.FromSeconds(30));
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
            await collection.DeleteAsync(idsToDelete);
        }

        OnNotifyProgress("Done");
    }
}