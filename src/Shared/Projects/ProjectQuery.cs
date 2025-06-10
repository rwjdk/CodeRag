using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;
using SimpleRag.Abstractions;

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

    public async Task<ProjectEntity?> GetProjectAsync(string owner, string repoName)
    {
        await using var dbContextAsync = await sqlServerQuery.CreateDbContextAsync();
        return await dbContextAsync.Projects.Include(x => x.Sources).FirstOrDefaultAsync(x => x.GitHubOwner == owner && x.GitHubRepo == repoName);
    }
}