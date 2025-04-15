using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeRag.Shared.EntityFramework.Entities;

public class CodeSource
{
    [Key]
    public required Guid Id { get; init; }

    [Column(TypeName = "nvarchar(4000)")]
    public required string Name { get; init; }

    public required CodeSourceType Type { get; init; }

    [Column(TypeName = "nvarchar(4000)")]
    public required string SourcePath { get; set; }

    [Column(TypeName = "nvarchar(MAX)")]
    public List<string> FilesToIgnore { get; set; } = [];

    [Column(TypeName = "nvarchar(MAX)")]
    public List<string> FilesWithTheseSuffixesToIgnore { get; set; } = [];

    [Column(TypeName = "nvarchar(MAX)")]
    public List<string> FilesWithThesePrefixesToIgnore { get; set; } = [];
}