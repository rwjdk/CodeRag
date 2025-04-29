using Microsoft.Extensions.VectorData;
using Shared.EntityFramework.DbModels;

namespace Shared;

/// <summary>
/// Represents a notification containing progress details
/// </summary>
public record ProgressNotification(DateTimeOffset Timestamp, string Message, int Current = 0, int Total = 0)
{
    /// <summary>
    /// SearchResults from Tool
    /// </summary>
    public List<VectorSearchResult<VectorEntity>>? SearchResults { get; init; }

    /// <summary>
    /// If the search-result have no details
    /// </summary>
    public bool HasNoDetails => SearchResults?.Count is null or 0;
}