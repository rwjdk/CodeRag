using CodeRag.Shared.VectorStore;
using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared.VectorStore.SourceCode;

public class SourceCodeVectorEntity : VectorEntity
{
    [VectorStoreRecordData(IsFilterable = true)]
    public required string Kind { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    public required string Namespace { get; set; }

    public override string ToString()
    {
        return Name + $" ({Kind})";
    }
}