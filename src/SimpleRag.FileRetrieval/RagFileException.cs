namespace SimpleRag.FileRetrieval;

public class RagFileException(string message, Exception? innerException = null) : Exception(message, innerException);