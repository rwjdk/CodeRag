using Microsoft.Data.SqlClient;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.SqlServer;

namespace CodeRag.Shared.BusinessLogic.VectorStore;

public class VectorStoreQuery(VectorStoreSettings settings)
{
    public IVectorStoreRecordCollection<string, T> GetCollection<T>(string collectionName)
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
                throw new ArgumentOutOfRangeException(nameof(settings.Type));
        }

        return vectorStore.GetCollection<string, T>(collectionName);
    }

    public async Task<string[]> GetAllIdsForCollection(string collectionName)
    {
        string query = $"SELECT [Id] FROM [dbo].[{collectionName}]";
        await using var connection = new SqlConnection(settings.AzureSqlConnectionString);
        await using var command = new SqlCommand(query, connection);
        var result = new List<string>();
        connection.Open();
        await using var reader = await command.ExecuteReaderAsync();
        while (reader.Read())
        {
            result.Add(reader["Id"].ToString()!);
        }

        return result.ToArray();
    }
}