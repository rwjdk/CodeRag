using Blazor.Shared;
using CodeRag.Shared;
using CodeRag.Shared.BusinessLogic.Ingestion.Documentation.Markdown;
using CodeRag.Shared.Models;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Pages.DocsIngestion;

public partial class DocsIngestionPage(MarkdownIngestionCommand ingestionCommand)
{
    [CascadingParameter]
    public required BlazorUtils Utils { get; set; }

    [CascadingParameter]
    public required Project Project { get; set; }

    private bool _reinitializeVectorStoreTable = true; //todo - support deterministic ids and make this default false
    private readonly List<ProgressNotification> _messages = [];

    protected override void OnInitialized()
    {
        ingestionCommand.NotifyProgress += IngestionCommand_NotifyProgress;
    }

    private void IngestionCommand_NotifyProgress(ProgressNotification obj)
    {
        _messages.Add(obj);
        StateHasChanged();
    }

    private async Task Ingest()
    {
        _messages.Clear();

        await ingestionCommand.Ingest(Project, _reinitializeVectorStoreTable);
    }

    public void Dispose()
    {
        ingestionCommand.NotifyProgress -= IngestionCommand_NotifyProgress;
    }
}