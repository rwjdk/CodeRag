namespace CodeRag.VectorStore.Models;

public interface IVectorEntity<TKey> where TKey : notnull
{
    TKey VectorId { get; set; }
    string Content { get; set; }
    string GetContentCompareKey();
}