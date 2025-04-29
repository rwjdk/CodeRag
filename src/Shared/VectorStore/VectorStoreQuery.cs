using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;

namespace Shared.VectorStore;

/// <summary>
/// Query for getting Vector Store Data in SQL Server
/// </summary>
/// <param name="vectorStore">The Vector Store</param>
/// <param name="sqlServerQuery">The General SQL Server Query</param>
[UsedImplicitly]
public class VectorStoreQuery(IVectorStore vectorStore, SqlServerQuery sqlServerQuery) : IScopedService
{
    /// <summary>
    /// Retrieves a collection of vector store records identified by Guid and containing VectorEntity items
    /// </summary>
    /// <returns>A collection of vector store records keyed by Guid and containing VectorEntity objects</returns>
    public IVectorStoreRecordCollection<Guid, VectorEntity> GetCollection()
    {
        return vectorStore.GetCollection<Guid, VectorEntity>(Constants.VectorCollections.VectorSources);
    }

    /// <summary>
    /// Retrieves existing vector entities for a project
    /// </summary>
    /// <param name="projectId">The unique identifier of the project</param>
    /// <param name="sourceId">The optional unique identifier of the source</param>
    /// <returns>An array of vector entities associated with the project</returns>
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