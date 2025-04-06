namespace CodeRag.Shared.BusinessLogic.Ai.Models;

public class ChatModel
{
    public required string DeploymentName { get; set; }
    public required bool IsO3ReasonModel { get; set; } //todo - find better way
}