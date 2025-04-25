namespace CodeRag.Shared.Ai;

public class AiChatModel
{
    public required string DeploymentName { get; init; }

    public int? Temperature { get; init; }

    public string? ReasoningEffortLevel { get; init; }

    public int TimeoutInSeconds { get; init; } = 100;
}