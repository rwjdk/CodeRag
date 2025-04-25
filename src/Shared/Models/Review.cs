using System.ComponentModel;
using System.Text;

namespace CodeRag.Shared.Models;

public class Review
{
    [Description("A Short, concise but sufficient summary of what this PR introduces/changes, and any general observations your find relevant in context of the review, focus on functional changes that makes a difference to the users of the system")]
    public required string Summary { get; init; }

    [Description("You will for all bug/regression/error explain what the error is, where it is (include type names and namespaces when possible), why its an error and if possible short guidance how to fix it. Do not use and type of bullet-list formatting")]
    public string[]? PotentialIssuesFound { get; init; }

    public string GetPullRequestCommentAsMarkdown()
    {
        var sb = new StringBuilder();

        if (PotentialIssuesFound == null || PotentialIssuesFound.Length == 0)
        {
            sb.AppendLine("### Reviewed with no findings");
        }
        else
        {
            if (PotentialIssuesFound.Length == 1)
            {
                sb.AppendLine($"### {PotentialIssuesFound.Length} potential issue identified");
            }
            else
            {
                sb.AppendLine($"### {PotentialIssuesFound.Length} potential issues identified");
            }

            sb.AppendLine();

            if (PotentialIssuesFound is { Length: > 0 })
            {
                int counter = 1;
                foreach (var detail in PotentialIssuesFound)
                {
                    sb.AppendLine($"{counter}. {detail}");
                    counter++;
                }
            }
        }

        sb.AppendLine("<details>");
        sb.AppendLine("<summary>Details</summary>");
        sb.AppendLine();
        sb.AppendLine("### Summary");
        sb.AppendLine(Summary);
        sb.AppendLine();
        sb.AppendLine("</details>");

        return sb.ToString();
    }
}