using Microsoft.Extensions.VectorData;
using System.Linq.Expressions;
using System.Text;
using CodeRag.Abstractions;
using CodeRag.VectorStore.Models;

namespace CodeRag.VectorStore;

public class VectorStoreQuery(Microsoft.Extensions.VectorData.VectorStore vectorStore, VectorStoreConfiguration vectorStoreConfiguration) : IScopedService
{
    public VectorStoreCollection<TKey, TRecord> GetCollection<TKey, TRecord>() where TKey : notnull where TRecord : class, IVectorEntity<TKey>
    {
        return vectorStore.GetCollection<TKey, TRecord>(vectorStoreConfiguration.VectorStoreName);
    }

    public async Task<string> Search<TKey, TRecord>(string searchQuery, int numberOfRecordsBack, Expression<Func<TRecord, bool>>? filter) where TKey : notnull where TRecord : class, IVectorEntity<TKey>
    {
        VectorStoreCollection<TKey, TRecord> collection = GetCollection<TKey, TRecord>();
        await collection.EnsureCollectionExistsAsync();
        VectorSearchOptions<TRecord> vectorSearchOptions = new()
        {
            IncludeVectors = false
        };
        if (filter != null)
        {
            vectorSearchOptions.Filter = filter;
        }

        if (vectorStoreConfiguration.MaxRecordSearch.HasValue && numberOfRecordsBack > vectorStoreConfiguration.MaxRecordSearch.Value)
        {
            numberOfRecordsBack = vectorStoreConfiguration.MaxRecordSearch.Value;
        }

        StringBuilder result = new();
        await foreach (VectorSearchResult<TRecord> searchResult in collection.SearchAsync(searchQuery, numberOfRecordsBack, vectorSearchOptions))
        {
            result.AppendLine("<search_result >");
            result.AppendLine(searchResult.Record.Content);
            result.AppendLine("</search_result>");
        }

        return result.ToString();
    }

    public async Task<TRecord[]> GetExistingAsync<TKey, TRecord>(Expression<Func<TRecord, bool>>? filter = null) where TKey : notnull where TRecord : class, IVectorEntity<TKey>
    {
        List<TRecord> result = [];
        VectorStoreCollection<TKey, TRecord> collection = GetCollection<TKey, TRecord>();
        await collection.EnsureCollectionExistsAsync();

        Expression<Func<TRecord, bool>> filterToUse = entity => true;
        if (filter != null)
        {
            filterToUse = filter;
        }

        await foreach (TRecord entity in collection.GetAsync(filterToUse, int.MaxValue, new FilteredRecordRetrievalOptions<TRecord>
                       {
                           IncludeVectors = false
                       }))
        {
            result.Add(entity);
        }

        return result.ToArray();
    }
}