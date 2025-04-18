using Microsoft.AspNetCore.Components;
using MudBlazor;
using Blazor.Shared;
using CodeRag.Shared.VectorStore;

namespace Workbench.Components.Dialogs;

public partial class ShowVectorEntityDialog()
{
    [CascadingParameter] private BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter] private IMudDialogInstance? MudDialog { get; set; }

    [Parameter, EditorRequired] public required VectorEntity Entity { get; set; }
}