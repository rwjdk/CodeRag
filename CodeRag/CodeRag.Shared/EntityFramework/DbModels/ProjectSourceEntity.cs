using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeRag.Shared.EntityFramework.DbModels;

[Table("ProjectSources")]
public class ProjectSourceEntity
{
    [Key] public Guid Id { get; private set; } = Guid.NewGuid();

    [MaxLength(100)] public required string Name { get; set; }

    public required ProjectSourceKind Kind { get; set; }

    public required ProjectSourceLocation Location { get; set; }

    [MaxLength(1000)] public string? Path { get; set; }

    public required bool PathSearchRecursive { get; set; }

    [MaxLength(1000)] public string? RootUrl { get; set; }

    public List<ProjectSourceIgnoreEntity>? FileIgnorePatterns { get; set; }

    #region Markdown Specific Settings

    public bool MarkdownIgnoreCommentedOutContent { get; set; }
    public bool MarkdownIgnoreImages { get; set; }
    public bool MarkdownIgnoreMicrosoftLearnNoneCsharpContent { get; set; }
    public int MarkdownOnlyChunkIfMoreThanThisNumberOfLines { get; set; }
    public int MarkdownLevelsToChunk { get; set; }
    public List<ProjectSourceIgnoreEntity>? MarkdownChunkLineIgnorePatterns { get; set; }
    public int? MarkdownChunkIgnoreIfLessThanThisAmountOfChars { get; set; }
    public bool MarkdownFilenameEqualDocUrlSubpage { get; set; }

    #endregion
}