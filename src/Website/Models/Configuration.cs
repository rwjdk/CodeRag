using Shared.Ai;

namespace Website.Models;

public record Configuration(string Endpoint, string Key, string EmbeddingDeploymentName, string SqlServerConnectionString, string GitHubToken, List<AiChatModel> ChatModels);