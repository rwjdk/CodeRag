using System.Text.Json.Serialization;
using CodeRag.Shared.BusinessLogic.Ai.Models;
using CodeRag.Shared.BusinessLogic.VectorStore.Models;

namespace CodeRag.Shared.Models;

public class Project
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required string Description { get; set; }
    public required string RepoUrl { get; set; }
    public required AzureOpenAiCredentials AzureOpenAiCredentials { get; set; }
    public required VectorStoreSettings SourceCodeVectorSettings { get; set; }
    public required List<ChatModel> ChatModels { get; set; }
}