using Microsoft.Extensions.DependencyInjection;

namespace SimpleRag.VectorStorage.Extensions;

public static class ServiceCollectionExtensions
{
    public static void AddCodeRagVectorStore<T>(
        this IServiceCollection services,
        VectorStoreConfiguration configuration,
        Func<IServiceProvider, T>? vectorStoreFactory) where T : Microsoft.Extensions.VectorData.VectorStore
    {
        services.AddScoped<VectorStoreQuery>();
        services.AddSingleton(configuration);
        if (vectorStoreFactory != null)
        {
            services.AddScoped<Microsoft.Extensions.VectorData.VectorStore, T>(vectorStoreFactory);
        }
    }
}