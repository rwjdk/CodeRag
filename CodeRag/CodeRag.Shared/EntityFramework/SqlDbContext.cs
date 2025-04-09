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
}