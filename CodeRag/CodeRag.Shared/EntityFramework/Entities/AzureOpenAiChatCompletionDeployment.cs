using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using OpenAI.Chat;

namespace CodeRag.Shared.EntityFramework.Entities;

public class AzureOpenAiChatCompletionDeployment
{
    [Key]
    public required Guid Id { get; init; }

    [Column(TypeName = "nvarchar(4000)")]
    public required string DeploymentName { get; init; }

    public int? Temperature { get; init; }

    [Column(TypeName = "nvarchar(4000)")]
    public string? ReasoningEffortLevel { get; init; }

    public required int TimeoutInSeconds { get; init; }
}