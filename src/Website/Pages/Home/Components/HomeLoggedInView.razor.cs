using Microsoft.AspNetCore.Components;
using Shared.EntityFramework.DbModels;
using Website.Dialogs;
using Website.Models;

namespace Website.Pages.Home.Components;

public partial class HomeLoggedInView
{
    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    [CascadingParameter]
    public required Site Site { get; set; }

    [Inject]
    public required NavigationManager NavigationManager { get; set; }

    private async Task ShowProjectDialogAsync(ProjectEntity project)
    {
        DialogResult result = await Site.ShowProjectDialogAsync(project);
        if (result == DialogResult.Ok)
        {
            NavigationManager.Refresh(true);
        }
    }
}