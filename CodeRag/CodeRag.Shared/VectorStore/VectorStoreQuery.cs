using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.VectorStore.Documentation;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.SqlServer;
using System.Runtime.CompilerServices;
using System.Text;
using CodeRag.Shared.VectorStore.SourceCode;

namespace CodeRag.Shared.VectorStore;

public class VectorStoreQuery(VectorStoreSettings settings, IDbContextFactory<SqlDbContext> dbContextFactory)
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

    public async Task<string[]> GetDocumentationIdsForProject(Guid projectId)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();
        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Id)}] ");
        sql.AppendLine($"FROM [{settings.DocumentationCollectionName}]");
        sql.AppendLine($"WHERE [{nameof(DocumentationVectorEntity.ProjectId)}] = {{0}}");

        List<string> result = context.Database.SqlQuery<string>(FormattableStringFactory.Create(sql.ToString(), projectId)).ToList();

        return result.ToArray();
    }

    public async Task<DocumentationVectorEntity[]> GetDocumentationForProject(Guid projectId)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();

        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Id)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.ProjectId)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.TimeOfIngestion)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Name)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Link)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Content)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Source)}] ");
        sql.AppendLine($"FROM [{settings.DocumentationCollectionName}]");

        var result = context.Database.SqlQuery<DocumentationVectorEntity>(FormattableStringFactory.Create(sql.ToString())).ToList();

        return result.ToArray();
    }

    public async Task<string[]> GetSourceCodeIdsForProject(Guid projectId)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();
        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.Id)}] ");
        sql.AppendLine($"FROM [{settings.SourceCodeCollectionName}]");
        sql.AppendLine($"WHERE [{nameof(SourceCodeVectorEntity.ProjectId)}] = {{0}}");

        List<string> result = context.Database.SqlQuery<string>(FormattableStringFactory.Create(sql.ToString(), projectId)).ToList();

        return result.ToArray();
    }

    public async Task<SourceCodeVectorEntity[]> GetSourceCodeForProject(Guid projectId)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();

        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.Id)}], ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.ProjectId)}], ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.TimeOfIngestion)}], ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.Name)}], ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.Namespace)}], ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.Kind)}], ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.Link)}], ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.Content)}], ");
        sql.AppendLine($"[{nameof(SourceCodeVectorEntity.Source)}] ");
        sql.AppendLine($"FROM [{settings.SourceCodeCollectionName}]");

        var result = context.Database.SqlQuery<SourceCodeVectorEntity>(FormattableStringFactory.Create(sql.ToString())).ToList();

        return result.ToArray();
    }
}