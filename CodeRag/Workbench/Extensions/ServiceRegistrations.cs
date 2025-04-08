using CodeRag.Shared.ServiceLifetimes;

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
}