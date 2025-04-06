using CodeRag.Shared.BusinessLogic.Ai.Models;
using CodeRag.Shared.BusinessLogic.Ai.Plugins;
using CodeRag.Shared.BusinessLogic.VectorStore;
using CodeRag.Shared.BusinessLogic.VectorStore.Models;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Embeddings;
using OpenAI.Chat;
using ChatMessageContent = Microsoft.SemanticKernel.ChatMessageContent;

namespace CodeRag.Shared.BusinessLogic.Ai;

[UsedImplicitly]
public class SemanticKernelQuery
{
    public ITextEmbeddingGenerationService GetTextEmbeddingGenerationService(AzureOpenAiCredentials credentials, string azureOpenAiEmbeddingDeploymentName)
    {
        return new AzureOpenAITextEmbeddingGenerationService(azureOpenAiEmbeddingDeploymentName, credentials.Endpoint, credentials.Key);
    }

    public async Task<ChatMessageContent?> GetAnswer(ChatModel chatModel, List<ChatMessageContent> converstation, AzureOpenAiCredentials azureOpenAiCredentials, VectorStoreSettings vectorStoreSettings) //todo - support get a streaming answer
    {
        IKernelBuilder kernelBuilder = Kernel.CreateBuilder();
        kernelBuilder.AddAzureOpenAIChatCompletion(chatModel.DeploymentName, azureOpenAiCredentials.Endpoint, azureOpenAiCredentials.Key, httpClient: new HttpClient
        {
            Timeout = TimeSpan.FromMinutes(5) //todo - timeout should be configurable
        });
        kernelBuilder.AddAzureOpenAITextEmbeddingGeneration("text-embedding-3-small", azureOpenAiCredentials.Endpoint, azureOpenAiCredentials.Key); //todo remove hard-code- Embedding model should be in ChatModel object with a type
        Kernel kernel = kernelBuilder.Build();

        ITextEmbeddingGenerationService embeddingGenerationService = kernel.GetRequiredService<ITextEmbeddingGenerationService>();

        IVectorStoreRecordCollection<string, SourceCodeVectorEntity> sourceCodeCollection = new VectorStoreQuery(vectorStoreSettings).GetCollection<SourceCodeVectorEntity>();
        //todo - IVectorStoreRecordCollection<string, DocumentationVectorEntity> docsCollection = sqlServerVectorStore.GetCollection<string, DocumentationVectorEntity>(settings.VectorStoreDocsCollectionName);

        kernel.ImportPluginFromObject(new SourceCodeSearchPlugin(embeddingGenerationService, sourceCodeCollection), Constants.SourceCodeSearchPluginName);
        //todo - docs plugin

        AzureOpenAIPromptExecutionSettings executionSettings;
        if (chatModel.IsO3ReasonModel)
        {
            executionSettings = new AzureOpenAIPromptExecutionSettings
            {
                ReasoningEffort = ChatReasoningEffortLevel.High,
                FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
            };
        }
        else
        {
            executionSettings = new AzureOpenAIPromptExecutionSettings
            {
                Temperature = 0,
                FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
            };
        }

        ChatCompletionAgent answerAgent = new()
        {
            Instructions = "You are an AI", //todo - settings should have developer prompt
            Kernel = kernel,
            Arguments = new KernelArguments(executionSettings)
        };

        ChatMessageContent chatMessageContent = null!;

        await foreach (AgentResponseItem<ChatMessageContent> item in answerAgent.InvokeAsync(converstation))
        {
            chatMessageContent = item.Message;
        }

        return chatMessageContent;
    }
}