using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using SimpleRag;
using SimpleRag.DataSources;
using SimpleRag.VectorStorage.Models;

namespace Shared.Ai.Tools;

internal class SearchTool(Search search, string projectId, DataSourceKind sourceKind, int numberOfResultsBack, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string> Search(string searchQuery)
    {
        SearchResult result = await search.SearchAsync(
            new SearchOptions
            {
                CollectionId = new CollectionId(projectId),
                SourceKind = sourceKind,
                NumberOfRecordsBack = numberOfResultsBack,
                SearchQuery = searchQuery,
            });
        Notification notification = new(DateTimeOffset.UtcNow, $"{sourceKind} Search Called with Query '{searchQuery}' ({result.Entities.Length} Results)")
        {
            Arguments = result.Entities
        };
        parent.OnNotifyProgress(notification);
        return result.GetAsStringResult();
    }
}