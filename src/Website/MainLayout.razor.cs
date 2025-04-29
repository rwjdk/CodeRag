using Blazored.LocalStorage;
using BlazorUtilities;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using Shared.EntityFramework.DbModels;
using Shared.Projects;
using System.Diagnostics.CodeAnalysis;
using Website.Models;
using DialogResult = Website.Dialogs.DialogResult;

namespace Website;

public partial class MainLayout(BlazorUtils blazorUtils, ILocalStorageService localStorage, IDialogService dialogService, IServiceProvider serviceProvider, NavigationManager navigationManager)
{
    public BlazorUtils BlazorUtils { get; } = blazorUtils;
    private bool _drawerOpen;
    private bool _darkMode = true;
    private ProjectEntity? Project { get; set; }

    [MemberNotNullWhen(true, nameof(Project))]
    private bool IsProjectSelected => Project != null;

    private Site Site { get; } = new(dialogService);
    private ProjectEntity[]? _projects;
    private ProjectQuery? _projectQuery;
    private bool _initialized;
    private bool LoggedIn { get; set; }

    protected override void OnInitialized()
    {
        _projectQuery = serviceProvider.GetService<ProjectQuery>();
        _initialized = true;
    }

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            _drawerOpen = await localStorage.GetItemAsync<bool>(Constants.LocalStorageKeys.DrawerOpen);
            _darkMode = await localStorage.GetItemAsync<bool>(Constants.LocalStorageKeys.DarkMode);
            if (Site.DemoMode)
            {
                LoggedIn = await localStorage.GetItemAsync<bool>(Constants.LocalStorageKeys.IsLoggedIn);
            }
            else
            {
                LoggedIn = false; //Admin Tools disabled for deployed demo.
            }

            if (_projectQuery != null)
            {
                await RefreshProjects();
            }
        }
    }

    private async Task RefreshProjects()
    {
        Guid? projectId = await localStorage.GetItemAsync<Guid>(Constants.LocalStorageKeys.Project);
        _projects = await _projectQuery!.GetProjectsAsync();
        await SelectProject(_projects.FirstOrDefault(x => x.Id == projectId) ?? _projects.FirstOrDefault());
    }

    private async Task DrawerToggle()
    {
        _drawerOpen = !_drawerOpen;
        await localStorage.SetItemAsync(Constants.LocalStorageKeys.DrawerOpen, _drawerOpen);
    }

    private async Task SelectProject(ProjectEntity? project)
    {
        Project = project;
        if (Project != null)
        {
            await localStorage.SetItemAsync(Constants.LocalStorageKeys.Project, Project.Id);
        }
        else
        {
            await localStorage.RemoveItemAsync(Constants.LocalStorageKeys.Project);
        }

        StateHasChanged();
    }

    internal async Task NewProject()
    {
        await ShowProjectSettings(ProjectEntity.Empty());
    }

    private async Task SwitchMode()
    {
        _darkMode = !_darkMode;
        await localStorage.SetItemAsync(Constants.LocalStorageKeys.DarkMode, _darkMode);
    }

    private async Task ShowProjectSettings(ProjectEntity project)
    {
        DialogResult result = await Site.ShowProjectDialogAsync(project);
        if (result == DialogResult.Ok)
        {
            await RefreshProjects();
            if (project.AddMode)
            {
                project.AddMode = false;
                await SelectProject(project);
            }
        }
    }

    private async Task Login()
    {
        //NB: Login is simulated in order to make it easier to demo
        await localStorage.SetItemAsync(Constants.LocalStorageKeys.IsLoggedIn, true);
        LoggedIn = true;
    }

    private async Task Logout()
    {
        //NB: Logout is simulated in order to make it easier to demo
        await localStorage.SetItemAsync(Constants.LocalStorageKeys.IsLoggedIn, false);
        LoggedIn = false;
        navigationManager.NavigateTo("/");
    }

    private async Task AdminExperience()
    {
        await BlazorUtils.PromptYesNoQuestion("The Admin Experience for CodeRag is disabled in this online demo, but you can try it by cloning the Repo. Go to to GitHub Repo?", async () => { await BlazorUtils.OpenUrlInNewTab("https://www.github.com/rwjdk/CodeRag"); });
    }
}