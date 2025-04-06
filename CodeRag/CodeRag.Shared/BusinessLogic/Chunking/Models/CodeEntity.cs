using System.Text;

namespace CodeRag.Shared.BusinessLogic.Chunking.Models;

public class CodeEntity(CodeEntityKind kind, string @namespace, string parent, CodeEntityKind parentKind, string name, string xmlSummary, string content, List<string> dependencies)
{
    public string Namespace => @namespace;
    public CodeEntityKind Kind => kind;
    public string Parent { get; } = parent;
    public CodeEntityKind ParentKind { get; } = parentKind;
    public string Name { get; } = name;
    public string XmlSummary { get; } = xmlSummary;
    public string Content { get; } = content;
    public List<string> Dependencies { get; } = dependencies;

    public string KindAsString => kind.ToString();

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

    public List<CodeEntity>? References { get; set; }

    public override string ToString()
    {
        return $"{kind}: {Path}";
    }
}