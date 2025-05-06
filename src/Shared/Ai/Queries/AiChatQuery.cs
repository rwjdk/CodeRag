using System.Diagnostics;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Embeddings;
using Shared.Ai.StructuredOutputModels;
using Shared.Ai.Tools;
using Shared.EntityFramework.DbModels;
using ChatMessageContent = Microsoft.SemanticKernel.ChatMessageContent;

namespace Shared.Ai.Queries;

/// <summary>
/// Represents a query for AI chat operations
/// </summary>
[UsedImplicitly]
public class AiChatQuery : ProgressNotificationBase, IScopedService, IDisposable
{
    private readonly AiGenericQuery _aiGenericQuery;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="aiGenericQuery">The Generic AI Query</param>
    public AiChatQuery(AiGenericQuery aiGenericQuery)
    {
        _aiGenericQuery = aiGenericQuery;
        aiGenericQuery.NotifyProgress += OnNotifyProgress;
    }

    /// <summary>
    /// Get an Answer from the AI using upfront Code and Documentation Search if configured and allowing Function Calling
    /// </summary>
    /// <param name="chatModel">The Chat-model to use</param>
    /// <param name="previousConversation">The previous conversation</param>
    /// <param name="messageToSend">The new message to send</param>
    /// <param name="useSourceCodeSearch">If Code Search is allowed</param>
    /// <param name="useDocumentationSearch">If Documentation Search is allowed</param>
    /// <param name="maxNumberOfAnswersBackFromSourceCodeSearch">Max number of answer back from Code Search Allowed</param>
    /// <param name="scoreShouldBeLowerThanThisInSourceCodeSearch">How low (more accurate) the search-score should be before code result is included</param>
    /// <param name="maxNumberOfAnswersBackFromDocumentationSearch">Max number of answer back from Documentation Search Allowed</param>
    /// <param name="scoreShouldBeLowerThanThisInDocumentSearch">How low (more accurate) the search-score should be before documentation result is included</param>
    /// <param name="project">The Project to answer questions for</param>
    /// <returns>The new Answer</returns>
    public async Task<ChatMessageContent?> GetAnswerAsync(
        AiChatModel chatModel,
        List<ChatMessageContent> previousConversation,
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
        Kernel kernel = _aiGenericQuery.GetKernel(chatModel);

        Intent intent = await _aiGenericQuery.GetStructuredOutputResponse<Intent>(project, chatModel, $"You are an expert in the Code Repo '{project.Name}' that analyze the users message to find out if it is just pleasantries or a question and elaborate on it", messageToSend, false, false, 0, 0, 0, 0);

        List<ChatMessageContent> input = previousConversation.Select(x => new ChatMessageContent(x.Role, x.Content)).ToList();

        input.Add(new ChatMessageContent(AuthorRole.Assistant, intent.ElaboratedMessage));

        ChatMessageContent messageContent = new(AuthorRole.User, messageToSend);

        if (useSourceCodeSearch && !intent.IsMessageJustPleasantries)
        {
            SearchTool codeSearchTool = _aiGenericQuery.ImportCodeSearchPlugin(maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, project, kernel);
            string[] result = await codeSearchTool.Search(intent.ElaboratedMessage);
            input.Add(new ChatMessageContent(AuthorRole.Assistant, "Relevant Code: " + string.Join(", ", result)));
        }

        if (useDocumentationSearch && !intent.IsMessageJustPleasantries)
        {
            SearchTool docsSearch = _aiGenericQuery.ImportDocumentationSearchPlugin(maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, project, kernel);
            string[] result = await docsSearch.Search(intent.ElaboratedMessage);
            input.Add(new ChatMessageContent(AuthorRole.Assistant, "Relevant Documentation: " + string.Join(",", result)));
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

    /// <summary>
    /// Retrieve a list of available AI chat models
    /// </summary>
    /// <returns>A list of AI chat models</returns>
    public List<AiChatModel> GetChatModels()
    {
        return _aiGenericQuery.GetChatModels();
    }

    /// <summary>
    /// Releases resources used by the object
    /// </summary>
    public void Dispose()
    {
        _aiGenericQuery.NotifyProgress -= OnNotifyProgress;
    }
}