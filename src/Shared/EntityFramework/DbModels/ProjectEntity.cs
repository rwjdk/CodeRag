using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using Shared.Prompting;

namespace Shared.EntityFramework.DbModels;

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
    public required string ChatInstructions { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public required string PullRequestReviewInstructions { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public required string CSharpXmlSummaryInstructions { get; set; }

    #region GitHub

    [MaxLength(100)]
    public string? GitHubOwner { get; set; }

    [MaxLength(500)]
    public string? GitHubRepo { get; set; }

    #endregion

    public static ProjectEntity Empty()
    {
        return new ProjectEntity
        {
            Id = Guid.NewGuid(),
            Name = string.Empty,
            Sources = [],
            ChatInstructions = Prompt
                .Create($"You are an C# expert in {Constants.Keywords.Name} ({Constants.Keywords.Description}. Assume all questions are about {Constants.Keywords.Name} unless specified otherwise")
                .AddStep($"Use tool '{Constants.Keywords.MarkdownSearchTool}' to get an overview (break question down to keywords for the tool-usage but do NOT include words '{Constants.Keywords.Name}' in the tool request)")
                .AddStep("Next prepare your answer with current knowledge")
                .AddStep($"If your answer include code-samples then use tool '{Constants.Keywords.CSharpSearchTool}' to check that you called methods correctly and classes and properties exist")
                .AddStep("Add citations from the relevant sources")
                .AddStep("Based on previous step prepare your final answer")
                .AddStep("The answer and code-examples should ALWAYS be Markdown format!")
                .ToString(),
            CSharpXmlSummaryInstructions = Prompt.Create("You are an C# Expert that can generate XML Summaries.")
                .AddRule($"Always use all tools available ('{Constants.Tools.CSharp}' and '{Constants.Tools.Markdown}') before you provide your answer")
                .AddRule("Always report back in C# XML Summary Format and describe all parameters and the return type")
                .AddRule("Do not mention that the method is asynchronously and that the Cancellation-token can be used")
                .AddRule("The description should be short and focus on what the C# entity do")
                .AddRule("CancellationToken params should just be referred to as 'Cancellation Token'")
                .AddRule("Do not use cref")
                .AddRule("Don't use wording 'with the specified options' and similar. Be short and on point")
                .AddRule("Don't end the sentences with '.'")
                .ToString(),
            PullRequestReviewInstructions = Prompt.Create("You are a highly experienced and extremely thorough C# code reviewer. Your task is to review the provided GitHub PR diff.")
                .AddStep("You will particularly pay attention to logical and performance bugs and regressions, and generally be very meticulous in determining what this PR introduces in terms of new and/or changed features and/or behaviors.")
                .AddStep("Next, you will perform a very thorough review, but not output your results yet.")
                .AddStep("You will then review the code again, and make sure you haven't missed anything in your first review.")
                .AddStep($"Should you at any point discover that it would be beneficial to you as the reviewer to see additional types, then use tools tools available ('{Constants.Tools.CSharp}' and '{Constants.Tools.Markdown}')")
                .AddStep("Once your initial review as well as your second pass through has been completed, go through all your findings and double-check that you didn't make a mistake, it's important that you do not point out any errors that are not actually errors, likewise its equally important that you don't miss or leave out any actual bugs.")
                .AddRule("If you are in doubt whether something is a problem or not, you will include the details in your review, making sure to mention your uncertainty for the relevant points.")
                .AddRule("Always keep your answers short and concise but sufficient for me to complete the task of understanding your concerns/findings, and for me to implement your suggested changes. ")
                .AddRule("Assume that all code can compile and use the latest C# Syntax Rules (Please note that in the latest C# you can use [] for list initializers so do not report this back as a bug)")
                .AddRule("Don't comment on 'missing newline at the end of the file'").ToString(),
        };
    }

    public string GetFormattedDeveloperInstructions()
    {
        return ChatInstructions
            .Replace(Constants.Keywords.Name, Name, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.Description, Description, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.MarkdownSearchTool, Constants.Tools.Markdown, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.CSharpSearchTool, Constants.Tools.CSharp, true, CultureInfo.InvariantCulture);
    }
}