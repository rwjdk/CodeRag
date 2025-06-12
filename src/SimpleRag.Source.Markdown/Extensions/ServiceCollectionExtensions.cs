using Microsoft.Extensions.DependencyInjection;

namespace SimpleRag.Source.Markdown.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddSimpleRagMarkdownSource(this IServiceCollection services)
    {
        services.AddScoped<MarkdownChunker>();
        services.AddScoped<MarkdownSourceCommand>();
    }
}