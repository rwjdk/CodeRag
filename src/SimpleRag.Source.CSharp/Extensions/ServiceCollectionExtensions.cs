using Microsoft.Extensions.DependencyInjection;

namespace SimpleRag.Source.CSharp.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddSimpleRagCSharpSource(this IServiceCollection services)
    {
        services.AddScoped<CSharpChunker>();
        services.AddScoped<CSharpSourceCommand>();
    }
}