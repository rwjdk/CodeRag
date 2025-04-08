using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared.BusinessLogic.VectorStore;

public abstract class VectorEntity
{
    [VectorStoreRecordKey]
    public string Id { get; set; } = Guid.NewGuid().ToString(); //todo - make id's determenistic and not just GUIDs

    [VectorStoreRecordData]
    public DateTime TimeOfIngestion { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Name { get; set; }

    [VectorStoreRecordData]
    public required string Link { get; set; }

    [VectorStoreRecordData]
    public required string Content { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Source { get; set; }

    [VectorStoreRecordVector(Dimensions: 1536, DistanceFunction.CosineDistance, IndexKind.Flat)]
    public ReadOnlyMemory<float>? Vector { get; set; }
}