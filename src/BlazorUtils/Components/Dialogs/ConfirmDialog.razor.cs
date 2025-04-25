using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace BlazorUtilities.Components.Dialogs;

public partial class ConfirmDialog
{
    [CascadingParameter]
    private IMudDialogInstance? MudDialog { get; set; }

    [Parameter]
    public string? QuestionText { get; set; }

    [Parameter]
    public string? ProceedButtonText { get; set; }

    [Parameter]
    public string? CancelButtonText { get; set; } = "Cancel";

    [Parameter]
    public Color Color { get; set; }

    private void Cancel() => MudDialog!.Cancel();
    private void Proceed() => MudDialog!.Close();
}