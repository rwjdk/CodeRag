namespace CodeRag.Shared.BusinessLogic.VectorStore;

public class VectorStoreSettings
{
    public required VectorStoreType Type { get; init; }
    public string? AzureSqlConnectionString { get; init; }
    public required string SourceCodeCollectionName { get; init; }
    public required string DocumentationCollectionName { get; init; }
}