using System.Globalization;
using CodeRag.Shared.Prompting;

namespace CodeRag.Shared.Configuration;

public class Project
{
    public required Guid Id { get; init; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public required List<ProjectSource> Sources { get; set; }

    #region Azure OpenAi

    public string? AzureOpenAiEndpoint { get; set; }

    public string? AzureOpenAiKey { get; set; } //todo - should not store in clear text in DB, but doing it for now

    public string? AzureOpenAiEmbeddingModelDeploymentName { get; set; }

    public required List<ProjectAiModel> AzureOpenAiModelDeployments { get; set; }

    #endregion

    #region SQL server

    public string? SqlServerVectorStoreConnectionString { get; set; } //todo - should not store in clear text in DB, but doing it for now

    #endregion

    #region GitHub //todo - Support override of these on source level

    public string? GitHubOwner { get; set; }

    public string? GitHubRepo { get; set; }

    public string? GitHubToken { get; set; }

    #endregion

    #region Test Chat

    public required string TestChatDeveloperInstructions { get; set; }

    public string? DefaultTestChatInput { get; set; }

    #endregion

    public static Project Empty()
    {
        return new Project
        {
            Id = Guid.NewGuid(),
            Name = string.Empty,
            Sources = [],
            AzureOpenAiModelDeployments = [],
            TestChatDeveloperInstructions = Prompt
                .Create("You are an C# expert in {{NAME}} ({{DESCRIPTION}}. Assume all questions are about {{NAME}} unless specified otherwise")
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
            .Replace("{{DOC_SEARCH_TOOL}}", Constants.DocumentationSearchPluginName, true, CultureInfo.InvariantCulture)
            .Replace("{{CODE_SEARCH_TOOL}}", Constants.SourceCodeSearchPluginName, true, CultureInfo.InvariantCulture);
    }
}