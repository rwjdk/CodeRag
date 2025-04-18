using CodeRag.Shared.Ai;
using CodeRag.Shared.Configuration;
using CodeRag.Shared.VectorStore;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Pages.XmlSummariesGeneration;

public partial class XmlSummariesGenerationPage(VectorStoreQuery vectorStoreQuery, AiQuery aiQuery)
{
    private List<Data>? _data;
    private Dictionary<string, bool>? _onlyUndocumentedCheckStates;
    private VectorEntity? _selectEntry;
    private string? _xmlSummary;

    [CascadingParameter] public required Project Project { get; set; }

    protected override async Task OnInitializedAsync()
    {
        VectorEntity[] sourceCode = await vectorStoreQuery.GetExisting(Project.Id);

        string[] kinds = sourceCode.Where(x => !string.IsNullOrWhiteSpace(x.Kind)).Select(x => x.Kind!).Distinct().ToArray();

        List<Data> data = [];
        Dictionary<string, bool> onlyUndocumentedCheckStates = [];
        foreach (string kind in kinds)
        {
            VectorEntity[] allOfKind = sourceCode.Where(x => x.Kind == kind).OrderBy(x => x.Name).ToArray();
            VectorEntity[] undocumentedOfKind = allOfKind.Where(x => string.IsNullOrWhiteSpace(x.Summary)).OrderBy(x => x.Name).ToArray();
            VectorEntity[] documentedOfKind = allOfKind.Except(undocumentedOfKind).ToArray();
            data.Add(new Data(kind, allOfKind, documentedOfKind, undocumentedOfKind));
            onlyUndocumentedCheckStates.Add(kind, true);
        }

        _data = data;
        _onlyUndocumentedCheckStates = onlyUndocumentedCheckStates;
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

    private void SwitchSelectedItem(VectorEntity? entity)
    {
        if (entity == null)
        {
            return;
        }

        if (_selectEntry?.VectorId != entity.VectorId)
        {
            _selectEntry = entity;
            _xmlSummary = null;
        }
    }


    private async Task GenerateXmlSummary()
    {
        _xmlSummary = await aiQuery.GenerateCSharpXmlSummary(Project, _selectEntry);
    }
}