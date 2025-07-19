using JetBrains.Annotations;
using Octokit;
using SimpleRag.Integrations.GitHub.Models;
using SimpleRag.Interfaces;

namespace Shared;

[UsedImplicitly]
public class GitHubPullRequestQuery(GitHubCredentials credentials) : IScopedService
{
    public bool IsGitHubTokenProvided => !string.IsNullOrWhiteSpace(credentials.GitHubToken);

    public GitHubClient GetGitHubClient()
    {
        if (string.IsNullOrWhiteSpace(credentials.GitHubToken))
        {
            throw new Exception("The optional GitHubToken configuration variable is not set so can't interact with GitHubApi");
        }

        return new GitHubClient(new ProductHeaderValue("CodeRag"))
        {
            Credentials = new Credentials(credentials.GitHubToken)
        };
    }

    public async Task<PullRequest[]> GetOpenPullRequestAsync(GitHubClient client, string owner, string repo)
    {
        IReadOnlyList<PullRequest> pullRequests = await client.PullRequest.GetAllForRepository(owner, repo, new PullRequestRequest
        {
            State = ItemStateFilter.Open
        });
        return pullRequests.ToArray();
    }

    public async Task<string> GetPrDiffAsync(GitHubClient client, string owner, string repo, int pullRequestNumber)
    {
        var apiUrl = $"https://api.github.com/repos/{owner}/{repo}/pulls/{pullRequestNumber}";
        var diffUrl = $"{apiUrl}";
        var diff = await client.Connection.Get<string>(
            new Uri(diffUrl),
            new Dictionary<string, string>(),
            "application/vnd.github.v3.diff"
        );

        return diff.Body;
    }
}