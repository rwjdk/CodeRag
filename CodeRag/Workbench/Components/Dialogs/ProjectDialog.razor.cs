using CodeRag.Shared.EntityFramework.Entities;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Dialogs;

public partial class ProjectDialog
{
    [Parameter, EditorRequired] public required Project Project { get; set; }
}