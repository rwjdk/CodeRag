using Blazor.Shared.Components;
using Blazor.Shared;
using Markdig;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.SemanticKernel.ChatCompletion;
using MudBlazor;
using System.Text.RegularExpressions;
using CodeRag.Shared.BusinessLogic.Ai;
using CodeRag.Shared.BusinessLogic.Ai.Models;
using CodeRag.Shared.BusinessLogic.VectorStore.Models;
using CodeRag.Shared.Models;
using Markdown.ColorCode;
using Microsoft.SemanticKernel;

namespace Workbench.Components.Pages.Test;

public partial class TestPage(IConfiguration configuration, SemanticKernelQuery semanticKernelQuery)
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required Project Project { get; set; }

    private RTextField? _chatInput;
    private string? _chatInputMessage;
    private bool _currentMessageIsProcessing;
    private bool _shouldRender = true;

    private readonly List<ChatMessageContent> _converstation = new List<ChatMessageContent>();
    private ChatModel? _chatModel;

    private async Task SubmitIfEnter(KeyboardEventArgs args, string? messageToSend)
    {
        if (!args.ShiftKey && args.Key is "Enter" or "NumppadEnter")
        {
            await SendMessage(messageToSend);
        }
    }

    protected override void OnInitialized()
    {
        _chatModel = Project.ChatModels.FirstOrDefault();
    }

    protected override bool ShouldRender()
    {
        return _shouldRender;
    }

    private async Task SendMessage(string? messageToSend)
    {
        _shouldRender = true;
        if (_chatInput != null && !string.IsNullOrWhiteSpace(messageToSend))
        {
            _currentMessageIsProcessing = true;
            try
            {
                ChatMessageContent input = new(AuthorRole.User, messageToSend);
                _converstation.Add(input);
                await _chatInput.Clear();

                ChatMessageContent? output = await GetAiAnswer(input);
                if (output != null)
                {
                    _converstation.Add(output);
                }
            }
            catch (Exception e)
            {
                BlazorUtils.ShowError(e.Message);
            }
            finally
            {
                _currentMessageIsProcessing = false;
            }
        }
    }

    private async Task<ChatMessageContent?> GetAiAnswer(ChatMessageContent input)
    {
        return await new SemanticKernelQuery().GetAnswer(_chatModel, _converstation, Project.AzureOpenAiCredentials, Project.SourceCodeVectorSettings);
    }

    private MarkupString ConvertToMarkdown(string? messageContent)
    {
        if (string.IsNullOrWhiteSpace(messageContent))
        {
            return new MarkupString();
        }

        var pipeline = new MarkdownPipelineBuilder()
            .UseAdvancedExtensions()
            .UseColorCode()
            .Build();

        string html = Markdig.Markdown.ToHtml(messageContent, pipeline);
        html = html.Replace("<a href=\"", "<a target=\"_blank\" style=\"text-decoration: underline\" href=\"");
        html = Regex.Replace(html, @"<pre><code class=""language-csharp"">(.*?)</code></pre>", match =>
        {
            string code = System.Net.WebUtility.HtmlDecode(match.Groups[1].Value);
            var colorizedHtml = Markdig.Markdown.ToHtml(code, pipeline);
            return $"<pre>{colorizedHtml}</pre>";
        }, RegexOptions.Singleline);
        return new MarkupString(html);
    }

    private void NewChat()
    {
        _converstation.Clear();
        BlazorUtils.ShowSuccess("New Chat initiated", 3, Defaults.Classes.Position.TopCenter);
    }
}