using Microsoft.Extensions.DependencyInjection;
using SimpleRag.Integrations.GitHub;

namespace SimpleRag.FileRetrieval.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddSimpleRagFileRetrieval(this IServiceCollection services)
    {
        services.AddScoped<RawFileGitHubQuery>();
        services.AddScoped<RawFileLocalQuery>();
        
    }
}