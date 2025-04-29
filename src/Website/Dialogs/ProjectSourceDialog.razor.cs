using BlazorUtilities;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using Shared.EntityFramework.DbModels;

namespace Website.Dialogs;

public partial class ProjectSourceDialog()
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required IMudDialogInstance Dialog { get; set; }

    [Parameter, EditorRequired]
    public required ProjectEntity Project { get; set; }

    [Parameter, EditorRequired]
    public required ProjectSourceEntity ProjectSource { get; set; }

    private void Save()
    {
        List<string> missingValues = [];
        if (string.IsNullOrWhiteSpace(ProjectSource.Name))
        {
            missingValues.Add("Name");
        }

        if (string.IsNullOrWhiteSpace(ProjectSource.Path))
        {
            missingValues.Add("Path");
        }

        if (missingValues.Any())
        {
            BlazorUtils.ShowError($"The following data is missing before you can save this Source: {string.Join(", ", missingValues)}");
        }
        else
        {
            Dialog.Close();
        }
    }
}