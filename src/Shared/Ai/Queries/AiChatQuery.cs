using System.Diagnostics;
using JetBrains.Annotations;
using Microsoft.Extensions.AI;
using Shared.Ai.StructuredOutputModels;
using Shared.Ai.Tools;
using Shared.EntityFramework.DbModels;

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

    public async Task<ChatMessage?> GetAnswerAsync(
        AiChatModel chatModel,
        List<ChatMessage> previousConversation,
        string messageToSend,
        bool useSourceCodeSearch,
        bool useDocumentationSearch,
        int maxNumberOfAnswersBackFromSourceCodeSearch,
        double scoreShouldBeLowerThanThisInSourceCodeSearch,
        int maxNumberOfAnswersBackFromDocumentationSearch,
        double scoreShouldBeLowerThanThisInDocumentSearch,
        ProjectEntity project)
    {
        long timestamp = Stopwatch.GetTimestamp();
        IChatClient client = _aiGenericQuery.GetChatClient(chatModel);

        Intent intent = await _aiGenericQuery.GetStructuredOutputResponse<Intent>(project, chatModel, $"You are an expert in the Code Repo '{project.Name}' that analyze the users message to find out if it is just pleasantries or a question and elaborate on it", messageToSend, false, false, 0, 0, 0, 0);

        List<ChatMessage> input = previousConversation.Select(x => new ChatMessage(x.Role, x.Text)).ToList();

        input.Add(new ChatMessage(ChatRole.Assistant, intent.ElaboratedMessage));
        input.Add(new ChatMessage(ChatRole.System, project.GetFormattedDeveloperInstructions()));

        ChatMessage messageContent = new(ChatRole.User, messageToSend);

        List<AITool> tools = [];
        if (useSourceCodeSearch && !intent.IsMessageJustPleasantries)
        {
            SearchTool codeSearchTool = _aiGenericQuery.GetCodeSearchPlugin(maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, project, tools);
            //string[] result = await codeSearchTool.Search(intent.ElaboratedMessage); //todo - add back
            //input.Add(new ChatMessage(ChatRole.Assistant, "Relevant Code: " + string.Join(", ", result)));
        }

        if (useDocumentationSearch && !intent.IsMessageJustPleasantries)
        {
            SearchTool docsSearch = _aiGenericQuery.GetDocumentationSearchPlugin(maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, project, tools);
            //string[] result = await docsSearch.Search(intent.ElaboratedMessage); //todo - add back
            //input.Add(new ChatMessage(ChatRole.Assistant, "Relevant Documentation: " + string.Join(",", result)));
        }


        input.Add(messageContent);
        //todo - provide developer message
        //todo - provide reasoning effort
        string? chatModelReasoningEffortLevel = chatModel.ReasoningEffortLevel;
        string developerInstructions = project.GetFormattedDeveloperInstructions();

        OnNotifyProgress("Sending Request to AI");

        ChatResponse chatResponse = await client.GetResponseAsync(input, new ChatOptions
        {
            Tools = tools,
        });
        ChatMessage response = new(ChatRole.Assistant, chatResponse.Text);
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