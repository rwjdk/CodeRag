using CodeRag.Shared.EntityFramework.DbModels;
using CodeRag.Shared.Projects;
using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace Workbench.Dialogs;

public partial class ProjectDialog(ProjectCommand projectCommand)
{
    private int _tabIndex;

    [CascadingParameter]
    public required IMudDialogInstance Dialog { get; set; }

    [CascadingParameter]
    public required Site Site { get; set; }

    [Parameter, EditorRequired]
    public required ProjectEntity Project { get; set; }

    [Parameter, EditorRequired]
    public required ProjectDialogDefaultTab DefaultTab { get; set; }

    protected override void OnInitialized()
    {
        _tabIndex = Convert.ToInt32(DefaultTab);
    }

    private async Task Save()
    {
        //todo - Validation
        await projectCommand.UpsertProjectAsync(Project);
        Dialog.Close();
    }

    private async Task CreateNewSource(ProjectSourceKind kind)
    {
        var newSource = ProjectSourceEntity.Empty(Project, kind);
        var result = await Site.ShowProjectSourceDialogAsync(Project, newSource, kind);
        if (result == DialogResult.Ok)
        {
            Project.Sources.Add(newSource);
        }
    }
}