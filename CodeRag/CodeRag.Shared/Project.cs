using System.Text.Json.Serialization;

namespace CodeRag.Shared;

public class Project
{
    [JsonPropertyName("id")]
    public required Guid Id { get; set; }

    [JsonPropertyName("name")]
    public required string Name { get; set; }
}