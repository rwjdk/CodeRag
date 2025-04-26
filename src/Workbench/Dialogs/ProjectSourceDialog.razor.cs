using Microsoft.AspNetCore.Components;
using MudBlazor;
using Shared.EntityFramework.DbModels;
using Shared.Projects;

namespace Workbench.Dialogs;

public partial class ProjectSourceDialog(ProjectCommand projectCommand)
{
    [CascadingParameter]
    public required IMudDialogInstance Dialog { get; set; }

    [Parameter, EditorRequired]
    public required ProjectEntity Project { get; set; }

    [Parameter, EditorRequired]
    public ProjectSourceEntity ProjectSource { get; set; }

    private async Task Save()
    {
        //todo - Validation
        Dialog.Close();
    }
}