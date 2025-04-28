using System.Text;
using System.Text.Json;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Shared.EntityFramework.DbModels;
using Shared.Models;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiPullRequestReviewQuery(AiGenericQuery aiGenericQuery) : IScopedService
{
    public async Task<Review> GetGithubPullRequestReview(ProjectEntity project, AiChatModel chatModel, string prDiffContent, string instructions)
    {
        Kernel kernel = aiGenericQuery.GetKernel(chatModel);
        if (project.ChatUseSourceCodeSearch)
        {
            aiGenericQuery.ImportCodeSearchPlugin(project.ChatMaxNumberOfAnswersBackFromSourceCodeSearch, project.ChatScoreShouldBeLowerThanThisInSourceCodeSearch, project, aiGenericQuery.GetTextEmbeddingGenerationService(kernel), kernel);
        }

        if (project.ChatUseDocumentationSearch)
        {
            aiGenericQuery.ImportDocumentationSearchPlugin(project.ChatMaxNumberOfAnswersBackFromDocumentationSearch, project.ChatScoreShouldBeLowerThanThisInDocumentSearch, project, aiGenericQuery.GetTextEmbeddingGenerationService(kernel), kernel);
        }

        var agent = aiGenericQuery.GetAgent<Review>(chatModel, instructions, kernel);

        StringBuilder message = new();
        message.AppendLine("Please make a Code Review with the following information <pr_diff>");
        message.AppendLine("<pr_diff>");
        message.AppendLine(prDiffContent);
        message.AppendLine("</pr_diff>");
        message.AppendLine("Based on the above please do the review");

        await foreach (var content in agent.InvokeAsync(message.ToString()))
        {
            var json = content.Message.ToString();
            return JsonSerializer.Deserialize<Review>(json)!;
        }

        throw new Exception("Unable to get Review");
    }

    public List<AiChatModel> GetChatModels()
    {
        return aiGenericQuery.GetChatModels();
    }
}