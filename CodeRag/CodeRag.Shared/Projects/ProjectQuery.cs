using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.EntityFramework.DbModels;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace CodeRag.Shared.Configuration;

[UsedImplicitly]
public class ProjectQuery(SqlServerQuery sqlServerQuery) : IScopedService
{
    public async Task<ProjectEntity[]> GetProjectsAsync()
    {
        await using var dbContextAsync = await sqlServerQuery.CreateDbContextAsync();
        return await dbContextAsync.Projects.Include(x => x.Sources).ToArrayAsync();
    }
}