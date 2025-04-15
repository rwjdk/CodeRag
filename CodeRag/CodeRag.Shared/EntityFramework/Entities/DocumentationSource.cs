using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CodeRag.Shared.EntityFramework.Entities;

public class DocumentationSource
{
    [Key]
    public required Guid Id { get; init; }

    [Column(TypeName = "nvarchar(4000)")]
    public required string Name { get; init; }

    public required DocumentationSourceType Type { get; init; }

    public required string SourcePath { get; set; }
    public List<string> FilesToIgnore { get; set; } = [];
    public string RootUrl { get; set; }
    public bool FilenameEqualDocUrlSubpage { get; set; }
    public int MarkdownLevelsToChunk { get; set; }
    public string LineSplitter { get; set; }
    public List<string>? ChunkLineContainsToIgnore { get; set; }
    public List<string>? ChunkLinePrefixesToIgnore { get; set; }
    public List<string>? ChunkLineRegExPatternsToIgnore { get; set; }
    public bool IgnoreCommentedOutContent { get; set; }
    public bool IgnoreImages { get; set; }
    public int? ChunkIgnoreIfLessThanThisAmountOfChars { get; set; }
    public int OnlyChunkIfMoreThanThisNumberOfLines { get; set; }
    public bool IgnoreMicrosoftLearnNoneCsharpContent { get; set; }
}