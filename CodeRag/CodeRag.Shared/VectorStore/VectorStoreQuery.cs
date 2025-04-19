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

        var query = context.Vectors.Where(x => x.ProjectId == projectId);
        if (sourceId.HasValue)
        {
            query = query.Where(x => x.SourceId == sourceId);
        }

        return await query.ToArrayAsync();
    }
}