using CodeRag.Shared.BusinessLogic.Ai.Models;
using CodeRag.Shared.BusinessLogic.VectorStore.Models;

namespace CodeRag.Shared.BusinessLogic.CodeIngestion.Models;

public class CodeIngestionSettings
{
    public required CodeIngestionSource Source { get; set; }
    public required string SourcePath { get; set; }
    public required AzureOpenAiCredentials AzureOpenAiCredentials { get; set; }
    public required string AzureOpenAiEmbeddingDeploymentName { get; set; }
    public required VectorStoreSettings Target { get; set; }
    public bool DeletePreviousDataInCollection { get; set; }
    public List<string> CSharpFilesToIgnore { get; set; } = [];
    public List<string> CSharpFilesWithTheseSuffixesToIgnore { get; set; } = [];
    public List<string> CSharpFilesWithThesePrefixesToIgnore { get; set; } = [];
}