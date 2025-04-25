using BlazorUtilities.Components;
using BlazorUtilities.Components.Dialogs;
using BlazorUtilities.Helpers;
using JetBrains.Annotations;
using MudBlazor;

// ReSharper disable UnusedMember.Global

namespace BlazorUtilities;

[UsedImplicitly]
public class BlazorUtils(ISnackbar snackbar, IDialogService dialogService, CopyToClipboardHelper copyToClipboardHelper, DownloadFileHelper downloadFileHelper, OpenNewTabHelper openNewTabHelper)
{
    public bool ShowDefaultProgressIndicator { get; private set; }
    public ISnackbar Snackbar => snackbar;

    public bool IsLoading { get; set; }
    public bool IsWorking { get; set; }

    public LoadingProgress StartLoading()
    {
        ShowDefaultProgressIndicator = true;
        IsLoading = true;
        IsWorking = false;
        return new LoadingProgress(this);
    }

    public WorkingProgress StartWorking()
    {
        ShowDefaultProgressIndicator = true;
        IsLoading = false;
        IsWorking = true;
        return new WorkingProgress(this, null);
    }

    public WorkingProgress StartWorking(RProgressBar? progressBar, int max, string? captionTemplate = "{0}/{1}", string? captionOnCompletion = null, bool hideOnCompletion = false)
    {
        progressBar?.Show(max, captionTemplate, captionOnCompletion, hideOnCompletion);
        ShowDefaultProgressIndicator = false;
        IsLoading = false;
        IsWorking = true;
        return new WorkingProgress(this, progressBar);
    }

    public void ShowError(string message, int seconds = 60)
    {
        Snackbar.Clear();
        Snackbar.Configuration.PositionClass = Defaults.Classes.Position.BottomCenter;
        Snackbar.Add(message, Severity.Error, options =>
        {
            options.VisibleStateDuration = seconds * 1000;
            options.HideTransitionDuration = 200;
        });
    }

    public void ShowNotImplemented(string featureName = "")
    {
        Snackbar.Clear();
        Snackbar.Configuration.PositionClass = Defaults.Classes.Position.BottomCenter;
        if (string.IsNullOrWhiteSpace(featureName))
        {
            Snackbar.Add("Todo: This feature is not yet implemented", Severity.Warning, options =>
            {
                options.VisibleStateDuration = 10 * 1000;
                options.HideTransitionDuration = 200;
            });
        }
        else
        {
            Snackbar.Add($"Todo: '{featureName}' is not yet implemented", Severity.Warning, options =>
            {
                options.VisibleStateDuration = 10 * 1000;
                options.HideTransitionDuration = 200;
            });
        }
    }

    public void ShowErrorWithDetails(string message, Exception e, bool requireInteraction = true)
    {
        Snackbar.Add<ErrorDetails>(new Dictionary<string, object>
        {
            { "Message", message },
            { "Exception", e }
        }, Severity.Error, options => { options.RequireInteraction = requireInteraction; });
    }

    public void ClearPopupMessages()
    {
        Snackbar.Clear();
    }

    public void ShowSuccess(string message, int seconds = 10, string position = Defaults.Classes.Position.BottomCenter)
    {
        Snackbar.Clear();
        Snackbar.Configuration.PositionClass = position;
        Snackbar.Add(message, Severity.Success, options =>
        {
            options.VisibleStateDuration = seconds * 1000;
            options.HideTransitionDuration = 200;
        });
    }

    public async Task PromptYesNoQuestion(string question, Func<Task> actionOnYes)
    {
        var parameters = new DialogParameters<ConfirmDialog>
        {
            { x => x.QuestionText, question },
            { x => x.ProceedButtonText, "Yes" },
            { x => x.CancelButtonText, "No" },
            { x => x.Color, Color.Error },
        };

        var options = new DialogOptions { CloseButton = true, MaxWidth = MaxWidth.ExtraSmall };

        IDialogReference dialog = await dialogService.ShowAsync<ConfirmDialog>("Confirm", parameters, options);
        var result = await dialog.Result;
        if (result is { Canceled: false })
        {
            await actionOnYes.Invoke();
        }
    }

    public void ShowWarning(string message, int seconds = 30)
    {
        Snackbar.Clear();
        Snackbar.Configuration.PositionClass = Defaults.Classes.Position.BottomCenter;
        Snackbar.Add(message, Severity.Warning, options =>
        {
            options.VisibleStateDuration = seconds * 1000;
            options.HideTransitionDuration = 200;
        });
    }

    public async Task CopyTextToClipboard(string text)
    {
        await copyToClipboardHelper.CopyTextToClipboard(text);
    }

    public async Task DownloadCsv(string content, string fileName)
    {
        await downloadFileHelper.DownloadCsv(content, fileName);
    }

    public async Task OpenUrlInNewTab(string url)
    {
        await openNewTabHelper.OpenUrlInNewTab(url);
    }
}

public class LoadingProgress(BlazorUtils blazorUtils) : IDisposable
{
    public void Dispose()
    {
        blazorUtils.IsLoading = false;
    }

    public void Exception(Exception exception)
    {
        blazorUtils.Snackbar.Clear();
        blazorUtils.Snackbar.Configuration.PositionClass = Defaults.Classes.Position.BottomCenter;
        blazorUtils.Snackbar.Configuration.VisibleStateDuration = 60_000;
        blazorUtils.Snackbar.Configuration.HideTransitionDuration = 200;
        blazorUtils.Snackbar.Add(exception.Message, Severity.Error);
    }
}

public class WorkingProgress(BlazorUtils blazorUtils, RProgressBar? progressBar) : IDisposable
{
    public void Dispose()
    {
        blazorUtils.IsWorking = false;
    }

    public void ShowException(Exception exception)
    {
        blazorUtils.Snackbar.Clear();
        blazorUtils.Snackbar.Configuration.PositionClass = Defaults.Classes.Position.BottomCenter;
        blazorUtils.Snackbar.Configuration.VisibleStateDuration = 60_000;
        blazorUtils.Snackbar.Configuration.HideTransitionDuration = 200;
        blazorUtils.Snackbar.Add(exception.Message, Severity.Error);
    }

    public void ReportProgress()
    {
        progressBar?.ReportProgress();
    }

    public void ShowSuccess(string successMessage)
    {
        blazorUtils.Snackbar.Clear();
        blazorUtils.Snackbar.Configuration.PositionClass = Defaults.Classes.Position.BottomCenter;
        blazorUtils.Snackbar.Configuration.VisibleStateDuration = 10_000;
        blazorUtils.Snackbar.Configuration.HideTransitionDuration = 200;
        blazorUtils.Snackbar.Add(successMessage, Severity.Success);
    }
}