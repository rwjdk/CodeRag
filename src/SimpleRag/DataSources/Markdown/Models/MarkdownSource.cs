using SimpleRag.DataSources.Models;

namespace SimpleRag.DataSources.Markdown.Models;

public abstract class MarkdownSource : DataSource
{
    public required bool MarkdownIgnoreCommentedOutContent { get; set; }
    public required bool MarkdownIgnoreImages { get; set; }
    public required bool MarkdownIgnoreMicrosoftLearnNoneCsharpContent { get; set; }
    public required int? MarkdownOnlyChunkIfMoreThanThisNumberOfLines { get; set; }
    public required int MarkdownLevelsToChunk { get; set; }
    public required string? MarkdownChunkLineIgnorePatterns { get; set; }
    public required int? MarkdownChunkIgnoreIfLessThanThisAmountOfChars { get; set; }
}