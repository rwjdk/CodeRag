using BlazorUtilities;
using Microsoft.AspNetCore.Components;
using Shared.EntityFramework.DbModels;
using Workbench.Models;

namespace Workbench.Pages.Home;

public partial class HomePage()
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    [CascadingParameter]
    public required Site Site { get; set; }
}