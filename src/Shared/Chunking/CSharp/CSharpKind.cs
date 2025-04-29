namespace Shared.Chunking.CSharp;

/// <summary>
/// Represents kinds of C# code elements
/// </summary>
public enum CSharpKind
{
    /// <summary>
    /// No Kind
    /// </summary>
    None,

    /// <summary>
    /// Interface
    /// </summary>
    Interface,

    /// <summary>
    /// Delegate
    /// </summary>
    Delegate,

    /// <summary>
    /// Enum
    /// </summary>
    Enum,

    /// <summary>
    /// Method
    /// </summary>
    Method,

    /// <summary>
    /// Class
    /// </summary>
    Class,

    /// <summary>
    /// Struct
    /// </summary>
    Struct,

    /// <summary>
    /// Record
    /// </summary>
    Record,
}