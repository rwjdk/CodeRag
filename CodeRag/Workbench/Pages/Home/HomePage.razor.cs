using CodeRag.Shared.Chunking.CSharp;
using CodeRag.Shared.EntityFramework.DbModels;
using CodeRag.Shared.VectorStore;
using Microsoft.AspNetCore.Components;
using MudBlazor;

namespace Workbench.Pages.Home;

public partial class HomePage(VectorStoreQuery vectorStoreQuery)
{
    private ProjectSourceEntity[]? _cSharpSources;
    private ProjectSourceEntity? _selectedCSharpSource;

    [CascadingParameter]
    public required ProjectEntity Project { get; set; }

    private TreeItemData<Item>? _tree;
    private MudTreeView<Item>? _treeView;

    private string _searchPhrase;
    private SummaryStatus _summaryStatus = SummaryStatus.MissingSummary;
    private CSharpKind _kind;
    private VectorEntity[] _existing;

    private async void OnTextChanged(string searchPhrase)
    {
        _searchPhrase = searchPhrase;
        if (_treeView != null)
        {
            await _treeView.FilterAsync();
        }
    }

    private Task<bool> MatchesName(TreeItemData<Item> item)
    {
        if (string.IsNullOrEmpty(item.Value.Info.Name))
        {
            return Task.FromResult(false);
        }

        return Task.FromResult(item.Value.Info.Name.Contains(_searchPhrase, StringComparison.OrdinalIgnoreCase));
    }

    protected override async Task OnInitializedAsync()
    {
        _cSharpSources = Project.Sources.Where(x => x.Kind == ProjectSourceKind.CSharpCode).ToArray();
        _selectedCSharpSource = _cSharpSources.FirstOrDefault(); //todo: Handle if no sources exist

        _existing = await vectorStoreQuery.GetExistingAsync(Project.Id, _selectedCSharpSource.Id);
        await Refresh();
    }

    private TreeItemData<Item> BuildTree(string rootPath, VectorEntity[] existing)
    {
        var rootInfo = new DirectoryInfo(rootPath);
        var rootNode = new TreeItemData<Item> { Value = new Item(rootInfo, []) };
        BuildChildren(rootNode, rootInfo, existing);
        return rootNode;
    }

    private void BuildChildren(TreeItemData<Item> parentNode, DirectoryInfo dirInfo, VectorEntity[] existing)
    {
        parentNode.Children ??= [];
        foreach (var dir in dirInfo.GetDirectories())
        {
            var dirNode = new TreeItemData<Item> { Value = new Item(dir, []) };
            BuildChildren(dirNode, dir, existing);
            if (dirNode.Children is { Count: > 0 })
            {
                parentNode.Children.Add(dirNode);
            }
        }

        foreach (var file in dirInfo.GetFiles())
        {
            var matches = existing.Where(x => file.FullName == _selectedCSharpSource.Path + x.SourcePath).ToList();
            if (matches.Count > 0)
            {
                parentNode.Children.Add(new TreeItemData<Item> { Value = new Item(file, matches) });
            }
        }
    }

    private record Item(FileSystemInfo Info, List<VectorEntity> RelatedEntities)
    {
        public string? GetText(List<TreeItemData<Item>>? children)
        {
            return Info.Name;
        }

        public int GetTotalRelatedEntities(List<TreeItemData<Item>>? children)
        {
            if (children == null) return RelatedEntities.Count;
            int sum = 0;
            foreach (var child in children)
            {
                sum += child.Value.RelatedEntities.Count;
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

    private enum SummaryStatus
    {
        All,
        MissingSummary,
        HasSummary
    }

    private async Task SwitchKind(CSharpKind kind)
    {
        _kind = kind;
        await Refresh();
    }

    private async Task Refresh()
    {
        var existing = _existing.Where(x => x.Kind == _kind.ToString());
        switch (_summaryStatus)
        {
            case SummaryStatus.MissingSummary:
                existing = existing.Where(x => string.IsNullOrWhiteSpace(x.Summary));
                break;
            case SummaryStatus.HasSummary:
                existing = existing.Where(x => !string.IsNullOrWhiteSpace(x.Summary));
                break;
        }


        _tree = BuildTree(_selectedCSharpSource.Path, existing.ToArray());
    }

    private async Task SwitchSummaryKind(SummaryStatus summaryStatus)
    {
        _summaryStatus = summaryStatus;
        await Refresh();
    }
}