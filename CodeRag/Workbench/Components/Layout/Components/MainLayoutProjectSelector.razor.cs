using Blazor.Shared;
using Blazored.LocalStorage;
using CodeRag.Shared.Ai.AzureOpenAi;
using CodeRag.Shared.Ingestion.Documentation;
using CodeRag.Shared.Ingestion.Documentation.Markdown;
using CodeRag.Shared.Ingestion.SourceCode;
using CodeRag.Shared.Ingestion.SourceCode.Csharp;
using CodeRag.Shared.Models;
using CodeRag.Shared.Prompting;
using CodeRag.Shared.VectorStore;
using Microsoft.AspNetCore.Components;
using OpenAI.Chat;

namespace Workbench.Components.Layout.Components;

public partial class MainLayoutProjectSelector(ILocalStorageService localStorage, IConfiguration configuration)
{
    [CascadingParameter]
    public required BlazorUtils Utils { get; set; }

    [Parameter, EditorRequired]
    public required EventCallback<Project> ProjectChanged { get; set; }

    private Project[]? _projects;
    private Project? _project;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Guid? projectId = await localStorage.GetItemAsync<Guid>(Constants.LocalStorageKeys.Project);

            _projects =
            [
                //Todo - Persist projects
                new Project
                {
                    Id = Guid.Parse("9928f9e2-970d-487d-be15-e90b873db0e0"),
                    Name = "TrelloDotNet",
                    Description = "An API for the Trello Rest API in C#",
                    TestChatDeveloperInstructions = Prompt
                        .Create("You are an C# expert in TrelloDotNet (An API for the Trello Rest API in C#) on GitHub [https://github.com/rwjdk/TrelloDotNet]. Assume all questions are about TrelloDotNet unless specified otherwise")
                        .AddStep($"Use tool '{CodeRag.Shared.Constants.DocumentationSearchPluginName}' to get an overview (break question down to keywords for the tool-usage but do NOT include words 'TrelloDotNet' or 'question' in the tool request)")
                        .AddStep("Next prepare your answer with current knowledge")
                        .AddStep($"If your answer include code-samples then use tool '{CodeRag.Shared.Constants.SourceCodeSearchPluginName}' to check that you called methods correctly and classes and properties exist")
                        .AddStep("Add citations (Link) from the relevant sources")
                        .AddStep("Based on previous step prepare your final answer")
                        .AddStep("The answer and code-examples should ALWAYS be Marmdown format!")
                        //.AddRule("Do NOT include samples in Python or Java. Only C#")
                        //.AddRule($"Do not answer questions about anything but Pleasantries, General subject information, {settings.Name} and C#")
                        //.AddRule($"Do not wrap the code from {settings.Name} in sample methods etc. just show the raw calls to the API")
                        //.AddRuleThatIfYouDontKnowThenDontAnswer()
                        .ToString(),
                    RepoUrl = "https://github.com/rwjdk/TrelloDotNet",
                    RepoUrlSourceCode = "https://github.com/rwjdk/TrelloDotNet/tree/main/src/TrelloDotNet",
                    LocalSourceCodeRepoRoot = @"X:\TrelloDotNet",
                    AzureOpenAiCredentials = new AzureOpenAiCredentials("https://sensum365ai.openai.azure.com/", configuration["AzureOpenAiKey"]!),
                    AzureOpenAiEmbeddingsDeploymentName = "text-embedding-3-small",
                    ChatModels =
                    [
                        new AzureOpenAiChatModel
                        {
                            DeploymentName = "gpt-4o-mini",
                            Temperature = 0,
                            TimeoutInSeconds = 60
                        },
                        new AzureOpenAiChatModel
                        {
                            DeploymentName = "gpt-4o",
                            Temperature = 0,
                            TimeoutInSeconds = 60
                        },
                        new AzureOpenAiChatModel
                        {
                            DeploymentName = "o3-mini",
                            ChatReasoningEffortLevel = ChatReasoningEffortLevel.High,
                            TimeoutInSeconds = 60 * 5
                        },
                    ],
                    VectorSettings = new VectorStoreSettings
                    {
                        Type = VectorStoreType.AzureSql,
                        AzureSqlConnectionString = configuration["SqlServerConnectionString"]!,
                    },
                    CSharpSourceCodeIngestionSettings = new CSharpIngestionSettings
                    {
                        Source = SourceCodeIngestionSource.LocalCSharpRepo,
                        SourcePath = @"X:\TrelloDotNet\src\TrelloDotNet",
                        CSharpFilesToIgnore = ["Program.cs"],
                        CSharpFilesWithTheseSuffixesToIgnore = ["Test.cs", "Tests.cs", "AssemblyAttributes.cs", "AssemblyInfo.cs"],
                    },
                    MarkdownIngestionSettings = new MarkdownIngestionSettings
                    {
                        Source = DocumentationIngestionSource.LocalMarkdown,
                        SourcePath = @"X:\TrelloDotNet.wiki",
                        FilenameEqualDocUrlSubpage = true,
                        LineSplitter = Environment.NewLine,
                        FilesToIgnore = ["_Footer", "_Sidebar"],
                        IgnoreCommentedOutContent = true,
                        IgnoreImages = true,
                        IgnoreMicrosoftLearnNoneCsharpContent = false,
                        IncludeMarkdownInSourceCodeRepoRoot = true,
                        MarkdownLevelsToChunk = 2,
                        OnlyChunkIfMoreThanThisNumberOfLines = 50,
                        RootUrl = "https://github.com/rwjdk/TrelloDotNet/wiki",
                        ChunkIgnoreIfLessThanThisAmountOfChars = 25,
                        ChunkLineRegExPatternsToIgnore = [@"^\[Back to [^\]]+\]\([^\)]+\)"],
                    },
                    DefaultTestChatInput = "What is GetCardOptions? (use code)"
                }
            ];

            await SelectProject(_projects.FirstOrDefault(x => x.Id == projectId) ?? _projects.FirstOrDefault());
        }
    }

    private async Task SelectProject(Project? project)
    {
        _project = project;
        if (_project != null)
        {
            await localStorage.SetItemAsync(Constants.LocalStorageKeys.Project, _project.Id);
        }
        else
        {
            await localStorage.RemoveItemAsync(Constants.LocalStorageKeys.Project);
        }

        await ProjectChanged.InvokeAsync(project);
    }

    private async Task NewProject()
    {
        await Task.CompletedTask; //todo-remove
        Utils.ShowNotImplemented("New Project"); //todo - implement
    }

    private async Task ShowProjectSettings()
    {
        await Task.CompletedTask; //todo-remove
        Utils.ShowNotImplemented("Show Project Settings"); //todo - implement
    }
}