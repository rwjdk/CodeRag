namespace CodeRag.RawFileRetrieval;

public class RawFileException(string message, Exception? innerException = null) : Exception(message, innerException);