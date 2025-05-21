using System.Text;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Shared.EntityFramework.DbModels;
using Shared.VectorStores;

namespace Shared.Ai.Tools;

internal class SearchTool(VectorStoreDataType dataType, ProjectEntity project, VectorStoreCollection<Guid, VectorEntity> collection, int numberOfResultsBack, double scoreShouldBeBelowThis, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    public async Task<string[]> Search(string searchQuery)
    {
        List<string> searchResults = [];
        Guid projectId = project.Id;
        var dataTypeAsString = dataType.ToString();
        List<VectorSearchResult<VectorEntity>> results = [];
        VectorSearchOptions<VectorEntity> vectorSearchOptions = new()
        {
            Filter = entity => entity.ProjectId == projectId && entity.DataType == dataTypeAsString,
            IncludeVectors = false
        };

        await foreach (VectorSearchResult<VectorEntity> result in collection.SearchAsync(searchQuery, numberOfResultsBack, vectorSearchOptions))
        {
            if (result.Score > scoreShouldBeBelowThis)
            {
                continue;
            }

            results.Add(result);
            StringBuilder sb = new();
            sb.AppendLine($"Citation: {result.Record.GetUrl(project)} \n***\n" + result.Record.Content);
            sb.AppendLine("***");

            searchResults.Add(sb.ToString());
        }

        ProgressNotification notification = new(DateTimeOffset.UtcNow, $"{dataType} Search Called with Query '{searchQuery}' ({results.Count} Results)")
        {
            SearchResults = results
        };
        parent.OnNotifyProgress(notification);
        return searchResults.ToArray();
    }
}