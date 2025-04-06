namespace CodeRag.Shared.BusinessLogic.VectorStore.Models;

public class VectorStoreSettings
{
    public required VectorStoreType Type { get; set; }
    public string? AzureSqlConnectionString { get; set; }
    public required string CollectionName { get; set; }
}