using System.Diagnostics;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Shared.Ai.StructuredOutputModels;
using Shared.Ai.Tools;
using Shared.EntityFramework.DbModels;
using SimpleRag.DataSources;
using SimpleRag.DataSources.CSharp;
using SimpleRag.DataSources.Markdown;
using SimpleRag.DataSources.Pdf;
using SimpleRag.Interfaces;
using ChatMessageContent = Microsoft.SemanticKernel.ChatMessageContent;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiChatQuery : ProgressNotificationBase, IScopedService, IDisposable
{
    private readonly AiGenericQuery _aiGenericQuery;

    public AiChatQuery(AiGenericQuery aiGenericQuery)
    {
        _aiGenericQuery = aiGenericQuery;
        aiGenericQuery.NotifyProgress += OnNotifyProgress;
    }

    public async Task<ChatMessageContent?> GetAnswerAsync(
        AiChatModel chatModel,
        List<ChatMessageContent> previousConversation,
        string messageToSend,
        bool useSourceCodeSearch,
        bool useDocumentationSearch,
        bool usePdfSearch,
        int maxNumberOfAnswersBackFromSourceCodeSearch,
        int maxNumberOfAnswersBackFromDocumentationSearch,
        int maxNumberOfAnswersBackFromPdfSearch,
        ProjectEntity project)
    {
        long timestamp = Stopwatch.GetTimestamp();
        Kernel kernel = _aiGenericQuery.GetKernel(chatModel);

        Intent intent = await _aiGenericQuery.GetStructuredOutputResponse<Intent>(project, chatModel, $"You are an expert in the Code Repo '{project.Name}' that analyze the users message to find out if it is just pleasantries or a question and elaborate on it", messageToSend, false, false, 0, 0);

        List<ChatMessageContent> input = previousConversation.Select(x => new ChatMessageContent(x.Role, x.Content)).ToList();

        input.Add(new ChatMessageContent(AuthorRole.Assistant, intent.ElaboratedMessage));

        ChatMessageContent messageContent = new(AuthorRole.User, messageToSend);

        if (useSourceCodeSearch && !intent.IsMessageJustPleasantries)
        {
            SearchTool tool = _aiGenericQuery.ImportSearchPlugin(Constants.Tools.CSharp, DataSourceKind.CSharp, maxNumberOfAnswersBackFromSourceCodeSearch, project, kernel);
            var result = await tool.Search(intent.ElaboratedMessage);
            input.Add(new ChatMessageContent(AuthorRole.Assistant, "Relevant Code: " + result));
        }

        if (useDocumentationSearch && !intent.IsMessageJustPleasantries)
        {
            SearchTool tool = _aiGenericQuery.ImportSearchPlugin(Constants.Tools.Markdown, DataSourceKind.Markdown, maxNumberOfAnswersBackFromDocumentationSearch, project, kernel);
            string result = await tool.Search(intent.ElaboratedMessage);
            input.Add(new ChatMessageContent(AuthorRole.Assistant, "Relevant Documentation: " + result));
        }

        if (usePdfSearch && !intent.IsMessageJustPleasantries)
        {
            SearchTool tool = _aiGenericQuery.ImportSearchPlugin(Constants.Tools.Pdf, DataSourceKind.Pdf, maxNumberOfAnswersBackFromPdfSearch, project, kernel);
            string result = await tool.Search(intent.ElaboratedMessage);
            input.Add(new ChatMessageContent(AuthorRole.Assistant, "Relevant PDFs: " + result));
        }

        ChatCompletionAgent answerAgent = _aiGenericQuery.GetAgent(chatModel, project.GetFormattedDeveloperInstructions(), kernel);

        input.Add(messageContent);

        ChatMessageContent response = null!;

        OnNotifyProgress("Sending Request to AI");
        await foreach (AgentResponseItem<ChatMessageContent> item in answerAgent.InvokeAsync(input))
        {
            response = item.Message;
        }

        TimeSpan elapsedTime = Stopwatch.GetElapsedTime(timestamp);
        OnNotifyProgress($"Done - Total time: {Convert.ToInt32(elapsedTime.TotalSeconds)} sec");
        return response;
    }

    public List<AiChatModel> GetChatModels()
    {
        return _aiGenericQuery.GetChatModels();
    }

    public void Dispose()
    {
        _aiGenericQuery.NotifyProgress -= OnNotifyProgress;
    }
}