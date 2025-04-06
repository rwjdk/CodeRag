using Blazor.Shared;
using CodeRag.Shared;
using CodeRag.Shared.BusinessLogic.CodeIngestion;
using CodeRag.Shared.BusinessLogic.CodeIngestion.Models;
using CodeRag.Shared.BusinessLogic.VectorStore.Models;
using CodeRag.Shared.Models;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Pages.CodeIngestion;

public partial class CodeIngestionPage(IConfiguration configuration, CodeIngestionCommand ingestionCommand) : IDisposable
{
    [CascadingParameter]
    public required BlazorUtils Utils { get; set; }

    [CascadingParameter]
    public required Project Project { get; set; }

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

    private async Task IngestCode()
    {
        _messages.Clear();

        await ingestionCommand.Ingest(new CodeIngestionSettings
        {
            //Todo - get from project/Gui
            Source = CodeIngestionSource.LocalSourceCode, //todo
            SourcePath = @"X:\TrelloDotNet\src\TrelloDotNet", //todo
            AzureOpenAiCredentials = Project.AzureOpenAiCredentials,
            AzureOpenAiEmbeddingDeploymentName = "text-embedding-3-small",
            Target = Project.SourceCodeVectorSettings,
            CSharpFilesToIgnore = ["Program.cs"],
            CSharpFilesWithTheseSuffixesToIgnore = ["Test.cs", "Tests.cs", "AssemblyAttributes.cs", "AssemblyInfo.cs"],
            DeletePreviousDataInCollection = true
        });
    }

    public void Dispose()
    {
        ingestionCommand.NotifyProgress -= IngestionCommand_NotifyProgress;
    }
}