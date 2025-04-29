using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;

namespace Shared.Projects;

/// <summary>
/// Command to control Project
/// </summary>
/// <param name="sqlServerCommand">General SQL Server Command</param>
[UsedImplicitly]
public class ProjectCommand(SqlServerCommand sqlServerCommand) : IScopedService
{
    /// <summary>
    /// Inserts or updates a project entity in the data store
    /// </summary>
    /// <param name="entity">The project entity to insert or update</param>
    /// <returns>A task representing the asynchronous operation</returns>
    public async Task UpsertProjectAsync(ProjectEntity entity)
    {
        var context = await sqlServerCommand.CreateDbContextAsync();
        var existing = await context.Projects.Include(x => x.Sources).FirstOrDefaultAsync(x => x.Id == entity.Id);
        if (existing != null)
        {
            context.Entry(existing).CurrentValues.SetValues(entity); //Update Main Object
            SyncSources(entity, existing, context);
        }
        else
        {
            await context.Projects.AddAsync(entity);
        }

        await context.SaveChangesAsync();
    }

    private static void SyncSources(ProjectEntity entity, ProjectEntity existing, SqlDbContext context)
    {
        // Remove SubObjects
        foreach (var source in existing.Sources)
        {
            if (entity.Sources.All(s => s.Id != source.Id))
            {
                context.Remove(source);
            }
        }

        // Add or Update SubObjects
        foreach (var projectSource in entity.Sources)
        {
            var existingSource = existing.Sources.FirstOrDefault(x => x.Id == projectSource.Id);
            if (existingSource != null)
            {
                context.Entry(existingSource).CurrentValues.SetValues(projectSource);
            }
            else
            {
                context.Entry(projectSource).State = EntityState.Added;
                existing.Sources.Add(projectSource);
            }
        }
    }

    /// <summary>
    /// Updates the last synchronization date of the given project source
    /// </summary>
    /// <param name="source">The project source entity to update</param>
    /// <returns>A task representing the asynchronous operation</returns>
    public async Task UpdateLastSourceSyncDateAsync(ProjectSourceEntity source)
    {
        source.LastSync = DateTime.UtcNow;
        var context = await sqlServerCommand.CreateDbContextAsync();
        var existingSource = context.ProjectSources.FirstOrDefault(x => x.Id == source.Id);
        if (existingSource != null)
        {
            existingSource.LastSync = source.LastSync;
        }

        await context.SaveChangesAsync();
    }

    /// <summary>
    /// Deletes the specified project entity
    /// </summary>
    /// <param name="entity">The project entity to delete</param>
    /// <returns>A task representing the delete operation</returns>
    public async Task DeleteProjectAsync(ProjectEntity entity)
    {
        await sqlServerCommand.RemoveAsync(entity);
    }
}