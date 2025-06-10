namespace CodeRag.Abstractions;

public class SourceException(string message, Exception? innerException = null) : Exception(message, innerException);