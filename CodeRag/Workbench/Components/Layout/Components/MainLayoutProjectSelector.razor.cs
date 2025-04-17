using Blazor.Shared;
using Blazored.LocalStorage;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.Prompting;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using OpenAI.Chat;
using Workbench.Components.Dialogs;

namespace Workbench.Components.Layout.Components;

public partial class MainLayoutProjectSelector(ILocalStorageService localStorage, IDialogService dialogService, IConfiguration configuration)
{
    [CascadingParameter] public required BlazorUtils Utils { get; set; }

    [Parameter, EditorRequired] public required EventCallback<Project> ProjectChanged { get; set; }

    private Project[]? _projects;
    private Project? _project;

    private Project _projectOnline = new Project
    {
        Id = Guid.Parse("9928f9e2-970d-487d-be15-e90b873db0e1"),
        Name = "TrelloDotNet-Online",
        Description = "An API for the Trello Rest API in C#",
        TestChatDeveloperInstructions = Prompt
            .Create("You are an C# expert in TrelloDotNet (An API for the Trello Rest API in C#) on GitHub [https://github.com/rwjdk/TrelloDotNet]. Assume all questions are about TrelloDotNet unless specified otherwise")
            .AddStep($"Use tool '{CodeRag.Shared.Constants.DocumentationSearchPluginName}' to get an overview (break question down to keywords for the tool-usage but do NOT include words 'TrelloDotNet' or 'question' in the tool request)")
            .AddStep("Next prepare your answer with current knowledge")
            .AddStep($"If your answer include code-samples then use tool '{CodeRag.Shared.Constants.SourceCodeSearchPluginName}' to check that you called methods correctly and classes and properties exist")
            .AddStep("Add citations from the relevant sources")
            .AddStep("Based on previous step prepare your final answer")
            .AddStep("The answer and code-examples should ALWAYS be Markdown format!")
            //.AddRule("Do NOT include samples in Python or Java. Only C#")
            //.AddRule($"Do not answer questions about anything but Pleasantries, General subject information, {settings.Name} and C#")
            //.AddRule($"Do not wrap the code from {settings.Name} in sample methods etc. just show the raw calls to the API")
            //.AddRuleThatIfYouDontKnowThenDontAnswer()
            .ToString(),
        RepoUrl = "https://github.com/rwjdk/TrelloDotNet",
        AzureOpenAiEndpoint = "https://sensum365ai.openai.azure.com/",
        AzureOpenAiKey = configuration["AzureOpenAiKey"]!,
        AzureOpenAiEmbeddingModelDeploymentName = "text-embedding-3-small",
        AzureOpenAiChatCompletionDeployments =
        [
            new AzureOpenAiChatCompletionDeployment
            {
                Id = new Guid("330e772c-7a58-4f60-83c9-f8351c422428"),
                DeploymentName = "gpt-4.1",
                Temperature = 0,
                TimeoutInSeconds = 60
            },
            new AzureOpenAiChatCompletionDeployment
            {
                Id = new Guid("330e772c-7a58-4f60-83c9-f8351c422427"),
                DeploymentName = "gpt-4o-mini",
                Temperature = 0,
                TimeoutInSeconds = 60
            },
            new AzureOpenAiChatCompletionDeployment
            {
                Id = new Guid("330e772c-7a58-4f60-83c9-f8351c422426"),
                DeploymentName = "gpt-4o",
                Temperature = 0,
                TimeoutInSeconds = 60
            },
            new AzureOpenAiChatCompletionDeployment
            {
                Id = new Guid("330e772c-7a58-4f60-83c9-f8351c422424"),
                DeploymentName = "o3-mini",
                ReasoningEffortLevel = "high",
                TimeoutInSeconds = 60 * 5
            }
        ],
        SqlServerVectorStoreConnectionString = configuration["SqlServerConnectionString"]!,
        GitHubToken = configuration["GitHubToken"],
        CodeSources =
        [
            new CodeSource
            {
                Id = new Guid("330e772c-7a58-4f60-83c9-f8351c322428"),
                Location = CodeSourceLocation.PublicGitHubRepo,
                Name = "TrelloDotNet SourceCode",
                PublicGitHubSourceOwner = "rwjdk",
                PublicGitHubSourceRepo = "TrelloDotNet",
                PublicGitHubSourceRepoPath = "src/TrelloDotNet",
                RootUrl = "https://github.com/rwjdk/TrelloDotNet/tree/main/src/TrelloDotNet",
                Type = CodeSourceType.CSharp,
                FilesToIgnore = ["Program.cs"],
                FilesWithTheseSuffixesToIgnore = ["Test.cs", "Tests.cs", "AssemblyAttributes.cs", "AssemblyInfo.cs"],
            }
        ],
        DocumentationSources =
        [
            new DocumentationSource
            {
                Id = new Guid("330e772c-7a58-5f60-83c9-f8351c422428"),
                IgnoreCommentedOutContent = true,
                IgnoreImages = true,
                SourcePath = @"C:\CodeRag\SampleRepo",
                Type = DocumentationSourceType.CodeRepoRootMarkdown,
                Name = "SourceRepo Root Files"
            }
        ],
        DefaultTestChatInput = "What is GetCardOptions? (use code)"
    };

