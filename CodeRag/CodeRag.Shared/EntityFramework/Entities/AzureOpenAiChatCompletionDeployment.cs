using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OpenAI.Chat;

namespace CodeRag.Shared.EntityFramework.Entities;

public class AzureOpenAiChatCompletionDeployment
{
    public required Guid Id { get; init; }

    public required string DeploymentName { get; init; }

    public int? Temperature { get; init; }

    public string? ReasoningEffortLevel { get; init; }

    public required int TimeoutInSeconds { get; init; }
}