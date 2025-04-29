using System.Diagnostics;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Embeddings;
using Shared.Ai.Tools;
using Shared.EntityFramework.DbModels;
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


    public async Task<ChatMessageContent?> GetAnswer(
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


        Intent intent = await _aiGenericQuery.GetStructuredOutputResponse<Intent>(project, chatModel, "You are an Agent that analyze the users message to find out if it is just pleasantries or a question", messageToSend, false, false, 0, 0, 0, 0);

        List<ChatMessageContent> input = previousConversation.Select(x => new ChatMessageContent(x.Role, x.Content)).ToList();

        ITextEmbeddingGenerationService embeddingGenerationService = _aiGenericQuery.GetTextEmbeddingGenerationService(kernel);

        ChatMessageContent messageContent = new(AuthorRole.User, messageToSend);
        input.Add(messageContent);

        if (useSourceCodeSearch && !intent.IsMessageJustPleasantries)
        {
            var codeSearchTool = _aiGenericQuery.ImportCodeSearchPlugin(maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, project, embeddingGenerationService, kernel);
            input.Add(new ChatMessageContent(AuthorRole.User, "Relevant Code: " + await codeSearchTool.Search(messageToSend)));
        }

        if (useDocumentationSearch && !intent.IsMessageJustPleasantries)
        {
            SearchTool docsSearch = _aiGenericQuery.ImportDocumentationSearchPlugin(maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, project, embeddingGenerationService, kernel);
            input.Add(new ChatMessageContent(AuthorRole.User, "Relevant Documentation: " + await docsSearch.Search(messageToSend)));
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

    private class Intent
    {
        public bool IsMessageJustPleasantries { get; set; }
    }

    public void Dispose()
    {
        _aiGenericQuery.NotifyProgress -= OnNotifyProgress;
    }
}