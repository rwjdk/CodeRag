using JetBrains.Annotations;
using Octokit;

namespace Shared.GitHub;

[UsedImplicitly]
public class GitHubCommand : IScopedService
{
    public async Task AddPullRequestCommentAsync(GitHubClient client, string owner, string repo, int pullRequestNumber, string commentAsMarkdown)
    {
        await client.Issue.Comment.Create(owner, repo, pullRequestNumber, commentAsMarkdown);
    }
}