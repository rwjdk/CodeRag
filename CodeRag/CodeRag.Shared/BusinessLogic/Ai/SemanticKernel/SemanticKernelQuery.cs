using System.Diagnostics;
using CodeRag.Shared.BusinessLogic.Ai.AzureOpenAi;
using CodeRag.Shared.BusinessLogic.Ai.SemanticKernel.Plugins;
using CodeRag.Shared.BusinessLogic.VectorStore;
using CodeRag.Shared.BusinessLogic.VectorStore.Documentation;
using CodeRag.Shared.BusinessLogic.VectorStore.SourceCode;
using CodeRag.Shared.Models;
using CodeRag.Shared.ServiceLifetimes;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Embeddings;
using ChatMessageContent = Microsoft.SemanticKernel.ChatMessageContent;

namespace CodeRag.Shared.BusinessLogic.Ai.SemanticKernel;

[UsedImplicitly]
public class SemanticKernelQuery : ProgressNotificationBase, IScopedService
{
    public ITextEmbeddingGenerationService GetTextEmbeddingGenerationService(AzureOpenAiCredentials credentials, string azureOpenAiEmbeddingDeploymentName)
    {
        return new AzureOpenAITextEmbeddingGenerationService(azureOpenAiEmbeddingDeploymentName, credentials.Endpoint, credentials.Key);
    }

    public async Task<ChatMessageContent?> GetAnswer(
        AzureOpenAiChatModel chatModel,
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
        kernelBuilder.AddAzureOpenAIChatCompletion(chatModel.DeploymentName, project.AzureOpenAiCredentials.Endpoint, project.AzureOpenAiCredentials.Key, httpClient: new HttpClient
        {
            Timeout = TimeSpan.FromMinutes(chatModel.TimeoutInSeconds)
        });
        kernelBuilder.AddAzureOpenAITextEmbeddingGeneration(project.AzureOpenAiEmbeddingsDeploymentName, project.AzureOpenAiCredentials.Endpoint, project.AzureOpenAiCredentials.Key);
        Kernel kernel = kernelBuilder.Build();

        ITextEmbeddingGenerationService embeddingGenerationService = kernel.GetRequiredService<ITextEmbeddingGenerationService>();

        if (useSourceCodeSearch)
        {
            var sourceCodeCollection = new VectorStoreQuery(project.VectorSettings).GetCollection<SourceCodeVectorEntity>(project.VectorSettings.SourceCodeCollectionName);
            var codePlugin = new SourceCodeSearchPlugin(embeddingGenerationService, sourceCodeCollection, maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, this);
            kernel.ImportPluginFromObject(codePlugin, Constants.SourceCodeSearchPluginName);
        }

        if (useDocumentationSearch)
        {
            var documentationCollection = new VectorStoreQuery(project.VectorSettings).GetCollection<DocumentationVectorEntity>(project.VectorSettings.DocumentationCollectionName);
            var docsPlugin = new DocumentationSearchPlugin(embeddingGenerationService, documentationCollection, maxNumberOfAnswersBackFromDoucumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, this);
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

        if (chatModel.ChatReasoningEffortLevel.HasValue)
        {
            executionSettings.ReasoningEffort = chatModel.ChatReasoningEffortLevel.Value;
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