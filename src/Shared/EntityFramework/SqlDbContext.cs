using Microsoft.EntityFrameworkCore;
using Shared.EntityFramework.DbModels;

namespace Shared.EntityFramework;

public class SqlDbContext(DbContextOptions<SqlDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<VectorEntity>()
            .Property<float[]>(Constants.VectorCollections.VectorColumns.Vector)
            .HasColumnType("vector(1536)");
    }

    public DbSet<VectorEntity> Vectors => Set<VectorEntity>();

    public DbSet<ProjectEntity> Projects => Set<ProjectEntity>();

    public DbSet<ProjectSourceEntity> ProjectSources => Set<ProjectSourceEntity>();
}