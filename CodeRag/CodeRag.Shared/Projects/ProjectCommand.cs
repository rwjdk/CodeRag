using System.Text.Json;
using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.EntityFramework.DbModels;
using JetBrains.Annotations;

namespace CodeRag.Shared.Configuration;

[UsedImplicitly]
public class ProjectCommand(SqlServerCommand sqlServerCommand) : IScopedService
{
    public async Task UpsertProjectAsync(ProjectEntity project)
    {
        await sqlServerCommand.UpsertAsync(x => x.Id == project.Id, project);
    }
}