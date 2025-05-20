namespace Shared.Ai;

public record AiConfiguration(string Endpoint, string Key, List<AiChatModel> Models);