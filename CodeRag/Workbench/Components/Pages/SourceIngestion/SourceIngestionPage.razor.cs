using Blazor.Shared;
using CodeRag.Shared;
using CodeRag.Shared.Configuration;
using CodeRag.Shared.Ingestion;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Pages.SourceIngestion;

public partial class SourceIngestionPage(CSharpIngestionCommand cSharpIngestionCommand, MarkdownIngestionCommand markdownIngestionCommand) : IDisposable
{
    [CascadingParameter] public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter] public required Project Project { get; set; }

    private string? _lastMessage;
    private int _current;
    private int _total;


    protected override void OnInitialized()
    {
        cSharpIngestionCommand.NotifyProgress += NotifyProgress;
        markdownIngestionCommand.NotifyProgress += NotifyProgress;
    }

    private void NotifyProgress(ProgressNotification obj)
    {
        _lastMessage = obj.Message;
        if (obj.Current > 0)
        {
            _current = obj.Current;
        }

        if (obj.Total > 0)
        {
            _total = obj.Total;
        }

        StateHasChanged();
    }

    private async Task Ingest(ProjectSource source)
    {
        _lastMessage = null;
        _current = 0;
        _total = 0;
        using var workingProgress = BlazorUtils.StartWorking();
        switch (source.Kind)
        {
            case ProjectSourceKind.CSharpCode:
                await cSharpIngestionCommand.Ingest(Project, source);
                break;
            case ProjectSourceKind.Markdown:
                await markdownIngestionCommand.Ingest(Project, source);
                break;
            default:
                throw new ArgumentOutOfRangeException();
        }
    }

    public void Dispose()
    {
        cSharpIngestionCommand.NotifyProgress -= NotifyProgress;
        markdownIngestionCommand.NotifyProgress -= NotifyProgress;
    }
}