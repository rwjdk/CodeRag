using Microsoft.AspNetCore.Components;
using MudBlazor;
using Blazor.Shared;
using CodeRag.Shared.VectorStore;

namespace Workbench.Components.Dialogs;

public partial class ShowCSharpCodeEntityDialog()
{
    [CascadingParameter]
    private BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    private IMudDialogInstance? MudDialog { get; set; }

    [Parameter, EditorRequired]
    public required CSharpCodeEntity Entity { get; set; }
}