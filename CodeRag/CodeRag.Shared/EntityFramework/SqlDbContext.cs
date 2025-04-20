using CodeRag.Shared.EntityFramework.DbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CodeRag.Shared.EntityFramework;

public class SqlDbContext(DbContextOptions<SqlDbContext> options) : DbContext(options)
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
#if DEBUG
        optionsBuilder.EnableSensitiveDataLogging();
        optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
#endif
    }

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