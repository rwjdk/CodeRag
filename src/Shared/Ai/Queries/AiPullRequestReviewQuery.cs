using System.Text;
using System.Text.Json;
using JetBrains.Annotations;
using Shared.Ai.StructuredOutputModels;
using Shared.EntityFramework.DbModels;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiPullRequestReviewQuery(AiGenericQuery aiGenericQuery) : IScopedService
{
    public async Task<Review> GetGithubPullRequestReview(ProjectEntity project, AiChatModel chatModel, string prDiffContent, string instructions)
    {
        throw new NotImplementedException();
        /* todo
        Kernel kernel = aiGenericQuery.GetClient(chatModel);
        if (project.ChatUseSourceCodeSearch)
        {
            aiGenericQuery.GetCodeSearchPlugin(project.ChatMaxNumberOfAnswersBackFromSourceCodeSearch, project.ChatScoreShouldBeLowerThanThisInSourceCodeSearch, project, kernel);
        }

        if (project.ChatUseDocumentationSearch)
        {
            aiGenericQuery.GetDocumentationSearchPlugin(project.ChatMaxNumberOfAnswersBackFromDocumentationSearch, project.ChatScoreShouldBeLowerThanThisInDocumentSearch, project, kernel);
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
        */
    }

    public List<AiChatModel> GetChatModels()
    {
        return aiGenericQuery.GetChatModels();
    }
}