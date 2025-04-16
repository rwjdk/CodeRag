using CodeRag.Shared.EntityFramework.Entities;
using Microsoft.Extensions.VectorData;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeRag.Shared.VectorStore.SourceCode;

public class CSharpCodeEntity : BaseVectorEntity
{
    [VectorStoreRecordData(IsFilterable = true)]
    [Column(TypeName = "nvarchar(4000)")] //todo - use or remove
    public required string Kind { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    [Column(TypeName = "nvarchar(4000)")] //todo - use or remove
    public required string Namespace { get; set; }

    [VectorStoreRecordData]
    [Column(TypeName = "nvarchar(MAX)")] //todo - use or remove
    public required string XmlSummary { get; set; }

    public string? GetLocalFilePath(Project project)
    {
        var source = project.CodeSources.FirstOrDefault(x => x.Id.ToString() == SourceId);
        if (source == null || string.IsNullOrWhiteSpace(source.SourcePath))
        {
            return null;
        }

        return source.SourcePath + SourcePath;
    }

    public string? GetUrl(Project project)
    {
        var source = project.CodeSources.FirstOrDefault(x => x.Id.ToString() == SourceId);
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

        return rootUrl + "/" + suffix;
    }

    public override string ToString()
    {
        return Name + $" ({Kind})";
    }

    public DocumentationSource? GetSource(Project project)
    {
        return project.DocumentationSources.FirstOrDefault(x => x.Id.ToString() == SourceId);
    }
}