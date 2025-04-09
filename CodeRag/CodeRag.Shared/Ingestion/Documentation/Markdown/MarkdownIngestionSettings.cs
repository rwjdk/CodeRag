using CodeRag.Shared.Ingestion.Documentation;

namespace CodeRag.Shared.Ingestion.Documentation.Markdown;

public class MarkdownIngestionSettings
{
    public required DocumentationIngestionSource Source { get; set; }
    public required string SourcePath { get; set; }
    public required List<string> FilesToIgnore { get; set; } = [];
    public required bool IncludeMarkdownInSourceCodeRepoRoot { get; set; }
    public required string RootUrl { get; set; }
    public required bool FilenameEqualDocUrlSubpage { get; set; }
    public required int MarkdownLevelsToChunk { get; set; }
    public required string LineSplitter { get; set; }
    public List<string>? ChunkLineContainsToIgnore { get; set; }
    public List<string>? ChunkLinePrefixesToIgnore { get; set; }
    public List<string>? ChunkLineRegExPatternsToIgnore { get; set; }
    public required bool IgnoreCommentedOutContent { get; set; }
    public required bool IgnoreImages { get; set; }
    public int? ChunkIgnoreIfLessThanThisAmountOfChars { get; set; }
    public required int OnlyChunkIfMoreThanThisNumberOfLines { get; set; }
    public required bool IgnoreMicrosoftLearnNoneCsharpContent { get; set; }
}