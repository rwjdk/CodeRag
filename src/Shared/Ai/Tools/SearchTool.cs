using System.Text;
using CodeRag.Abstractions;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Shared.EntityFramework.DbModels;
using Shared.VectorStores;

namespace Shared.Ai.Tools;

internal class SearchTool(VectorStoreDataType dataType, ProjectEntity project, VectorStoreCollection<Guid, VectorEntity> collection, int numberOfResultsBack, double scoreShouldBeBelowThis, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string[]> Search(string searchQuery)
    {
        List<string> searchResults = [];
        Guid[] sourceIds = project.Sources.Select(x => x.Id).ToArray();
        var dataTypeAsString = dataType.ToString();
        List<VectorSearchResult<VectorEntity>> results = [];
        VectorSearchOptions<VectorEntity> vectorSearchOptions = new()
        {
            Filter = entity => sourceIds.Contains(entity.SourceId) && entity.DataType == dataTypeAsString,
            IncludeVectors = false
        };
        await foreach (VectorSearchResult<VectorEntity> result in collection.SearchAsync(searchQuery, numberOfResultsBack, vectorSearchOptions).Where(x => x.Score < scoreShouldBeBelowThis))
        {
            results.Add(result);
            StringBuilder sb = new();
            sb.AppendLine($"Citation: {result.Record.GetUrl(project)} \n***\n" + result.Record.Content);
            sb.AppendLine("***");

            searchResults.Add(sb.ToString());
        }

        ProgressNotification notification = new(DateTimeOffset.UtcNow, $"{dataType} Search Called with Query '{searchQuery}' ({results.Count} Results)")
        {
            Arguments = results
        };
        parent.OnNotifyProgress(notification);
        return searchResults.ToArray();
    }
}