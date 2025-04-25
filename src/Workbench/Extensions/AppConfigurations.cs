using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.EntityFramework.DbModels;
using Microsoft.EntityFrameworkCore;

namespace Workbench.Extensions;

public static class AppConfigurations
{
    public static void MigrateDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        scope.ServiceProvider.GetRequiredService<SqlDbContext>().Database.Migrate();
    }
}