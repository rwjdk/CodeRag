using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Globalization;
using Shared.Prompting;

namespace Shared.EntityFramework.DbModels;

/// <summary>
/// Represents a project with its configuration and instructions for chat, pull request review, and XML summaries
/// </summary>
[Table("Projects")]
public class ProjectEntity
{
    /// <summary>
    /// ID of the Project
    /// </summary>
    [Key]
    public Guid Id { get; private set; } = Guid.NewGuid();

    /// <summary>
    /// Name of the Project
    /// </summary>
    [MaxLength(100)]
    public string? Name { get; set; }

    /// <summary>
    /// Description of the Project
    /// </summary>
    [MaxLength(4000)]
    public string? Description { get; set; }

    /// <summary>
    /// The sources of the Project
    /// </summary>
    public required ICollection<ProjectSourceEntity> Sources { get; init; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    /// <summary>
    /// The Chat-instructions for the AI
    /// </summary>
    public required string ChatInstructions { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    /// <summary>
    /// The Pull-Request-instructions for the AI
    /// </summary>
    public required string PullRequestReviewInstructions { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    /// <summary>
    /// The XML Summary Instructions of the AI
    /// </summary>
    public required string CSharpXmlSummaryInstructions { get; set; }

    /// <summary>
    /// If chat should use the Code Search Tool
    /// </summary>
    public bool ChatUseSourceCodeSearch { get; set; }

    /// <summary>
    /// If chat should use the Documentation Search Tool
    /// </summary>
    public bool ChatUseDocumentationSearch { get; set; }

    /// <summary>
    /// How many max results from Code should be used during Chat
    /// </summary>
    public int ChatMaxNumberOfAnswersBackFromSourceCodeSearch { get; set; }

    /// <summary>
    /// How low (lower = more exact) should results from Code be to be included (0 to 1) during chat
    /// </summary>
    public double ChatScoreShouldBeLowerThanThisInSourceCodeSearch { get; set; }

    /// <summary>
    /// How many max results from Documentation should be used during Chat
    /// </summary>
    public int ChatMaxNumberOfAnswersBackFromDocumentationSearch { get; set; }

    /// <summary>
    /// How low (lower = more exact) should results from Documentation be to be included (0 to 1) during chat
    /// </summary>
    public double ChatScoreShouldBeLowerThanThisInDocumentSearch { get; set; }

    /// <summary>
    /// If XML Summary Generation should use the Code Search Tool
    /// </summary>
    public bool XmlSummariesUseSourceCodeSearch { get; set; }

    /// <summary>
    /// If XML Summary Generation should use the Documentation Search Tool
    /// </summary>
    public bool XmlSummariesUseDocumentationSearch { get; set; }

    /// <summary>
    /// How many max results from Code should be used during XML Summary Generation
    /// </summary>
    public int XmlSummariesMaxNumberOfAnswersBackFromSourceCodeSearch { get; set; }

    /// <summary>
    /// How low (lower = more exact) should results from Code be to be included (0 to 1) during XML Summary Generation
    /// </summary>
    public double XmlSummariesScoreShouldBeLowerThanThisInSourceCodeSearch { get; set; }

    /// <summary>
    /// How many max results from Documentation should be used during XML Summary Generation
    /// </summary>
    public int XmlSummariesMaxNumberOfAnswersBackFromDocumentationSearch { get; set; }

    /// <summary>
    /// How low (lower = more exact) should results from Documentation be to be included (0 to 1) during XML Summary Generation
    /// </summary>
    public double XmlSummariesScoreShouldBeLowerThanThisInDocumentSearch { get; set; }

    /// <summary>
    /// If PR Review should use the Code Search Tool
    /// </summary>
    public bool PrReviewUseSourceCodeSearch { get; set; }

    /// <summary>
    /// If PR Review should use the Documentation Search Tool
    /// </summary>
    public bool PrReviewUseDocumentationSearch { get; set; }

    /// <summary>
    /// How many max results from Code should be used during PR Review
    /// </summary>
    public int PrReviewMaxNumberOfAnswersBackFromSourceCodeSearch { get; set; }

    /// <summary>
    /// How low (lower = more exact) should results from Code be to be included (0 to 1) during PR Review
    /// </summary>
    public double PrReviewScoreShouldBeLowerThanThisInSourceCodeSearch { get; set; }

    /// <summary>
    /// How many max results from Documentation should be used during PR Review
    /// </summary>
    public int PrReviewMaxNumberOfAnswersBackFromDocumentationSearch { get; set; }

    /// <summary>
    /// How low (lower = more exact) should results from Documentation be to be included (0 to 1) during PR Review
    /// </summary>
    public double PrReviewScoreShouldBeLowerThanThisInDocumentSearch { get; set; }

    /// <summary>
    /// The GitHub name of the Owner of the Repo
    /// </summary>
    [MaxLength(100)]
    public string? GitHubOwner { get; set; }

    /// <summary>
    /// The GitHub RepoName
    /// </summary>
    [MaxLength(500)]
    public string? GitHubRepo { get; set; }

    /// <summary>
    /// If this Project is in add-mode (= not yet added)
    /// </summary>
    [NotMapped]
    public bool AddMode { get; set; }

    /// <summary>Creates an empty instance of ProjectEntity</summary>
    public static ProjectEntity Empty()
    {
        return new ProjectEntity
        {
            AddMode = true,

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
            ChatUseSourceCodeSearch = true,
            ChatUseDocumentationSearch = true,
            ChatMaxNumberOfAnswersBackFromSourceCodeSearch = 20,
            ChatScoreShouldBeLowerThanThisInSourceCodeSearch = 0.7,
            ChatMaxNumberOfAnswersBackFromDocumentationSearch = 20,
            ChatScoreShouldBeLowerThanThisInDocumentSearch = 0.7,
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
            XmlSummariesUseSourceCodeSearch = true,
            XmlSummariesUseDocumentationSearch = true,
            XmlSummariesMaxNumberOfAnswersBackFromSourceCodeSearch = 20,
            XmlSummariesScoreShouldBeLowerThanThisInSourceCodeSearch = 0.7,
            XmlSummariesMaxNumberOfAnswersBackFromDocumentationSearch = 20,
            XmlSummariesScoreShouldBeLowerThanThisInDocumentSearch = 0.7,
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
            PrReviewUseSourceCodeSearch = true,
            PrReviewUseDocumentationSearch = false,
            PrReviewMaxNumberOfAnswersBackFromSourceCodeSearch = 20,
            PrReviewScoreShouldBeLowerThanThisInSourceCodeSearch = 0.7,
            PrReviewMaxNumberOfAnswersBackFromDocumentationSearch = 20,
            PrReviewScoreShouldBeLowerThanThisInDocumentSearch = 0.7,
        };
    }

    /// <summary>
    /// Returns developer instructions formatted as a string
    /// </summary>
    /// <returns>A string containing formatted developer instructions</returns>
    public string GetFormattedDeveloperInstructions()
    {
        return ChatInstructions
            .Replace(Constants.Keywords.Name, Name, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.Description, Description, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.MarkdownSearchTool, Constants.Tools.Markdown, true, CultureInfo.InvariantCulture)
            .Replace(Constants.Keywords.CSharpSearchTool, Constants.Tools.CSharp, true, CultureInfo.InvariantCulture);
    }
}