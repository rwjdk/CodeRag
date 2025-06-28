using System.Text;
using JetBrains.Annotations;
using Octokit;
using SimpleRag.Integrations.GitHub;
using SimpleRag.Interfaces;

namespace Shared;

[UsedImplicitly]
public class GitHubPullRequestQuery(GitHubConnection connection) : IScopedService
{
    public bool IsGitHubTokenProvided => !string.IsNullOrWhiteSpace(connection.GitHubToken);

    public GitHubClient GetGitHubClient()
    {
        if (string.IsNullOrWhiteSpace(connection.GitHubToken))
        {
            throw new Exception("The optional GitHubToken configuration variable is not set so can't interact with GitHubApi");
        }

        return new GitHubClient(new ProductHeaderValue("CodeRag"))
        {
            Credentials = new Credentials(connection.GitHubToken)
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