using System.Text;
using JetBrains.Annotations;
using Microsoft.CodeAnalysis;
using Octokit;
using Shared.EntityFramework.DbModels;

namespace Shared.GitHub;

/// <summary>
/// Represents a query related to GitHub
/// </summary>
[UsedImplicitly]
public class GitHubQuery(GitHubConnection connection) : IScopedService
{
    /// <summary>
    /// Is a GitHub Token Provided in Setup?
    /// </summary>
    public bool IsGitHubTokenProvided => !string.IsNullOrWhiteSpace(connection.GitHubToken);

    /// <summary>
    /// Returns a GitHub client instance
    /// </summary>
    /// <returns>A GitHub client object</returns>
    public GitHubClient GetGitHubClient()
    {
        if (string.IsNullOrWhiteSpace(connection.GitHubToken))
        {
            throw new GithubIntegrationException("The optional GitHubToken configuration variable is not set so can't interact with GitHubApi");
        }

        return new GitHubClient(new ProductHeaderValue(Constants.AppName))
        {
            Credentials = new Credentials(connection.GitHubToken)
        };
    }

    /// <summary>
    /// Retrieves open pull requests from a GitHub repository
    /// </summary>
    /// <param name="client">GitHub client instance for API communication</param>
    /// <param name="owner">Owner of the GitHub repository</param>
    /// <param name="repo">Name of the GitHub repository</param>
    /// <returns>Array of open pull requests</returns>
    public async Task<PullRequest[]> GetOpenPullRequestAsync(GitHubClient client, string owner, string repo)
    {
        IReadOnlyList<PullRequest> pullRequests = await client.PullRequest.GetAllForRepository(owner, repo, new PullRequestRequest
        {
            State = ItemStateFilter.Open
        });
        return pullRequests.ToArray();
    }

    /// <summary>
    /// Retrieves the tree structure of a repository
    /// </summary>
    /// <param name="client">The GitHub client to use for the request</param>
    /// <param name="owner">The owner of the repository</param>
    /// <param name="repo">The repository name</param>
    /// <param name="recursive">Indicates whether to retrieve the tree recursively</param>
    /// <returns>The tree response containing the repository tree</returns>
    public async Task<TreeResponse> GetTreeAsync(GitHubClient client, string owner, string repo, bool recursive)
    {
        var repository = await client.Repository.Get(owner, repo);
        string? defaultBranch = repository.DefaultBranch; //todo - support other branches (https://github.com/rwjdk/CodeRag/issues/2)

        var reference = await client.Git.Reference.Get(owner, repo, $"heads/{defaultBranch}");

        var commit = await client.Git.Commit.Get(owner, repo, reference.Object.Sha);
        if (recursive)
        {
            return await client.Git.Tree.GetRecursive(owner, repo, commit.Tree.Sha);
        }

        return await client.Git.Tree.Get(owner, repo, commit.Tree.Sha);
    }

    /// <summary>
    /// Retrieves the content of a file from a GitHub repository
    /// </summary>
    /// <param name="client">The GitHub client used for API calls</param>
    /// <param name="gitHubOwner">The owner of the GitHub repository</param>
    /// <param name="gitHubRepo">The name of the GitHub repository</param>
    /// <param name="path">The file path within the repository</param>
    /// <returns>The content of the file or null if not found</returns>
    public async Task<string?> GetFileContentAsync(GitHubClient client, string gitHubOwner, string gitHubRepo, string path)
    {
        byte[]? fileContent = await client.Repository.Content.GetRawContent(gitHubOwner, gitHubRepo, path);
        return fileContent == null ? null : Encoding.UTF8.GetString(fileContent);
    }

    /// <summary>
    /// Retrieves the diff of a pull request from a GitHub repository
    /// </summary>
    /// <param name="client">The GitHub client used to access the API</param>
    /// <param name="owner">The owner of the repository</param>
    /// <param name="repo">The name of the repository</param>
    /// <param name="pullRequestNumber">The number of the pull request</param>
    /// <returns>The diff content of the pull request as a string</returns>
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