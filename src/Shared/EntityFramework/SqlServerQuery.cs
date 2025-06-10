using System.Linq.Expressions;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using SimpleRag.Abstractions;

namespace Shared.EntityFramework;

[UsedImplicitly]
public class SqlServerQuery(IDbContextFactory<SqlDbContext> dbContextFactory) : IScopedService
{
    public async Task<SqlDbContext> CreateDbContextAsync(CancellationToken cancellationToken = default)
    {
        return await dbContextFactory.CreateDbContextAsync(cancellationToken);
    }

    public async Task<T?> GetEntityAsync<T>(Expression<Func<T, bool>> getExpression, CancellationToken cancellationToken = default) where T : class
    {
        await using var context = await CreateDbContextAsync(cancellationToken);
        return await context.Set<T>().FirstOrDefaultAsync(getExpression, cancellationToken);
    }

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