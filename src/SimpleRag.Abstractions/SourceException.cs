namespace SimpleRag.Abstractions;

public class SourceException(string message, Exception? innerException = null) : Exception(message, innerException);