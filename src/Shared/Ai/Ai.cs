namespace Shared.Ai;

public record Ai(string Endpoint, string Key, string EmbeddingModelDeploymentName, List<AiChatModel> Models);