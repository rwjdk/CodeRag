using System.Text;
using Microsoft.CodeAnalysis;
using Formatter = Microsoft.CodeAnalysis.Formatting.Formatter;

namespace Shared.Chunking.CSharp;

/// <summary>
/// Represents a chunk of C# code with metadata and content
/// </summary>
public class CSharpChunk(CSharpKind kind, string @namespace, string? parent, CSharpKind? parentKind, string name, string xmlSummary, string content, List<string> dependencies, SyntaxNode node)
{
    /// <summary>
    /// The C# Kind (Method, Class, ...)
    /// </summary>
    public CSharpKind Kind { get; } = kind;

    /// <summary>
    /// The Namespace the Chunk is in
    /// </summary>
    public string Namespace { get; } = @namespace;

    /// <summary>
    /// The Parent (if any) the chunk is part of
    /// </summary>
    public string? Parent { get; } = parent;

    /// <summary>
    /// The Kind of the Parent (if any). Example: A Method could have a class as Parent
    /// </summary>
    public CSharpKind? ParentKind { get; } = parentKind;

    /// <summary>
    /// The name of the Chunk
    /// </summary>
    public string Name { get; } = name;

    /// <summary>
    /// The XML Summary of the chunk
    /// </summary>
    public string XmlSummary { get; set; } = xmlSummary;

    /// <summary>
    /// The Content to be vectorized
    /// </summary>
    public string Content { get; } = content;

    /// <summary>
    /// A list of dependencies this chunk have (example: the parameter types and return value of a method)
    /// </summary>
    public List<string> Dependencies { get; } = dependencies;

    /// <summary>
    /// Node representing the Chunk
    /// </summary>
    public SyntaxNode Node { get; } = node;

    /// <summary>
    /// The Kind as a string
    /// </summary>
    public string KindAsString => Kind.ToString();

    /// <summary>
    /// The ParentKind as a String
    /// </summary>
    public string? ParentKindAsString => ParentKind.ToString();

    /// <summary>
    /// The Local Source Path from where the chunk originated
    /// </summary>
    public string? LocalSourcePath { get; set; }

    /// <summary>
    /// The Path of the Chunk
    /// </summary>
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

    /// <summary>
    /// The References to the chunk (aka who use it)
    /// </summary>
    public List<CSharpChunk>? References { get; set; }

    /// <summary>
    /// Returns a string representation of the current object
    /// </summary>
    /// <returns>A string that represents the current object</returns>
    public override string ToString()
    {
        return $"{Kind}: {Path}";
    }

    /// <summary>
    /// Returns a string representation for display
    /// </summary>
    /// <returns>A string used for display purposes</returns>
    public string GetDisplayString()
    {
        return Formatter.Format(Node, new AdhocWorkspace()).ToString();
    }
}