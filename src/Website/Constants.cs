namespace Website;

internal static class Constants
{
    internal static class LocalStorageKeys
    {
        internal const string Project = "Project";
        internal const string DrawerOpen = "DrawerOpen";
        internal const string DarkMode = "DarkMode";
        internal const string IsLoggedIn = "IsLoggedIn";
    }

    internal static class ConfigurationVariables
    {
        internal const string SqlServerConnectionString = "SqlServerConnectionString";
        internal const string AiEndpoint = "AiEndpoint";
        internal const string AiKey = "AiKey";
        internal const string AiEmbeddingDeploymentName = "AiEmbeddingDeploymentName";
        internal const string AiModelDeployments = "AiModelDeployments";
        internal const string GitHubToken = "GitHubToken";
    }
}