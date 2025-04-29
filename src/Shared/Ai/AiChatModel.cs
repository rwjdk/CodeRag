using JetBrains.Annotations;

namespace Shared.Ai;

/// <summary>
/// Represents configuration for an AI chat model
/// </summary>
[UsedImplicitly]
public class AiChatModel
{
    /// <summary>
    /// Name of the ChatModel (It's deployment name)
    /// </summary>
    public required string DeploymentName { get; init; }

    /// <summary>
    /// What Temperature the Model should use (NB: Reasoning Models do not support Temperature)
    /// </summary>
    public int? Temperature { get; init; }

    /// <summary>
    /// What Reasoning Effort should be used (If Model is a Reasoning Model (low, medium or high))
    /// </summary>
    public string? ReasoningEffortLevel { get; init; }

    /// <summary>
    /// How many seconds should Timeout be for used the Model (Reasoning Models might need this to be set higher than the default 100 sec)
    /// </summary>
    public int TimeoutInSeconds { get; init; } = 100;
}