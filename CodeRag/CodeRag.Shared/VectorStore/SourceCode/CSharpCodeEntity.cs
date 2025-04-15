using Microsoft.Extensions.VectorData;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeRag.Shared.VectorStore.SourceCode;

public class CSharpCodeEntity : BaseVectorEntity
{
    [VectorStoreRecordData(IsFilterable = true)]
    [Column(TypeName = "nvarchar(4000)")] //todo - use or remove
    public required string Kind { get; set; }

    [VectorStoreRecordData(IsFilterable = true)]
    [Column(TypeName = "nvarchar(4000)")] //todo - use or remove
    public required string Namespace { get; set; }

    [VectorStoreRecordData]
    [Column(TypeName = "nvarchar(MAX)")] //todo - use or remove
    public required string XmlSummary { get; set; }

    public override string ToString()
    {
        return Name + $" ({Kind})";
    }
}