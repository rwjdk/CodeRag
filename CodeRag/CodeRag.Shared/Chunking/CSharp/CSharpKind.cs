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
    Property,
    Constructor

    //todo - Event
    ,
    Constant
}