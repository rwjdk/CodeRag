using Microsoft.Extensions.VectorData;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeRag.Shared.VectorStore;

public abstract class VectorEntity
{
    [VectorStoreRecordKey]
    public required string Id { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Name { get; init; }

    [VectorStoreRecordData]
    public required string Link { get; init; }

    [VectorStoreRecordData]
    public required string Content { get; init; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Source { get; init; }

    [VectorStoreRecordData]
    public DateTime TimeOfIngestion { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public string? ProjectId { get; set; }

    [VectorStoreRecordVector(Dimensions: 1536, DistanceFunction.CosineDistance, IndexKind.Flat)]
    [NotMapped]
    public ReadOnlyMemory<float>? Vector { get; set; }
}