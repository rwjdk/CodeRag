using JetBrains.Annotations;
using Octokit;
using SimpleRag.Interfaces;

namespace Shared;

[UsedImplicitly]
public class GitHubPullRequestCommand : IScopedService
{
    public async Task AddPullRequestCommentAsync(GitHubClient client, string owner, string repo, int pullRequestNumber, string commentAsMarkdown)
    {
        await client.Issue.Comment.Create(owner, repo, pullRequestNumber, commentAsMarkdown);
    }
}