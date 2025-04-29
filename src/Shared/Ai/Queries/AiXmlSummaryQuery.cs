using JetBrains.Annotations;
using Shared.Ai.StructuredOutputModels;
using Shared.EntityFramework.DbModels;

namespace Shared.Ai.Queries;

/// <summary>
/// Contains the operations for generating XML Summaries
/// </summary>
/// <param name="aiGenericQuery"></param>
[UsedImplicitly]
public class AiXmlSummaryQuery(AiGenericQuery aiGenericQuery) : ProgressNotificationBase, IScopedService
{
    /// <summary>
    /// Generates an XML summary for a C# code entity
    /// </summary>
    /// <param name="project">The project context for the summary generation</param>
    /// <param name="signature">The signature of the code entity to summarize</param>
    /// <param name="model">The AI chat model used for generating the summary</param>
    /// <returns>The generated XML summary as a string</returns>
    public async Task<string> GenerateCSharpXmlSummary(ProjectEntity project, string signature, AiChatModel model)
    {
        string prompt = project.CSharpXmlSummaryInstructions;
        AiChatModel chatModel = model;
        XmlSummary response = await aiGenericQuery.GetStructuredOutputResponse<XmlSummary>(
            project,
            chatModel,
            prompt,
            "Generate XML Summary for this single code Entity (do not add for nested properties): " + signature,
            project.XmlSummariesUseSourceCodeSearch,
            project.ChatUseDocumentationSearch,
            project.ChatMaxNumberOfAnswersBackFromSourceCodeSearch,
            project.ChatScoreShouldBeLowerThanThisInSourceCodeSearch,
            project.ChatMaxNumberOfAnswersBackFromDocumentationSearch,
            project.ChatScoreShouldBeLowerThanThisInDocumentSearch);
        return response.XmlSummaryAsString;
    }

    /// <summary>
    /// Retrieve a list of available AI chat models
    /// </summary>
    /// <returns>A list of AI chat models</returns>
    public List<AiChatModel> GetChatModels()
    {
        return aiGenericQuery.GetChatModels();
    }
}