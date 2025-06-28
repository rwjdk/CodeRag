using Shared.Ai;
using SimpleRag.Interfaces;
using Website.Models;

namespace Website.Extensions;

public static class ServiceRegistrations
{
    public static Configuration? GetConfiguration(this WebApplicationBuilder builder, out List<MissingConfiguration> missingConfigurations)
    {
        missingConfigurations = [];
        const string endpointVariable = Constants.ConfigurationVariables.AiEndpoint;
        const string keyVariable = Constants.ConfigurationVariables.AiKey;
        const string embeddingDeploymentNameVariable = Constants.ConfigurationVariables.AiEmbeddingDeploymentName;
        const string modelDeploymentsVariable = Constants.ConfigurationVariables.AiModelDeployments;

        string? endpoint = builder.Configuration[endpointVariable];
        if (string.IsNullOrWhiteSpace(endpoint))
        {
            missingConfigurations.Add(new MissingConfiguration(endpointVariable, false));
        }

        string? key = builder.Configuration[keyVariable];
        if (string.IsNullOrWhiteSpace(key))
        {
            missingConfigurations.Add(new MissingConfiguration(keyVariable, true));
        }

        string? embeddingDeploymentName = builder.Configuration[embeddingDeploymentNameVariable];
        if (string.IsNullOrWhiteSpace(embeddingDeploymentName))
        {
            missingConfigurations.Add(new MissingConfiguration(embeddingDeploymentNameVariable, false));
        }

        var chatModels = builder.Configuration.GetSection(modelDeploymentsVariable).Get<List<AiChatModel>>();
        if (chatModels == null || chatModels.Count == 0)
        {
            missingConfigurations.Add(new MissingConfiguration(modelDeploymentsVariable, false));
        }

        string sqlServerConnectionStringVariable = Constants.ConfigurationVariables.SqlServerConnectionString;
        string? sqlServerConnectionString = builder.Configuration[sqlServerConnectionStringVariable];
        if (string.IsNullOrWhiteSpace(sqlServerConnectionString))
        {
            missingConfigurations.Add(new MissingConfiguration(sqlServerConnectionStringVariable, true));
        }

        string gitHubTokenVariable = Constants.ConfigurationVariables.GitHubToken;
        string? gitHubToken = builder.Configuration[gitHubTokenVariable];

        return missingConfigurations.Count > 0 ? null : new Configuration(endpoint!, key!, embeddingDeploymentName!, sqlServerConnectionString!, gitHubToken ?? "", chatModels!);
    }


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