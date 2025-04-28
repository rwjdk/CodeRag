using JetBrains.Annotations;
using Microsoft.JSInterop;

namespace BlazorUtilities.Helpers;

[UsedImplicitly]
public class OpenNewTabHelper(IJSRuntime jsRuntime)
{
    public async Task OpenUrlInNewTab(string url)
    {
        await jsRuntime.InvokeVoidAsync("open", url, "_blank");
    }
}