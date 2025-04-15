using Blazor.Shared;
using CodeRag.Shared;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.Ingestion.Documentation.Markdown;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Pages.DocsIngestion;

public partial class DocsIngestionPage(MarkdownIngestionCommand ingestionCommand) : IDisposable
{
    [CascadingParameter]
    public required BlazorUtils Utils { get; set; }

    [CascadingParameter]
    public required Project Project { get; set; }

    private bool _reinitializeSource = true; //todo - support deterministic ids and make this default false
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

    private async Task Ingest(DocumentationSource source)
    {
        _messages.Clear();

        await ingestionCommand.Ingest(Project, source, _reinitializeSource);
    }

    public void Dispose()
    {
        ingestionCommand.NotifyProgress -= IngestionCommand_NotifyProgress;
    }
}