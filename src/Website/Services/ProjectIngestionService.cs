using JetBrains.Annotations;
using Shared.EntityFramework.DbModels;
using Shared.Projects;
using SimpleRag.Abstractions;
using SimpleRag.Abstractions.Models;
using SimpleRag.Source.CSharp;
using SimpleRag.Source.Markdown;

namespace Website.Services;

[UsedImplicitly]
public class ProjectIngestionService(ProjectCommand projectCommand, MarkdownSourceCommand ingestionMarkdownCommand, CSharpSourceCommand ingestionCSharpCommand) : IScopedService
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
                await ingestionCSharpCommand.IngestAsync(source.AsCSharpSource(project));
                break;
            case SourceKind.Markdown:
                await ingestionMarkdownCommand.IngestAsync(source.AsMarkdownSource(project));
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        await projectCommand.UpdateLastSourceSyncDateAsync(source);
    }
}