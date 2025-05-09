using System.Text.RegularExpressions;
using JetBrains.Annotations;

namespace Shared.Chunking.Markdown
{
    /// <summary>
    /// Chunker of Markdown
    /// </summary>
    [UsedImplicitly]
    public class MarkdownChunker : IScopedService
    {
        /// <summary>
        /// Splits the content into markdown chunks based on the specified level
        /// </summary>
        /// <param name="content">The markdown content to split</param>
        /// <param name="level">The heading level to use for chunking</param>
        /// <param name="linesToIgnorePatterns">Patterns of lines to ignore during chunking</param>
        /// <param name="ignoreIfLessThanThisAmountOfChars">Minimum character count to include a chunk</param>
        /// <returns>An array of markdown chunks</returns>
        public MarkdownChunk[] GetChunks(string content, int level = 3, string? linesToIgnorePatterns = null, int? ignoreIfLessThanThisAmountOfChars = null)
        {
            List<MarkdownChunk> chunks = [];
            var mdContentLine = content.Split(["\n"], StringSplitOptions.RemoveEmptyEntries);

            string sectionId = string.Empty;
            string sectionTitle = string.Empty;
            string sectionContent = string.Empty;
            foreach (string line in mdContentLine)
            {
                if (line == string.Empty)
                {
                    continue;
                }

                if (IgnoreMarkdownLine(linesToIgnorePatterns, line))
                {
                    continue;
                }

                switch (level)
                {
                    //H1
                    case >= 1 when line.StartsWith("# "):
                    {
                        AddContentCollectedSoFar();
                        sectionContent = string.Empty;
                        string heading = line.Replace("# ", string.Empty);
                        sectionTitle = heading;
                        sectionContent += heading + Environment.NewLine;
                        sectionId = PrepareHeader(heading);
                        break;
                    }
                    //H2
                    case >= 2 when line.StartsWith("## "):
                    {
                        AddContentCollectedSoFar();
                        sectionContent = string.Empty;
                        string heading = line.Replace("## ", string.Empty);
                        sectionTitle = heading;
                        sectionId = PrepareHeader(heading);
                        break;
                    }
                    //H3
                    case >= 3 when line.StartsWith("### "):
                    {
                        AddContentCollectedSoFar();
                        sectionContent = string.Empty;
                        string heading = line.Replace("### ", string.Empty);
                        sectionTitle = heading;
                        sectionId = PrepareHeader(heading);
                        break;
                    }
                    default:
                    {
                        //Regular Content
                        string lineContent = line;
                        sectionContent += lineContent + Environment.NewLine;
                        break;
                    }
                }
            }

            string PrepareHeader(string id)
            {
                List<string> charsToReplaceInId = [" ", "!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "`", "{", "|", "}", "~"];
                foreach (var toReplace in charsToReplaceInId)
                {
                    id = id.Replace(toReplace, "-");
                }

                //Remove multiple special chars
                id = id.Replace("-----", "-");
                id = id.Replace("----", "-");
                id = id.Replace("---", "-");
                id = id.Replace("--", "-");

                return id.Replace("?", string.Empty).ToLowerInvariant();
            }

            //Add last chunk
            AddContentCollectedSoFar();
            return chunks.Where(x => !string.IsNullOrWhiteSpace(x.Content)).ToArray();

            void AddContentCollectedSoFar()
            {
                sectionContent = sectionContent.Trim();
                if (!string.IsNullOrWhiteSpace(sectionContent))
                {
                    if (ignoreIfLessThanThisAmountOfChars.HasValue && sectionContent.Length < ignoreIfLessThanThisAmountOfChars.Value)
                    {
                        return;
                    }

                    chunks.Add(new MarkdownChunk(sectionId, sectionTitle, sectionContent));
                }
            }
        }

        private bool IgnoreMarkdownLine(string? ignorePatterns, string line)
        {
            if (string.IsNullOrWhiteSpace(ignorePatterns))
            {
                return false;
            }

            string[] patternsToIgnore = ignorePatterns.Split(';', StringSplitOptions.RemoveEmptyEntries);
            foreach (string pattern in patternsToIgnore.Where(x => !string.IsNullOrWhiteSpace(x)))
            {
                if (Regex.IsMatch(line, pattern, RegexOptions.IgnoreCase))
                {
                    return true;
                }
            }

            return false;
        }
    }
}