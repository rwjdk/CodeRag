using Blazor.Shared;
using CodeRag.Shared;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.Ingestion.SourceCode.Csharp;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Pages.CodeIngestion;

public partial class CodeIngestionPage(CSharpIngestionCommand ingestionCommand) : IDisposable
{
    [CascadingParameter] public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter] public required Project Project { get; set; }

    private string? _lastMessage;
    private int _current;
    private int _total;


    protected override void OnInitialized()
    {
        ingestionCommand.NotifyProgress += IngestionCommand_NotifyProgress;
    }

    private void IngestionCommand_NotifyProgress(ProgressNotification obj)
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

    private async Task Ingest(CodeSource source)
    {
        _lastMessage = null;
        _current = 0;
        _total = 0;
        using var workingProgress = BlazorUtils.StartWorking();
        await ingestionCommand.Ingest(Project, source);
    }

    public void Dispose()
    {
        ingestionCommand.NotifyProgress -= IngestionCommand_NotifyProgress;
    }
}