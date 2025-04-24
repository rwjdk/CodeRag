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

    private TreeItemData<string> _treeItems { get; set; }

    protected override async Task OnInitializedAsync()
    {
        _cSharpSources = Project.Sources.Where(x => x.Kind == ProjectSourceKind.CSharpCode).ToArray();
        _selectedCSharpSource = _cSharpSources.FirstOrDefault(); //todo: Handle if no sources exist

        var existing = await vectorStoreQuery.GetExistingAsync(Project.Id, _selectedCSharpSource.Id);

        //_treeItems = TreeBuilder.BuildFromPaths(existing.Select(x => x.SourcePath).OrderBy(x => x).ToList());
        _treeItems = BuildTree(_selectedCSharpSource.Path, existing);
    }

    public static TreeItemData<string> BuildTree(string rootPath, VectorEntity[] existing)
    {
        var rootInfo = new DirectoryInfo(rootPath);
        var rootNode = new TreeItemData<string> { Value = rootInfo.Name };
        BuildChildren(rootNode, rootInfo, existing);
        return rootNode;
    }

    private static void BuildChildren(TreeItemData<string> parentNode, DirectoryInfo dirInfo, VectorEntity[] existing)
    {
        parentNode.Children ??= [];
        foreach (var dir in dirInfo.GetDirectories())
        {
            var dirNode = new TreeItemData<string> { Value = dir.Name };
            BuildChildren(dirNode, dir, existing);
            if (dirNode.Children is { Count: > 0 })
            {
                parentNode.Children.Add(dirNode);
            }
        }

        foreach (var file in dirInfo.GetFiles("*.cs"))
        {
            var matches = existing.Where(x => file.FullName.EndsWith(x.SourcePath)).ToList();
            parentNode.Children.Add(new TreeItemData<string> { Value = $"{file.FullName} ({matches.Count})" });
        }
    }

    public class TreeBuilder
    {
        public static TreeItemData<string> BuildFromPaths(List<string> paths)
        {
            var root = new TreeItemData<string> { Value = "src" };

            foreach (var path in paths)
            {
                var parts = path.Trim('\\').Split('\\');
                AddPath(root, parts, 1); // Skip "src"
            }

            return root;
        }

        private static void AddPath(TreeItemData<string> currentNode, string[] parts, int index)
        {
            currentNode.Children ??= [];
            if (index >= parts.Length) return;

            var part = parts[index];
            var existing = currentNode.Children.FirstOrDefault(c => c.Value == part);

            if (existing == null)
            {
                existing = new TreeItemData<string> { Value = part };
                currentNode.Children.Add(existing);
            }

            AddPath(existing, parts, index + 1);
        }
    }
}