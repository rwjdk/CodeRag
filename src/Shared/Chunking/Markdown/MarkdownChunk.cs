namespace Shared.Chunking.Markdown
{
    /// <summary>
    /// Represent a Markdown Chunk
    /// </summary>
    /// <param name="ChunkId">ID of the Chunk</param>
    /// <param name="Name">Name if the Chunk</param>
    /// <param name="Content">Convent for Vectorization</param>
    public record MarkdownChunk(string ChunkId, string Name, string Content);
}