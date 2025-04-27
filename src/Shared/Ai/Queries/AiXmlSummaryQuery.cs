using JetBrains.Annotations;
using Shared.Ai.StructuredOutputModels;
using Shared.EntityFramework.DbModels;

namespace Shared.Ai.Queries;

[UsedImplicitly]
public class AiXmlSummaryQuery(AiGenericQuery aiGenericQuery) : ProgressNotificationBase, IScopedService
{
    public async Task<string?> GenerateCSharpXmlSummary(ProjectEntity project, string signature, AiChatModel model)
    {
        string prompt = project.CSharpXmlSummaryInstructions;
        AiChatModel chatModel = model;
        XmlSummaryGeneration response = await aiGenericQuery.GetStructuredOutputResponse<XmlSummaryGeneration>(
            project: project,
            chatModel: chatModel,
            instructions: prompt,
            input: "Generate XML Summary for this code Entity: " + signature,
            useSourceCodeSearch: true,
            useDocumentationSearch: true);
        return response.XmlSummary;
    }

    public List<AiChatModel> GetChatModels()
    {
        return aiGenericQuery.GetChatModels();
    }
}