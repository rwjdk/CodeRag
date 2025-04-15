using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CodeRag.Shared.Ingestion.Documentation.Markdown;
using CodeRag.Shared.Ingestion.SourceCode;
using CodeRag.Shared.Ingestion.SourceCode.Csharp;

namespace CodeRag.Shared.EntityFramework.Entities;

public class Project
{
    [Key]
    public required Guid Id { get; init; }

    [Column(TypeName = "nvarchar(4000)")]
    public required string Name { get; init; }

    [Column(TypeName = "nvarchar(MAX)")]
    public required string Description { get; init; }

    [Column(TypeName = "nvarchar(4000)")]
    public required string RepoUrl { get; init; }

    [Column(TypeName = "nvarchar(4000)")]
    public required string RepoUrlSourceCode { get; init; }


    [Column(TypeName = "nvarchar(4000)")]
    public required string AzureOpenAiEndpoint { get; set; }

    [Column(TypeName = "nvarchar(4000)")]
    public required string AzureOpenAiKey { get; set; } //todo - should not store in clear text in DB, but doing it for now

    [Column(TypeName = "nvarchar(4000)")]
    public required string AzureOpenAiEmbeddingModelDeploymentName { get; set; }

    public required List<AzureOpenAiChatCompletionDeployment> AzureOpenAiChatCompletionDeployments { get; set; }

    [Column(TypeName = "nvarchar(4000)")]
    public required string SqlServerVectorStoreConnectionString { get; init; } //todo - should not store in clear text in DB, but doing it for now

    public required List<CodeSource> CodeSources { get; set; }

    public required List<DocumentationSource> DocumentationSources { get; set; }

    public required string TestChatDeveloperInstructions { get; init; }
    public string? DefaultTestChatInput { get; set; }
}