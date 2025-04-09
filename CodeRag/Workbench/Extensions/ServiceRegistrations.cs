using CodeRag.Shared.EntityFramework;
using CodeRag.Shared.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Workbench.Extensions;

public static class ServiceRegistrations
{
    public static void AutoRegisterServicesViaReflection(this WebApplicationBuilder builder, Type rootType)
    {
        var types = rootType.Assembly.GetTypes();
        foreach (Type type in types)
        {
            Type? transientInterface = type.GetInterface(nameof(ITransientService));
            if (transientInterface != null)
            {
                builder.Services.AddTransient(type);
            }

            Type? scopedInterface = type.GetInterface(nameof(IScopedService));
            if (scopedInterface != null)
            {
                builder.Services.AddScoped(type);
            }

            Type? singletonInterface = type.GetInterface(nameof(ISingletonService));
            if (singletonInterface != null)
            {
                builder.Services.AddScoped(type);
            }
        }
    }

    public static void AddSqlServer(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContextFactory<SqlDbContext>(options =>
        {
            var mainConnectionString = builder.Configuration[Constants.Secrets.SqlServerConnectionString];
            options.UseSqlServer(mainConnectionString);
        });
    }
}