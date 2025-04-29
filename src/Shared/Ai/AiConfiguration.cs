namespace Shared.Ai;

/// <summary>
/// The AI Configuration
/// </summary>
/// <param name="Endpoint">The Azure OpenAI endpoint</param>
/// <param name="Key">The Azure OpenAI key</param>
/// <param name="EmbeddingModelDeploymentName">The Deployment name of the Embedding-model that should be used for Vector Embeddings</param>
/// <param name="Models">The Available ChatModels</param>
public record AiConfiguration(string Endpoint, string Key, string EmbeddingModelDeploymentName, List<AiChatModel> Models);