namespace CodeRag.Shared.Chunking.CSharp;

public enum CSharpKind
{
    None,
    Interface,
    Delegate,
    Enum,
    Method,
    Class,
    Struct,
    Record,
    Property //todo - Begin to use (And should Event, Constant, Constructor and others be added?)
}