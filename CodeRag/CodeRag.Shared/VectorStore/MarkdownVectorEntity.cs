using CodeRag.Shared.Configuration;
using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared.VectorStore;

public class MarkdownVectorEntity : VectorEntity
{
    [VectorStoreRecordData(IsFilterable = true)]
    public string? ChunkId { get; init; }

    public override string GetContentCompareKey()
    {
        return ChunkId + Content + Name + SourcePath;
    }

    public string? GetLocalFilePath(Project project)
    {
        var source = project.Sources.FirstOrDefault(x => x.Id.ToString() == SourceId);
        if (source == null || string.IsNullOrWhiteSpace(source.Path))
        {
            return null;
        }

        return source.Path + SourcePath;
    }

    public string? GetUrl(Project project)
    {
        var source = project.Sources.FirstOrDefault(x => x.Id.ToString() == SourceId);
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

        if (source.MarkdownFilenameEqualDocUrlSubpage)
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