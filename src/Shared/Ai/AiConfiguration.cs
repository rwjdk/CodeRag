namespace Shared.Ai;

/// <summary>
/// The AI Configuration
/// </summary>
/// <param name="Endpoint">The Azure OpenAI endpoint</param>
/// <param name="Key">The Azure OpenAI key</param>
/// <param name="Models">The Available ChatModels</param>
public record AiConfiguration(string Endpoint, string Key, List<AiChatModel> Models);