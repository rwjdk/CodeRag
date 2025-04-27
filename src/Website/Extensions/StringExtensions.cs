using System.Text.RegularExpressions;
using Markdig;
using Markdown.ColorCode;
using Microsoft.AspNetCore.Components;

namespace Website.Extensions;

public static class StringExtensions
{
    public static MarkupString ToMarkdown(this string markdown)
    {
        if (string.IsNullOrWhiteSpace(markdown))
        {
            return new MarkupString();
        }

        var pipeline = new MarkdownPipelineBuilder()
            .UseAdvancedExtensions()
            .UseColorCode()
            .Build();

        string html = Markdig.Markdown.ToHtml(markdown, pipeline);
        html = html.Replace("<a href=\"", "<a target=\"_blank\" style=\"text-decoration: underline\" href=\"");
        html = Regex.Replace(html, @"<pre><code class=""language-csharp"">(.*?)</code></pre>", match =>
        {
            string code = System.Net.WebUtility.HtmlDecode(match.Groups[1].Value);
            var colorizedHtml = Markdig.Markdown.ToHtml(code, pipeline);
            return $"<pre>{colorizedHtml}</pre>";
        }, RegexOptions.Singleline);
        return new MarkupString(html);
    }
}