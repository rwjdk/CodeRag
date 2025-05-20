namespace Shared;

public class IngestionException(string message, Exception? innerException = null) : Exception(message, innerException);

public class RawFileException(string message, Exception? innerException = null) : Exception(message, innerException);

public class GithubIntegrationException(string message, Exception? innerException = null) : Exception(message, innerException);