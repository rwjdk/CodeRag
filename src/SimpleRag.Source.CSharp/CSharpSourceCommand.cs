using System.Text;
using JetBrains.Annotations;
using SimpleRag.Abstractions;
using SimpleRag.Abstractions.Models;
using SimpleRag.FileRetrieval;
using SimpleRag.FileRetrieval.Models;
using SimpleRag.Source.CSharp.Models;
using SimpleRag.VectorStorage;
using SimpleRag.VectorStorage.Models;

namespace SimpleRag.Source.CSharp;

[UsedImplicitly]
public class CSharpSourceCommand(
    CSharpChunker chunker,
    VectorStoreCommand vectorStoreCommand,
    VectorStoreQuery vectorStoreQuery,
    RawFileGitHubQuery rawFileGitHubQuery,
    RawFileLocalQuery rawRagFileLocalQuery) : ProgressNotificationBase
{
    public const string SourceKind = "CSharp";

    public async Task IngestAsync(CSharpSource source)
    {
        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new SourceException("Source Path is not defined");
        }

        RawFileQuery rawFileContentQuery;
        switch (source.Location)
        {
            case SourceLocation.GitHub:
                rawFileContentQuery = rawFileGitHubQuery;
                break;
            case SourceLocation.Local:
                rawFileContentQuery = rawRagFileLocalQuery;
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(source.Location));
        }

        rawFileContentQuery.NotifyProgress += OnNotifyProgress;

        RawFile[]? files = await rawFileContentQuery.GetRawContentForSourceAsync(source.AsRagFileSource(), "cs");
        if (files == null)
        {
            OnNotifyProgress("Nothing new to Ingest so skipping");
            return;
        }

        List<CSharpChunk> codeEntities = [];

        foreach (RawFile file in files)
        {
            var numberOfLine = file.Content.Split(["\n"], StringSplitOptions.RemoveEmptyEntries).Length;
            if (source.IgnoreFileIfMoreThanThisNumberOfLines.HasValue && numberOfLine > source.IgnoreFileIfMoreThanThisNumberOfLines)
            {
                continue;
            }

            List<CSharpChunk> entitiesForFile = chunker.GetCodeEntities(file.Content);
            foreach (CSharpChunk codeEntity in entitiesForFile)
            {
                codeEntity.SourcePath = file.PathWithoutRoot;
            }

            codeEntities.AddRange(entitiesForFile);
        }

        OnNotifyProgress($"{files.Length} Files was transformed into {codeEntities.Count} Code Entities for Vector Import. Preparing Embedding step...");

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

        VectorEntity[] existingData = await vectorStoreQuery.GetExistingAsync(x => x.SourceId == source.Id);

        int counter = 0;
        List<string> idsToKeep = [];
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

            VectorEntity entity = new()
            {
                Id = Guid.NewGuid().ToString(),
                SourceId = source.Id,
                ContentId = null,
                SourceCollectionId = source.CollectionId,
                SourceKind = SourceKind,
                SourcePath = codeEntity.SourcePath,
                ContentKind = codeEntity.KindAsString,
                ContentParent = codeEntity.Parent,
                ContentParentKind = codeEntity.ParentKindAsString,
                ContentName = codeEntity.Name,
                ContentNamespace = codeEntity.Namespace,
                Content = content.ToString(),
            };

            var existing = existingData.FirstOrDefault(x => x.GetContentCompareKey() == entity.GetContentCompareKey());
            if (existing == null)
            {
                await Retry.ExecuteWithRetryAsync(async () => { await vectorStoreCommand.UpsertAsync(entity); }, 3, TimeSpan.FromSeconds(30));
            }
            else
            {
                idsToKeep.Add(existing.Id);
            }
        }

        var idsToDelete = existingData.Select(x => x.Id).Except(idsToKeep).ToList();
        if (idsToDelete.Count != 0)
        {
            OnNotifyProgress("Removing entities that are no longer in source...");
            await vectorStoreCommand.DeleteAsync(idsToDelete);
        }

        OnNotifyProgress("Done");
    }
}