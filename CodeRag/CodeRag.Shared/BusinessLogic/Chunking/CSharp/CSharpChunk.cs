using System.Text;

namespace CodeRag.Shared.BusinessLogic.Chunking.CSharp;

public record CSharpChunk(CSharpChunkKind Kind, string Namespace, string Parent, CSharpChunkKind ParentKind, string Name, string XmlSummary, string Content, List<string> Dependencies)
{
    public string KindAsString => Kind.ToString();

    public string? Filename { get; set; }

    public string Path
    {
        get
        {
            StringBuilder sb = new();
            sb.Append(Namespace);
            if (!string.IsNullOrWhiteSpace(Parent))
            {
                sb.Append("." + Parent);
            }

            sb.Append("." + Name);
            return sb.ToString();
        }
    }

    public List<CSharpChunk>? References { get; set; }

    public override string ToString()
    {
        return $"{Kind}: {Path}";
    }
}