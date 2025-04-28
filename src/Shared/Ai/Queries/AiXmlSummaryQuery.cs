using JetBrains.Annotations;
using Shared.Ai.StructuredOutputModels;
using Shared.EntityFramework.DbModels;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiXmlSummaryQuery(AiGenericQuery aiGenericQuery) : ProgressNotificationBase, IScopedService
{
    public async Task<string> GenerateCSharpXmlSummary(ProjectEntity project, string signature, AiChatModel model)
    {
        string prompt = project.CSharpXmlSummaryInstructions;
        AiChatModel chatModel = model;
        XmlSummaryGeneration response = await aiGenericQuery.GetStructuredOutputResponse<XmlSummaryGeneration>(
            project,
            chatModel,
            prompt,
            "Generate XML Summary for this code Entity: " + signature,
            project.XmlSummariesUseSourceCodeSearch,
            project.ChatUseDocumentationSearch,
            project.ChatMaxNumberOfAnswersBackFromSourceCodeSearch,
            project.ChatScoreShouldBeLowerThanThisInSourceCodeSearch,
            project.ChatMaxNumberOfAnswersBackFromDocumentationSearch,
            project.ChatScoreShouldBeLowerThanThisInDocumentSearch);
        return response.XmlSummary;
    }

    public List<AiChatModel> GetChatModels()
    {
        return aiGenericQuery.GetChatModels();
    }
}