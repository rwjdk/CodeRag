using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;

namespace Shared.Projects;

/// <summary>
/// Query for Projects
/// </summary>
/// <param name="sqlServerQuery">General Query for SQL Server</param>
[UsedImplicitly]
public class ProjectQuery(SqlServerQuery sqlServerQuery) : IScopedService
{
    /// <summary>
    /// Retrieves all projects
    /// </summary>
    /// <returns>An array of project entities</returns>
    public async Task<ProjectEntity[]> GetProjectsAsync()
    {
        await using var dbContextAsync = await sqlServerQuery.CreateDbContextAsync();
        var entities = await dbContextAsync.Projects.Include(x => x.Sources).ToArrayAsync();
        return entities;
    }
}