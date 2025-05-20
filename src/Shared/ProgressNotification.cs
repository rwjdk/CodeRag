using Microsoft.Extensions.VectorData;
using Shared.EntityFramework.DbModels;

namespace Shared;

public record ProgressNotification(DateTimeOffset Timestamp, string Message, int Current = 0, int Total = 0)
{
    public List<VectorSearchResult<VectorEntity>>? SearchResults { get; init; }

    public bool HasNoDetails => SearchResults?.Count is null or 0;
}