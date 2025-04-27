using MudBlazor;
using Shared.EntityFramework.DbModels;
using Website.Dialogs;
using DialogResult = Website.Dialogs.DialogResult;

namespace Website.Models;

public class Site(IDialogService dialogService)
{
#if DEBUG
    public bool DebugMode => true;
#else
    public bool DebugMode => false;
#endif


    public async Task<DialogResult> ShowProjectDialogAsync(ProjectEntity? project, bool addMode)
    {
        var parameters = new DialogParameters<ProjectDialog>
        {
            { x => x.Project, project ?? ProjectEntity.Empty() },
            { x => x.AddMode, addMode },
        };

        DialogOptions dialogOptions = new()
        {
            Position = DialogPosition.TopCenter,
            BackdropClick = false,
            CloseButton = true,
        };
        var reference = await dialogService.ShowAsync<ProjectDialog>(project?.Name ?? "New Project", parameters, dialogOptions);
        var result = await reference.Result;
        return result is { Canceled: false } ? DialogResult.Ok : DialogResult.Cancel;
    }

    public async Task<DialogResult> ShowProjectSourceDialogAsync(ProjectEntity project, ProjectSourceEntity projectSource, ProjectSourceKind newKind = ProjectSourceKind.CSharpCode)
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
        var reference = await dialogService.ShowAsync<ProjectSourceDialog>(projectSource?.Name ?? "New Source", parameters, dialogOptions);
        var result = await reference.Result;
        return result is { Canceled: false } ? DialogResult.Ok : DialogResult.Cancel;
    }
}