namespace CodeRag.Shared.BusinessLogic.Ingestion.SourceCode.Csharp;

public class CSharpIngestionSettings
{
    public required SourceCodeIngestionSource Source { get; set; }
    public required string SourcePath { get; set; }
    public List<string> CSharpFilesToIgnore { get; set; } = [];
    public List<string> CSharpFilesWithTheseSuffixesToIgnore { get; set; } = [];
    public List<string> CSharpFilesWithThesePrefixesToIgnore { get; set; } = [];
}