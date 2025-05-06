using System.Text;
using System.Text.Json;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Shared.Ai.StructuredOutputModels;
using Shared.EntityFramework.DbModels;

namespace Shared.Ai.Queries;

/// <summary>
/// Contains options to do AI Pull Requests
/// </summary>
/// <param name="aiGenericQuery">The Generic AI Query</param>
[UsedImplicitly]
public class AiPullRequestReviewQuery(AiGenericQuery aiGenericQuery) : IScopedService
{
    /// <summary>
    /// Retrieves a review for a GitHub pull request
    /// </summary>
    /// <param name="project">The project entity related to the pull request</param>
    /// <param name="chatModel">The AI chat model to use for generating the review</param>
    /// <param name="prDiffContent">The content of the pull request diff</param>
    /// <param name="instructions">Instructions to guide the review process</param>
    /// <returns>A review object representing the pull request review</returns>
    public async Task<Review> GetGithubPullRequestReview(ProjectEntity project, AiChatModel chatModel, string prDiffContent, string instructions)
    {
        Kernel kernel = aiGenericQuery.GetKernel(chatModel);
        if (project.ChatUseSourceCodeSearch)
        {
            aiGenericQuery.ImportCodeSearchPlugin(project.ChatMaxNumberOfAnswersBackFromSourceCodeSearch, project.ChatScoreShouldBeLowerThanThisInSourceCodeSearch, project, kernel);
        }

        if (project.ChatUseDocumentationSearch)
        {
            aiGenericQuery.ImportDocumentationSearchPlugin(project.ChatMaxNumberOfAnswersBackFromDocumentationSearch, project.ChatScoreShouldBeLowerThanThisInDocumentSearch, project, kernel);
        }

        ChatCompletionAgent agent = aiGenericQuery.GetAgent<Review>(chatModel, instructions, kernel);

        StringBuilder message = new();
        message.AppendLine("Please make a Code Review with the following information <pr_diff>");
        message.AppendLine("<pr_diff>");
        message.AppendLine(prDiffContent);
        message.AppendLine("</pr_diff>");
        message.AppendLine("Based on the above please do the review");

        await foreach (var content in agent.InvokeAsync(message.ToString()))
        {
            string json = content.Message.ToString();
            return JsonSerializer.Deserialize<Review>(json)!;
        }

        throw new Exception("Unable to get Review");
    }

    /// <summary>
    /// Retrieve a list of available AI chat models
    /// </summary>
    /// <returns>A list of AI chat models</returns>
    public List<AiChatModel> GetChatModels()
    {
        return aiGenericQuery.GetChatModels();
    }
}