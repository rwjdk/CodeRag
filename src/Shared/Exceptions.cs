namespace Shared;

/// <summary>
/// Exception from Ingesting Data
/// </summary>
/// <param name="message">The Message</param>
/// <param name="innerException">Inner Exception</param>
public class IngestionException(string message, Exception? innerException = null) : Exception(message, innerException);

/// <summary>
/// Exception from RawFile
/// </summary>
/// <param name="message">The Message</param>
/// <param name="innerException">Inner Exception</param>
public class RawFileException(string message, Exception? innerException = null) : Exception(message, innerException);

/// <summary>
/// Exception while integrating the GitHub
/// </summary>
/// <param name="message">The Message</param>
/// <param name="innerException">Inner Exception</param>
public class GithubIntegrationException(string message, Exception? innerException = null) : Exception(message, innerException);