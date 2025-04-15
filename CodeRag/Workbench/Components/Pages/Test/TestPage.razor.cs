using Blazor.Shared.Components;
using Blazor.Shared;
using Markdig;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components;
using Microsoft.SemanticKernel.ChatCompletion;
using MudBlazor;
using System.Text.RegularExpressions;
using CodeRag.Shared;
using Markdown.ColorCode;
using Microsoft.SemanticKernel;
using Microsoft.Extensions.VectorData;
using Blazor.Shared.Components.Dialogs;
using Workbench.Components.Dialogs;
using CodeRag.Shared.Ai.SemanticKernel;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.VectorStore;

namespace Workbench.Components.Pages.Test;

public partial class TestPage(SemanticKernelQuery semanticKernelQuery, IDialogService dialogService) : IDisposable
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
    private AzureOpenAiChatCompletionDeployment? _chatModel;
    private bool _useSourceCodeSearch = true;
    private bool _useDocumentationSearch = true;
    private int _maxNumberOfAnswersBackFromSourceCodeSearch = 50;
    private double _scoreShouldBeLowerThanThisInSourceCodeSearch = 0.7;
    private int _maxNumberOfAnswersBackFromDoucumentationSearch = 50;
    private double _scoreShouldBeLowerThanThisInDocumentSearch = 0.5;
    private readonly List<ProgressNotification> _log = [];

    private async Task SubmitIfEnter(KeyboardEventArgs args, string? messageToSend)
    {
        if (!args.ShiftKey && args.Key is "Enter" or "NumppadEnter")
        {
            await SendMessage(messageToSend);
        }
    }

    protected override void OnInitialized()
    {
        _chatModel = Project.AzureOpenAiChatCompletionDeployments.FirstOrDefault();
        semanticKernelQuery.NotifyProgress += SemanticKernelQueryNotifyProgress;
#if DEBUG
        _chatInputMessage = Project.DefaultTestChatInput;
#endif
    }

    private void SemanticKernelQueryNotifyProgress(ProgressNotification obj)
    {
        _log.Add(obj);
        InvokeAsync(StateHasChanged).ConfigureAwait(false);
    }

    protected override bool ShouldRender()
    {
        return _shouldRender;
    }

    private async Task SendMessage(string? messageToSend)
    {
        _log.Clear();
        _shouldRender = true;
        if (_chatInput != null && _chatModel != null && !string.IsNullOrWhiteSpace(messageToSend))
        {
            _currentMessageIsProcessing = true;
            try
            {
                ChatMessageContent input = new(AuthorRole.User, messageToSend);
                _converstation.Add(input);
                await _chatInput.Clear();

                ChatMessageContent? output = await semanticKernelQuery.GetAnswer(
                    _chatModel,
                    _converstation,
                    _useSourceCodeSearch,
                    _useDocumentationSearch,
                    _maxNumberOfAnswersBackFromSourceCodeSearch,
                    _scoreShouldBeLowerThanThisInSourceCodeSearch,
                    _maxNumberOfAnswersBackFromDoucumentationSearch,
                    _scoreShouldBeLowerThanThisInDocumentSearch,
                    Project);
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

    public void Dispose()
    {
        semanticKernelQuery.NotifyProgress -= SemanticKernelQueryNotifyProgress;
    }

    private async Task ShowSourceCodeVectorEntry(CSharpCodeEntity entity)
    {
        var parameters = new DialogParameters<ShowCSharpCodeEntityDialog>
        {
            { x => x.Entity, entity },
        };

        DialogOptions dialogOptions = new()
        {
            CloseButton = true,
        };
        await dialogService.ShowAsync<ShowCSharpCodeEntityDialog>(entity.SourcePath, parameters, dialogOptions);
    }
}