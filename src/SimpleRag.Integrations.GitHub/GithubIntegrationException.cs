namespace SimpleRag.Integrations.GitHub;

public class GithubIntegrationException(string message, Exception? innerException = null) : Exception(message, innerException);