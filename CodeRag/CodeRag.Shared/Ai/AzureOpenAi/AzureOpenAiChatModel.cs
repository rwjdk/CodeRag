using OpenAI.Chat;

namespace CodeRag.Shared.Ai.AzureOpenAi;

public class AzureOpenAiChatModel
{
    public required string DeploymentName { get; init; }
    public int? Temperature { get; init; }
    public ChatReasoningEffortLevel? ChatReasoningEffortLevel { get; init; }
    public required int TimeoutInSeconds { get; init; }
}