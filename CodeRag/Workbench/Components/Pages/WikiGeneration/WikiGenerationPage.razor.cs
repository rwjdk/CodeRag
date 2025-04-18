using Blazor.Shared;
using CodeRag.Shared.Ai.SemanticKernel;
using CodeRag.Shared.Configuration;
using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.VectorStore;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;

namespace Workbench.Components.Pages.WikiGeneration;

public partial class WikiGenerationPage(IDbContextFactory<SqlDbContext> dbContextFactory, SemanticKernelQuery semanticKernelQuery)
{
    [CascadingParameter] public required BlazorUtils BlazorUtils { get; set; }

    private List<Data>? _data;
    private Dictionary<string, bool>? _onlyUndocumentedCheckStates;
    private CSharpCodeEntity? _selectEntry;
    private string? _markdown;
    private ProjectSource? _source;

    [CascadingParameter] public required Project Project { get; set; }

    protected override async Task OnInitializedAsync()
    {
        _source = Project.Sources.FirstOrDefault(x => x.Kind == ProjectSourceKind.Markdown); //todo - rewrite this to allow multiple sources
        if (_source != null)
        {
            SqlServerVectorStoreQuery vectorStoreQuery = new(Project.SqlServerVectorStoreConnectionString, dbContextFactory);
            var mdFilenames = Directory.GetFiles(_source.Path).Select(Path.GetFileNameWithoutExtension);
            CSharpCodeEntity[] sourceCode = await vectorStoreQuery.GetCSharpCode(Project.Id);

            string[] kinds = sourceCode.Select(x => x.Kind).Distinct().ToArray();

            List<Data> data = [];
            Dictionary<string, bool>? onlyUndocumentedCheckStates = [];
            foreach (string kind in kinds)
            {
                CSharpCodeEntity[] allOfKind = sourceCode.Where(x => x.Kind == kind).OrderBy(x => x.Name).ToArray();
                CSharpCodeEntity[] undocumentedOfKind = allOfKind.Where(x => !mdFilenames.Contains(x.GetTargetMarkdownFilename())).OrderBy(x => x.Name).ToArray();
                CSharpCodeEntity[] documentedOfKind = allOfKind.Except(undocumentedOfKind).ToArray();
                data.Add(new Data(kind, allOfKind, documentedOfKind, undocumentedOfKind));
                onlyUndocumentedCheckStates.Add(kind, true);
            }

            _data = data;
            _onlyUndocumentedCheckStates = onlyUndocumentedCheckStates;
        }
    }

    private record Data(string Kind, CSharpCodeEntity[] All, CSharpCodeEntity[] Documented, CSharpCodeEntity[] UnDocumented)
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

    private void SwitchSelectedItem(CSharpCodeEntity cSharpCodeEntity)
    {
        if (_selectEntry?.Id != cSharpCodeEntity.Id)
        {
            _selectEntry = cSharpCodeEntity;
            _markdown = null;
        }
    }

    private async Task GenerateCodeWiki()
    {
        _markdown = await semanticKernelQuery.GenerateCodeWikiEntryForMethod(Project, _selectEntry);
    }

    private async Task AcceptMarkdown()
    {
        var sourcePath = _source!.Path;
        var path = Path.Combine(sourcePath, _selectEntry.GetTargetMarkdownFilename());
        await File.WriteAllTextAsync(path, _markdown);
        BlazorUtils.ShowSuccess($"{Path.GetFileName(path)} saved to {_source.Path}");
    }
}