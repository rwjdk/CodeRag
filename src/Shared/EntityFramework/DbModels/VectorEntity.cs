using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using Shared.Chunking.CSharp;

namespace Shared.EntityFramework.DbModels;

[Table(Constants.VectorCollections.VectorSources)]
[Index(nameof(ProjectId))]
[Index(nameof(SourceId))]
[Index(nameof(DataType))]
public class VectorEntity
{
    [Key]
    [VectorStoreRecordKey]
    public Guid VectorId { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    [MaxLength(4000)]
    public string? Id { get; init; }

    [VectorStoreRecordData(IsFilterable = true)]
    [MaxLength(4000)]
    public required string? Kind { get; init; }

    [VectorStoreRecordData(IsFilterable = true)]
    [MaxLength(4000)]
    public string? Name { get; init; }

    [VectorStoreRecordData(IsFilterable = true)]
    [MaxLength(4000)]
    public string? Parent { get; init; }

    [VectorStoreRecordData(IsFilterable = true)]
    [MaxLength(4000)]
    public string? ParentKind { get; init; }

    [VectorStoreRecordData(IsFilterable = true)]
    [MaxLength(4000)]
    public string? Namespace { get; init; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    [VectorStoreRecordData]
    public string? Summary { get; init; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    [VectorStoreRecordData]
    public required string Content { get; init; }

    [VectorStoreRecordData(IsFilterable = true)]
    [MaxLength(4000)]
    public required string SourcePath { get; init; }

    [VectorStoreRecordData]
    public DateTime TimeOfIngestion { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    [MaxLength(4000)]
    public string DataType { get; set; } = null!;

    [VectorStoreRecordData(IsFilterable = true)]
    public Guid ProjectId { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public Guid SourceId { get; set; }

    [VectorStoreRecordVector(1536, DistanceFunction.CosineDistance, IndexKind.Flat, StoragePropertyName = Constants.VectorCollections.VectorColumns.Vector)]
    [NotMapped]
    public ReadOnlyMemory<float>? VectorValue { get; set; }

    public string GetContentCompareKey()
    {
        var contentCompareKey = Id + Kind + Name + Parent + ParentKind + Namespace + Summary + Content + SourcePath;
        return contentCompareKey;
    }

    public string? GetLocalFilePath(ProjectEntity project)
    {
        var source = project.Sources.FirstOrDefault(x => x.Id == SourceId);
        if (source == null || string.IsNullOrWhiteSpace(source.Path)) return null;

        return source.Path + SourcePath;
    }

    public string? GetUrl(ProjectEntity project)
    {
        var source = project.Sources.FirstOrDefault(x => x.Id == SourceId);
        if (source == null || string.IsNullOrWhiteSpace(source.RootUrl)) return null;

        var rootUrl = source.RootUrl;
        if (rootUrl.EndsWith("/")) rootUrl = rootUrl[..^1];

        var suffix = SourcePath.Replace("\\", "/");
        if (suffix.StartsWith("/")) suffix = suffix[1..];

        if (source.MarkdownFilenameEqualDocUrlSubpage) suffix = Path.GetFileNameWithoutExtension(suffix);

        if (!string.IsNullOrWhiteSpace(Id)) suffix = $"{suffix}#{Id}";

        return rootUrl + "/" + suffix;
    }

    public string GetTargetMarkdownFilename()
    {
        return Kind == nameof(CSharpKind.Method) ? $"{Namespace}-{Parent}.{Name}.md" : $"{Namespace}-{Name}.md";
    }

    public override string ToString()
    {
        return Name ?? "???";
    }
}