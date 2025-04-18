namespace CodeRag.Shared.Configuration;

public class ProjectSource
{
    public required Guid Id { get; init; }

    public required string Name { get; init; }

    public required ProjectSourceKind Kind { get; set; }

    public required ProjectSourceLocation Location { get; set; }

    public string? Path { get; set; }

    public required bool PathSearchRecursive { get; set; }

    public string? RootUrl { get; set; }

    #region Ignore

    //todo - folders to ignore //todo - replace with a general ignore pattern
    public List<string>? FilesToIgnore { get; set; } //todo - replace with a general ignore pattern
    public List<string>? FilesWithTheseSuffixesToIgnore { get; set; } //todo - replace with a general ignore pattern
    public List<string>? FilesWithThesePrefixesToIgnore { get; set; } //todo - replace with a general ignore pattern

    #endregion

    #region Markdown

    public bool MarkdownIgnoreCommentedOutContent { get; set; }
    public bool MarkdownIgnoreImages { get; set; }
    public bool MarkdownIgnoreMicrosoftLearnNoneCsharpContent { get; set; }
    public string? MarkdownLineSplitter { get; set; }
    public int MarkdownOnlyChunkIfMoreThanThisNumberOfLines { get; set; }
    public int MarkdownLevelsToChunk { get; set; }
    public List<string>? MarkdownChunkLineContainsToIgnore { get; set; }
    public List<string>? MarkdownChunkLinePrefixesToIgnore { get; set; }
    public List<string>? MarkdownChunkLineRegExPatternsToIgnore { get; set; }
    public int? MarkdownChunkIgnoreIfLessThanThisAmountOfChars { get; set; }
    public bool MarkdownFilenameEqualDocUrlSubpage { get; set; }

    #endregion
}