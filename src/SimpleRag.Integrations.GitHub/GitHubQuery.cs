using System.Text;
using JetBrains.Annotations;
using Octokit;
using SimpleRag.Abstractions;

namespace SimpleRag.Integrations.GitHub;

[UsedImplicitly]
public class GitHubQuery(GitHubConnection connection) : IScopedService
{
    public bool IsGitHubTokenProvided => !string.IsNullOrWhiteSpace(connection.GitHubToken);

    public GitHubClient GetGitHubClient()
    {
        if (string.IsNullOrWhiteSpace(connection.GitHubToken))
        {
            throw new GithubIntegrationException("The optional GitHubToken configuration variable is not set so can't interact with GitHubApi");
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

    public async Task<TreeResponse> GetTreeAsync(GitHubClient client, Commit commit, string owner, string repo, bool recursive)
    {
        if (recursive)
        {
            return await client.Git.Tree.GetRecursive(owner, repo, commit.Tree.Sha);
        }

        return await client.Git.Tree.Get(owner, repo, commit.Tree.Sha);
    }

    public async Task<Commit> GetLatestCommit(GitHubClient client, string owner, string repo)
    {
        Repository repository = await client.Repository.Get(owner, repo);
        string defaultBranch = repository.DefaultBranch; //todo - support other branches (https://github.com/rwjdk/CodeRag/issues/2)

        Reference reference = await client.Git.Reference.Get(owner, repo, $"heads/{defaultBranch}");

        return await client.Git.Commit.Get(owner, repo, reference.Object.Sha);
    }

    public async Task<string?> GetFileContentAsync(GitHubClient client, string gitHubOwner, string gitHubRepo, string path)
    {
        byte[]? fileContent = await client.Repository.Content.GetRawContent(gitHubOwner, gitHubRepo, path);
        return fileContent == null ? null : Encoding.UTF8.GetString(fileContent);
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