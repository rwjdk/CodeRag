using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;
using CodeRag.RawFileRetrieval.Models;

namespace Shared.EntityFramework.DbModels;

[Table("ProjectSources")]
public class ProjectSourceEntity
{
    [Key]
    public Guid Id { get; private set; } = Guid.NewGuid();

    public Guid ProjectEntityId { get; init; }

    public ProjectEntity? Project { get; init; }

    public DateTime? LastSync { get; set; }

    [MaxLength(100)]
    public required string Name { get; set; }

    public required ProjectSourceKind Kind { get; init; }

    public required RawFileLocation Location { get; set; }

    [MaxLength(1000)]
    public required string Path { get; set; }

    public required bool Recursive { get; set; }

    [MaxLength(1000)]
    public string? RootUrl { get; set; }

    public int? IgnoreFileIfMoreThanThisNumberOfLines { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string? FileIgnorePatterns { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    public string? MarkdownChunkLineIgnorePatterns { get; set; }

    public bool MarkdownIgnoreCommentedOutContent { get; set; }

    public bool MarkdownIgnoreImages { get; set; }

    public bool MarkdownIgnoreMicrosoftLearnNoneCsharpContent { get; set; }

    public int MarkdownOnlyChunkIfMoreThanThisNumberOfLines { get; set; }

    public int MarkdownLevelsToChunk { get; set; } = 2;

    public int MarkdownChunkIgnoreIfLessThanThisAmountOfChars { get; set; }

    public bool MarkdownFilenameEqualDocUrlSubpage { get; set; }

    [MaxLength(100)]
    public string? GitHubOwner { get; set; }

    [MaxLength(500)]
    public string? GitHubRepo { get; set; }

    public DateTimeOffset? GitGubLastCommitTimestamp { get; set; }

    [NotMapped]
    public bool AddMode { get; set; }

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
            Location = RawFileLocation.Local,
            MarkdownChunkIgnoreIfLessThanThisAmountOfChars = 25,
            MarkdownIgnoreImages = true,
            MarkdownIgnoreCommentedOutContent = true,
            MarkdownOnlyChunkIfMoreThanThisNumberOfLines = 50,
            FileIgnorePatterns = string.Empty,
            MarkdownChunkLineIgnorePatterns = string.Empty,
            AddMode = true
        };
    }

    public RawFileSource ToRawFileSource()
    {
        return new RawFileSource
        {
            FileIgnorePatterns = FileIgnorePatterns,
            Location = Location,
            Path = Path,
            Recursive = Recursive,
            GitHubLastCommitTimestamp = GitGubLastCommitTimestamp,
            GitHubOwner = GitHubOwner,
            GitHubRepo = GitHubRepo
        };
    }
}