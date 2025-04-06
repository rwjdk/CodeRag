using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared.BusinessLogic.VectorStore.Models;

public class SourceCodeVectorEntity
{
    [VectorStoreRecordKey]
    public string Id { get; set; } = Guid.NewGuid().ToString(); //todo - make id's determenistic and not just GUIDs

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Kind { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Namespace { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Name { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Filename { get; set; }

    [VectorStoreRecordData]
    public required string Content { get; set; }

    //SQL Server Vector
    [VectorStoreRecordVector(Dimensions: 1536, DistanceFunction.CosineDistance, IndexKind.Flat)]
    public ReadOnlyMemory<float>? Vector { get; set; }
}