    private Project _projectOffline = new Project
    {
        Id = Guid.Parse("9928f9e2-970d-487d-be15-e90b873db0e0"),
        Name = "TrelloDotNet",
        Description = "An API for the Trello Rest API in C#",
        TestChatDeveloperInstructions = Prompt
            .Create("You are an C# expert in TrelloDotNet (An API for the Trello Rest API in C#) on GitHub [https://github.com/rwjdk/TrelloDotNet]. Assume all questions are about TrelloDotNet unless specified otherwise")
            .AddStep($"Use tool '{CodeRag.Shared.Constants.DocumentationSearchPluginName}' to get an overview (break question down to keywords for the tool-usage but do NOT include words 'TrelloDotNet' or 'question' in the tool request)")
            .AddStep("Next prepare your answer with current knowledge")
            .AddStep($"If your answer include code-samples then use tool '{CodeRag.Shared.Constants.SourceCodeSearchPluginName}' to check that you called methods correctly and classes and properties exist")
            .AddStep("Add citations from the relevant sources")
            .AddStep("Based on previous step prepare your final answer")
            .AddStep("The answer and code-examples should ALWAYS be Markdown format!")
            //.AddRule("Do NOT include samples in Python or Java. Only C#")
            //.AddRule($"Do not answer questions about anything but Pleasantries, General subject information, {settings.Name} and C#")
            //.AddRule($"Do not wrap the code from {settings.Name} in sample methods etc. just show the raw calls to the API")
            //.AddRuleThatIfYouDontKnowThenDontAnswer()
            .ToString(),
        RepoUrl = "https://github.com/rwjdk/TrelloDotNet",
        AzureOpenAiEndpoint = "https://sensum365ai.openai.azure.com/",
        AzureOpenAiKey = configuration["AzureOpenAiKey"]!,
        AzureOpenAiEmbeddingModelDeploymentName = "text-embedding-3-small",
        AzureOpenAiChatCompletionDeployments =
        [
            new AzureOpenAiChatCompletionDeployment
            {
                Id = new Guid("230e772c-7a58-4f60-83c9-f8351c422428"),
                DeploymentName = "gpt-4.1",
                Temperature = 0,
                TimeoutInSeconds = 60
            },
            new AzureOpenAiChatCompletionDeployment
            {
                Id = new Guid("230e772c-7a58-4f60-83c9-f8351c422427"),
                DeploymentName = "gpt-4o-mini",
                Temperature = 0,
                TimeoutInSeconds = 60
            },
            new AzureOpenAiChatCompletionDeployment
            {
                Id = new Guid("230e772c-7a58-4f60-83c9-f8351c422426"),
                DeploymentName = "gpt-4o",
                Temperature = 0,
                TimeoutInSeconds = 60
            },
            new AzureOpenAiChatCompletionDeployment
            {
                Id = new Guid("230e772c-7a58-4f60-83c9-f8351c422424"),
                DeploymentName = "o3-mini",
                ReasoningEffortLevel = "high",
                TimeoutInSeconds = 60 * 5
            }
        ],
        SqlServerVectorStoreConnectionString = configuration["SqlServerConnectionString"]!,
        CodeSources =
        [
            new CodeSource
            {
                Id = new Guid("230e772c-7a58-4f60-83c9-f8351c322428"),
                Location = CodeSourceLocation.LocalSourceCode,
                Name = "TrelloDotNet SourceCode",
                LocalSourceCodePath = @"C:\CodeRag\SampleRepo\src",
                RootUrl = "https://github.com/rwjdk/TrelloDotNet/tree/main/src/TrelloDotNet",
                Type = CodeSourceType.CSharp,
                FilesToIgnore = ["Program.cs"],
                FilesWithTheseSuffixesToIgnore = ["Test.cs", "Tests.cs", "AssemblyAttributes.cs", "AssemblyInfo.cs"],
            }
        ],
        DocumentationSources =
        [
            new DocumentationSource
            {
                Id = new Guid("230e772c-7a58-4f60-83c2-f8351c422428"),
                SourcePath = @"C:\CodeRag\CodeWiki",
                FilenameEqualDocUrlSubpage = true,
                LineSplitter = Environment.NewLine,
                FilesToIgnore = ["_Footer", "_Sidebar"],
                IgnoreCommentedOutContent = true,
                IgnoreImages = true,
                IgnoreMicrosoftLearnNoneCsharpContent = false,
                MarkdownLevelsToChunk = 2,
                OnlyChunkIfMoreThanThisNumberOfLines = 50,
                RootUrl = "https://github.com/rwjdk/TrelloDotNet/wiki",
                ChunkIgnoreIfLessThanThisAmountOfChars = 25,
                ChunkLineRegExPatternsToIgnore = [@"^\[Back to [^\]]+\]\([^\)]+\)"],
                Name = "Code Wiki",
                Type = DocumentationSourceType.GitHubCodeWiki,
            },
            new DocumentationSource
            {
                Id = new Guid("230e772c-7a58-5f60-83c9-f8351c422428"),
                IgnoreCommentedOutContent = true,
                IgnoreImages = true,
                SourcePath = @"C:\CodeRag\SampleRepo",
                Type = DocumentationSourceType.CodeRepoRootMarkdown,
                Name = "SourceRepo Root Files"
            }
        ],
        DefaultTestChatInput = "What is GetCardOptions? (use code)"
    };

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Guid? projectId = await localStorage.GetItemAsync<Guid>(Constants.LocalStorageKeys.Project);
            _projects =
            [
                //Todo - Persist projects
                _projectOnline,
                _projectOffline
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
        await ShowProjectSettings(null);
    }

    private async Task ShowProjectSettings(Project? project)
    {
        var parameters = new DialogParameters<ProjectDialog>
        {
            { x => x.Project, project ?? Project.Empty() },
        };

        DialogOptions dialogOptions = new()
        {
            Position = DialogPosition.TopCenter,
            BackdropClick = false,
            CloseButton = true,
        };
        var reference = await dialogService.ShowAsync<ProjectDialog>(project?.Name ?? "New Project", parameters, dialogOptions);
        var result = await reference.Result;
        if (result is { Canceled: false })
        {
            //todo - reload projects
        }
    }
}