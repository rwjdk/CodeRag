using BlazorUtilities;
using BlazorUtilities.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using MudBlazor;
using Shared;
using Shared.Ai;
using Shared.Ai.Queries;
using Shared.EntityFramework.DbModels;
using Website.Dialogs;

namespace Website.Pages.Chat;

public partial class ChatPage(AiChatQuery aiChatQuery, IDialogService dialogService) : IDisposable
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    private ProjectEntity? _previousProject;

    private RTextField? _chatInput;
    private string? _chatInputMessage;
    private bool _currentMessageIsProcessing;
    private bool _shouldRender = true;
    private List<ChatMessageContent> _conversation = [];
    private AiChatModel? _chatModel;
    private bool _useSourceCodeSearch;
    private bool _useDocumentationSearch;
    private int _maxNumberOfAnswersBackFromSourceCodeSearch;
    private double _scoreShouldBeLowerThanThisInSourceCodeSearch;
    private int _maxNumberOfAnswersBackFromDocumentationSearch;
    private double _scoreShouldBeLowerThanThisInDocumentSearch;
    private readonly List<ProgressNotification> _log = [];

    protected override void OnParametersSet()
    {
        if (!EqualityComparer<ProjectEntity>.Default.Equals(Project, _previousProject))
        {
            _previousProject = Project;
            _conversation = [];
            SetChatSettings();
        }
    }

    private async Task SubmitIfEnter(KeyboardEventArgs args, string? messageToSend)
    {
        if (args is { ShiftKey: false, Key: "Enter" or "NumppadEnter" })
        {
            await SendMessage(messageToSend);
        }
    }

    protected override void OnInitialized()
    {
        SetChatSettings();
        _chatModel = aiChatQuery.GetChatModels().FirstOrDefault();
        aiChatQuery.NotifyProgress += SemanticKernelQueryNotifyProgress;
    }

    private void SetChatSettings()
    {
        _useSourceCodeSearch = Project.ChatUseSourceCodeSearch;
        _useDocumentationSearch = Project.ChatUseDocumentationSearch;
        _maxNumberOfAnswersBackFromSourceCodeSearch = Project.ChatMaxNumberOfAnswersBackFromSourceCodeSearch;
        _scoreShouldBeLowerThanThisInSourceCodeSearch = Project.ChatScoreShouldBeLowerThanThisInSourceCodeSearch;
        _maxNumberOfAnswersBackFromDocumentationSearch = Project.ChatMaxNumberOfAnswersBackFromDocumentationSearch;
        _scoreShouldBeLowerThanThisInDocumentSearch = Project.ChatScoreShouldBeLowerThanThisInDocumentSearch;
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
                await _chatInput.Clear();
                _conversation.Add(new ChatMessageContent(AuthorRole.User, messageToSend));
                ChatMessageContent? output = await aiChatQuery.GetAnswer(
                    _chatModel,
                    _conversation,
                    messageToSend,
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
        aiChatQuery.NotifyProgress -= SemanticKernelQueryNotifyProgress;
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