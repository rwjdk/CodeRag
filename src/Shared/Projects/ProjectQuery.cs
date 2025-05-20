using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;

namespace Shared.Projects;

[UsedImplicitly]
public class ProjectQuery(SqlServerQuery sqlServerQuery) : IScopedService
{
    public async Task<ProjectEntity[]> GetProjectsAsync()
    {
        await using var dbContextAsync = await sqlServerQuery.CreateDbContextAsync();
        var entities = await dbContextAsync.Projects.Include(x => x.Sources).ToArrayAsync();
        return entities;
    }
}