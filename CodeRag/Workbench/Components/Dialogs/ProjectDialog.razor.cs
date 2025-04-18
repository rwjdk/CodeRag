using CodeRag.Shared.Configuration;
using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace Workbench.Components.Dialogs;

public partial class ProjectDialog(ProjectCommand projectCommand)
{
    [CascadingParameter] public required IMudDialogInstance Dialog { get; set; }

    [Parameter, EditorRequired] public required Project Project { get; set; }

    private void Save()
    {
        //todo - Validation
        projectCommand.SaveProject(Project);
        Dialog.Close();
    }
}