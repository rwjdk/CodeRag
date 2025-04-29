using Microsoft.EntityFrameworkCore;
using Shared.EntityFramework.DbModels;

namespace Shared.EntityFramework;

/// <summary>
/// Represents the database context for SQL operations
/// </summary>
public class SqlDbContext(DbContextOptions<SqlDbContext> options) : DbContext(options)
{
    /// <summary>
    /// Model Creation
    /// </summary>
    /// <param name="modelBuilder">Builder</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<VectorEntity>()
            .Property<float[]>(Constants.VectorCollections.VectorColumns.Vector)
            .HasColumnType("vector(1536)");
    }

    /// <summary>
    /// The Vectors
    /// </summary>
    public DbSet<VectorEntity> Vectors => Set<VectorEntity>();

    /// <summary>
    /// The Project
    /// </summary>
    public DbSet<ProjectEntity> Projects => Set<ProjectEntity>();

    /// <summary>
    /// The Project Sources
    /// </summary>
    public DbSet<ProjectSourceEntity> ProjectSources => Set<ProjectSourceEntity>();
}