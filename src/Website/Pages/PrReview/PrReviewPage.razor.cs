using BlazorUtilities;
using Microsoft.AspNetCore.Components;
using Octokit;
using Shared.Ai;
using Shared.Ai.Queries;
using Shared.Ai.StructuredOutputModels;
using Shared.EntityFramework.DbModels;
using SimpleRag.Integrations.GitHub;

namespace Website.Pages.PrReview;

public partial class PrReviewPage(GitHubQuery gitHubQuery, GitHubCommand gitHubCommand, AiPullRequestReviewQuery aiPullRequestReviewQuery)
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    private ProjectEntity? _previousProject;
    private PullRequest[]? _pullRequests;
    private PullRequest? _selectedPullRequest;
    private GitHubClient? _gitHubClient;
    private AiChatModel _chatModel = aiPullRequestReviewQuery.GetChatModels().First();
    private Review? _review;

    protected override async Task OnParametersSetAsync()
    {
        if (!EqualityComparer<ProjectEntity>.Default.Equals(Project, _previousProject))
        {
            _previousProject = Project;
            _selectedPullRequest = null;
            _pullRequests = null;
            _review = null;
            await OnInitializedAsync();
        }
    }

    protected override async Task OnInitializedAsync()
    {
        try
        {
            if (!gitHubQuery.IsGitHubTokenProvided || string.IsNullOrWhiteSpace(Project.GitHubOwner) || string.IsNullOrWhiteSpace(Project.GitHubRepo))
            {
                return;
            }

            _gitHubClient = gitHubQuery.GetGitHubClient();
            _pullRequests = await gitHubQuery.GetOpenPullRequestAsync(_gitHubClient, Project.GitHubOwner, Project.GitHubRepo);
        }
        catch (Exception e)
        {
            BlazorUtils.ShowErrorWithDetails("Error loading Pull Request Review Page", e);
        }
    }

    private async Task DoAiReview()
    {
        using WorkingProgress workingProgress = BlazorUtils.StartWorking();
        string prDiff = await gitHubQuery.GetPrDiffAsync(_gitHubClient!, Project.GitHubOwner!, Project.GitHubRepo!, _selectedPullRequest!.Number);
        _review = await aiPullRequestReviewQuery.GetGithubPullRequestReview(Project, _chatModel, prDiff, Project.PullRequestReviewInstructions ?? ProjectEntity.GeneratePullRequestReviewInstructions());
    }

    private async Task AddPrReviewComment()
    {
        await gitHubCommand.AddPullRequestCommentAsync(_gitHubClient!, Project.GitHubOwner!, Project.GitHubRepo!, _selectedPullRequest!.Number, _review!.GetPullRequestCommentAsMarkdown());
    }
}