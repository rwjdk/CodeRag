using CodeRag.Shared.BusinessLogic.VectorStore.SourceCode;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using Blazor.Shared;
using Blazor.Shared.Helpers;

namespace Workbench.Components.Dialogs;

public partial class ShowSourceCodeVectorEntityDialog()
{
    [CascadingParameter]
    private BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    private IMudDialogInstance? MudDialog { get; set; }

    [Parameter, EditorRequired]
    public required SourceCodeVectorEntity Entity { get; set; }
}