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
        project.Sources =
        [
            new ProjectSourceEntity
            {
                Kind = ProjectSourceKind.Markdown,
                Name = "Test",
                Location = ProjectSourceLocation.Local,
                Path = "X:\\TrelloDotNet",
                PathSearchRecursive = false,
            }
        ];

        //todo - upsert do not on the sub-objects
        await sqlServerCommand.UpsertAsync(x => x.Id == project.Id, project);
    }
}