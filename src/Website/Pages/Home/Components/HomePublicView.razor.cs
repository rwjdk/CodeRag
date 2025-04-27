using BlazorUtilities;
using BlazorUtilities.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using MudBlazor;
using Shared;
using Shared.Ai;
using Shared.EntityFramework.DbModels;
using Website.Dialogs;

namespace Website.Pages.Home.Components;

public partial class HomePublicView(AiQuery aiQuery, IDialogService dialogService)
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
    private readonly bool _useSourceCodeSearch = true; //todo - configure in project
    private readonly bool _useDocumentationSearch = true; //todo - configure in project
    private readonly int _maxNumberOfAnswersBackFromSourceCodeSearch = 50; //todo - configure in project
    private readonly double _scoreShouldBeLowerThanThisInSourceCodeSearch = 0.7; //todo - configure in project
    private readonly int _maxNumberOfAnswersBackFromDocumentationSearch = 50; //todo - configure in project
    private readonly double _scoreShouldBeLowerThanThisInDocumentSearch = 0.7; //todo - configure in project

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
    }

    protected override bool ShouldRender()
    {
        return _shouldRender;
    }

    private async Task SendMessage(string? messageToSend)
    {
        _shouldRender = true;
        if (_chatInput != null && _chatModel != null && !string.IsNullOrWhiteSpace(messageToSend))
        {
            _currentMessageIsProcessing = true;
            try
            {
                await _chatInput.Clear();

                ChatMessageContent? output = await aiQuery.GetAnswer(
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
}