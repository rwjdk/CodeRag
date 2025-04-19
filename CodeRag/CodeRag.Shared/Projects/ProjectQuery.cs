using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.EntityFramework.DbModels;
using JetBrains.Annotations;

namespace CodeRag.Shared.Configuration;

[UsedImplicitly]
public class ProjectQuery(SqlServerQuery sqlServerQuery) : IScopedService
{
    public async Task<ProjectEntity[]> GetProjectsAsync()
    {
        return await sqlServerQuery.GetEntitiesAsync<ProjectEntity>();
    }
}