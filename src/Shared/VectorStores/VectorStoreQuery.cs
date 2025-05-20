using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;

namespace Shared.VectorStores;

[UsedImplicitly]
public class VectorStoreQuery(VectorStore vectorStore, SqlServerQuery sqlServerQuery) : IScopedService
{
    public VectorStoreCollection<Guid, VectorEntity> GetCollection()
    {
        return vectorStore.GetCollection<Guid, VectorEntity>(Constants.VectorCollections.VectorSources);
    }

    public async Task<VectorEntity[]> GetExistingAsync(Guid projectId, Guid? sourceId = null)
    {
        SqlDbContext context = await sqlServerQuery.CreateDbContextAsync();

        var query = context.Vectors.Where(x => x.ProjectId == projectId);
        if (sourceId.HasValue)
        {
            query = query.Where(x => x.SourceId == sourceId);
        }

        return await query.Select(x => new VectorEntity //NB: This is need to not include the actual vector (as it is a huge performance drain to retrieve)
        {
            VectorId = x.VectorId,
            Content = x.Content,
            Kind = x.Kind,
            SourcePath = x.SourcePath,
            Name = x.Name,
            DataType = x.DataType,
            Id = x.Id,
            ProjectId = x.ProjectId,
            SourceId = x.SourceId,
            Namespace = x.Namespace,
            Parent = x.Parent,
            ParentKind = x.ParentKind,
            Summary = x.Summary,
            TimeOfIngestion = x.TimeOfIngestion,
        }).ToArrayAsync();
    }
}