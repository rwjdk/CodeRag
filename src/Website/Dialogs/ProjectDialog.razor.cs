using BlazorUtilities;
using BlazorUtilities.Helpers;
using CodeRag.Shared;
using Microsoft.AspNetCore.Components;
using Microsoft.Extensions.VectorData;
using MudBlazor;
using Shared;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;
using Shared.Ingestion;
using Shared.Projects;
using Shared.VectorStore;
using Website.Models;

namespace Website.Dialogs;

public partial class ProjectDialog(ProjectCommand projectCommand, CSharpIngestionCommand cSharpIngestionCommand, MarkdownIngestionCommand markdownIngestionCommand, VectorStoreCommand vectorStoreCommand) : IDisposable
{
    private int _current;
    private string? _lastMessage;
    private int _total;
    private ProjectSourceEntity? _syncingSource;
    private readonly List<Guid> _sourceIdsPendingDeletion = [];

    [CascadingParameter]
    public required IMudDialogInstance Dialog { get; set; }

    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required Site Site { get; set; }

    [Parameter, EditorRequired]
    public required bool AddMode { get; set; }

    [Parameter, EditorRequired]
    public required ProjectEntity Project { get; set; }

    protected override void OnInitialized()
    {
        cSharpIngestionCommand.NotifyProgress += NotifyProgress;
        markdownIngestionCommand.NotifyProgress += NotifyProgress;
    }

    public void Dispose()
    {
        cSharpIngestionCommand.NotifyProgress -= NotifyProgress;
        markdownIngestionCommand.NotifyProgress -= NotifyProgress;
    }

    private void NotifyProgress(ProgressNotification obj)
    {
        _lastMessage = obj.Message;
        if (obj is { Total: > 0, Current: > 0 })
        {
            _lastMessage = $"{obj.Current}/{obj.Total}: {_lastMessage}";
            _total = obj.Total;
            _current = obj.Current;
        }

        StateHasChanged();
    }

    private async Task Save()
    {
        //todo - Validation
        foreach (var sourceId in _sourceIdsPendingDeletion)
        {
            await vectorStoreCommand.DeleteSourceDataAsync(sourceId);
        }

        _sourceIdsPendingDeletion.Clear();
        await projectCommand.UpsertProjectAsync(Project);
        Dialog.Close();
    }

    private async Task CreateNewSource(ProjectSourceKind kind)
    {
        var newSource = ProjectSourceEntity.Empty(Project, kind);
        var result = await Site.ShowProjectSourceDialogAsync(Project, newSource, kind);
        if (result == DialogResult.Ok)
        {
            Project.Sources.Add(newSource);
        }
    }

    private async Task EditSource(ProjectSourceEntity? source)
    {
        if (source != null)
        {
            await Site.ShowProjectSourceDialogAsync(Project, source);
        }
    }

    private async Task DeleteSource(ProjectSourceEntity? source)
    {
        if (source != null)
        {
            await BlazorUtils.PromptYesNoQuestion("Are you sure you wish to remove this source?", async () =>
            {
                _sourceIdsPendingDeletion.Add(source.Id);
                await Task.FromResult(Project.Sources.Remove(source));
                StateHasChanged();
            });
        }
    }

    private async Task SyncSource(ProjectSourceEntity? source)
    {
        if (source != null)
        {
            _syncingSource = source;
            _lastMessage = null;
            _current = 0;
            _total = 0;
            using var workingProgress = BlazorUtils.StartWorking();
            switch (source.Kind)
            {
                case ProjectSourceKind.CSharpCode:
                    await cSharpIngestionCommand.IngestAsync(Project, source);
                    break;
                case ProjectSourceKind.Markdown:
                    await markdownIngestionCommand.IngestAsync(Project, source);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            await projectCommand.UpdateLastSourceSyncDateAsync(source);
            _syncingSource = null;
            StateHasChanged();
        }
    }

    private MarkupString GetLastSync(ProjectSourceEntity source)
    {
        if (source.LastSync.HasValue)
        {
            var span = DateTime.UtcNow - source.LastSync.Value;
            if (span.TotalDays > 1)
            {
                return new MarkupString(Plural.DaysMarkup(Convert.ToInt32(span.TotalDays)) + " ago");
            }

            if (span.TotalHours > 1)
            {
                return new MarkupString(Plural.HoursMarkup(Convert.ToInt32(span.TotalHours)) + " ago");
            }

            if (span.TotalMinutes > 1)
            {
                return new MarkupString(Plural.MinutesMarkup(Convert.ToInt32(span.TotalMinutes)) + " ago");
            }

            return new MarkupString("Less than a minute ago");
        }

        return new MarkupString("Never");
    }
}