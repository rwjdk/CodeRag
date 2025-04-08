using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared.BusinessLogic.VectorStore.SourceCode;

public class SourceCodeVectorEntity : VectorEntity
{
    [VectorStoreRecordData(IsFilterable = true)]
    public required string Kind { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Namespace { get; set; }
}