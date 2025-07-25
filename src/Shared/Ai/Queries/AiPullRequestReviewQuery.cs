using System.Text;
using System.Text.Json;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Shared.Ai.StructuredOutputModels;
using Shared.EntityFramework.DbModels;
using SimpleRag.DataSources;
using SimpleRag.DataSources.CSharp;
using SimpleRag.DataSources.Markdown;
using SimpleRag.Interfaces;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiPullRequestReviewQuery(AiGenericQuery aiGenericQuery) : IScopedService
{
    public async Task<Review> GetGitHubPullRequestReview(ProjectEntity project, AiChatModel chatModel, string prDiffContent, string instructions)
    {
        Kernel kernel = aiGenericQuery.GetKernel(chatModel);
        if (project.ChatUseSourceCodeSearch)
        {
            aiGenericQuery.ImportSearchPlugin(Constants.Tools.CSharp, DataSourceKind.CSharp, project.ChatMaxNumberOfAnswersBackFromSourceCodeSearch, project, kernel);
        }

        if (project.ChatUseDocumentationSearch)
        {
            aiGenericQuery.ImportSearchPlugin(Constants.Tools.Markdown, DataSourceKind.Markdown, project.ChatMaxNumberOfAnswersBackFromDocumentationSearch, project, kernel);
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

    public List<AiChatModel> GetChatModels()
    {
        return aiGenericQuery.GetChatModels();
    }
}