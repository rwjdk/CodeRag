using Microsoft.EntityFrameworkCore;
using Shared.EntityFramework.DbModels;

namespace Shared.EntityFramework;

public class SqlDbContext(DbContextOptions<SqlDbContext> options) : DbContext(options)
{
    public DbSet<ProjectEntity> Projects => Set<ProjectEntity>();

    public DbSet<ProjectSourceEntity> ProjectSources => Set<ProjectSourceEntity>();
}