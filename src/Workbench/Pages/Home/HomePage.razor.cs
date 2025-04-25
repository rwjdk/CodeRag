using BlazorUtilities;
using CodeRag.Shared.EntityFramework.DbModels;
using Microsoft.AspNetCore.Components;

namespace Workbench.Pages.Home;

public partial class HomePage()
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }
}