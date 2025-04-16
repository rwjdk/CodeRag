using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.VectorStore.Documentation;
using CodeRag.Shared.VectorStore.SourceCode;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using System.Runtime.CompilerServices;
using System.Text;

namespace CodeRag.Shared.VectorStore;

public class SqlServerVectorStoreQuery(string connectionString, IDbContextFactory<SqlDbContext> dbContextFactory)
{
    public IVectorStoreRecordCollection<string, T> GetCollection<T>(string collectionName)
    {
        IVectorStore vectorStore = new Microsoft.SemanticKernel.Connectors.SqlServer.SqlServerVectorStore(connectionString);

        return vectorStore.GetCollection<string, T>(collectionName);
    }

    public async Task<string[]> GetDocumentationIds(Guid projectId, Guid sourceId)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();
        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Id)}] ");
        sql.AppendLine($"FROM [{Constants.VectorCollections.MarkdownVectorCollection}]");
        sql.AppendLine($"WHERE [{nameof(DocumentationVectorEntity.ProjectId)}] = {{0}}");
        sql.AppendLine($"AND [{nameof(DocumentationVectorEntity.SourceId)}] = {{1}}");

        List<string> result = context.Database.SqlQuery<string>(FormattableStringFactory.Create(sql.ToString(), projectId, sourceId)).ToList();

        return result.ToArray();
    }

    public async Task<string[]> GetCSharpCodeIds(Guid projectId, Guid sourceId)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();
        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Id)}] ");
        sql.AppendLine($"FROM [{Constants.VectorCollections.CSharpCodeVectorCollection}]");
        sql.AppendLine($"WHERE [{nameof(CSharpCodeEntity.ProjectId)}] = {{0}}");
        sql.AppendLine($"AND [{nameof(CSharpCodeEntity.SourceId)}] = {{1}}");

        List<Guid> arguments = [projectId, sourceId];
        List<string> result = context.Database.SqlQuery<string>(FormattableStringFactory.Create(sql.ToString(), arguments)).ToList();

        return result.ToArray();
    }

    public async Task<DocumentationVectorEntity[]> GetDocumentation(Guid projectId, Guid? sourceId = null)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();

        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Id)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.ProjectId)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.SourceId)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.ChunkId)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.TimeOfIngestion)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Name)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.Content)}], ");
        sql.AppendLine($"[{nameof(DocumentationVectorEntity.SourcePath)}] ");
        sql.AppendLine($"FROM [{Constants.VectorCollections.MarkdownVectorCollection}]");
        sql.AppendLine($"WHERE [{nameof(DocumentationVectorEntity.ProjectId)}] = {{0}}");
        if (sourceId.HasValue)
        {
            sql.AppendLine($"AND [{nameof(DocumentationVectorEntity.SourceId)}] = {{1}}");
        }

        List<DocumentationVectorEntity> result;
        // ReSharper disable once ConvertIfStatementToConditionalTernaryExpression
        if (sourceId.HasValue)
        {
            result = context.Database.SqlQuery<DocumentationVectorEntity>(FormattableStringFactory.Create(sql.ToString(), projectId, sourceId.Value)).ToList();
        }
        else
        {
            result = context.Database.SqlQuery<DocumentationVectorEntity>(FormattableStringFactory.Create(sql.ToString(), projectId)).ToList();
        }


        return result.ToArray();
    }

    public async Task<CSharpCodeEntity[]> GetCSharpCode(Guid projectId, Guid? sourceId = null)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();

        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Id)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.ProjectId)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.SourceId)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.TimeOfIngestion)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Name)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Namespace)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.XmlSummary)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Kind)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Content)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.SourcePath)}] ");
        sql.AppendLine($"FROM [{Constants.VectorCollections.CSharpCodeVectorCollection}]");
        sql.AppendLine($"WHERE [{nameof(CSharpCodeEntity.ProjectId)}] = {{0}}");
        if (sourceId.HasValue)
        {
            sql.AppendLine($"AND [{nameof(CSharpCodeEntity.SourceId)}] = {{1}}");
        }

        List<CSharpCodeEntity> result;
        // ReSharper disable once ConvertIfStatementToConditionalTernaryExpression
        if (sourceId.HasValue)
        {
            result = context.Database.SqlQuery<CSharpCodeEntity>(FormattableStringFactory.Create(sql.ToString(), projectId, sourceId.Value)).ToList();
        }
        else
        {
            result = context.Database.SqlQuery<CSharpCodeEntity>(FormattableStringFactory.Create(sql.ToString(), projectId)).ToList();
        }

        return result.ToArray();
    }
}