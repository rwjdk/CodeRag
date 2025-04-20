using Octokit;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeRag.Shared.EntityFramework.DbModels;

[Table("ProjectSources")]
public class ProjectSourceEntity
{
    [Key]
    public Guid Id { get; private set; } = Guid.NewGuid();

    public required Guid ProjectEntityId { get; set; }

    public required ProjectEntity Project { get; set; }

    [MaxLength(100)]
    public string? Name { get; set; }

    public required ProjectSourceKind Kind { get; set; }

    public ProjectSourceLocation Location { get; set; }

    [MaxLength(1000)]
    public string? Path { get; set; }

    public bool PathSearchRecursive { get; set; }

    [MaxLength(1000)]
    public string? RootUrl { get; set; }

    public List<ProjectSourceIgnoreEntity> FileIgnorePatterns { get; set; } = [];

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

    public static ProjectSourceEntity Empty(ProjectEntity project, ProjectSourceKind kind)
    {
        return new ProjectSourceEntity
        {
            Kind = kind,
            Project = project,
            ProjectEntityId = project.Id
        };
    }
}