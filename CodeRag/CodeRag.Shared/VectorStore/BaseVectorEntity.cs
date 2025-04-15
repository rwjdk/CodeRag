using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared.VectorStore;

public abstract class BaseVectorEntity
{
    [Key]
    [Column(TypeName = "nvarchar(4000)")] //todo - use or remove
    [VectorStoreRecordKey]
    public string? Id { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    [Column(TypeName = "nvarchar(4000)")] //todo - use or remove
    public required string Name { get; init; }

    [VectorStoreRecordData]
    [Column(TypeName = "nvarchar(MAX)")] //todo - use or remove
    public required string RemotePath { get; init; }

    [VectorStoreRecordData]
    [Column(TypeName = "nvarchar(MAX)")] //todo - use or remove
    public required string Content { get; init; }

    [VectorStoreRecordData(IsFilterable = true)]
    [Column(TypeName = "nvarchar(4000)")] //todo - use or remove
    public required string SourcePath { get; init; }

    [VectorStoreRecordData]
    public DateTime TimeOfIngestion { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    [Column(TypeName = "nvarchar(4000)")] //todo - use or remove
    public string? ProjectId { get; set; }


    [VectorStoreRecordData(IsFilterable = true)]
    [Column(TypeName = "nvarchar(4000)")] //todo - use or remove
    public string? SourceId { get; set; } //todo

    [VectorStoreRecordVector(Dimensions: 1536, DistanceFunction.CosineDistance, IndexKind.Flat)]
    [NotMapped]
    public ReadOnlyMemory<float>? Vector { get; set; }
}