using System.Linq.Expressions;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Shared.EntityFramework;

/// <summary>
/// General Query for the SQL Server
/// </summary>
/// <param name="dbContextFactory"></param>
[UsedImplicitly]
public class SqlServerQuery(IDbContextFactory<SqlDbContext> dbContextFactory) : IScopedService
{
    /// <summary>
    /// Creates a new instance of SqlDbContext
    /// </summary>
    /// <param name="cancellationToken">Cancellation Token</param>
    /// <returns>SqlDbContext instance</returns>
    public async Task<SqlDbContext> CreateDbContextAsync(CancellationToken cancellationToken = default)
    {
        return await dbContextFactory.CreateDbContextAsync(cancellationToken);
    }

    /// <summary>
    /// Retrieves an entity of type T that matches the given expression
    /// </summary>
    /// <typeparam name="T">The type of the entity to retrieve</typeparam>
    /// <param name="getExpression">The expression to filter the entity</param>
    /// <param name="cancellationToken">Cancellation Token</param>
    /// <returns>The entity of type T if found; otherwise, null</returns>
    public async Task<T?> GetEntityAsync<T>(Expression<Func<T, bool>> getExpression, CancellationToken cancellationToken = default) where T : class
    {
        await using var context = await CreateDbContextAsync(cancellationToken);
        return await context.Set<T>().FirstOrDefaultAsync(getExpression, cancellationToken);
    }

    /// <summary>
    /// Retrieves an array of entities of type T that match the given filter expression
    /// </summary>
    /// <typeparam name="T">The type of the entities to retrieve</typeparam>
    /// <param name="whereExpression">The filter expression to apply to the entities</param>
    /// <param name="cancellationToken">Cancellation Token</param>
    /// <returns>An array of entities of type T</returns>
    public async Task<T[]> GetEntitiesAsync<T>(Expression<Func<T, bool>>? whereExpression = null, CancellationToken cancellationToken = default) where T : class
    {
        await using var context = await CreateDbContextAsync(cancellationToken);
        var dbSet = context.Set<T>();
        IQueryable<T> queryable = dbSet;
        if (whereExpression != null)
        {
            queryable = dbSet.Where(whereExpression);
        }

        return await queryable.ToArrayAsync(cancellationToken: cancellationToken);
    }
}