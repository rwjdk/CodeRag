using JetBrains.Annotations;
using Shared.Ai.StructuredOutputModels;
using Shared.EntityFramework.DbModels;
using SimpleRag;
using SimpleRag.Interfaces;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiXmlSummaryQuery(AiGenericQuery aiGenericQuery) : ProgressNotificationBase, IScopedService
{
    public async Task<string> GenerateCSharpXmlSummary(ProjectEntity project, string signature, AiChatModel model)
    {
        string prompt = project.CSharpXmlSummaryInstructions ?? ProjectEntity.GenerateCSharpXmlSummaryInstructions();
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

    public List<AiChatModel> GetChatModels()
    {
        return aiGenericQuery.GetChatModels();
    }
}