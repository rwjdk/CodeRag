using CodeRag.Shared.Chunking.CSharp;
using CodeRag.Shared.Configuration;
using CodeRag.Shared.EntityFramework.Entities;
using Microsoft.Extensions.VectorData;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeRag.Shared.VectorStore.SourceCode;

public class CSharpCodeEntity : VectorEntity
{
    [VectorStoreRecordData(IsFilterable = true)]
    public required string Kind { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Namespace { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string? Parent { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string? ParentKind { get; set; }

    [VectorStoreRecordData] public required string XmlSummary { get; set; }

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

    public string GetTargetMarkdownFilename()
    {
        if (Kind == CSharpKind.Method.ToString() || Kind == CSharpKind.Property.ToString() || Kind == CSharpKind.Constant.ToString())
        {
            return $"{Namespace}-{Parent}.{Name}.md";
        }

        // ReSharper disable once ConvertIfStatementToReturnStatement
        if (Kind == CSharpKind.Constructor.ToString())
        {
            return $"{Namespace}-{Parent}.{Name}.ctor.md";
        }

        return $"{Namespace}-{Name}.md";
    }

    public override string GetContentCompareKey()
    {
        //Make a string that represent all content for comparison
        return Kind + Namespace + Parent + ParentKind + XmlSummary + Content + Name + SourcePath;
    }
}