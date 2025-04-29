namespace Shared;

/// <summary>
/// Holds application-wide constant values
/// </summary>
public static class Constants
{
    /// <summary>
    /// Name of the App
    /// </summary>
    public const string AppName = "CodeRag";

    /// <summary>Provides constant identifiers for search tools</summary>
    public static class Tools
    {
        /// <summary>
        /// Name of the Markdown Search Tool
        /// </summary>
        public const string Markdown = "search_markdown";

        /// <summary>
        /// Name of the C# Search Tool
        /// </summary>
        public const string CSharp = "source_csharp";
    }

    /// <summary>Contains constants for vector collection names</summary>
    public static class VectorCollections
    {
        /// <summary>
        /// Name of the Vector store
        /// </summary>
        public const string VectorSources = "vector_sources";

        /// <summary>
        /// Contains constant values for vector column names
        /// </summary>
        public static class VectorColumns
        {
            /// <summary>
            /// Name of the Vector-column
            /// </summary>
            public const string Vector = "Vector";
        }
    }

    /// <summary>
    /// Keywords that can be used in Chat-instructions
    /// </summary>
    public static class Keywords
    {
        /// <summary>
        /// Keyword for the Markdown search tool
        /// </summary>
        public const string MarkdownSearchTool = "{{MARKDOWN_SEARCH_TOOL}}";

        /// <summary>
        /// Keyword for the C# search tool
        /// </summary>
        public const string CSharpSearchTool = "{{CODE_SEARCH_TOOL}}";

        /// <summary>
        /// Keyword for name of the Project
        /// </summary>
        public const string Name = "{{NAME}}";

        /// <summary>
        /// Keyword for Description of the Project
        /// </summary>
        public const string Description = "{{DESCRIPTION}}";
    }
}