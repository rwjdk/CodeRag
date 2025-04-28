using JetBrains.Annotations;
using Markdig;
using Markdig.Extensions.AutoLinks;
using Microsoft.AspNetCore.Components;

// ReSharper disable MemberCanBePrivate.Global

namespace BlazorUtilities.Helpers;

[PublicAPI]
public static class MarkdownHelper
{
    public static MarkupString MarkDownToHtmlAsMarkupString(string? markdown, bool imageShouldFitContainer = true, bool removeParagraphs = false, bool colorLinks = true)
    {
        return new MarkupString(MarkDownToHtml(markdown, imageShouldFitContainer, removeParagraphs, colorLinks));
    }

    public static string MarkDownToHtml(string? markdown, bool imageShouldFitContainer = true, bool removeParagraphs = false, bool colorLinks = true)
    {
        if (markdown == null)
        {
            return string.Empty;
        }

        var pipeline = new MarkdownPipelineBuilder()
            .UseAutoLinks(new AutoLinkOptions { OpenInNewWindow = true })
            .ConfigureNewLine("\n")
            .UseEmojiAndSmiley()
            .Build();
        var html = Markdown.ToHtml(markdown, pipeline);
        if (imageShouldFitContainer)
        {
            html = html.Replace("<img src=", "<img style=\"display: block;\" width=\"100%\" src=");
        }

        var markDownToHtml = html.Replace("<a href=", colorLinks ? "<a style=\"color: var(--mud-palette-primary)\" target=\"_blank\" href=" : "<a target=\"_blank\" href=");
        markDownToHtml = removeParagraphs ? markDownToHtml.Replace("<p>", string.Empty).Replace("</p>", string.Empty) : markDownToHtml;

        return markDownToHtml;
    }
}