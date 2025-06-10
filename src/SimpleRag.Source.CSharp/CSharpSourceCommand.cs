using System.Text;
using CodeRag.Abstractions;
using CodeRag.Abstractions.Models;
using CodeRag.RawFileRetrieval;
using CodeRag.RawFileRetrieval.Models;
using CodeRag.VectorStorage;
using CodeRag.VectorStorage.Models;
using JetBrains.Annotations;
using SimpleRag.Source.CSharp.Models;

namespace SimpleRag.Source.CSharp;

[UsedImplicitly]
public class CSharpSourceCommand(
    CSharpChunker chunker,
    VectorStoreCommand vectorStoreCommand,
    VectorStoreQuery vectorStoreQuery,
    RawFileGitHubQuery rawFileGitHubQuery,
    RawFileLocalQuery rawFileLocalQuery) : ProgressNotificationBase, IScopedService
{
    public const string SourceKind = "CSharp";

    public async Task IngestAsync(CodeRag.Abstractions.Models.RagSource source)
    {
        if (source.Kind != RagSourceKind.CSharp)
        {
            throw new SourceException($"Invalid Kind. Expected '{nameof(RagSourceKind.CSharp)}' but received {source.Kind}");
        }

        if (string.IsNullOrWhiteSpace(source.Path))
        {
            throw new SourceException("Source Path is not defined");
        }

        RawFileQuery rawFileContentQuery;
        switch (source.Location)
        {
            case RagSourceLocation.GitHub:
                rawFileContentQuery = rawFileGitHubQuery;
                break;
            case RagSourceLocation.Local:
                rawFileContentQuery = rawFileLocalQuery;
                break;
            default:
                throw new ArgumentOutOfRangeException(nameof(source.Location));
        }

        rawFileContentQuery.NotifyProgress += OnNotifyProgress;

        RawFile[]? rawFiles = await rawFileContentQuery.GetRawContentForSourceAsync(source, "cs");
        if (rawFiles == null)
        {
            OnNotifyProgress("Nothing new to Ingest so skipping");
            return;
        }

        List<CSharpChunk> codeEntities = [];

        foreach (RawFile rawFile in rawFiles)
        {
            var numberOfLine = rawFile.Content.Split(["\n"], StringSplitOptions.RemoveEmptyEntries).Length;
            if (source.IgnoreFileIfMoreThanThisNumberOfLines.HasValue && numberOfLine > source.IgnoreFileIfMoreThanThisNumberOfLines)
            {
                continue;
            }

            List<CSharpChunk> entitiesForFile = chunker.GetCodeEntities(rawFile.Content);
            foreach (CSharpChunk codeEntity in entitiesForFile)
            {
                codeEntity.SourcePath = rawFile.PathWithoutRoot;
            }

            codeEntities.AddRange(entitiesForFile);
        }

        OnNotifyProgress($"{rawFiles.Length} Files was transformed into {codeEntities.Count} Code Entities for Vector Import. Preparing Embedding step...");

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
                TimeOfIngestion = DateTime.UtcNow,
                SourcePath = codeEntity.SourcePath!,
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