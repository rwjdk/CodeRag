using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using SimpleRag;
using SimpleRag.Models;
using SimpleRag.VectorStorage;
using SimpleRag.VectorStorage.Models;

namespace Shared.Ai.Tools;

internal class SearchTool(VectorStoreQuery vectorStoreQuery, string projectId, string sourceKind, int numberOfResultsBack, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string> Search(string searchQuery)
    {
        SearchResult result = await vectorStoreQuery.SearchAsync(searchQuery, numberOfResultsBack, entity => entity.SourceKind == sourceKind && entity.SourceCollectionId == projectId);
        ProgressNotification notification = new(DateTimeOffset.UtcNow, $"{sourceKind} Search Called with Query '{searchQuery}' ({result.Entities.Length} Results)")
        {
            Arguments = result.Entities
        };
        parent.OnNotifyProgress(notification);
        return result.GetAsStringResult();
    }
}