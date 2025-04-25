using System.Text;
using Microsoft.JSInterop;

namespace BlazorUtilities.Helpers;

public class DownloadFileHelper(IJSRuntime javaScript)
{
    public async Task DownloadCsv(string content, string fileName)
    {
        var fileStream = new MemoryStream(new UTF8Encoding(true).GetBytes(content));
        using var streamRef = new DotNetStreamReference(stream: fileStream);
        await javaScript.InvokeVoidAsync("downloadFileFromStream", fileName, streamRef);
    }
}