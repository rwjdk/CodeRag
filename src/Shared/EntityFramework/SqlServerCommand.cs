using System.Linq.Expressions;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using SimpleRag.Abstractions;

namespace Shared.EntityFramework;

[UsedImplicitly]
public class SqlServerCommand(IDbContextFactory<SqlDbContext> dbContextFactory) : IScopedService
{
    public async Task<SqlDbContext> CreateDbContextAsync(CancellationToken cancellationToken = default)
    {
        return await dbContextFactory.CreateDbContextAsync(cancellationToken);
    }

    public async Task RemoveAsync<T>(T entity, CancellationToken cancellationToken = default) where T : class
    {
        await using var context = await CreateDbContextAsync(cancellationToken);
        context.Set<T>().Remove(entity);
        await context.SaveChangesAsync(cancellationToken);
    }

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