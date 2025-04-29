using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace Shared.EntityFramework.DbModels;

/// <summary>
/// Represents a source of a project with its configuration and metadata
/// </summary>
[Table("ProjectSources")]
public class ProjectSourceEntity
{
    /// <summary>
    /// ID of the source
    /// </summary>
    [Key]
    public Guid Id { get; private set; } = Guid.NewGuid();

    /// <summary>
    /// ID of the Parent Project
    /// </summary>
    public required Guid ProjectEntityId { get; init; }

    /// <summary>
    /// Reference to the Parent Project
    /// </summary>
    public required ProjectEntity Project { get; init; }

    /// <summary>
    /// When was this Source Last Synced
    /// </summary>
    public DateTime? LastSync { get; set; }

    /// <summary>
    /// Name of the Source
    /// </summary>
    [MaxLength(100)]
    public required string Name { get; set; }

    /// <summary>
    /// Kind of the Source
    /// </summary>
    public required ProjectSourceKind Kind { get; init; }

    /// <summary>
    /// The Location of the Source
    /// </summary>
    public required ProjectSourceLocation Location { get; set; }

    /// <summary>
    /// The Path of the Source
    /// </summary>
    [MaxLength(1000)]
    public required string Path { get; set; }

    /// <summary>
    /// If the Path should be searched recursively
    /// </summary>
    public required bool Recursive { get; set; }

    /// <summary>
    /// The URL of the Source
    /// </summary>
    [MaxLength(1000)]
    public string? RootUrl { get; set; }

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    /// <summary>
    /// Semicolon separated list of File-paths to ignore
    /// </summary>
    public required string FileIgnorePatterns { get; set; }

    #region Markdown Specific Settings

    // ReSharper disable once EntityFramework.ModelValidation.UnlimitedStringLength
    /// <summary>
    /// Semicolon separated list of lines in Markdown to ignore
    /// </summary>
    public required string MarkdownChunkLineIgnorePatterns { get; set; }

    /// <summary>
    /// If chunker should ignore commented out content in the Markdown
    /// </summary>
    public bool MarkdownIgnoreCommentedOutContent { get; set; }

    /// <summary>
    /// If chunker should ignore images in the Markdown
    /// </summary>
    public bool MarkdownIgnoreImages { get; set; }

    /// <summary>
    /// If Markdown from MS Learn should ignore non-C# zones
    /// </summary>
    public bool MarkdownIgnoreMicrosoftLearnNoneCsharpContent { get; set; }

    /// <summary>
    /// Ignore a chunk if it has fewer lines than this numbers
    /// </summary>
    public int MarkdownOnlyChunkIfMoreThanThisNumberOfLines { get; set; }

    /// <summary>
    /// The number of levels to Chunk (Level = Heading)
    /// </summary>
    public int MarkdownLevelsToChunk { get; set; } = 2;

    /// <summary>
    /// Ignore a chunk if it contains fewer than this amount of chars
    /// </summary>
    public int MarkdownChunkIgnoreIfLessThanThisAmountOfChars { get; set; }

    /// <summary>
    /// Is the Markdown Filename the same as the url Suffix
    /// </summary>
    public bool MarkdownFilenameEqualDocUrlSubpage { get; set; }

    #endregion

    /// <summary>
    /// If this Source is in add-mode (= not yet added)
    /// </summary>
    [NotMapped]
    public bool AddMode { get; set; }

    /// <summary>
    /// Creates an empty project source entity for the given project and source kind
    /// </summary>
    /// <param name="project">The project to associate with the source entity</param>
    /// <param name="kind">The kind of the project source</param>
    /// <returns>An empty project source entity</returns>
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
            FileIgnorePatterns = string.Empty,
            MarkdownChunkLineIgnorePatterns = string.Empty,
            AddMode = true
        };
    }

    /// <summary>
    /// Determines if the file at the given path should be ignored
    /// </summary>
    /// <param name="path">The file path to check</param>
    /// <returns>True if the file should be ignored, otherwise false</returns>
    public bool IgnoreFile(string path)
    {
        if (string.IsNullOrWhiteSpace(FileIgnorePatterns))
        {
            return false;
        }

        string[] patternsToIgnore = FileIgnorePatterns.Split(';', StringSplitOptions.RemoveEmptyEntries);
        foreach (string pattern in patternsToIgnore.Where(x => !string.IsNullOrWhiteSpace(x)))
        {
            if (Regex.IsMatch(path, pattern, RegexOptions.IgnoreCase))
            {
                return true;
            }
        }

        return false;
    }
}