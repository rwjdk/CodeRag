﻿using Blazored.LocalStorage;
using BlazorUtilities;
using BlazorUtilities.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.JSInterop;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using MudBlazor;
using Shared.Ai;
using Shared.Ai.Queries;
using Shared.EntityFramework.DbModels;
using Shared.Projects;

namespace Website.Pages.Home.Components;

public partial class HomePublicView(AiChatQuery aiChatQuery, ProjectQuery projectQuery, ILocalStorageService localStorage, IJSRuntime jsRuntime)
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
    private bool _useSourceCodeSearch = true;
    private bool _useDocumentationSearch = true;
    private bool _usePdfSearch = true;
    private int _maxNumberOfAnswersBackFromSourceCodeSearch;
    private int _maxNumberOfAnswersBackFromDocumentationSearch;
    private int _maxNumberOfAnswersBackFromPdfSearch;
    private ProjectEntity[]? _projects;

    protected override void OnParametersSet()
    {
        if (!EqualityComparer<ProjectEntity>.Default.Equals(Project, _previousProject))
        {
            _previousProject = Project;
            _conversation = [];
            SetChatSettings();
        }
    }

    private void SetChatSettings()
    {
        _useSourceCodeSearch = Project.ChatUseSourceCodeSearch;
        _useDocumentationSearch = Project.ChatUseDocumentationSearch;
        _maxNumberOfAnswersBackFromSourceCodeSearch = Project.ChatMaxNumberOfAnswersBackFromSourceCodeSearch;
        _maxNumberOfAnswersBackFromDocumentationSearch = Project.ChatMaxNumberOfAnswersBackFromDocumentationSearch;
        _usePdfSearch = true; //todo
        _maxNumberOfAnswersBackFromPdfSearch = 20; //todo
    }

    private async Task SubmitIfEnter(KeyboardEventArgs args, string? messageToSend)
    {
        if (args is { ShiftKey: false, Key: "Enter" or "NumppadEnter" })
        {
            await SendMessage(messageToSend);
        }
    }

    private async Task SelectProject(ProjectEntity project)
    {
        Project = project;
        await localStorage.SetItemAsync(Constants.LocalStorageKeys.Project, Project.Id);
        StateHasChanged();
    }

    protected override async Task OnInitializedAsync()
    {
        _chatModel = aiChatQuery.GetChatModels().FirstOrDefault();
        _projects = await projectQuery.GetProjectsAsync();
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
                _conversation.Add(new ChatMessageContent(AuthorRole.User, messageToSend));
                StateHasChanged();
                await jsRuntime.InvokeVoidAsync("scrollToElementWhenReady", "bottom");
                ChatMessageContent? output = await aiChatQuery.GetAnswerAsync(
                    _chatModel,
                    _conversation,
                    messageToSend,
                    _useSourceCodeSearch,
                    _useDocumentationSearch,
                    _usePdfSearch,
                    _maxNumberOfAnswersBackFromSourceCodeSearch,
                    _maxNumberOfAnswersBackFromDocumentationSearch,
                    _maxNumberOfAnswersBackFromPdfSearch,
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