using BlazorUtilities;
using CodeRag.Shared;
using CodeRag.Shared.EntityFramework.DbModels;
using CodeRag.Shared.Ingestion;
using Microsoft.AspNetCore.Components;
using Workbench.Dialogs;

namespace Workbench.Pages.SourceIngestion;

public partial class SourceIngestionPage(CSharpIngestionCommand cSharpIngestionCommand, MarkdownIngestionCommand markdownIngestionCommand) : IDisposable
{
    private int _current;
    private string? _lastMessage;
    private int _total;

    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    [CascadingParameter]
    public required Site Site { get; set; }

    public void Dispose()
    {
        cSharpIngestionCommand.NotifyProgress -= NotifyProgress;
        markdownIngestionCommand.NotifyProgress -= NotifyProgress;
    }


    protected override void OnInitialized()
    {
        cSharpIngestionCommand.NotifyProgress += NotifyProgress;
        markdownIngestionCommand.NotifyProgress += NotifyProgress;
    }

    private void NotifyProgress(ProgressNotification obj)
    {
        _lastMessage = obj.Message;
        if (obj.Current > 0) _current = obj.Current;

        if (obj.Total > 0) _total = obj.Total;

        StateHasChanged();
    }

    private async Task Ingest(ProjectSourceEntity source)
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

    private async Task ShowProjectSettings()
    {
        await Site.ShowProjectDialogAsync(Project, ProjectDialogDefaultTab.Sources);
    }
}