using BlazorUtilities;
using BlazorUtilities.Components;
using Microsoft.AspNetCore.Components;
using MudBlazor;
using Shared.Ai;
using Shared.Chunking.CSharp;
using Shared.EntityFramework.DbModels;
using Shared.VectorStore;
using Website.Models;

namespace Website.Pages.WikiGeneration;

public partial class WikiGenerationPage(VectorStoreQuery vectorStoreQuery, AiQuery aiQuery, CSharpChunker cSharpChunker)
{
    [CascadingParameter]
    public required BlazorUtils BlazorUtils { get; set; }

    private string? _markdown;
    private ProjectSourceEntity? _selectedSource;
    private CSharpKind _kind = CSharpKind.Method;
    private AiChatModel? _chatModel;
    private ProjectSourceEntity[]? _sources;
    private SummaryStatus _summaryStatus = SummaryStatus.All;
    private TreeItemData<Item>? _tree;
    private MudTreeView<Item>? _treeView;
    private VectorEntity[]? _existingVectorEntities;
    private Item? _selectedItem;
    private RProgressBar? _progressBar;


    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    private async Task OnSearchTextChanged(string searchPhrase)
    {
        _searchPhrase = searchPhrase;
        if (_treeView != null)
        {
            await _treeView.FilterAsync();
        }
    }

    protected override async Task OnInitializedAsync()
    {
        _chatModel = aiQuery.GetChatModels().FirstOrDefault();
        _sources = Project.Sources.Where(x => x.Kind == ProjectSourceKind.CSharpCode).ToArray();
        _selectedSource = _sources.FirstOrDefault();
        if (_selectedSource != null)
        {
            await Refresh();
        }
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

    private async Task Refresh()
    {
        _existingVectorEntities = await vectorStoreQuery.GetExistingAsync(Project.Id);
        var existing = _existingVectorEntities.Where(x => x.Kind == _kind.ToString());
        switch (_summaryStatus)
        {
            case SummaryStatus.MissingSummary:
                existing = existing.Where(x => string.IsNullOrWhiteSpace(x.Summary)); //todo - apply right match (code wiki do not have entry)
                break;
            case SummaryStatus.HasSummary:
                existing = existing.Where(x => !string.IsNullOrWhiteSpace(x.Summary)); //todo - apply right match (code wiki do not have entry)
                break;
        }

        _tree = BuildTree(_selectedSource.Path, existing.ToArray());
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

    private void SwitchSelected(Item? selectedItem)
    {
        _selectedItem = selectedItem;
        _markdown = null;
    }

    private string? _searchPhrase;

    private Task<bool> MatchesName(TreeItemData<Item> item)
    {
        if (string.IsNullOrEmpty(item.Value!.Info.Name))
        {
            return Task.FromResult(false);
        }

        return Task.FromResult(_searchPhrase != null && item.Value.Info.Name.Contains(_searchPhrase, StringComparison.OrdinalIgnoreCase));
    }


    private async Task GenerateCodeWiki(CSharpChunk chunk)
    {
        _markdown = await aiQuery.GenerateCodeWikiEntryForMethod(Project, chunk);
    }

    private async Task SwitchSummaryStatus(SummaryStatus summaryStatus)
    {
        _summaryStatus = summaryStatus;
        await Refresh();
    }

    private Task GenerateAll()
    {
        throw new NotImplementedException();
    }
}