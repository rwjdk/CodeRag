using System.ComponentModel.DataAnnotations.Schema;
using CodeRag.Shared.EntityFramework.Entities;
using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared.VectorStore;

public abstract class VectorEntity
{
    [VectorStoreRecordKey] public Guid Id { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Name { get; init; }

    [VectorStoreRecordData] public required string Content { get; init; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string SourcePath { get; init; }

    [VectorStoreRecordData] public DateTime TimeOfIngestion { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public string? ProjectId { get; set; }


    [VectorStoreRecordData(IsFilterable = true)]
    public string? SourceId { get; set; }

    [VectorStoreRecordVector(Dimensions: 1536, DistanceFunction.CosineDistance, IndexKind.Flat)]
    [NotMapped]
    public ReadOnlyMemory<float>? Vector { get; set; }

    public abstract string GetContentCompareKey();
}