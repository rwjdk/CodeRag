using System.Linq.Expressions;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Shared.EntityFramework;

/// <summary>
/// Generic SQL Ser Command
/// </summary>
/// <param name="dbContextFactory"></param>
[UsedImplicitly]
public class SqlServerCommand(IDbContextFactory<SqlDbContext> dbContextFactory) : IScopedService
{
    /// <summary>
    /// Creates a new instance of SqlDbContext
    /// </summary>
    /// <param name="cancellationToken">Cancellation Token</param>
    /// <returns>New SqlDbContext instance</returns>
    public async Task<SqlDbContext> CreateDbContextAsync(CancellationToken cancellationToken = default)
    {
        return await dbContextFactory.CreateDbContextAsync(cancellationToken);
    }

    /// <summary>
    /// Removes the specified entity from the data source
    /// </summary>
    /// <typeparam name="T">The type of the entity to remove</typeparam>
    /// <param name="entity">The entity to remove</param>
    /// <param name="cancellationToken">Cancellation Token</param>
    /// <returns>A task representing the asynchronous operation</returns>
    public async Task RemoveAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class
    {
        await using var context = await CreateDbContextAsync(cancellationToken);
        context.Set<T>().Remove(entity);
        await context.SaveChangesAsync(cancellationToken);
    }

    /// <summary>
    /// Inserts or updates an entity based on a condition
    /// </summary>
    /// <typeparam name="T">The type of the entity</typeparam>
    /// <param name="findExistingEntity">Expression to find an existing entity</param>
    /// <param name="entity">The entity to insert or update</param>
    /// <param name="cancellationToken">Cancellation Token</param>
    /// <returns>A task representing the asynchronous operation</returns>
    public async Task UpsertAsync<T>(Expression<Func<T, bool>> findExistingEntity, T entity, CancellationToken cancellationToken = default) where T : class
    {
        var context = await CreateDbContextAsync(cancellationToken);
        var dbSet = context.Set<T>();
        var existing = await dbSet.FirstOrDefaultAsync(findExistingEntity, cancellationToken: cancellationToken);
        if (existing != null)
        {
            context.Entry(existing).CurrentValues.SetValues(entity);
        }
        else
        {
            await dbSet.AddAsync(entity, cancellationToken);
        }

        await context.SaveChangesAsync(cancellationToken);
    }
}