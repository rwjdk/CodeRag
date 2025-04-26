namespace Shared;

public class IngestionException(string message, Exception? innerException = null) : Exception(message, innerException);

public class MissingConfigurationVariableException(string nameOfVariable) : Exception($"Secret '{nameOfVariable}' is missing. Please provide using Key Vault, UserSecret, AppSettings, Environment Variable or similar");