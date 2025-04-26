using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;

namespace Shared.VectorStore;

[UsedImplicitly]
public class VectorStoreQuery(IVectorStore vectorStore, IDbContextFactory<SqlDbContext> dbContextFactory) : IScopedService
{
    public IVectorStoreRecordCollection<Guid, VectorEntity> GetCollection()
    {
        return vectorStore.GetCollection<Guid, VectorEntity>(Constants.VectorCollections.VectorSources);
    }

    public async Task<VectorEntity[]> GetExistingAsync(Guid projectId, Guid? sourceId = null)
    {
        SqlDbContext context = await dbContextFactory.CreateDbContextAsync();

        var query = context.Vectors.Where(x => x.ProjectId == projectId);
        if (sourceId.HasValue)
        {
            query = query.Where(x => x.SourceId == sourceId);
        }

        return await query.ToArrayAsync();
    }
}