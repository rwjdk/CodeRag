namespace CodeRag.RawFileRetrieval.Models;

public record RawFile(string Path, string Content, string PathWithoutRoot);