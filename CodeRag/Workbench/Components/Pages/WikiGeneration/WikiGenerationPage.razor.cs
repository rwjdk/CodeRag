using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.VectorStore;
using CodeRag.Shared.VectorStore.Documentation;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;

namespace Workbench.Components.Pages.WikiGeneration;

public partial class WikiGenerationPage(IDbContextFactory<SqlDbContext> dbContextFactory)
{
    private List<Data>? _data;
    private Dictionary<string, bool>? _onlyUndocumentedCheckStates;
    private CSharpCodeEntity? _selectEntry;

    [CascadingParameter]
    public required Project Project { get; set; }

    protected override async Task OnInitializedAsync()
    {
        SqlServerVectorStoreQuery vectorStoreQuery = new(Project.SqlServerVectorStoreConnectionString, dbContextFactory);
        DocumentationVectorEntity[] documentation = await vectorStoreQuery.GetDocumentationForProject(Project.Id);
        CSharpCodeEntity[] sourceCode = await vectorStoreQuery.GetCSharpCodeForProject(Project.Id);

        string[] kinds = sourceCode.Select(x => x.Kind).Distinct().ToArray();

        List<Data> data = [];
        Dictionary<string, bool>? onlyUndocumentedCheckStates = [];
        foreach (string kind in kinds)
        {
            CSharpCodeEntity[] allOfKind = sourceCode.Where(x => x.Kind == kind).OrderBy(x => x.Name).ToArray();
            CSharpCodeEntity[] undocumentedOfKind = allOfKind.Where(x => documentation.All(y => y.Name != x.Name && y.SourcePath != x.Name + ".md")).OrderBy(x => x.Name).ToArray();
            CSharpCodeEntity[] documentedOfKind = allOfKind.Except(undocumentedOfKind).ToArray();
            data.Add(new Data(kind, allOfKind, documentedOfKind, undocumentedOfKind));
            onlyUndocumentedCheckStates.Add(kind, true);
        }

        _data = data;
        _onlyUndocumentedCheckStates = onlyUndocumentedCheckStates;
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
        }
    }
}