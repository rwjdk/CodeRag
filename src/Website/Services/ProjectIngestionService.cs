using JetBrains.Annotations;
using Shared;
using Shared.EntityFramework.DbModels;
using Shared.Projects;
using SimpleRag.DataSources.CSharp;
using SimpleRag.DataSources.Markdown;
using SimpleRag.Interfaces;

namespace Website.Services;

[UsedImplicitly]
public class ProjectIngestionService(ProjectCommand projectCommand, MarkdownDataSourceCommand ingestionMarkdownCommand, CSharpDataSourceCommand ingestionCSharpCommand) : IScopedService
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
                        await ingestionCSharpCommand.IngestAsync(source.AsCSharpSourceGitHub(project));
                        break;
                    default:
                        await ingestionCSharpCommand.IngestAsync(source.AsCSharpSourceLocal(project));
                        break;
                }

                break;
            case SourceKind.Markdown:
                switch (source.Location)
                {
                    case SourceLocation.GitHub:
                        await ingestionMarkdownCommand.IngestAsync(source.AsMarkdownSourceGitHub(project));
                        break;
                    default:
                        await ingestionMarkdownCommand.IngestAsync(source.AsMarkdownSourceLocal(project));
                        break;
                }

                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        await projectCommand.UpdateLastSourceSyncDateAsync(source);
    }
}