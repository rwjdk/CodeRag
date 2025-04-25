using JetBrains.Annotations;
using Microsoft.JSInterop;

namespace BlazorUtilities.Helpers;

[UsedImplicitly]
public class OpenNewTabHelper(IJSRuntime JsRuntime)
{
    public async Task OpenUrlInNewTab(string url)
    {
        await JsRuntime.InvokeVoidAsync("open", url, "_blank");
    }
}