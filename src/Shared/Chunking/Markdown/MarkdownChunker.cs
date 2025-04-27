using System.Text.RegularExpressions;
using JetBrains.Annotations;

namespace Shared.Chunking.Markdown
{
    [UsedImplicitly]
    public class MarkdownChunker : IScopedService
    {
        public MarkdownChunk[] GetChunks(string content, int level = 3, IEnumerable<string>? linesToIgnorePatterns = null, bool ignoreCommentedOutContent = true, bool ignoreImages = true, int? ignoreIfLessThanThisAmountOfChars = null)
        {
            List<MarkdownChunk> chunks = [];
            var mdContentLine = content.Split(["\n"], StringSplitOptions.RemoveEmptyEntries);

            string sectionId = string.Empty;
            string sectionTitle = string.Empty;
            string sectionContent = string.Empty;
            foreach (var line in mdContentLine)
            {
                if (line == string.Empty)
                {
                    continue;
                }

                if ((linesToIgnorePatterns ?? []).Any(x => !string.IsNullOrWhiteSpace(x) && Regex.IsMatch(line, x, RegexOptions.IgnoreCase)))
                {
                    //todo - this have not been tested in a great deal
                    continue;
                }

                if (level >= 1 && line.StartsWith("# ")) //H1
                {
                    AddContentCollectedSoFar();
                    sectionContent = string.Empty;
                    string heading = line.Replace("# ", string.Empty);
                    sectionTitle = heading;
                    sectionContent += heading + Environment.NewLine;
                    sectionId = PrepareHeader(heading);
                }
                else if (level >= 2 && line.StartsWith("## ")) //H2
                {
                    AddContentCollectedSoFar();
                    sectionContent = string.Empty;
                    string heading = line.Replace("## ", string.Empty);
                    sectionTitle = heading;
                    sectionId = PrepareHeader(heading);
                }
                else if (level >= 3 && line.StartsWith("### ")) //H3
                {
                    AddContentCollectedSoFar();
                    sectionContent = string.Empty;
                    string heading = line.Replace("### ", string.Empty);
                    sectionTitle = heading;
                    sectionId = PrepareHeader(heading);
                }
                else
                {
                    //Regular Content
                    string lineContent = line;
                    sectionContent += lineContent + Environment.NewLine;
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
    }
}