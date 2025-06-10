using BlazorUtilities;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using Shared.EntityFramework.DbModels;
using SimpleRag.VectorStorage.Models;

namespace Website.Dialogs;

public partial class ShowVectorEntityDialog
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    private IMudDialogInstance? MudDialog { get; set; }

    [Parameter, EditorRequired]
    public required VectorEntity Entity { get; set; }
}