using JetBrains.Annotations;
using Shared;
using Shared.EntityFramework.DbModels;
using Shared.Projects;
using SimpleRag.DataSources.CSharp;
using SimpleRag.DataSources.CSharp.Chunker;
using SimpleRag.DataSources.Markdown;
using SimpleRag.DataSources.Markdown.Chunker;
using SimpleRag.Integrations.GitHub;
using SimpleRag.Interfaces;
using SimpleRag.VectorStorage;

namespace Website.Services;

[UsedImplicitly]
public class ProjectIngestionService(ProjectCommand projectCommand, IGitHubQuery gitHubQuery, ICSharpChunker cSharpChunker, IMarkdownChunker markdownChunker, IVectorStoreQuery vectorStoreQuery, IVectorStoreCommand vectorStoreCommand) : IScopedService
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
                        await source.AsCSharpSourceGitHub(project, gitHubQuery, cSharpChunker, vectorStoreQuery, vectorStoreCommand).IngestAsync();
                        break;
                    default:
                        await source.AsCSharpSourceLocal(project, cSharpChunker, vectorStoreQuery, vectorStoreCommand).IngestAsync();
                        break;
                }

                break;
            case SourceKind.Markdown:
                switch (source.Location)
                {
                    case SourceLocation.GitHub:
                        await source.AsMarkdownSourceGitHub(project, gitHubQuery, markdownChunker, vectorStoreQuery, vectorStoreCommand).IngestAsync();
                        break;
                    default:
                        await source.AsMarkdownSourceLocal(project, markdownChunker, vectorStoreQuery, vectorStoreCommand).IngestAsync();
                        break;
                }

                break;
            default:
                throw new ArgumentOutOfRangeException();
        }

        await projectCommand.UpdateLastSourceSyncDateAsync(source);
    }
}