using Blazor.Shared;
using CodeRag.Shared.Ai;
using CodeRag.Shared.Configuration;
using CodeRag.Shared.VectorStore;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Pages.WikiGeneration;

public partial class WikiGenerationPage(VectorStoreQuery vectorStoreQuery, AiQuery aiQuery)
{
    [CascadingParameter] public required BlazorUtils BlazorUtils { get; set; }

    private List<Data>? _data;
    private Dictionary<string, bool>? _onlyUndocumentedCheckStates;
    private VectorEntity? _selectEntry;
    private string? _markdown;
    private ProjectSource? _source;

    [CascadingParameter] public required Project Project { get; set; }

    protected override async Task OnInitializedAsync()
    {
        _source = Project.Sources.FirstOrDefault(x => x.Kind == ProjectSourceKind.Markdown); //todo - rewrite this to allow multiple sources
        if (_source != null)
        {
            var mdFilenames = Directory.GetFiles(_source.Path).Select(Path.GetFileNameWithoutExtension);
            VectorEntity[] existing = await vectorStoreQuery.GetExisting(Project.Id); //todo - only get Code Entries. not the docs

            string[] kinds = existing.Where(x => !string.IsNullOrWhiteSpace(x.Kind)).Select(x => x.Kind!).Distinct().ToArray();

            List<Data> data = [];
            Dictionary<string, bool> onlyUndocumentedCheckStates = [];
            foreach (string kind in kinds)
            {
                VectorEntity[] allOfKind = existing.Where(x => x.Kind == kind).OrderBy(x => x.Name).ToArray();
                VectorEntity[] undocumentedOfKind = allOfKind.Where(x => !mdFilenames.Contains(x.GetTargetMarkdownFilename())).OrderBy(x => x.Name).ToArray();
                VectorEntity[] documentedOfKind = allOfKind.Except(undocumentedOfKind).ToArray();
                data.Add(new Data(kind, allOfKind, documentedOfKind, undocumentedOfKind));
                onlyUndocumentedCheckStates.Add(kind, true);
            }

            _data = data;
            _onlyUndocumentedCheckStates = onlyUndocumentedCheckStates;
        }
    }

    private record Data(string Kind, VectorEntity[] All, VectorEntity[] Documented, VectorEntity[] UnDocumented)
    {
        public int Order => 1; //todo - set order based on importance of kind
        public string TabCaption => $"{KindPlural} ({(Documented.Length)}/{All.Length})";
        public string KindPlural => Kind + "s";
    }

    private void SwitchAllUndocumentedState(string dataEntryKind, bool newState)
    {
        if (_onlyUndocumentedCheckStates != null)
        {
            _onlyUndocumentedCheckStates[dataEntryKind] = newState;
            StateHasChanged();
        }
    }

    private void SwitchSelectedItem(VectorEntity VectorEntity)
    {
        if (_selectEntry?.VectorId != VectorEntity.VectorId)
        {
            _selectEntry = VectorEntity;
            _markdown = null;
        }
    }

    private async Task GenerateCodeWiki()
    {
        _markdown = await aiQuery.GenerateCodeWikiEntryForMethod(Project, _selectEntry);
    }

    private async Task AcceptMarkdown()
    {
        var sourcePath = _source!.Path;
        var path = Path.Combine(sourcePath, _selectEntry.GetTargetMarkdownFilename());
        await File.WriteAllTextAsync(path, _markdown);
        BlazorUtils.ShowSuccess($"{Path.GetFileName(path)} saved to {_source.Path}");
    }
}