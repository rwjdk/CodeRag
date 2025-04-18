namespace CodeRag.Shared.Configuration;

public class ProjectAiModel
{
    public required string DeploymentName { get; init; }

    public int? Temperature { get; init; }

    public string? ReasoningEffortLevel { get; init; }

    public required int TimeoutInSeconds { get; init; }
}