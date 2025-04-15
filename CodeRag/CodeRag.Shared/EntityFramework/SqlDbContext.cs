using CodeRag.Shared.EntityFramework.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Xml;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

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

    public DbSet<Project> Projects => Set<Project>();
}