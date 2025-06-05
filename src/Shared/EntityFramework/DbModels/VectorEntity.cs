using CodeRag.VectorStore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shared.EntityFramework.DbModels;

/// <summary>
/// Represents a vector entity with identification, classification, content, and metadata properties
/// </summary>
[Table(Constants.VectorCollections.VectorSources)]
[Index(nameof(SourceId))]
[Index(nameof(DataType))]
public class VectorEntity : IVectorEntity<Guid>
{
    /// <summary>
    /// ID of the Vector
    /// </summary>
    [Key]
    [VectorStoreKey]
    public Guid VectorId { get; set; }

    /// <summary>
    /// ID of the Content
    /// </summary>
    [VectorStoreData]
    [MaxLength(4000)]
    public string? Id { get; init; }

    /// <summary>
    /// Kind of the Content
    /// </summary>
    [VectorStoreData]
    [MaxLength(4000)]
    public required string? Kind { get; init; }

    /// <summary>
    /// Name of the Content
    /// </summary>
    [VectorStoreData]
    [MaxLength(4000)]
    public string? Name { get; set; }

    /// <summary>
    /// Parent of the Content (if any)
    /// </summary>
    [VectorStoreData]
    [MaxLength(4000)]
    public string? Parent { get; init; }

    /// <summary>
    /// Kind of the Parent (if any)
    /// </summary>
    [VectorStoreData]
    [MaxLength(4000)]
    public string? ParentKind { get; init; }

    /// <summary>
    /// Namespace the content is in
    /// </summary>
    [VectorStoreData]
    [MaxLength(4000)]
    public string? Namespace { get; init; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    /// <summary>
    /// Summary of the content
    /// </summary>
    [VectorStoreData]
    public string? Summary { get; init; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    /// <summary>
    /// The Content that have been vectorized
    /// </summary>
    [VectorStoreData]
    public required string Content { get; set; }

    /// <summary>
    /// The SourcePath of the content
    /// </summary>
    [VectorStoreData(IsIndexed = true)]
    [MaxLength(4000)]
    public required string SourcePath { get; init; }

    /// <summary>
    /// The time the data was ingested
    /// </summary>
    [VectorStoreData]
    public DateTime TimeOfIngestion { get; set; }

    /// <summary>
    /// The Type of the Content
    /// </summary>
    [VectorStoreData]
    [MaxLength(4000)]
    public string DataType { get; set; } = null!;

    /// <summary>
    /// The ID of the Project Source the Content belong to
    /// </summary>
    [VectorStoreData]
    public Guid SourceId { get; set; }

    [VectorStoreVector(1536, DistanceFunction = DistanceFunction.CosineDistance, IndexKind = IndexKind.Flat, StorageName = Constants.VectorCollections.VectorColumns.Vector)]
    [NotMapped]
    public string VectorValue => Content;

    public string GetContentCompareKey()
    {
        var contentCompareKey = Id + Kind + Name + Parent + ParentKind + Namespace + Summary + Content + SourcePath;
        return contentCompareKey;
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

    public override string ToString()
    {
        return Name ?? "???";
    }
}