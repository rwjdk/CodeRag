using BlazorUtilities;
using BlazorUtilities.Helpers;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using Shared.EntityFramework.DbModels;
using Shared.Projects;
using SimpleRag.Abstractions;
using SimpleRag.Abstractions.Models;
using SimpleRag.Source.CSharp;
using SimpleRag.Source.Markdown;
using SimpleRag.VectorStorage;
using Website.Models;

namespace Website.Dialogs;

public partial class ProjectDialog(
    ProjectCommand projectCommand,
    CSharpSourceCommand cSharpSourceCommand,
    MarkdownSourceCommand ingestionMarkdownCommand,
    VectorStoreCommand vectorStoreCommand) : IDisposable
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
    public required ProjectEntity Project { get; set; }

    protected override void OnInitialized()
    {
        cSharpSourceCommand.NotifyProgress += NotifyProgress;
        ingestionMarkdownCommand.NotifyProgress += NotifyProgress;
    }

    public void Dispose()
    {
        cSharpSourceCommand.NotifyProgress -= NotifyProgress;
        ingestionMarkdownCommand.NotifyProgress -= NotifyProgress;
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

        if (_current % 10 == 0 || _current == _total)
        {
            StateHasChanged();
        }
    }

    private async Task Save()
    {
        List<string> missingValues = [];
        if (string.IsNullOrWhiteSpace(Project.Name))
        {
            missingValues.Add("Name");
        }

        if (missingValues.Any())
        {
            BlazorUtils.ShowError($"The following data is missing before you can save this Project: {string.Join(", ", missingValues)}");
        }
        else
        {
            foreach (Guid sourceId in _sourceIdsPendingDeletion)
            {
                await vectorStoreCommand.DeleteAsync(x => x.SourceId == sourceId.ToString());
            }

            _sourceIdsPendingDeletion.Clear();
            await projectCommand.UpsertProjectAsync(Project);
            foreach (ProjectSourceEntity source in Project.Sources)
            {
                source.AddMode = false;
            }

            Dialog.Close();
        }
    }

    private async Task CreateNewSource(SourceKind kind)
    {
        ProjectSourceEntity newSource = ProjectSourceEntity.Empty(Project, kind);
        DialogResult result = await Site.ShowProjectSourceDialogAsync(Project, newSource);
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
            DateTimeOffset syncStart = DateTimeOffset.UtcNow;
            _syncingSource = source;
            _lastMessage = null;
            _current = 0;
            _total = 0;
            using var workingProgress = BlazorUtils.StartWorking();
            switch (source.Kind)
            {
                case SourceKind.CSharp:
                    await cSharpSourceCommand.IngestAsync(source.AsCSharpSource(Project));
                    break;
                case SourceKind.Markdown:
                    await ingestionMarkdownCommand.IngestAsync(source.AsMarkdownSource(Project));
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

            await projectCommand.UpdateLastGithubCommitDateAsync(source, syncStart);
            await projectCommand.UpdateLastSourceSyncDateAsync(source);
            _syncingSource = null;
            StateHasChanged();
        }
    }

    private MarkupString GetLastSync(ProjectSourceEntity source)
    {
        if (!source.LastSync.HasValue)
        {
            return new MarkupString("Never");
        }

        TimeSpan span = DateTime.UtcNow - source.LastSync.Value;
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

    private async Task Delete()
    {
        await BlazorUtils.PromptYesNoQuestion("Are you sure you wish to delete this project (THERE IS NO GOING BACK)?", async () =>
        {
            await vectorStoreCommand.DeleteAsync(x => x.SourceCollectionId == Project.Id.ToString());
            await projectCommand.DeleteProjectAsync(Project);
            Dialog.Close();
        });
    }
}