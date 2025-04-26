using System.Text;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Embeddings;
using Shared.EntityFramework.DbModels;
using Shared.VectorStore;

namespace Shared.Ai.Tools;

public class SearchTool(VectorStoreDataType dataType, ProjectEntity project, ITextEmbeddingGenerationService embeddingGenerationService, IVectorStoreRecordCollection<Guid, VectorEntity> collection, int numberOfResultsBack, double scoreShouldBeBelowThis, ProgressNotificationBase parent)
{
    [UsedImplicitly]
    [KernelFunction]
    public async Task<string[]> Search(string searchQuery)
    {
        List<string> searchResults = [];
        Guid projectId = project.Id;
        var dataTypeAsString = dataType.ToString();
        ReadOnlyMemory<float> searchVector = await embeddingGenerationService.GenerateEmbeddingAsync(searchQuery);
        VectorSearchResults<VectorEntity> searchResult = await collection.VectorizedSearchAsync(searchVector, new VectorSearchOptions<VectorEntity>
        {
            Top = numberOfResultsBack,
            Filter = entity => entity.ProjectId == projectId && entity.DataType == dataTypeAsString,
            IncludeVectors = false
        });

        List<VectorSearchResult<VectorEntity>> results = [];

        await foreach (VectorSearchResult<VectorEntity> record in searchResult.Results.Where(x => x.Score < scoreShouldBeBelowThis))
        {
            results.Add(record);
            StringBuilder sb = new();
            sb.AppendLine($"Citation: {record.Record.GetUrl(project)} \n***\n" + record.Record.Content);
            sb.AppendLine("***");

            searchResults.Add(sb.ToString());
        }

        ProgressNotification notification = new(DateTimeOffset.UtcNow, $"{dataType} Search Called ({results.Count} Results)")
        {
            SearchResults = results
        };
        parent.OnNotifyProgress(notification);
        return searchResults.ToArray();
    }
}