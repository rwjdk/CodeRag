namespace Shared;

public class IngestionException(string message, Exception? innerException = null) : Exception(message, innerException);