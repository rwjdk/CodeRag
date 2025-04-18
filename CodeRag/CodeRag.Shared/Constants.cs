namespace CodeRag.Shared;

public static class Constants
{
    public const string CompanyName = "Sensum365";
    public const string AppName = "CodeRag";

    public static class Tools
    {
        public const string Markdown = "search_markdown";
        public const string CSharp = "source_csharp";
    }

    public static class VectorCollections
    {
        public const string VectorSources = "vector_sources";
    }

    public static class Keywords
    {
        public const string MarkdownSearchTool = "{{MARKDOWN_SEARCH_TOOL}}";
        public const string CSharpSearchTool = "{{CODE_SEARCH_TOOL}}";
        public const string Name = "{{NAME}}";
        public const string Description = "{{DESCRIPTION}}";
    }
}