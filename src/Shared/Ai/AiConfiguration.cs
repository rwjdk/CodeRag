namespace Shared.Ai;

public record AiConfiguration(string Endpoint, string Key, string EmbeddingModelDeploymentName, List<AiChatModel> Models);