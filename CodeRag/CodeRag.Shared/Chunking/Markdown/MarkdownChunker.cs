using System.Text.RegularExpressions;
using CodeRag.Shared.Interfaces;
using JetBrains.Annotations;

namespace CodeRag.Shared.Chunking.Markdown
{
    [UsedImplicitly]
    public class MarkdownChunker : IScopedService
    {
        public MarkdownChunk[] GetChunks(string content, string lineSplitter = "\n", int level = 3, IEnumerable<string>? lineContainsToIgnore = null, IEnumerable<string>? linePrefixesToIgnore = null, IEnumerable<string>? lineRegExPatternsToIgnore = null, bool ignoreCommentedOutContent = true, bool ignoreImages = true, int? ignoreIfLessThanThisAmountOfChars = null)
        {
            List<MarkdownChunk> chunks = [];
            var mdContentLine = content.Split([lineSplitter], StringSplitOptions.RemoveEmptyEntries);

            string sectionId = string.Empty;
            string sectionTitle = string.Empty;
            string sectionContent = string.Empty;
            foreach (var line in mdContentLine)
            {
                if (line == string.Empty)
                {
                    continue;
                }

                if (lineContainsToIgnore != null)
                {
                    // ReSharper disable once PossibleMultipleEnumeration
                    if (lineContainsToIgnore.Any(x => line.Contains(x, StringComparison.CurrentCultureIgnoreCase)))
                    {
                        continue;
                    }
                }

                if (linePrefixesToIgnore != null)
                {
                    // ReSharper disable once PossibleMultipleEnumeration
                    if (linePrefixesToIgnore.Any(x => line.StartsWith(x, StringComparison.CurrentCultureIgnoreCase)))
                    {
                        continue;
                    }
                }

                if (lineRegExPatternsToIgnore != null)
                {
                    bool include = true;
                    foreach (var regExPattern in lineRegExPatternsToIgnore ?? [])
                    {
                        if (Regex.IsMatch(line, regExPattern))
                        {
                            include = false;
                            break;
                        }
                    }

                    if (!include)
                    {
                        continue;
                    }
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