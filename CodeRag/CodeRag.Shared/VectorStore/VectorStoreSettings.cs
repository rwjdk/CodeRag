namespace CodeRag.Shared.VectorStore;

public class VectorStoreSettings
{
    public required VectorStoreType Type { get; init; }
    public string? AzureSqlConnectionString { get; init; }

    public string SourceCodeCollectionName
    {
        get
        {
            string name = Constants.SourceCodeVectorStoreName;
#if DEBUG
            name = "debug_" + name;
#endif
            return name;
        }
    }

    public string DocumentationCollectionName
    {
        get
        {
            string name = Constants.DocumentationVectorStoreName;
#if DEBUG
            name = "debug_" + name;
#endif
            return name;
        }
    }
}