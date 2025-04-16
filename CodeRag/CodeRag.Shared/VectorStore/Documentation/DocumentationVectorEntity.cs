using CodeRag.Shared.EntityFramework.Entities;
using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared.VectorStore.Documentation;

public class DocumentationVectorEntity : BaseVectorEntity
{
    [VectorStoreRecordData(IsFilterable = true)]
    public string? ChunkId { get; init; }

    public string? GetLocalFilePath(Project project)
    {
        var source = project.DocumentationSources.FirstOrDefault(x => x.Id.ToString() == SourceId);
        if (source == null || string.IsNullOrWhiteSpace(source.SourcePath))
        {
            return null;
        }

        return source.SourcePath + SourcePath;
    }

    public string? GetUrl(Project project)
    {
        var source = project.DocumentationSources.FirstOrDefault(x => x.Id.ToString() == SourceId);
        if (source == null || string.IsNullOrWhiteSpace(source.RootUrl))
        {
            return null;
        }

        string rootUrl = source.RootUrl;
        if (rootUrl.EndsWith("/"))
        {
            rootUrl = rootUrl[..^1];
        }
        string suffix = SourcePath.Replace("\\", "/");
        if (suffix.StartsWith("/"))
        {
            suffix = suffix[1..];
        }

        if (source.FilenameEqualDocUrlSubpage)
        {
            suffix = Path.GetFileNameWithoutExtension(suffix);
        }

        if (!string.IsNullOrWhiteSpace(ChunkId))
        {
            suffix = $"{suffix}#{ChunkId}";
        }

        return rootUrl + "/" + suffix;
    }

    public override string ToString()
    {
        return Name;
    }
}