using System.Globalization;
using CodeRag.Shared.Prompting;

namespace CodeRag.Shared.EntityFramework.Entities;

public class Project
{
    public required Guid Id { get; init; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? RepoUrl { get; set; }

    public string? AzureOpenAiEndpoint { get; set; }

    public string? AzureOpenAiKey { get; set; } //todo - should not store in clear text in DB, but doing it for now

    public string? AzureOpenAiEmbeddingModelDeploymentName { get; set; }

    public string? SqlServerVectorStoreConnectionString { get; set; } //todo - should not store in clear text in DB, but doing it for now

    public required string TestChatDeveloperInstructions { get; set; }

    public string? DefaultTestChatInput { get; set; }

    public string? GitHubToken { get; set; }

    public required List<CodeSource> CodeSources { get; set; }

    public required List<DocumentationSource> DocumentationSources { get; set; }

    public required List<AzureOpenAiChatCompletionDeployment> AzureOpenAiChatCompletionDeployments { get; set; }

    public static Project Empty()
    {
        return new Project
        {
            Id = Guid.NewGuid(),
            Name = "",
            CodeSources = [],
            DocumentationSources = [],
            AzureOpenAiChatCompletionDeployments = [],
            TestChatDeveloperInstructions = Prompt
                .Create("You are an C# expert in {{NAME}} ({{DESCRIPTION}} on [GitHub]({{REPO_URL}}]. Assume all questions are about {{NAME}} unless specified otherwise")
                .AddStep("Use tool '{{DOC_SEARCH_TOOL}}' to get an overview (break question down to keywords for the tool-usage but do NOT include words '{{NAME}}' in the tool request)")
                .AddStep("Next prepare your answer with current knowledge")
                .AddStep("If your answer include code-samples then use tool '{{CODE_SEARCH_TOOL}}' to check that you called methods correctly and classes and properties exist")
                .AddStep("Add citations from the relevant sources")
                .AddStep("Based on previous step prepare your final answer")
                .AddStep("The answer and code-examples should ALWAYS be Markdown format!")
                .ToString()
        };
    }

    public string GetFormattedTestChatInstructions()
    {
        return TestChatDeveloperInstructions
            .Replace("{{NAME}}", Name, true, CultureInfo.InvariantCulture)
            .Replace("{{DESCRIPTION}}", Description, true, CultureInfo.InvariantCulture)
            .Replace("{{REPO_URL}}", RepoUrl, true, CultureInfo.InvariantCulture)
            .Replace("{{DOC_SEARCH_TOOL}}", Constants.DocumentationSearchPluginName, true, CultureInfo.InvariantCulture)
            .Replace("{{CODE_SEARCH_TOOL}}", Constants.SourceCodeSearchPluginName, true, CultureInfo.InvariantCulture);
    }
}