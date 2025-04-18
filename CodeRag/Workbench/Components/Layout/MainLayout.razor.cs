using Blazor.Shared;
using Blazored.LocalStorage;
using CodeRag.Shared.Configuration;
using MudBlazor;
using Workbench.Components.Dialogs;
using Project = CodeRag.Shared.Configuration.Project;

namespace Workbench.Components.Layout;

public partial class MainLayout(BlazorUtils blazorUtils, ProjectQuery projectQuery, ILocalStorageService localStorage, IDialogService dialogService)
{
    public BlazorUtils BlazorUtils { get; } = blazorUtils;
    private bool _drawerOpen;
    private bool _darkMode = true;
    private Project? Project { get; set; }
    private bool IsProjectSelected => Project != null;

    private Project[]? _projects;


    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            _drawerOpen = await localStorage.GetItemAsync<bool>(Constants.LocalStorageKeys.DrawerOpen);
            _darkMode = await localStorage.GetItemAsync<bool>(Constants.LocalStorageKeys.DarkMode);
            await RefreshProjects();
        }
    }

    private async Task RefreshProjects()
    {
        Guid? projectId = await localStorage.GetItemAsync<Guid>(Constants.LocalStorageKeys.Project);
        _projects = projectQuery.GetProjects();
        await SelectProject(_projects.FirstOrDefault(x => x.Id == projectId) ?? _projects.FirstOrDefault());
    }

    private async Task DrawerToggle()
    {
        _drawerOpen = !_drawerOpen;
        await localStorage.SetItemAsync(Constants.LocalStorageKeys.DrawerOpen, _drawerOpen);
    }

    private async Task SelectProject(Project? project)
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
        await ShowProjectSettings(null);
    }

    private async Task ShowProjectSettings(Project? project)
    {
        var parameters = new DialogParameters<ProjectDialog>
        {
            { x => x.Project, project ?? Project.Empty() },
        };

        DialogOptions dialogOptions = new()
        {
            Position = DialogPosition.TopCenter,
            BackdropClick = false,
            CloseButton = true,
        };
        var reference = await dialogService.ShowAsync<ProjectDialog>(project?.Name ?? "New Project", parameters, dialogOptions);
        var result = await reference.Result;
        if (result is { Canceled: false })
        {
            await RefreshProjects();
        }
    }

    private async Task SwitchMode()
    {
        _darkMode = !_darkMode;
        await localStorage.SetItemAsync(Constants.LocalStorageKeys.DarkMode, _darkMode);
    }
}