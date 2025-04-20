using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using CodeRag.Shared.Prompting;

namespace CodeRag.Shared.EntityFramework.DbModels;

[Table("Projects")]
public class ProjectEntity
{
    [Key]
    public Guid Id { get; private set; } = Guid.NewGuid();

    [MaxLength(100)]
    public string? Name { get; set; }

    [MaxLength(4000)]
    public string? Description { get; set; }

    public required ICollection<ProjectSourceEntity> Sources { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public required string DeveloperInstructions { get; set; }

    #region GitHub

    [MaxLength(100)]
    public string? GitHubOwner { get; set; }

    [MaxLength(500)]
    public string? GitHubRepo { get; set; }

    [MaxLength(500)]
    public string? GitHubToken { get; set; } //todo - Evaluate security of this (should properly be removed here and be part of a key vault)

    #endregion

    public static ProjectEntity Empty()
    {
        return new ProjectEntity
        {
            Id = Guid.NewGuid(),
            Name = string.Empty,
            Sources = [],
            DeveloperInstructions = Prompt
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

    public string GetFormattedDeveloperInstructions()
    {
        return DeveloperInstructions
            .Replace(Constants.Keywords.Name, Name, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.Description, Description, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.MarkdownSearchTool, Constants.Tools.Markdown, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.CSharpSearchTool, Constants.Tools.CSharp, true, CultureInfo.InvariantCulture);
    }
}