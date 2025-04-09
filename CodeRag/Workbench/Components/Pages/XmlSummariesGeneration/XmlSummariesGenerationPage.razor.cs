using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.Models;
using CodeRag.Shared.VectorStore;
using CodeRag.Shared.VectorStore.SourceCode;
using Microsoft.AspNetCore.Components;
using Microsoft.EntityFrameworkCore;

namespace Workbench.Components.Pages.XmlSummariesGeneration;

public partial class XmlSummariesGenerationPage(IDbContextFactory<SqlDbContext> dbContextFactory)
{
    private List<Data>? _data;
    private Dictionary<string, bool>? _onlyUndocumentedCheckStates;
    private SourceCodeVectorEntity? _selectEntry;

    [CascadingParameter]
    public required Project Project { get; set; }

    protected override async Task OnInitializedAsync()
    {
        VectorStoreQuery vectorStoreQuery = new(Project.VectorSettings, dbContextFactory);
        SourceCodeVectorEntity[] sourceCode = await vectorStoreQuery.GetSourceCodeForProject(Project.Id);

        string[] kinds = sourceCode.Select(x => x.Kind).Distinct().ToArray();

        List<Data> data = [];
        Dictionary<string, bool>? onlyUndocumentedCheckStates = [];
        foreach (string kind in kinds)
        {
            SourceCodeVectorEntity[] allOfKind = sourceCode.Where(x => x.Kind == kind).OrderBy(x => x.Name).ToArray();
            SourceCodeVectorEntity[] undocumentedOfKind = allOfKind.Where(x => 1 == 1).OrderBy(x => x.Name).ToArray(); //todo
            SourceCodeVectorEntity[] documentedOfKind = allOfKind.Except(undocumentedOfKind).ToArray();
            data.Add(new Data(kind, allOfKind, documentedOfKind, undocumentedOfKind));
            onlyUndocumentedCheckStates.Add(kind, true);
        }

        _data = data;
        _onlyUndocumentedCheckStates = onlyUndocumentedCheckStates;
    }

    private record Data(string Kind, SourceCodeVectorEntity[] All, SourceCodeVectorEntity[] Documented, SourceCodeVectorEntity[] UnDocumented)
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

    private void SwitchSelectedItem(SourceCodeVectorEntity? sourceCodeVectorEntity)
    {
        if (sourceCodeVectorEntity == null)
        {
            return;
        }

        if (_selectEntry?.Id != sourceCodeVectorEntity.Id)
        {
            _selectEntry = sourceCodeVectorEntity;
        }
    }
}