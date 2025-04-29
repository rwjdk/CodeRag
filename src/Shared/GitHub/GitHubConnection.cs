namespace Shared.GitHub;

/// <summary>
/// Represent a GitHub Connection
/// </summary>
/// <param name="GitHubToken">Token to interact with the GitHub API</param>
public record GitHubConnection(string GitHubToken);