using Microsoft.EntityFrameworkCore;
using Shared.EntityFramework;

namespace Workbench.Extensions;

public static class AppConfigurations
{
    public static void MigrateDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        scope.ServiceProvider.GetRequiredService<SqlDbContext>().Database.Migrate();
    }
}