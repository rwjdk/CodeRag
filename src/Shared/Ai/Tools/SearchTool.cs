using CodeRag.Abstractions;
using CodeRag.VectorStorage;
using CodeRag.VectorStorage.Models;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;

namespace Shared.Ai.Tools;

internal class SearchTool(VectorStoreQuery vectorStoreQuery, string projectId, string sourceKind, int numberOfResultsBack, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string> Search(string searchQuery)
    {
        SearchResult result = await vectorStoreQuery.Search(searchQuery, numberOfResultsBack, entity => entity.SourceKind == sourceKind && entity.SourceCollectionId == projectId);
        ProgressNotification notification = new(DateTimeOffset.UtcNow, $"{sourceKind} Search Called with Query '{searchQuery}' ({result.Entities.Length} Results)")
        {
            Arguments = result.Entities
        };
        parent.OnNotifyProgress(notification);
        return result.GetAsStringResult();
    }
}