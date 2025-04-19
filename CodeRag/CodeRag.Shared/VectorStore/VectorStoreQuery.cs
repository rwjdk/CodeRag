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
    public IVectorStoreRecordCollection<Guid, VectorEntity> GetCollection()
    {
        return vectorStore.GetCollection<Guid, VectorEntity>(Constants.VectorCollections.VectorSources);
    }

    public async Task<VectorEntity[]> GetExisting(Guid projectId, Guid? sourceId = null)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();

        var vectorEntities = await context.Vectors.ToListAsync();

        StringBuilder sql = new();
        sql.AppendLine("SELECT ");
        sql.AppendLine($"[{nameof(VectorEntity.VectorId)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.Id)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.Kind)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.Name)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.Parent)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.ParentKind)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.Namespace)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.Summary)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.Content)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.SourcePath)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.TimeOfIngestion)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.ProjectId)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.DataType)}], ");
        sql.AppendLine($"[{nameof(VectorEntity.SourceId)}] ");
        sql.AppendLine($"FROM [{Constants.VectorCollections.VectorSources}]");
        sql.AppendLine($"WHERE [{nameof(VectorEntity.ProjectId)}] = {{0}}");
        if (sourceId.HasValue)
        {
            sql.AppendLine($"AND [{nameof(VectorEntity.SourceId)}] = {{1}}");
        }

        List<VectorEntity> result;
        // ReSharper disable once ConvertIfStatementToConditionalTernaryExpression
        if (sourceId.HasValue)
        {
            result = context.Database.SqlQuery<VectorEntity>(FormattableStringFactory.Create(sql.ToString(), projectId, sourceId.Value)).ToList();
        }
        else
        {
            result = context.Database.SqlQuery<VectorEntity>(FormattableStringFactory.Create(sql.ToString(), projectId)).ToList();
        }


        return result.ToArray();
    }
}