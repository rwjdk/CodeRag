using System.Globalization;
using CodeRag.Shared.Prompting;

namespace CodeRag.Shared.Configuration;

public class Project
{
    public required Guid Id { get; init; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public required List<ProjectSource> Sources { get; set; }

    public required List<ProjectAiModel> AzureOpenAiModelDeployments { get; set; }

    #region GitHub //todo - Support override of these on source level

    public string? GitHubOwner { get; set; }

    public string? GitHubRepo { get; set; }

    public string? GitHubToken { get; set; } //todo - should this be moved to Program.cs (gut feeling is no as it is an optional thing)

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
                .Create($"You are an C# expert in {Constants.Keywords.Name} ({Constants.Keywords.Description}. Assume all questions are about {Constants.Keywords.Name} unless specified otherwise")
                .AddStep($"Use tool '{Constants.Keywords.MarkdownSearchTool}' to get an overview (break question down to keywords for the tool-usage but do NOT include words '{Constants.Keywords.Name}' in the tool request)")
                .AddStep("Next prepare your answer with current knowledge")
                .AddStep($"If your answer include code-samples then use tool '{Constants.Keywords.CSharpSearchTool}' to check that you called methods correctly and classes and properties exist")
                .AddStep("Add citations from the relevant sources")
                .AddStep("Based on previous step prepare your final answer")
                .AddStep("The answer and code-examples should ALWAYS be Markdown format!")
                .ToString()
        };
    }

    public string GetFormattedTestChatInstructions()
    {
        return TestChatDeveloperInstructions
            .Replace(Constants.Keywords.Name, Name, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.Description, Description, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.MarkdownSearchTool, Constants.Tools.Markdown, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.CSharpSearchTool, Constants.Tools.CSharp, true, CultureInfo.InvariantCulture);
    }
}