using CodeRag.Shared.BusinessLogic.VectorStore.Models;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.SqlServer;

namespace CodeRag.Shared.BusinessLogic.VectorStore;

public class VectorStoreQuery(VectorStoreSettings settings)
{
    public IVectorStoreRecordCollection<string, T> GetCollection<T>()
    {
        IVectorStore vectorStore;
        switch (settings.Type)
        {
            case VectorStoreType.AzureSql:
                if (string.IsNullOrWhiteSpace(settings.AzureSqlConnectionString))
                {
                    throw new ArgumentNullException(nameof(settings.AzureSqlConnectionString), "No Azure SQL Connection String Provided");
                }

                vectorStore = new SqlServerVectorStore(settings.AzureSqlConnectionString);
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        return vectorStore.GetCollection<string, T>(settings.CollectionName);
    }
}