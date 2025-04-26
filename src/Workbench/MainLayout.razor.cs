using Blazored.LocalStorage;
using BlazorUtilities;
using MudBlazor;
using Shared.EntityFramework.DbModels;
using Shared.Projects;
using Workbench.Models;

namespace Workbench;

public partial class MainLayout(BlazorUtils blazorUtils, ILocalStorageService localStorage, IDialogService dialogService, IServiceProvider serviceProvider)
{
    public BlazorUtils BlazorUtils { get; } = blazorUtils;
    private bool _drawerOpen;
    private bool _darkMode = true;
    private ProjectEntity? Project { get; set; }
    private bool IsProjectSelected => Project != null;
    private Site Site { get; } = new(dialogService);
    private ProjectEntity[]? _projects;
    private ProjectQuery? _projectQuery;
    private bool _initialized;


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
        await ShowProjectSettings(null, true);
    }

    private async Task SwitchMode()
    {
        _darkMode = !_darkMode;
        await localStorage.SetItemAsync(Constants.LocalStorageKeys.DarkMode, _darkMode);
    }

    private async Task ShowProjectSettings(ProjectEntity? project, bool addMode)
    {
        await Site.ShowProjectDialogAsync(project, addMode);
        await RefreshProjects();
        //todo - if new project select it
    }
}