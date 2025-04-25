using BlazorUtilities;
using CodeRag.Shared.EntityFramework.DbModels;
using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace Workbench.Dialogs;

public partial class ShowVectorEntityDialog()
{
    [CascadingParameter]
    private BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    private IMudDialogInstance? MudDialog { get; set; }

    [Parameter, EditorRequired]
    public required VectorEntity Entity { get; set; }
}