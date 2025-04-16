namespace CodeRag.Shared.EntityFramework.Entities;

public class CodeSource
{
    public required Guid Id { get; init; }

    public required string Name { get; init; }

    public required CodeSourceType Type { get; init; }

    public required string SourcePath { get; set; }

    public List<string> FilesToIgnore { get; set; } = [];

    public List<string> FilesWithTheseSuffixesToIgnore { get; set; } = [];

    public List<string> FilesWithThesePrefixesToIgnore { get; set; } = [];
    
    public string? RootUrl { get; set; }
}