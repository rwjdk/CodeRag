using Blazor.Shared;
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
    public required BlazorUtils BlazorUtils { get; set; }

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

    private async Task EditSource(ProjectSourceEntity? source)
    {
        if (source != null)
        {
            await Site.ShowProjectSourceDialogAsync(Project, source);
        }
    }

    private async Task DeleteSource(ProjectSourceEntity? source)
    {
        if (source != null)
        {
            await BlazorUtils.PromptYesNoQuestion("Are you sure you wish to remove this source?", async () =>
            {
                Project.Sources.Remove(source);
                StateHasChanged();
                await Task.CompletedTask;
            });
        }
    }
}