using System.Text.Json;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using OpenAI.Chat;
using Shared.Ai.Tools;
using Shared.EntityFramework.DbModels;
using Shared.VectorStores;
using ChatMessageContent = Microsoft.SemanticKernel.ChatMessageContent;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiGenericQuery(AiConfiguration aiConfiguration, VectorStoreQuery vectorStoreQuery) : ProgressNotificationBase, IScopedService
{
    internal SearchTool ImportDocumentationSearchPlugin(int maxNumberOfAnswersBackFromDocumentationSearch, double scoreShouldBeLowerThanThisInDocumentSearch, ProjectEntity project, Kernel kernel)
    {
        var collection = vectorStoreQuery.GetCollection();
        var docsTool = new SearchTool(VectorStoreDataType.Documentation, project, collection, maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, this);
        kernel.ImportPluginFromObject(docsTool, Constants.Tools.Markdown);
        return docsTool;
    }

    internal SearchTool ImportCodeSearchPlugin(int maxNumberOfAnswersBackFromSourceCodeSearch, double scoreShouldBeLowerThanThisInSourceCodeSearch, ProjectEntity project, Kernel kernel)
    {
        var collection = vectorStoreQuery.GetCollection();
        var codePlugin = new SearchTool(VectorStoreDataType.Code, project, collection, maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, this);
        kernel.ImportPluginFromObject(codePlugin, Constants.Tools.CSharp);
        return codePlugin;
    }

    internal ChatCompletionAgent GetAgent<T>(AiChatModel chatModel, string instructions, Kernel kernel)
    {
        AzureOpenAIPromptExecutionSettings executionSettings = new()
        {
            FunctionChoiceBehavior = FunctionChoiceBehavior.Auto(),
            ResponseFormat = typeof(T)
        };

        if (chatModel.Temperature.HasValue)
        {
            executionSettings.Temperature = chatModel.Temperature.Value;
        }

        if (!string.IsNullOrWhiteSpace(chatModel.ReasoningEffortLevel))
        {
            switch (chatModel.ReasoningEffortLevel)
            {
                case "low":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.Low;
                    break;
                case "medium":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.Medium;
                    break;
                case "high":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.High;
                    break;
            }
        }

        ChatCompletionAgent agent = new()
        {
            Instructions = instructions,
            Kernel = kernel,
            Arguments = new KernelArguments(executionSettings)
        };
        return agent;
    }

    internal ChatCompletionAgent GetAgent(AiChatModel chatModel, string instructions, Kernel kernel)
    {
        AzureOpenAIPromptExecutionSettings executionSettings = new()
        {
            FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
        };
        if (chatModel.Temperature.HasValue)
        {
            executionSettings.Temperature = chatModel.Temperature.Value;
        }

        if (!string.IsNullOrWhiteSpace(chatModel.ReasoningEffortLevel))
        {
            switch (chatModel.ReasoningEffortLevel)
            {
                case "low":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.Low;
                    break;
                case "medium":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.Medium;
                    break;
                case "high":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.High;
                    break;
            }
        }

        ChatCompletionAgent agent = new()
        {
            Instructions = instructions,
            Kernel = kernel,
            Arguments = new KernelArguments(executionSettings)
        };
        return agent;
    }

    internal Kernel GetKernel(AiChatModel chatModel)
    {
        IKernelBuilder kernelBuilder = Kernel.CreateBuilder();
        kernelBuilder.AddAzureOpenAIChatCompletion(chatModel.DeploymentName, aiConfiguration.Endpoint, aiConfiguration.Key, httpClient: new HttpClient
        {
            Timeout = TimeSpan.FromMinutes(chatModel.TimeoutInSeconds)
        });
        Kernel kernel = kernelBuilder.Build();
        return kernel;
    }

    internal async Task<T> GetStructuredOutputResponse<T>(ProjectEntity project, AiChatModel chatModel, string instructions, string input, bool useSourceCodeSearch, bool useDocumentationSearch, int maxNumberOfAnswersBackFromSourceCodeSearch, double scoreShouldBeLowerThanThisInSourceCodeSearch, int maxNumberOfAnswersBackFromDocumentationSearch, double scoreShouldBeLowerThanThisInDocumentSearch)
    {
        Kernel kernel = GetKernel(chatModel);
        if (useSourceCodeSearch)
        {
            ImportCodeSearchPlugin(maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, project, kernel);
        }

        if (useDocumentationSearch)
        {
            ImportDocumentationSearchPlugin(maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, project, kernel);
        }

        ChatCompletionAgent agent = GetAgent<T>(chatModel, instructions, kernel);

        string json = string.Empty;
        await foreach (AgentResponseItem<ChatMessageContent> item in agent.InvokeAsync(new ChatMessageContent(AuthorRole.User, input)))
        {
            json = item.Message.ToString();
        }

        return JsonSerializer.Deserialize<T>(json)!;
    }

    internal List<AiChatModel> GetChatModels()
    {
        return aiConfiguration.Models;
    }
}