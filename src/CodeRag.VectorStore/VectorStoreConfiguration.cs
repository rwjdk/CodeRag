namespace CodeRag.VectorStore;

public record VectorStoreConfiguration(string VectorStoreName, int? MaxRecordSearch = null);