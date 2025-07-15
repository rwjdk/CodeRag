using JetBrains.Annotations;
using Shared;
using Shared.EntityFramework.DbModels;
using Shared.Projects;
using SimpleRag.Interfaces;

namespace Website.Services;

[UsedImplicitly]
public class ProjectIngestionService(ProjectCommand projectCommand, IServiceProvider serviceProvider) : IScopedService
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
            case SourceKind.CSharp:
                switch (source.Location)
                {
                    case SourceLocation.GitHub:
                        await source.AsCSharpSourceGitHub(project, serviceProvider).IngestAsync();
                        break;
                    default:
                        await source.AsCSharpSourceLocal(project, serviceProvider).IngestAsync();
                        break;
                }

                break;
            case SourceKind.Markdown:
                switch (source.Location)
                {
                    case SourceLocation.GitHub:
                        await source.AsMarkdownSourceGitHub(project, serviceProvider).IngestAsync();
                        break;
                    default:
                        await source.AsMarkdownSourceLocal(project, serviceProvider).IngestAsync();
                        break;
                }

                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        await projectCommand.UpdateLastSourceSyncDateAsync(source);
    }
}