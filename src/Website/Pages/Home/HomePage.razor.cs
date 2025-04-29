using BlazorUtilities;
using Microsoft.AspNetCore.Components;
using Shared.EntityFramework.DbModels;
using Website.Models;

namespace Website.Pages.Home;

public partial class HomePage
{
    [CascadingParameter]
    public required bool LoggedIn { get; set; } //Simulated Login for demo-purpose

    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    [CascadingParameter]
    public required Site Site { get; set; }
}