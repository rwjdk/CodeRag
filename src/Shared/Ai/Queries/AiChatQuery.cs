using System.ComponentModel;
using System.Diagnostics;
using System.Text;
using System.Text.Json;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Embeddings;
using OpenAI.Chat;
using Shared.Ai.StructuredOutputModels;
using Shared.Ai.Tools;
using Shared.Chunking.CSharp;
using Shared.EntityFramework.DbModels;
using Shared.Models;
using Shared.Prompting;
using Shared.VectorStore;
using ChatMessageContent = Microsoft.SemanticKernel.ChatMessageContent;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiChatQuery(AiGenericQuery aiGenericQuery) : ProgressNotificationBase, IScopedService
{
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
        Kernel kernel = aiGenericQuery.GetKernel(chatModel);

        List<ChatMessageContent> input = previousConversation.Select(x => new ChatMessageContent(x.Role, x.Content)).ToList();

        ITextEmbeddingGenerationService embeddingGenerationService = aiGenericQuery.GetTextEmbeddingGenerationService(kernel);

        ChatMessageContent messageContent = new(AuthorRole.User, messageToSend);
        previousConversation.Add(messageContent);
        input.Add(messageContent);

        if (useSourceCodeSearch)
        {
            var codeSearchTool = aiGenericQuery.ImportCodeSearchPlugin(maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, project, embeddingGenerationService, kernel);
            input.Add(new ChatMessageContent(AuthorRole.User, "Relevant Code: " + await codeSearchTool.Search(messageToSend)));
        }

        if (useDocumentationSearch)
        {
            SearchTool docsSearch = aiGenericQuery.ImportDocumentationSearchPlugin(maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, project, embeddingGenerationService, kernel);
            input.Add(new ChatMessageContent(AuthorRole.User, "Relevant Documentation: " + await docsSearch.Search(messageToSend)));
        }

        ChatCompletionAgent answerAgent = aiGenericQuery.GetAgent(chatModel, project.GetFormattedDeveloperInstructions(), kernel);

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
        return aiGenericQuery.GetChatModels();
    }
}