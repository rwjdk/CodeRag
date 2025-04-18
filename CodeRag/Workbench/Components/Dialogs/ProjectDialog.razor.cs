using System.Text.Json;
using CodeRag.Shared.Configuration;
using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace Workbench.Components.Dialogs;

public partial class ProjectDialog
{
    [CascadingParameter] public required IMudDialogInstance Dialog { get; set; }

    [Parameter, EditorRequired] public required Project Project { get; set; }

    private async Task Save()
    {
        //todo - Validation
        //todo - add other save locations like custom location, DB, shared drives or KeyVault. For now we just use app-data
        var folder = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), "CodeRag", "Projects");
        if (!Directory.Exists(folder))
        {
            Directory.CreateDirectory(folder);
        }

        var path = Path.Combine(folder, Project.Id.ToString()) + ".codeRagProject";
        var json = JsonSerializer.Serialize(Project);
        await File.WriteAllTextAsync(path, json);
        Dialog.Close();
    }
}