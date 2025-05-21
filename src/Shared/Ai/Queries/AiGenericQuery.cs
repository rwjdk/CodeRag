using JetBrains.Annotations;
using Shared.Ai.Tools;
using Shared.EntityFramework.DbModels;
using Shared.VectorStores;
using System.ClientModel;
using Azure.AI.OpenAI;
using Microsoft.Extensions.AI;
using OpenAI.Chat;
using ChatMessage = OpenAI.Chat.ChatMessage;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiGenericQuery(AiConfiguration aiConfiguration, VectorStoreQuery vectorStoreQuery) : ProgressNotificationBase, IScopedService
{
    internal SearchTool GetDocumentationSearchPlugin(int maxNumberOfAnswersBackFromDocumentationSearch, double scoreShouldBeLowerThanThisInDocumentSearch, ProjectEntity project, List<AITool> tools)
    {
        var collection = vectorStoreQuery.GetCollection();
        SearchTool tool = new(VectorStoreDataType.Documentation, project, collection, maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, this);
        tools.Add(AIFunctionFactory.Create(tool.Search, Constants.Tools.Markdown));
        return tool;
    }

    internal SearchTool GetCodeSearchPlugin(int maxNumberOfAnswersBackFromSourceCodeSearch, double scoreShouldBeLowerThanThisInSourceCodeSearch, ProjectEntity project, List<AITool> tools)
    {
        var collection = vectorStoreQuery.GetCollection();
        SearchTool tool = new(VectorStoreDataType.Code, project, collection, maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, this);
        tools.Add(AIFunctionFactory.Create(tool.Search, Constants.Tools.CSharp));
        return tool;
    }

    private AzureOpenAIClient GetClient(AiChatModel model)
    {
        AzureOpenAIClient client = new(new Uri(aiConfiguration.Endpoint), new ApiKeyCredential(aiConfiguration.Key), new AzureOpenAIClientOptions
        {
            NetworkTimeout = TimeSpan.FromSeconds(model.TimeoutInSeconds)
        });
        return client;
    }

    public IChatClient GetChatClient(AiChatModel chatModel)
    {
        ChatClient chatClient = GetClient(chatModel).GetChatClient(chatModel.DeploymentName);
        IChatClient client = new ChatClientBuilder(chatClient.AsIChatClient())
            .UseFunctionInvocation()
            .Build();
        return client;
    }

    internal async Task<T> GetStructuredOutputResponse<T>(ProjectEntity project, AiChatModel chatModel, string instructions, string input, bool useSourceCodeSearch, bool useDocumentationSearch, int maxNumberOfAnswersBackFromSourceCodeSearch, double scoreShouldBeLowerThanThisInSourceCodeSearch, int maxNumberOfAnswersBackFromDocumentationSearch, double scoreShouldBeLowerThanThisInDocumentSearch)
    {
        IChatClient chatClient = GetChatClient(chatModel);
        List<AITool> tools = [];
        if (useSourceCodeSearch)
        {
            GetCodeSearchPlugin(maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, project, tools);
        }

        if (useDocumentationSearch)
        {
            GetDocumentationSearchPlugin(maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, project, tools);
        }

        ChatResponse<T> chatResponse = await chatClient.GetResponseAsync<T>(input, new ChatOptions
        {
            AdditionalProperties = new AdditionalPropertiesDictionary
            {
                { "reasoning_effort", "high" } //todo - not tested
            },
            Tools = tools
        });

        return chatResponse.Result;
    }

    internal List<AiChatModel> GetChatModels()
    {
        return aiConfiguration.Models;
    }
}