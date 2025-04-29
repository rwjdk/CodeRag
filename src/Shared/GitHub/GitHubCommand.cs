using JetBrains.Annotations;
using Octokit;

namespace Shared.GitHub;

/// <summary>
/// Command for GitHub operations
/// </summary>
[UsedImplicitly]
public class GitHubCommand : IScopedService
{
    /// <summary>
    /// Adds a comment to a pull request on GitHub
    /// </summary>
    /// <param name="client">GitHub client instance used for API calls</param>
    /// <param name="owner">Owner of the repository</param>
    /// <param name="repo">Name of the repository</param>
    /// <param name="pullRequestNumber">Number of the pull request</param>
    /// <param name="commentAsMarkdown">Comment content in Markdown format</param>
    /// <returns>A task representing the asynchronous operation</returns>
    public async Task AddPullRequestCommentAsync(GitHubClient client, string owner, string repo, int pullRequestNumber, string commentAsMarkdown)
    {
        await client.Issue.Comment.Create(owner, repo, pullRequestNumber, commentAsMarkdown);
    }
}