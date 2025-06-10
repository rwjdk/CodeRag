﻿using CodeRag.Abstractions;
using JetBrains.Annotations;
using Microsoft.Extensions.VectorData;
using System.Linq.Expressions;
using CodeRag.VectorStorage.Models;

namespace CodeRag.VectorStorage;

[UsedImplicitly]
public class VectorStoreCommand(VectorStore vectorStore, VectorStoreConfiguration vectorStoreConfiguration) : IScopedService
{
    private bool _creationEnsured;

    private async Task<VectorStoreCollection<string, VectorEntity>> GetCollectionAndEnsureItExist(CancellationToken cancellationToken = default)
    {
        VectorStoreCollection<string, VectorEntity> collection = vectorStore.GetCollection<string, VectorEntity>(vectorStoreConfiguration.VectorStoreName);
        if (_creationEnsured)
        {
            return collection;
        }

        await collection.EnsureCollectionExistsAsync(cancellationToken);
        _creationEnsured = true;
        return collection;
    }

    public async Task UpsertAsync(VectorEntity entity, CancellationToken cancellationToken = default)
    {
        try
        {
            var collection = await GetCollectionAndEnsureItExist(cancellationToken);
            await collection.UpsertAsync(entity, cancellationToken);
        }
        catch (Exception e)
        {
            if (e.Message.Contains("This model's maximum context length is"))
            {
                //Too big. Splitting in two recursive until content fit
                int middle = entity.Content.Length / 2;
                string? name = entity.ContentName;
                string part1 = entity.Content.Substring(0, middle);
                string part2 = entity.Content.Substring(middle);
                entity.Content = part1;
                entity.ContentName = name + $" ({Guid.NewGuid()})";
                await UpsertAsync(entity);
                entity.Id = Guid.NewGuid().ToString();
                entity.Content = part2;
                entity.ContentName = name + $" ({Guid.NewGuid()})";
                await UpsertAsync(entity);
            }
            else
            {
                throw;
            }
        }
    }

    public async Task DeleteAsync(Expression<Func<VectorEntity, bool>> filter, CancellationToken cancellationToken = default)
    {
        List<string> keysToDelete = [];
        var collection = await GetCollectionAndEnsureItExist(cancellationToken);
        await foreach (VectorEntity entity in collection.GetAsync(filter, int.MaxValue, new FilteredRecordRetrievalOptions<VectorEntity>
                       {
                           IncludeVectors = false
                       }, cancellationToken))
        {
            keysToDelete.Add(entity.Id);
        }

        await DeleteAsync(keysToDelete, cancellationToken);
    }

    public async Task DeleteAsync(IEnumerable<string> keysToDelete, CancellationToken cancellationToken = default)
    {
        var collection = await GetCollectionAndEnsureItExist(cancellationToken);
        await collection.DeleteAsync(keysToDelete, cancellationToken);
    }
}