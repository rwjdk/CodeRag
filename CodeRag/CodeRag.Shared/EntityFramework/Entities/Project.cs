namespace CodeRag.Shared.EntityFramework.Entities;

public class Project
{
    public required Guid Id { get; init; }

    public required string Name { get; init; }

    public required string Description { get; init; }

    public required string RepoUrl { get; init; }

    public required string AzureOpenAiEndpoint { get; set; }

    public required string AzureOpenAiKey { get; set; } //todo - should not store in clear text in DB, but doing it for now

    public required string AzureOpenAiEmbeddingModelDeploymentName { get; set; }

    public required List<AzureOpenAiChatCompletionDeployment> AzureOpenAiChatCompletionDeployments { get; set; }

    public required string SqlServerVectorStoreConnectionString { get; init; } //todo - should not store in clear text in DB, but doing it for now

    public required List<CodeSource> CodeSources { get; set; }

    public required List<DocumentationSource> DocumentationSources { get; set; }

    public required string TestChatDeveloperInstructions { get; init; }

    public string? DefaultTestChatInput { get; set; }
}