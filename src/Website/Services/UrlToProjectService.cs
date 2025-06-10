using JetBrains.Annotations;
using Octokit;
using Shared.EntityFramework.DbModels;
using Shared.Projects;
using SimpleRag.Abstractions;
using SimpleRag.Abstractions.Models;
using SimpleRag.Integrations.GitHub;
using Website.Models;

namespace Website.Services;

[UsedImplicitly]
public class UrlToProjectService(GitHubQuery gitHubQuery, ProjectQuery projectQuery, ProjectCommand projectCommand, ProjectIngestionService projectIngestionService) : IScopedService
{
    public async Task<IResult> ConvertRepoUrlToProject(UrlToProjectServiceRequest request)
    {
        // Regex to match GitHub repo URLs and extract owner and repo name
        var regex = new System.Text.RegularExpressions.Regex(
            @"^https:\/\/github\.com\/(?<owner>[^\/]+)\/(?<repo>[^\/]+)(?:\/|$)",
            System.Text.RegularExpressions.RegexOptions.IgnoreCase);

        var match = regex.Match(request.RepoUrl);
        if (!match.Success)
        {
            return Results.BadRequest("Invalid GitHub repository URL.");
        }

        string owner = match.Groups["owner"].Value;
        string repoName = match.Groups["repo"].Value;

        GitHubClient client = gitHubQuery.GetGitHubClient();
        Repository repository;
        try
        {
            repository = await client.Repository.Get(owner, repoName);
        }
        catch (ApiException e)
        {
            return Results.BadRequest($"Could not retrieve Repo: {e.Message}");
        }

        if (repository.Private)
        {
            return Results.BadRequest($"Only Public Repos are supported. Get an self-hosted version of {Shared.Constants.AppName} to work with Private repos");
        }

        ProjectEntity? project = await projectQuery.GetProjectAsync(owner, repoName);
        if (project == null)
        {
            //New Project
            project = new()
            {
                Name = $"{owner}/{repoName}",
                Description = repository.Description,
                GitHubOwner = owner,
                GitHubRepo = repoName,
                Sources =
                [
                    new ProjectSourceEntity
                    {
                        Name = "C# Code",
                        Kind = RagSourceKind.CSharp,
                        Path = "/",
                        Recursive = true,
                        Location = RagSourceLocation.GitHub,
                    },
                    new ProjectSourceEntity
                    {
                        Name = "Markdown",
                        Kind = RagSourceKind.Markdown,
                        Path = "/",
                        Recursive = true,
                        Location = RagSourceLocation.GitHub,
                    }
                ]
            };
            await projectCommand.UpsertProjectAsync(project);
        }

        await projectIngestionService.IngestAsync(project);
        return Results.Ok();
    }
}