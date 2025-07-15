using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SimpleRag.DataProviders;
using SimpleRag.DataProviders.Models;
using SimpleRag.DataSources.CSharp;
using SimpleRag.DataSources.CSharp.Chunker;
using SimpleRag.DataSources.Markdown;
using SimpleRag.DataSources.Markdown.Chunker;
using SimpleRag.Integrations.GitHub;
using SimpleRag.Integrations.GitHub.Models;
using SimpleRag.VectorStorage;

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

    public required SourceKind Kind { get; init; }

    public required SourceLocation Location { get; set; }

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

    public static ProjectSourceEntity Empty(ProjectEntity project, SourceKind kind)
    {
        return new ProjectSourceEntity
        {
            Kind = kind,
            Name = string.Empty,
            Path = string.Empty,
            Project = project,
            ProjectEntityId = project.Id,
            Recursive = true,
            Location = SourceLocation.Local,
            MarkdownChunkIgnoreIfLessThanThisAmountOfChars = 25,
            MarkdownIgnoreImages = true,
            MarkdownIgnoreCommentedOutContent = true,
            MarkdownOnlyChunkIfMoreThanThisNumberOfLines = 50,
            FileIgnorePatterns = string.Empty,
            MarkdownChunkLineIgnorePatterns = string.Empty,
            AddMode = true
        };
    }

    public FileContentSource AsFileContentSource()
    {
        return new FileContentSource
        {
            Recursive = Recursive,
            Path = Path,
            FileIgnorePatterns = FileIgnorePatterns,
            FileExtensionType = string.Empty
        };
    }

    public CSharpDataSource AsCSharpSourceLocal(ProjectEntity project, ICSharpChunker chunker, IVectorStoreQuery vectorStoreQuery, IVectorStoreCommand vectorStoreCommand)
    {
        return new CSharpDataSource(chunker, vectorStoreQuery, vectorStoreCommand)
        {
            CollectionId = project.Id.ToString(),
            Id = Id.ToString(),
            Recursive = Recursive,
            Path = Path,
            FileIgnorePatterns = FileIgnorePatterns,
            IgnoreFileIfMoreThanThisNumberOfLines = IgnoreFileIfMoreThanThisNumberOfLines,
            FilesProvider = new LocalFilesDataProvider()
        };
    }

    public CSharpDataSource AsCSharpSourceGitHub(ProjectEntity project, IGitHubQuery gitHubQuery, ICSharpChunker chunker, IVectorStoreQuery vectorStoreQuery, IVectorStoreCommand vectorStoreCommand)
    {
        return new CSharpDataSource(chunker, vectorStoreQuery, vectorStoreCommand)
        {
            CollectionId = project.Id.ToString(),
            Id = Id.ToString(),
            Recursive = Recursive,
            Path = Path,
            FileIgnorePatterns = FileIgnorePatterns,
            FilesProvider = new GitHubFilesDataProvider(gitHubQuery)
            {
                GitHubRepository = new GitHubRepository
                {
                    Owner = GitHubOwner,
                    Name = GitHubRepo
                },
                LastCommitTimestamp = GitGubLastCommitTimestamp
            },
            IgnoreFileIfMoreThanThisNumberOfLines = IgnoreFileIfMoreThanThisNumberOfLines,
        };
    }

    public MarkdownDataSource AsMarkdownSourceLocal(ProjectEntity project, IMarkdownChunker chunker, IVectorStoreQuery vectorStoreQuery, IVectorStoreCommand vectorStoreCommand)
    {
        return new MarkdownDataSource(chunker, vectorStoreQuery, vectorStoreCommand)
        {
            CollectionId = project.Id.ToString(),
            Id = Id.ToString(),
            Recursive = Recursive,
            Path = Path,
            FileIgnorePatterns = FileIgnorePatterns,
            IgnoreFileIfMoreThanThisNumberOfLines = IgnoreFileIfMoreThanThisNumberOfLines,
            IgnoreCommentedOutContent = MarkdownIgnoreCommentedOutContent,
            IgnoreImages = MarkdownIgnoreImages,
            OnlyChunkIfMoreThanThisNumberOfLines = MarkdownOnlyChunkIfMoreThanThisNumberOfLines,
            LevelsToChunk = MarkdownLevelsToChunk,
            ChunkLineIgnorePatterns = MarkdownChunkLineIgnorePatterns,
            IgnoreChunkIfLessThanThisAmountOfChars = MarkdownChunkIgnoreIfLessThanThisAmountOfChars,
            FilesProvider = new LocalFilesDataProvider()
        };
    }

    public MarkdownDataSource AsMarkdownSourceGitHub(ProjectEntity project, IGitHubQuery gitHubQuery, IMarkdownChunker chunker, IVectorStoreQuery vectorStoreQuery, IVectorStoreCommand vectorStoreCommand)
    {
        return new MarkdownDataSource(chunker, vectorStoreQuery, vectorStoreCommand)
        {
            CollectionId = project.Id.ToString(),
            Id = Id.ToString(),
            Recursive = Recursive,
            Path = Path,
            FileIgnorePatterns = FileIgnorePatterns,
            FilesProvider = new GitHubFilesDataProvider(gitHubQuery)
            {
                GitHubRepository = new GitHubRepository
                {
                    Owner = GitHubOwner,
                    Name = GitHubRepo
                },
                LastCommitTimestamp = GitGubLastCommitTimestamp
            },
            IgnoreFileIfMoreThanThisNumberOfLines = IgnoreFileIfMoreThanThisNumberOfLines,
            IgnoreCommentedOutContent = MarkdownIgnoreCommentedOutContent,
            IgnoreImages = MarkdownIgnoreImages,
            OnlyChunkIfMoreThanThisNumberOfLines = MarkdownOnlyChunkIfMoreThanThisNumberOfLines,
            LevelsToChunk = MarkdownLevelsToChunk,
            ChunkLineIgnorePatterns = MarkdownChunkLineIgnorePatterns,
            IgnoreChunkIfLessThanThisAmountOfChars = MarkdownChunkIgnoreIfLessThanThisAmountOfChars
        };
    }
}