using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeRag.Shared.EntityFramework.DbModels;

[Table("ProjectSources")]
public class ProjectSourceEntity
{
    private const string IgnorePatternSplitter = "<||>";

    //todo: Add setting to ignore files over x number of lines (SK Markdown and Octokit Interfaces have this issue)

    [Key]
    public Guid Id { get; private set; } = Guid.NewGuid();

    public required Guid ProjectEntityId { get; set; }

    public required ProjectEntity Project { get; set; }

    [MaxLength(100)]
    public required string Name { get; set; }

    public required ProjectSourceKind Kind { get; set; }

    public required ProjectSourceLocation Location { get; set; }

    [MaxLength(1000)]
    public required string Path { get; set; }

    public required bool Recursive { get; set; }

    [MaxLength(1000)]
    public string? RootUrl { get; set; }

    [NotMapped]
    public List<string> FileIgnorePatterns
    {
        get
        {
            if (string.IsNullOrWhiteSpace(FileIgnorePatternsRaw))
            {
                return [];
            }

            return FileIgnorePatternsRaw.Split(IgnorePatternSplitter, StringSplitOptions.RemoveEmptyEntries).ToList();
        }
        set
        {
            if (value.Count == 0)
            {
                FileIgnorePatternsRaw = string.Empty;
            }

            FileIgnorePatternsRaw = string.Join(IgnorePatternSplitter, value);
        }
    }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string? FileIgnorePatternsRaw { get; set; }

    #region Markdown Specific Settings

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string? MarkdownChunkLineIgnorePatternsRaw { get; set; }
    public bool MarkdownIgnoreCommentedOutContent { get; set; }
    public bool MarkdownIgnoreImages { get; set; }
    public bool MarkdownIgnoreMicrosoftLearnNoneCsharpContent { get; set; }
    public int MarkdownOnlyChunkIfMoreThanThisNumberOfLines { get; set; }
    public int MarkdownLevelsToChunk { get; set; } = 2;
    public int MarkdownChunkIgnoreIfLessThanThisAmountOfChars { get; set; }
    public bool MarkdownFilenameEqualDocUrlSubpage { get; set; }

    #endregion

    [NotMapped]
    public List<string> MarkdownChunkLineIgnorePatterns
    {
        get
        {
            if (string.IsNullOrWhiteSpace(MarkdownChunkLineIgnorePatternsRaw))
            {
                return [];
            }

            return MarkdownChunkLineIgnorePatternsRaw.Split(IgnorePatternSplitter, StringSplitOptions.RemoveEmptyEntries).ToList();
        }
        set
        {
            if (value.Count == 0)
            {
                MarkdownChunkLineIgnorePatternsRaw = string.Empty;
            }

            MarkdownChunkLineIgnorePatternsRaw = string.Join(IgnorePatternSplitter, value);
        }
    }

    public static ProjectSourceEntity Empty(ProjectEntity project, ProjectSourceKind kind)
    {
        return new ProjectSourceEntity
        {
            Kind = kind,
            Name = string.Empty,
            Path = string.Empty,
            Project = project,
            ProjectEntityId = project.Id,
            Recursive = true,
            Location = ProjectSourceLocation.Local,
            MarkdownChunkIgnoreIfLessThanThisAmountOfChars = 25,
            MarkdownIgnoreImages = true,
            MarkdownIgnoreCommentedOutContent = true,
            MarkdownOnlyChunkIfMoreThanThisNumberOfLines = 50,
        };
    }
}