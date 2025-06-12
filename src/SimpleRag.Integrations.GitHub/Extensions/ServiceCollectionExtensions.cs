using Microsoft.Extensions.DependencyInjection;

namespace SimpleRag.Integrations.GitHub.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddSimpleRagGithubIntegration(this IServiceCollection services, string githubPatToken)
    {
        services.AddScoped<GitHubQuery>();
        services.AddScoped<GitHubCommand>();
        services.AddSingleton(new GitHubConnection(githubPatToken));
    }
}