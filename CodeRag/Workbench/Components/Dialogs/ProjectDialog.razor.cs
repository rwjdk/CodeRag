using CodeRag.Shared.Configuration;
using CodeRag.Shared.EntityFramework.DbModels;
using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace Workbench.Components.Dialogs;

public partial class ProjectDialog(ProjectCommand projectCommand)
{
    [CascadingParameter] public required IMudDialogInstance Dialog { get; set; }

    [Parameter, EditorRequired] public required ProjectEntity Project { get; set; }

    private void Save()
    {
        //todo - Validation
        projectCommand.UpsertProjectAsync(Project);
        Dialog.Close();
    }
}