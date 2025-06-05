using CodeRag.Abstractions;
using CodeRag.VectorStore.Models;
using System.Linq.Expressions;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;

namespace CodeRag.VectorStore;

[UsedImplicitly]
public class VectorStoreCommand(Microsoft.Extensions.VectorData.VectorStore vectorStore, VectorStoreConfiguration vectorStoreConfiguration) : IScopedService
{
    public async Task UpsertAsync<TKey, TRecord>(TRecord entity) where TKey : notnull where TRecord : class, IVectorEntity<TKey>
    {
        var collection = vectorStore.GetCollection<TKey, TRecord>(vectorStoreConfiguration.VectorStoreName);
        await collection.UpsertAsync(entity);
    }

    public async Task DeleteAsync<TKey, TRecord>(Expression<Func<TRecord, bool>> filter) where TKey : notnull where TRecord : class, IVectorEntity<TKey>
    {
        List<TKey> keysToDelete = [];
        var collection = vectorStore.GetCollection<TKey, TRecord>(vectorStoreConfiguration.VectorStoreName);
        await foreach (TRecord entity in collection.GetAsync(filter, int.MaxValue, new FilteredRecordRetrievalOptions<TRecord>
                       {
                           IncludeVectors = false
                       }))
        {
            keysToDelete.Add(entity.VectorId);
        }

        await DeleteAsync<TKey, TRecord>(keysToDelete);
    }

    public async Task DeleteAsync<TKey, TRecord>(IEnumerable<TKey> keysToDelete) where TKey : notnull where TRecord : class, IVectorEntity<TKey>
    {
        var collection = vectorStore.GetCollection<TKey, TRecord>(vectorStoreConfiguration.VectorStoreName);
        await collection.DeleteAsync(keysToDelete);
    }
}