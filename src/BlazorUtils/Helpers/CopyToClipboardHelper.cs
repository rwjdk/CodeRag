using Microsoft.JSInterop;

namespace BlazorUtilities.Helpers;

public class CopyToClipboardHelper(IJSRuntime jsRuntime)
{
    public async Task CopyTextToClipboard(string text)
    {
        await jsRuntime.InvokeVoidAsync("copyToClipboard", text);
    }
}