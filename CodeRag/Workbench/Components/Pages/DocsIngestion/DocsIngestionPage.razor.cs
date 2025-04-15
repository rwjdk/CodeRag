using Blazor.Shared;
using CodeRag.Shared;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.Ingestion.Documentation.Markdown;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Pages.DocsIngestion;

public partial class DocsIngestionPage(MarkdownIngestionCommand ingestionCommand)
{
    [CascadingParameter]
    public required BlazorUtils Utils { get; set; }

    [CascadingParameter]
    public required Project Project { get; set; }

    private bool _reinitializeSource = true; //todo - support deterministic ids and make this default false
    private readonly List<ProgressNotification> _messages = [];
    private DocumentationSource? _selectedSource;

    protected override void OnInitialized()
    {
        ingestionCommand.NotifyProgress += IngestionCommand_NotifyProgress;
        _selectedSource = Project.DocumentationSources.FirstOrDefault();
    }

    private void IngestionCommand_NotifyProgress(ProgressNotification obj)
    {
        _messages.Add(obj);
        StateHasChanged();
    }

    private async Task Ingest()
    {
        _messages.Clear();

        await ingestionCommand.Ingest(Project, _selectedSource, _reinitializeSource);
    }

    public void Dispose()
    {
        ingestionCommand.NotifyProgress -= IngestionCommand_NotifyProgress;
    }
}