using JetBrains.Annotations;
using Shared;
using Shared.EntityFramework.DbModels;
using Shared.Ingestion;
using Shared.Projects;

namespace Website.Services;

[UsedImplicitly]
public class ProjectIngestionService(ProjectCommand projectCommand, IngestionMarkdownCommand ingestionMarkdownCommand, IngestionCSharpCommand ingestionCSharpCommand) : IScopedService
{
    public async Task IngestAsync(ProjectEntity project)
    {
        foreach (ProjectSourceEntity source in project.Sources)
        {
            await IngestAsync(project, source);
        }
    }

    private async Task IngestAsync(ProjectEntity project, ProjectSourceEntity source)
    {
        switch (source.Kind)
        {
            case ProjectSourceKind.CSharpCode:
                await ingestionCSharpCommand.IngestAsync(project, source);

                break;
            case ProjectSourceKind.Markdown:
                await ingestionMarkdownCommand.IngestAsync(project, source);
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        await projectCommand.UpdateLastSourceSyncDateAsync(source);
    }
}