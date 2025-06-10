namespace SimpleRag.VectorStorage;

public record VectorStoreConfiguration(string VectorStoreName, int? MaxRecordSearch = null); //todo - should this be there?