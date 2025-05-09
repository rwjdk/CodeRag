﻿using MudBlazor;
using Shared.EntityFramework.DbModels;
using Website.Dialogs;
using DialogResult = Website.Dialogs.DialogResult;

namespace Website.Models;

public class Site(IDialogService dialogService)
{
#if DEBUG
    public bool DemoMode => true;
#else
    public bool DemoMode => false;
#endif

    public async Task<DialogResult> ShowProjectDialogAsync(ProjectEntity project)
    {
        var parameters = new DialogParameters<ProjectDialog>
        {
            { x => x.Project, project },
        };

        DialogOptions dialogOptions = new()
        {
            Position = DialogPosition.TopCenter,
            BackdropClick = false,
            CloseButton = true,
        };
        var reference = await dialogService.ShowAsync<ProjectDialog>(string.IsNullOrWhiteSpace(project.Name) ? "New Project" : project.Name, parameters, dialogOptions);
        var result = await reference.Result;
        return result is { Canceled: false } ? DialogResult.Ok : DialogResult.Cancel;
    }

    public async Task<DialogResult> ShowProjectSourceDialogAsync(ProjectEntity project, ProjectSourceEntity projectSource)
    {
        var parameters = new DialogParameters<ProjectSourceDialog>
        {
            { x => x.Project, project },
            { x => x.ProjectSource, projectSource },
        };

        DialogOptions dialogOptions = new()
        {
            Position = DialogPosition.TopCenter,
            BackdropClick = false,
            CloseButton = true,
        };
        var reference = await dialogService.ShowAsync<ProjectSourceDialog>(string.IsNullOrWhiteSpace(projectSource.Name) ? "New source" : projectSource.Name, parameters, dialogOptions);
        var result = await reference.Result;
        return result is { Canceled: false } ? DialogResult.Ok : DialogResult.Cancel;
    }
}