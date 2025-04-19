using CodeRag.Shared;
using CodeRag.Shared.Ai;
using CodeRag.Shared.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Connectors.SqlServer;

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

    public static void AddVectorStore(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration[Constants.ConfigurationVariables.SqlServerConnectionString];
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            throw new MissingConfigurationVariableException(Constants.ConfigurationVariables.SqlServerConnectionString);
        }

        builder.Services.AddDbContextFactory<SqlDbContext>(options => { options.UseSqlServer(connectionString); });

        builder.Services.AddScoped<IVectorStore, SqlServerVectorStore>(_ => new SqlServerVectorStore(connectionString));
    }

    public static void AddAi(this WebApplicationBuilder builder)
    {
        const string endpointVariable = Constants.ConfigurationVariables.AiEndpoint;
        const string keyVariable = Constants.ConfigurationVariables.AiKey;
        const string embeddingDeploymentNameVariable = Constants.ConfigurationVariables.AiEmbeddingDeploymentName;
        const string modelDeploymentsVariable = Constants.ConfigurationVariables.AiModelDeployments;

        var endpoint = builder.Configuration[endpointVariable];
        if (string.IsNullOrWhiteSpace(endpoint))
        {
            throw new MissingConfigurationVariableException(endpointVariable);
        }

        var key = builder.Configuration[keyVariable];
        if (string.IsNullOrWhiteSpace(key))
        {
            throw new MissingConfigurationVariableException(keyVariable);
        }

        var embeddingDeploymentName = builder.Configuration[embeddingDeploymentNameVariable];
        if (string.IsNullOrWhiteSpace(embeddingDeploymentName))
        {
            throw new MissingConfigurationVariableException(embeddingDeploymentNameVariable);
        }

        var models = builder.Configuration.GetSection(modelDeploymentsVariable).Get<List<AiChatModel>>();
        if (models == null)
        {
            throw new MissingConfigurationVariableException(modelDeploymentsVariable);
        }

        builder.Services.AddSingleton(new Ai(endpoint, key, embeddingDeploymentName, models));
    }
}