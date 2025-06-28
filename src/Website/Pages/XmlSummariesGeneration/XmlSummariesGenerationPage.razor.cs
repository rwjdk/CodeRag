using BlazorUtilities;
using BlazorUtilities.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Formatting;
using MudBlazor;
using Shared;
using Shared.Ai;
using Shared.EntityFramework.DbModels;
using Website.Models;
using Shared.Ai.Queries;
using SimpleRag.DataSources.CSharp;
using SimpleRag.DataSources.CSharp.Models;

namespace Website.Pages.XmlSummariesGeneration;

public partial class XmlSummariesGenerationPage(CSharpChunker cSharpChunker, AiXmlSummaryQuery aiXmlSummaryQuery)
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    private ProjectEntity? _previousProject;
    private ProjectSourceEntity[]? _sources;
    private ProjectSourceEntity? _selectedSource;
    private TreeItemData<File>? _tree;
    private MudTreeView<File>? _treeView;
    private string? _searchPhrase;
    private SummaryStatus _summaryStatus = SummaryStatus.MissingSummary;
    private CSharpKind _kind = CSharpKind.Method;
    private File? _selectedItem;
    private RProgressBar? _progressBar;
    private AiChatModel? _chatModel;
    private CSharpChunk? _selectedChunk;

    protected override async Task OnParametersSetAsync()
    {
        if (!EqualityComparer<ProjectEntity>.Default.Equals(Project, _previousProject))
        {
            _previousProject = Project;
            _sources = null;
            _selectedSource = null;
            _chatModel = null;
            _tree = null;
            await OnInitializedAsync();
        }
    }

    private async Task OnSearchTextChanged(string searchPhrase)
    {
        _searchPhrase = searchPhrase;
        if (_treeView != null)
        {
            await _treeView.FilterAsync();
        }
    }

    private Task<bool> Search(TreeItemData<File> item)
    {
        if (string.IsNullOrEmpty(item.Value!.Info.Name))
        {
            return Task.FromResult(false);
        }

        return Task.FromResult(_searchPhrase != null && item.Value.Info.Name.Contains(_searchPhrase, StringComparison.OrdinalIgnoreCase));
    }

    protected override async Task OnInitializedAsync()
    {
        try
        {
            _chatModel = aiXmlSummaryQuery.GetChatModels().FirstOrDefault();
            _sources = Project.Sources.Where(x => x.Kind == SourceKind.CSharp).ToArray();
            _selectedSource = _sources.FirstOrDefault();
            if (_selectedSource is { Location: SourceLocation.Local }) //todo: Support GitHubLocation in XmlSummaries (https://github.com/rwjdk/CodeRag/issues/3)
            {
                await Refresh();
            }
        }
        catch (Exception exception)
        {
            BlazorUtils.ShowErrorWithDetails("Error loading page", exception);
        }
    }

    private TreeItemData<File> BuildFileTree(string rootPath)
    {
        var rootInfo = new DirectoryInfo(rootPath);
        var rootNode = new TreeItemData<File> { Value = new File(rootInfo, []) };
        BuildFileTreeChildren(rootNode, rootInfo);
        return rootNode;
    }

    private void BuildFileTreeChildren(TreeItemData<File> parentNode, DirectoryInfo dirInfo)
    {
        parentNode.Children ??= [];
        foreach (var dir in dirInfo.GetDirectories())
        {
            var dirNode = new TreeItemData<File> { Value = new File(dir, []) };
            BuildFileTreeChildren(dirNode, dir);
            if (dirNode.Children is { Count: > 0 })
            {
                parentNode.Children.Add(dirNode);
            }
        }

        foreach (var file in dirInfo.GetFiles("*.cs"))
        {
            if (_selectedSource!.AsFileContentGithubSource().IgnoreFile(file.FullName))
            {
                continue;
            }

            List<CSharpChunk> entities = cSharpChunker.GetCodeEntities(System.IO.File.ReadAllText(file.FullName)).Where(x => x.Kind == _kind).ToList();
            var matches = entities.Where(x => x.Kind == _kind);
            switch (_summaryStatus)
            {
                case SummaryStatus.MissingSummary:
                    matches = matches.Where(x => string.IsNullOrWhiteSpace(x.XmlSummary));
                    break;
                case SummaryStatus.HasSummary:
                    matches = matches.Where(x => !string.IsNullOrWhiteSpace(x.XmlSummary));
                    break;
            }

            entities = matches.ToList();

            if (entities.Count > 0)
            {
                parentNode.Children.Add(new TreeItemData<File> { Value = new File(file, entities) });
            }
        }
    }

    private async Task SwitchKind(CSharpKind kind)
    {
        _kind = kind;
        await Refresh();
    }

    private async Task Refresh()
    {
        if (_selectedSource != null)
        {
            await Task.Run(() =>
            {
                try
                {
                    _selectedChunk = null;
                    _selectedItem = null;
                    _tree = BuildFileTree(_selectedSource.Path);
                }
                catch (Exception e)
                {
                    BlazorUtils.ShowErrorWithDetails("Error building File Tree", e);
                }
            });
        }
    }

    private async Task SwitchSummaryStatus(SummaryStatus summaryStatus)
    {
        _summaryStatus = summaryStatus;
        await Refresh();
    }

    private async Task SwitchSource(ProjectSourceEntity? source)
    {
        _selectedSource = source;
        if (_selectedSource != null)
        {
            await Refresh();
        }
    }

    private void SwitchSelected(File? selectedItem)
    {
        _selectedItem = selectedItem;
        _selectedChunk = null;
    }

    private async Task Generate(CSharpChunk chunk)
    {
        using WorkingProgress workingProgress = BlazorUtils.StartWorking();
        var xmlSummary = await aiXmlSummaryQuery.GenerateCSharpXmlSummary(Project, chunk.Value, _chatModel!);
        chunk.XmlSummary = xmlSummary;
        workingProgress.ShowSuccess("New XML Summary generated. Use the Save Button to Accept the changes");
    }

    private async Task Save(string path, CSharpChunk chunk)
    {
        SyntaxTree tree = CSharpSyntaxTree.ParseText(await System.IO.File.ReadAllTextAsync(path));
        var root = await tree.GetRootAsync();

        var oldNode = root.DescendantNodes().FirstOrDefault(x => x.ToString() == chunk.Node.ToString());
        if (oldNode != null)
        {
            var xmlSummaryText = chunk.XmlSummary;
            var parsedTrivia = SyntaxFactory.ParseLeadingTrivia(xmlSummaryText + Environment.NewLine);
            var newMethod = oldNode.WithLeadingTrivia(parsedTrivia);
            var newRoot = root.ReplaceNode(oldNode, newMethod);
            newRoot = Formatter.Format(newRoot, new AdhocWorkspace());
            await System.IO.File.WriteAllTextAsync(path, newRoot.ToFullString().Replace("\r\n", "\n").Replace("\n", "\r\n"));
        }

        BlazorUtils.ShowSuccess($"Saved new XML Summary for {chunk.Name}");
    }

    private async Task GenerateAll()
    {
        var workingProgress = BlazorUtils.StartWorking(_progressBar, _selectedItem!.CodeChunks.Count, hideOnCompletion: true);
        foreach (var chunk in _selectedItem.CodeChunks)
        {
            await Generate(chunk);
            await Save(_selectedItem.Info.FullName, chunk);
            workingProgress.ReportProgress();
        }

        await Refresh();
        BlazorUtils.ShowSuccess("Done. Please check your GIT Changes for the repo");
    }

    private class File(FileSystemInfo info, List<CSharpChunk> codeChunks)
    {
        public FileSystemInfo Info { get; } = info;
        public List<CSharpChunk> CodeChunks { get; } = codeChunks;

        public int GetTotalRelatedEntities(List<TreeItemData<File>>? children)
        {
            if (children == null) return CodeChunks.Count;
            int sum = 0;
            foreach (var child in children)
            {
                sum += child.Value!.CodeChunks.Count;
                sum += GetTotalRelatedEntities(child.Children);
            }

            return sum;
        }

        public string? GetIcon()
        {
            return Info.Attributes.HasFlag(FileAttributes.Directory) ? Icons.Material.Filled.Folder : null;
        }
    }
}