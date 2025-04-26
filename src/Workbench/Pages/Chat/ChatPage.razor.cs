using BlazorUtilities;
using BlazorUtilities.Components;
using CodeRag.Shared;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using MudBlazor;
using Shared;
using Shared.Ai;
using Shared.EntityFramework.DbModels;
using Workbench.Dialogs;

namespace Workbench.Pages.Chat;

public partial class ChatPage(AiQuery aiQuery, IDialogService dialogService) : IDisposable
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    private RTextField? _chatInput;
    private string? _chatInputMessage;
    private bool _currentMessageIsProcessing;
    private bool _shouldRender = true;

    private readonly List<ChatMessageContent> _conversation = [];
    private AiChatModel? _chatModel;
    private bool _useSourceCodeSearch = true;
    private bool _useDocumentationSearch = true;
    private int _maxNumberOfAnswersBackFromSourceCodeSearch = 50;
    private double _scoreShouldBeLowerThanThisInSourceCodeSearch = 0.7;
    private int _maxNumberOfAnswersBackFromDocumentationSearch = 50;
    private double _scoreShouldBeLowerThanThisInDocumentSearch = 0.7;
    private readonly List<ProgressNotification> _log = [];

    private async Task SubmitIfEnter(KeyboardEventArgs args, string? messageToSend)
    {
        if (args is { ShiftKey: false, Key: "Enter" or "NumppadEnter" })
        {
            await SendMessage(messageToSend);
        }
    }

    protected override void OnInitialized()
    {
        _chatModel = aiQuery.GetChatModels().FirstOrDefault();
        aiQuery.NotifyProgress += SemanticKernelQueryNotifyProgress;
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
                _conversation.Add(input);
                await _chatInput.Clear();

                ChatMessageContent? output = await aiQuery.GetAnswer(
                    _chatModel,
                    _conversation,
                    _useSourceCodeSearch,
                    _useDocumentationSearch,
                    _maxNumberOfAnswersBackFromSourceCodeSearch,
                    _scoreShouldBeLowerThanThisInSourceCodeSearch,
                    _maxNumberOfAnswersBackFromDocumentationSearch,
                    _scoreShouldBeLowerThanThisInDocumentSearch,
                    Project);
                if (output != null)
                {
                    _conversation.Add(output);
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

    private void NewChat()
    {
        _conversation.Clear();
        BlazorUtils.ShowSuccess("New Chat initiated", 3, Defaults.Classes.Position.TopCenter);
    }

    public void Dispose()
    {
        aiQuery.NotifyProgress -= SemanticKernelQueryNotifyProgress;
    }

    private async Task ShowSourceCodeVectorEntry(VectorEntity entity)
    {
        var parameters = new DialogParameters<ShowVectorEntityDialog>
        {
            { x => x.Entity, entity },
        };

        DialogOptions dialogOptions = new()
        {
            CloseButton = true,
        };
        await dialogService.ShowAsync<ShowVectorEntityDialog>(entity.SourcePath, parameters, dialogOptions);
    }
}