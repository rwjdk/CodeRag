using System.Text.Json;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using OpenAI.Chat;
using Shared.Ai.Tools;
using Shared.EntityFramework.DbModels;
using SimpleRag;
using SimpleRag.DataSources;
using SimpleRag.Interfaces;
using ChatMessageContent = Microsoft.SemanticKernel.ChatMessageContent;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiGenericQuery(AiConfiguration aiConfiguration, Search search) : ProgressNotificationBase, IScopedService
{
    internal SearchTool ImportSearchPlugin(string toolName, DataSourceKind sourceKind, int maxNumberOfAnswersBack, ProjectEntity project, Kernel kernel)
    {
        var tool = new SearchTool(search, project.Id.ToString(), sourceKind, maxNumberOfAnswersBack, this);
        kernel.ImportPluginFromObject(tool, toolName);
        return tool;
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
            executionSettings.ReasoningEffort = chatModel.ReasoningEffortLevel switch
            {
                "low" => ChatReasoningEffortLevel.Low,
                "medium" => ChatReasoningEffortLevel.Medium,
                "high" => ChatReasoningEffortLevel.High,
                _ => executionSettings.ReasoningEffort
            };
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

    internal async Task<T> GetStructuredOutputResponse<T>(ProjectEntity project, AiChatModel chatModel, string instructions, string input, bool useSourceCodeSearch, bool useDocumentationSearch, int maxNumberOfAnswersBackFromSourceCodeSearch, int maxNumberOfAnswersBackFromDocumentationSearch)
    {
        Kernel kernel = GetKernel(chatModel);
        if (useSourceCodeSearch)
        {
            ImportSearchPlugin(Constants.Tools.CSharp, DataSourceKind.CSharp, maxNumberOfAnswersBackFromSourceCodeSearch, project, kernel);
        }

        if (useDocumentationSearch)
        {
            ImportSearchPlugin(Constants.Tools.Markdown, DataSourceKind.Markdown, maxNumberOfAnswersBackFromDocumentationSearch, project, kernel);
        }

        //todo - support PDF

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