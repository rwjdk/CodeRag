using CodeRag.Shared.BusinessLogic.Ai.AzureOpenAi;
using CodeRag.Shared.BusinessLogic.Ingestion.Documentation.Markdown;
using CodeRag.Shared.BusinessLogic.Ingestion.SourceCode.Csharp;
using CodeRag.Shared.BusinessLogic.VectorStore;

namespace CodeRag.Shared.Models;

public class Project
{
    public required Guid Id { get; init; }
    public required string Name { get; init; }
    public required string Description { get; init; }
    public required string RepoUrl { get; init; }
    public required string RepoUrlSourceCode { get; init; }
    public required string AzureOpenAiEmbeddingsDeploymentName { get; init; }
    public required AzureOpenAiCredentials AzureOpenAiCredentials { get; init; }
    public required VectorStoreSettings VectorSettings { get; init; }
    public required List<AzureOpenAiChatModel> ChatModels { get; init; }
    public required CSharpIngestionSettings CSharpSourceCodeIngestionSettings { get; init; }
    public required MarkdownIngestionSettings MarkdownIngestionSettings { get; init; }
    public required string TestChatDeveloperInstructions { get; init; }
    public required string? LocalSourceCodeRepoRoot { get; set; }
    public string? DefaultTestChatInput { get; set; }
}