using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CodeRag.Shared.EntityFramework.DbModels;

[Table("ProjectSourceIgnorePatterns")]
public class ProjectSourceIgnoreEntity
{
    [Key] public Guid Id { get; private set; } = Guid.NewGuid();

    [MaxLength(1000)] public required string Pattern { get; set; }
}