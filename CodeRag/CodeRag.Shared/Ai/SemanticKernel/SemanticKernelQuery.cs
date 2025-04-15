using System.Diagnostics;
using CodeRag.Shared.Ai.SemanticKernel.Plugins;
using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.Interfaces;
using CodeRag.Shared.VectorStore;
using CodeRag.Shared.VectorStore.Documentation;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Embeddings;
using OpenAI.Chat;
using ChatMessageContent = Microsoft.SemanticKernel.ChatMessageContent;

namespace CodeRag.Shared.Ai.SemanticKernel;

[UsedImplicitly]
public class SemanticKernelQuery(IDbContextFactory<SqlDbContext> dbContextFactory) : ProgressNotificationBase, IScopedService
{
    public ITextEmbeddingGenerationService GetTextEmbeddingGenerationService(Project project)
    {
        return new AzureOpenAITextEmbeddingGenerationService(project.AzureOpenAiEmbeddingModelDeploymentName, project.AzureOpenAiEndpoint, project.AzureOpenAiKey);
    }

    public async Task<ChatMessageContent?> GetAnswer(
        AzureOpenAiChatCompletionDeployment chatModel,
        List<ChatMessageContent> converstation,
        bool useSourceCodeSearch,
        bool useDocumentationSearch,
        int maxNumberOfAnswersBackFromSourceCodeSearch,
        double scoreShouldBeLowerThanThisInSourceCodeSearch,
        int maxNumberOfAnswersBackFromDoucumentationSearch,
        double scoreShouldBeLowerThanThisInDocumentSearch,
        Project project) //todo - support get a streaming answer
    {
        long timestamp = Stopwatch.GetTimestamp();
        IKernelBuilder kernelBuilder = Kernel.CreateBuilder();
        kernelBuilder.AddAzureOpenAIChatCompletion(chatModel.DeploymentName, project.AzureOpenAiEndpoint, project.AzureOpenAiKey, httpClient: new HttpClient
        {
            Timeout = TimeSpan.FromMinutes(chatModel.TimeoutInSeconds)
        });
        kernelBuilder.AddAzureOpenAITextEmbeddingGeneration(project.AzureOpenAiEmbeddingModelDeploymentName, project.AzureOpenAiEndpoint, project.AzureOpenAiKey);
        Kernel kernel = kernelBuilder.Build();

        ITextEmbeddingGenerationService embeddingGenerationService = kernel.GetRequiredService<ITextEmbeddingGenerationService>();

        if (useSourceCodeSearch)
        {
            var cSharpCollection = new SqlServerVectorStoreQuery(project.SqlServerVectorStoreConnectionString, dbContextFactory).GetCollection<CSharpCodeEntity>(Constants.VectorCollections.CSharpCodeVectorCollection);
            var codePlugin = new SourceCodeSearchPlugin(project.Id, embeddingGenerationService, cSharpCollection, maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, this);
            kernel.ImportPluginFromObject(codePlugin, Constants.SourceCodeSearchPluginName);
        }

        if (useDocumentationSearch)
        {
            var documentationCollection = new SqlServerVectorStoreQuery(project.SqlServerVectorStoreConnectionString, dbContextFactory).GetCollection<DocumentationVectorEntity>(Constants.VectorCollections.MarkdownVectorCollection);
            var docsPlugin = new DocumentationSearchPlugin(project.Id, embeddingGenerationService, documentationCollection, maxNumberOfAnswersBackFromDoucumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, this);
            kernel.ImportPluginFromObject(docsPlugin, Constants.DocumentationSearchPluginName);
        }

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

        ChatCompletionAgent answerAgent = new()
        {
            Instructions = project.TestChatDeveloperInstructions,
            Kernel = kernel,
            Arguments = new KernelArguments(executionSettings)
        };

        ChatMessageContent chatMessageContent = null!;

        OnNotifyProgress("Sending Request to AI");
        await foreach (AgentResponseItem<ChatMessageContent> item in answerAgent.InvokeAsync(converstation))
        {
            chatMessageContent = item.Message;
        }

        TimeSpan elapsedTime = Stopwatch.GetElapsedTime(timestamp);
        OnNotifyProgress($"Done - Total time: {Convert.ToInt32(elapsedTime.TotalSeconds)} sec");
        return chatMessageContent;
    }
}