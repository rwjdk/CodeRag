using BlazorUtilities;
using BlazorUtilities.Components;
using Microsoft.AspNetCore.Components;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Formatting;
using MudBlazor;
using Shared.Ai;
using Shared.Chunking.CSharp;
using Shared.EntityFramework.DbModels;
using Shared.VectorStore;
using Website.Models;

namespace Website.Pages.XmlSummariesGeneration;

public partial class XmlSummariesGenerationPage(VectorStoreQuery vectorStoreQuery, CSharpChunker cSharpChunker, AiQuery aiQuery)
{
    private ProjectSourceEntity[]? _sources;
    private ProjectSourceEntity? _selectedSource;

    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    private TreeItemData<Item>? _tree;
    private MudTreeView<Item>? _treeView;

    private string? _searchPhrase;
    private SummaryStatus _summaryStatus = SummaryStatus.All;
    private CSharpKind _kind = CSharpKind.Method;
    private VectorEntity[]? _existingVectorEntities;
    private Item? _selectedItem;
    private RProgressBar? _progressBar;
    private AiChatModel? _chatModel;
    private CSharpChunk? _selectedChunk;

    private async Task OnSearchTextChanged(string searchPhrase)
    {
        _searchPhrase = searchPhrase;
        if (_treeView != null)
        {
            await _treeView.FilterAsync();
        }
    }

    private Task<bool> MatchesName(TreeItemData<Item> item)
    {
        if (string.IsNullOrEmpty(item.Value!.Info.Name))
        {
            return Task.FromResult(false);
        }

        return Task.FromResult(_searchPhrase != null && item.Value.Info.Name.Contains(_searchPhrase, StringComparison.OrdinalIgnoreCase));
    }

    protected override async Task OnInitializedAsync()
    {
        //todo - this page throw exception is source location is GitHub
        _chatModel = aiQuery.GetChatModels().FirstOrDefault();
        _sources = Project.Sources.Where(x => x.Kind == ProjectSourceKind.CSharpCode).ToArray();
        _selectedSource = _sources.FirstOrDefault();
        await Refresh();
    }

    private TreeItemData<Item> BuildTree(string rootPath, VectorEntity[] existing)
    {
        var rootInfo = new DirectoryInfo(rootPath);
        var rootNode = new TreeItemData<Item> { Value = new Item(rootInfo, [], []) };
        BuildChildren(rootNode, rootInfo, existing);
        return rootNode;
    }

    private void BuildChildren(TreeItemData<Item> parentNode, DirectoryInfo dirInfo, VectorEntity[] existing)
    {
        parentNode.Children ??= [];
        foreach (var dir in dirInfo.GetDirectories())
        {
            var dirNode = new TreeItemData<Item> { Value = new Item(dir, [], []) };
            BuildChildren(dirNode, dir, existing);
            if (dirNode.Children is { Count: > 0 })
            {
                parentNode.Children.Add(dirNode);
            }
        }

        foreach (var file in dirInfo.GetFiles("*.cs"))
        {
            List<CSharpChunk> entities = cSharpChunker.GetCodeEntities(File.ReadAllText(file.FullName)).Where(x => x.Kind == _kind).ToList();
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

            var vectorMatches = existing.Where(x => file.FullName == _selectedSource.Path + x.SourcePath).ToArray();
            if (entities.Count > 0)
            {
                parentNode.Children.Add(new TreeItemData<Item> { Value = new Item(file, entities, vectorMatches) });
            }
        }
    }

    private class Item(FileSystemInfo info, List<CSharpChunk> codeChunks, VectorEntity[] vectorEntities)
    {
        public FileSystemInfo Info { get; } = info;
        public List<CSharpChunk> CodeChunks { get; } = codeChunks;
        public VectorEntity[] VectorEntities { get; } = vectorEntities;

        public string GetText(List<TreeItemData<Item>>? children)
        {
            return Info.Name;
        }

        public int GetTotalRelatedEntities(List<TreeItemData<Item>>? children)
        {
            if (children == null) return CodeChunks.Count;
            int sum = 0;
            foreach (var child in children)
            {
                sum += child.Value.CodeChunks.Count;
                sum += GetTotalRelatedEntities(child.Children);
            }

            return sum;
        }

        public string? GetIcon()
        {
            if (Info.Attributes.HasFlag(FileAttributes.Directory))
            {
                return Icons.Material.Filled.Folder;
            }

            return null;
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
            _existingVectorEntities = await vectorStoreQuery.GetExistingAsync(Project.Id, _selectedSource.Id);
            var existing = _existingVectorEntities.Where(x => x.Kind == _kind.ToString());
            switch (_summaryStatus)
            {
                case SummaryStatus.MissingSummary:
                    existing = existing.Where(x => string.IsNullOrWhiteSpace(x.Summary));
                    break;
                case SummaryStatus.HasSummary:
                    existing = existing.Where(x => !string.IsNullOrWhiteSpace(x.Summary));
                    break;
            }

            _tree = BuildTree(_selectedSource.Path, existing.ToArray());
        }
    }

    private async Task SwitchSummaryStatus(SummaryStatus summaryStatus)
    {
        _summaryStatus = summaryStatus;
        await Refresh();
    }

    private async Task SwitchSource(ProjectSourceEntity source)
    {
        _selectedSource = source;
        if (_selectedSource != null)
        {
            await Refresh();
        }
        else
        {
            _existingVectorEntities = null;
        }
    }

    private void SwitchSelected(Item? selectedItem)
    {
        _selectedItem = selectedItem;
        _selectedChunk = null;
    }

    private async Task Generate(CSharpChunk chunk)
    {
        using WorkingProgress workingProgress = BlazorUtils.StartWorking();
        var xmlSummary = await aiQuery.GenerateCSharpXmlSummary(Project, chunk.Content, _chatModel);
        chunk.XmlSummary = xmlSummary;
        workingProgress.ShowSuccess("New XML Summary generated. Use the Save Button to Accept the changes");
    }

    private async Task Save(string path, CSharpChunk chunk)
    {
        SyntaxTree tree = CSharpSyntaxTree.ParseText(await File.ReadAllTextAsync(path));
        var root = await tree.GetRootAsync();

        var oldNode = root.DescendantNodes().FirstOrDefault(x => x.ToString() == chunk.Node.ToString());

        var xmlSummaryText = chunk.XmlSummary;
        var parsedTrivia = SyntaxFactory.ParseLeadingTrivia(xmlSummaryText + Environment.NewLine);
        var newMethod = oldNode.WithLeadingTrivia(parsedTrivia);

        var newRoot = root.ReplaceNode(oldNode, newMethod);
        newRoot = Formatter.Format(newRoot, new AdhocWorkspace());
        await File.WriteAllTextAsync(path, newRoot.ToFullString().Replace("\r\n", "\n").Replace("\n", "\r\n"));
        BlazorUtils.ShowSuccess($"Saved new XML Summary for {chunk.Name}");
    }


    private async Task GenerateAll()
    {
        var workingProgress = BlazorUtils.StartWorking(_progressBar, _selectedItem.CodeChunks.Count, hideOnCompletion: true);
        foreach (var chunk in _selectedItem.CodeChunks)
        {
            await Generate(chunk);
            await Save(_selectedItem.Info.FullName, chunk);
            workingProgress.ReportProgress();
        }

        BlazorUtils.ShowSuccess("Done. Please check your GIT Changes for the repo");
    }
}