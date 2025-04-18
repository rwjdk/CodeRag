using Blazor.Shared;
using CodeRag.Shared.Configuration;

namespace Workbench.Components.Layout;

public partial class MainLayout(BlazorUtils blazorUtils)
{
    public BlazorUtils BlazorUtils { get; } = blazorUtils;
    private bool _drawerOpen = true;
    private Project? Project { get; set; }

    private void DrawerToggle()
    {
        _drawerOpen = !_drawerOpen;
    }
}