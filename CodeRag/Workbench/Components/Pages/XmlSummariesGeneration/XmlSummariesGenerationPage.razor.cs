using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.EntityFramework.Entities;
using CodeRag.Shared.VectorStore;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;

namespace Workbench.Components.Pages.XmlSummariesGeneration;

public partial class XmlSummariesGenerationPage(IDbContextFactory<SqlDbContext> dbContextFactory)
{
    private List<Data>? _data;
    private Dictionary<string, bool>? _onlyUndocumentedCheckStates;
    private CSharpCodeEntity? _selectEntry;

    [CascadingParameter]
    public required Project Project { get; set; }

    protected override async Task OnInitializedAsync()
    {
        SqlServerVectorStoreQuery vectorStoreQuery = new(Project.SqlServerVectorStoreConnectionString, dbContextFactory);
        CSharpCodeEntity[] sourceCode = await vectorStoreQuery.GetCSharpCodeForProject(Project.Id);

        string[] kinds = sourceCode.Select(x => x.Kind).Distinct().ToArray();

        List<Data> data = [];
        Dictionary<string, bool>? onlyUndocumentedCheckStates = [];
        foreach (string kind in kinds)
        {
            CSharpCodeEntity[] allOfKind = sourceCode.Where(x => x.Kind == kind).OrderBy(x => x.Name).ToArray();
            CSharpCodeEntity[] undocumentedOfKind = allOfKind.Where(x => 1 == 1).OrderBy(x => x.Name).ToArray(); //todo
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

    private void SwitchSelectedItem(CSharpCodeEntity? CSharpCodeEntity)
    {
        if (CSharpCodeEntity == null)
        {
            return;
        }

        if (_selectEntry?.Id != CSharpCodeEntity.Id)
        {
            _selectEntry = CSharpCodeEntity;
        }
    }
}