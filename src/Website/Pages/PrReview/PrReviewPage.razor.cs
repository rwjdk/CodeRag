using BlazorUtilities;
using Microsoft.AspNetCore.Components;
using Octokit;
using Shared.Ai;
using Shared.EntityFramework.DbModels;
using Shared.GitHub;
using Shared.Models;

namespace Website.Pages.PrReview;

public partial class PrReviewPage(GitHubQuery gitHubQuery, GitHubCommand gitHubCommand, AiQuery aiQuery)
{
    private PullRequest[]? _pullRequests;
    private PullRequest? _selectedPullRequest;
    private GitHubClient? _gitHubClient;
    private AiChatModel _chatModel = aiQuery.GetChatModels().First(); //todo - what if non exist
    private Review? _review;

    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    protected override async Task OnInitializedAsync()
    {
        if (string.IsNullOrWhiteSpace(Project.GitHubOwner) || string.IsNullOrWhiteSpace(Project.GitHubOwner))
        {
            return;
        }

        _gitHubClient = gitHubQuery.GetGitHubClient();
        _pullRequests = await gitHubQuery.GetOpenPullRequestAsync(_gitHubClient, Project.GitHubOwner, Project.GitHubRepo);
    }

    private async Task DoAiReview()
    {
        string prDiff = await gitHubQuery.GetPrDiff(_gitHubClient, Project.GitHubOwner, Project.GitHubRepo, _selectedPullRequest.Number);
        _review = await aiQuery.GetGithubPullRequestReview(_chatModel, prDiff);
    }

    private async Task AddPrReviewComment()
    {
        await gitHubCommand.AddPullRequestCommentAsync(_gitHubClient, Project.GitHubOwner, Project.GitHubRepo, _selectedPullRequest.Number, _review.GetPullRequestCommentAsMarkdown());
    }
}