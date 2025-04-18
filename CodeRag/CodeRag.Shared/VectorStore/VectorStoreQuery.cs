using CodeRag.Shared.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Text;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;

namespace CodeRag.Shared.VectorStore;

[UsedImplicitly]
public class VectorStoreQuery(IVectorStore vectorStore, IDbContextFactory<SqlDbContext> dbContextFactory) : IScopedService
{
    public IVectorStoreRecordCollection<Guid, T> GetCollection<T>(string collectionName)
    {
        return vectorStore.GetCollection<Guid, T>(collectionName);
    }

    public async Task<MarkdownVectorEntity[]> GetMarkdown(Guid projectId, Guid? sourceId = null)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();

        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(MarkdownVectorEntity.Id)}], ");
        sql.AppendLine($"[{nameof(MarkdownVectorEntity.ProjectId)}], ");
        sql.AppendLine($"[{nameof(MarkdownVectorEntity.SourceId)}], ");
        sql.AppendLine($"[{nameof(MarkdownVectorEntity.ChunkId)}], ");
        sql.AppendLine($"[{nameof(MarkdownVectorEntity.TimeOfIngestion)}], ");
        sql.AppendLine($"[{nameof(MarkdownVectorEntity.Name)}], ");
        sql.AppendLine($"[{nameof(MarkdownVectorEntity.Content)}], ");
        sql.AppendLine($"[{nameof(MarkdownVectorEntity.SourcePath)}] ");
        sql.AppendLine($"FROM [{Constants.VectorCollections.Markdown}]");
        sql.AppendLine($"WHERE [{nameof(MarkdownVectorEntity.ProjectId)}] = {{0}}");
        if (sourceId.HasValue)
        {
            sql.AppendLine($"AND [{nameof(MarkdownVectorEntity.SourceId)}] = {{1}}");
        }

        List<MarkdownVectorEntity> result;
        // ReSharper disable once ConvertIfStatementToConditionalTernaryExpression
        if (sourceId.HasValue)
        {
            result = context.Database.SqlQuery<MarkdownVectorEntity>(FormattableStringFactory.Create(sql.ToString(), projectId, sourceId.Value)).ToList();
        }
        else
        {
            result = context.Database.SqlQuery<MarkdownVectorEntity>(FormattableStringFactory.Create(sql.ToString(), projectId)).ToList();
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
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Parent)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.ParentKind)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Namespace)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.XmlSummary)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Kind)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.Content)}], ");
        sql.AppendLine($"[{nameof(CSharpCodeEntity.SourcePath)}] ");
        sql.AppendLine($"FROM [{Constants.VectorCollections.CSharp}]");
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