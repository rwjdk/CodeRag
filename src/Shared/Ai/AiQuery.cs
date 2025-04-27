using System.ComponentModel;
using System.Diagnostics;
using System.Text;
using System.Text.Json;
using JetBrains.Annotations;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Embeddings;
using OpenAI.Chat;
using Shared.Ai.Tools;
using Shared.Chunking.CSharp;
using Shared.EntityFramework.DbModels;
using Shared.Models;
using Shared.Prompting;
using Shared.VectorStore;
using ChatMessageContent = Microsoft.SemanticKernel.ChatMessageContent;

namespace Shared.Ai;

[UsedImplicitly]
public class AiQuery(Ai ai, VectorStoreQuery vectorStoreQuery) : ProgressNotificationBase, IScopedService
{
    public async Task<ChatMessageContent?> GetAnswer(
        AiChatModel chatModel,
        List<ChatMessageContent> previousConversation,
        string messageToSend,
        bool useSourceCodeSearch,
        bool useDocumentationSearch,
        int maxNumberOfAnswersBackFromSourceCodeSearch,
        double scoreShouldBeLowerThanThisInSourceCodeSearch,
        int maxNumberOfAnswersBackFromDocumentationSearch,
        double scoreShouldBeLowerThanThisInDocumentSearch,
        ProjectEntity project) //todo - support get a streaming answer
    {
        long timestamp = Stopwatch.GetTimestamp();
        Kernel kernel = GetKernel(chatModel);

        List<ChatMessageContent> input = previousConversation.Select(x => new ChatMessageContent(x.Role, x.Content)).ToList();

        ITextEmbeddingGenerationService embeddingGenerationService = GetTextEmbeddingGenerationService(kernel);

        input.Add(new ChatMessageContent(AuthorRole.User, messageToSend));

        if (useSourceCodeSearch)
        {
            var codeSearchTool = AddCodeSearchPluginToKernel(maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, project, embeddingGenerationService, kernel);
            input.Add(new ChatMessageContent(AuthorRole.User, "Relevant Code: " + await codeSearchTool.Search(messageToSend)));
        }

        if (useDocumentationSearch)
        {
            SearchTool docsSearch = AddDocumentationSearchPluginToKernel(maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, project, embeddingGenerationService, kernel);
            input.Add(new ChatMessageContent(AuthorRole.User, "Relevant Documentation: " + await docsSearch.Search(messageToSend)));
        }

        ChatCompletionAgent answerAgent = GetAgent(chatModel, project.GetFormattedDeveloperInstructions(), kernel);

        input.Add(new ChatMessageContent(AuthorRole.User, messageToSend));

        ChatMessageContent response = null!;

        OnNotifyProgress("Sending Request to AI");
        await foreach (AgentResponseItem<ChatMessageContent> item in answerAgent.InvokeAsync(input))
        {
            response = item.Message;
        }

        TimeSpan elapsedTime = Stopwatch.GetElapsedTime(timestamp);
        OnNotifyProgress($"Done - Total time: {Convert.ToInt32(elapsedTime.TotalSeconds)} sec");
        return response;
    }

    private ITextEmbeddingGenerationService GetTextEmbeddingGenerationService(Kernel kernel)
    {
        return kernel.GetRequiredService<ITextEmbeddingGenerationService>();
    }

    private SearchTool AddDocumentationSearchPluginToKernel(int maxNumberOfAnswersBackFromDocumentationSearch, double scoreShouldBeLowerThanThisInDocumentSearch, ProjectEntity project, ITextEmbeddingGenerationService embeddingGenerationService, Kernel kernel)
    {
        var collection = vectorStoreQuery.GetCollection();
        var docsTool = new SearchTool(VectorStoreDataType.Documentation, project, embeddingGenerationService, collection, maxNumberOfAnswersBackFromDocumentationSearch, scoreShouldBeLowerThanThisInDocumentSearch, this);
        kernel.ImportPluginFromObject(docsTool, Constants.Tools.Markdown);
        return docsTool;
    }

    private SearchTool AddCodeSearchPluginToKernel(int maxNumberOfAnswersBackFromSourceCodeSearch, double scoreShouldBeLowerThanThisInSourceCodeSearch, ProjectEntity project, ITextEmbeddingGenerationService embeddingGenerationService, Kernel kernel)
    {
        var collection = vectorStoreQuery.GetCollection();
        var codePlugin = new SearchTool(VectorStoreDataType.Code, project, embeddingGenerationService, collection, maxNumberOfAnswersBackFromSourceCodeSearch, scoreShouldBeLowerThanThisInSourceCodeSearch, this);
        kernel.ImportPluginFromObject(codePlugin, Constants.Tools.CSharp);
        return codePlugin;
    }

    private ChatCompletionAgent GetAgentForStructuredOutput<T>(AiChatModel chatModel, string instructions, Kernel kernel)
    {
        AzureOpenAIPromptExecutionSettings executionSettings = new()
        {
            FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
        };
        if (chatModel.Temperature.HasValue)
        {
            executionSettings.Temperature = chatModel.Temperature.Value;
            executionSettings.ResponseFormat = typeof(T);
        }

        if (!string.IsNullOrWhiteSpace(chatModel.ReasoningEffortLevel))
        {
            switch (chatModel.ReasoningEffortLevel)
            {
                case "low":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.Low;
                    break;
                case "medium":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.Medium;
                    break;
                case "high":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.High;
                    break;
            }
        }

        ChatCompletionAgent agent = new()
        {
            Instructions = instructions,
            Kernel = kernel,
            Arguments = new KernelArguments(executionSettings)
        };
        return agent;
    }

    private ChatCompletionAgent GetAgent(AiChatModel chatModel, string instructions, Kernel? kernel = null)
    {
        kernel ??= GetKernel(chatModel);

        AzureOpenAIPromptExecutionSettings executionSettings = new()
        {
            FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
        };
        if (chatModel.Temperature.HasValue)
        {
            executionSettings.Temperature = chatModel.Temperature.Value;
        }

        if (!string.IsNullOrWhiteSpace(chatModel.ReasoningEffortLevel))
        {
            switch (chatModel.ReasoningEffortLevel)
            {
                case "low":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.Low;
                    break;
                case "medium":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.Medium;
                    break;
                case "high":
                    executionSettings.ReasoningEffort = ChatReasoningEffortLevel.High;
                    break;
            }
        }

        ChatCompletionAgent agent = new()
        {
            Instructions = instructions,
            Kernel = kernel,
            Arguments = new KernelArguments(executionSettings)
        };
        return agent;
    }

    private Kernel GetKernel(AiChatModel chatModel)
    {
        IKernelBuilder kernelBuilder = Kernel.CreateBuilder();
        kernelBuilder.AddAzureOpenAIChatCompletion(chatModel.DeploymentName, ai.Endpoint, ai.Key, httpClient: new HttpClient
        {
            Timeout = TimeSpan.FromMinutes(chatModel.TimeoutInSeconds)
        });
        kernelBuilder.AddAzureOpenAITextEmbeddingGeneration(ai.EmbeddingModelDeploymentName, ai.Endpoint, ai.Key);
        Kernel kernel = kernelBuilder.Build();
        return kernel;
    }

    private async Task<T> GetStructuredOutputResponse<T>(ProjectEntity project, AiChatModel chatModel, string instructions, string input, bool useSourceCodeSearch, bool useDocumentationSearch)
    {
        Kernel kernel = GetKernel(chatModel);
        ITextEmbeddingGenerationService textEmbeddingGenerationService = GetTextEmbeddingGenerationService(kernel);

        if (useSourceCodeSearch)
        {
            AddCodeSearchPluginToKernel(25, 0.7, project, textEmbeddingGenerationService, kernel);
        }

        if (useDocumentationSearch)
        {
            AddDocumentationSearchPluginToKernel(25, 0.5, project, textEmbeddingGenerationService, kernel);
        }

        ChatCompletionAgent agent = GetAgentForStructuredOutput<T>(chatModel, instructions, kernel);

        string json = string.Empty;
        await foreach (AgentResponseItem<ChatMessageContent> item in agent.InvokeAsync(new ChatMessageContent(AuthorRole.User, input)))
        {
            json = item.Message.ToString();
        }

        return JsonSerializer.Deserialize<T>(json)!;
    }

    public async Task<string?> GenerateCSharpXmlSummary(ProjectEntity project, string signature, AiChatModel model)
    {
        string prompt = Prompt.Create("You are an C# Expert that can generate XML Summaries.")
            .AddRule($"Always use all tools available ('{Constants.Tools.CSharp}' and '{Constants.Tools.Markdown}') before you provide your answer")
            .AddRule("Always report back in C# XML Summary Format and describe all parameters and the return type")
            .AddRule("Do not mention that the method is asynchronously and that the Cancellation-token can be used")
            .AddRule("The description should be short and focus on what the C# entity do")
            .AddRule("CancellationToken params should just be referred to as 'Cancellation Token'")
            .AddRule("Do not use cref")
            .AddRule("Don't use wording 'with the specified options' and similar. Be short and on point")
            .AddRule("Don't end the sentences with '.'")
            .ToString();
        AiChatModel chatModel = model;
        XmlSummaryGeneration response = await GetStructuredOutputResponse<XmlSummaryGeneration>(
            project: project,
            chatModel: chatModel,
            instructions: prompt,
            input: "Generate XML Summary for this code Entity: " + signature,
            useSourceCodeSearch: true,
            useDocumentationSearch: true);
        return response.XmlSummary;
    }

    public async Task<string?> GenerateCodeWikiEntryForMethod(ProjectEntity project, CSharpChunk entity)
    {
        string prompt = Prompt.Create("You are an C# Expert that can given Code and existing wiki content generates Markdown that documents the Code")
            .AddRule($"Always use all tools available ('{Constants.Tools.CSharp}' and '{Constants.Tools.Markdown}') before you provide your answer")
            .AddRule("Always report back in Markdown")
            .AddRule("Do not mention that the method is asynchronously and that the Cancellation-token can be used")
            .ToString();
        AiChatModel chatModel = ai.Models.First();
        WikiMethodEntry response = await GetStructuredOutputResponse<WikiMethodEntry>(
            project: project,
            chatModel: chatModel,
            instructions: prompt,
            input: $"Generate XML Summary for this code Method: {entity.Name} in {nameof(VectorEntity.SourcePath)} '{entity.LocalSourcePath}' {entity.Content}",
            useSourceCodeSearch: true,
            useDocumentationSearch: true);
        return response.ToMarkdown();
    }

    public List<AiChatModel> GetChatModels()
    {
        return ai.Models;
    }

    public async Task<Review> GetGithubPullRequestReview(AiChatModel chatModel, string prDiffContent)
    {
        //todo - instructions should be configurable
        var agent = GetAgentForStructuredOutput<Review>(chatModel, """
                                                                   You are a highly experienced and extremely thorough C# code reviewer
                                                                   Your task is to review the provided GitHub PR diff.

                                                                   You will particularly pay attention to logical and performance bugs and regressions, and generally be very meticulous in determining what this PR introduces in terms of new and/or changed features and/or behaviors.

                                                                   Next, you will perform a very thorough review, but not output your results yet.
                                                                   You will then review the code again, and make sure you haven't missed anything in your first review.
                                                                   Should you at any point discover that it would be beneficial to you as the reviewer to see additional types, you may at any point continue to ask me for additional types, and then I may provide them to you.

                                                                   Once your initial review as well as your second pass through has been completed, go through all your findings and double-check that you didn't make a mistake, it's important that you do not point out any errors that are not actually errors, likewise its equally important that you don't miss or leave out any actual bugs.

                                                                   If you are in doubt whether something is a problem or not, you will include the details in your review, making sure to mention your uncertainty for the relevant points.

                                                                   Always keep your answers short and concise but sufficient for me to complete the task of understanding your concerns/findings, and for me to implement your suggested changes. 
                                                                   Assume that all code can compile and use the latest C# Syntax Rules (Please note that in the latest C# you can use [] for list initializers so do not report this back as a bug)
                                                                   Don't comment on "missing newline at the end of the file"
                                                                   """, GetKernel(chatModel));


        StringBuilder message = new();
        message.AppendLine("Please make a Code Review with the following information <pr_diff>");
        message.AppendLine("<pr_diff>");
        message.AppendLine(prDiffContent);
        message.AppendLine("</pr_diff>");

        message.AppendLine("Based on the above please do the review");

        await foreach (var content in agent.InvokeAsync(new ChatMessageContent(AuthorRole.User, message.ToString())))
        {
            var json = content.Message.ToString();
            return JsonSerializer.Deserialize<Review>(json)!;
        }

        throw new Exception("Unable to get Review");
    }
}

public class XmlSummaryGeneration
{
    public required string XmlSummary { get; set; }
}

public class WikiMethodEntry
{
    [Description("Describe in at least 100 chars but max 500 chars what the Method is designed to do, Describe the various notes and ways this method can be called. Do not include things like the method need to be called async. Do not repeat yourself. Do not mention the method-name")]
    public required string WhatDoesTheMethodDo { get; set; }

    [Description("One or more MethodSignatures (if there are various overloads). Always exclude the 'public' keyword, include the async keyword, also exclude the 'CancellationToken cancellationToken = default' parameter. Include the XML Summary")]
    public required string[] MethodSignatures { get; set; }

    [Description("Surround each parameter with ``<name>`` If a parameter is a GetCardOptions then describe it in full instead of just a bulletlist entry. Exclude the cancellationToken")]
    public required string[]? ParameterDescriptions { get; set; }

    [Description("Surround return type with ``<type>`` and describe what the return type is and how to use it. Only include if return value is other that Task. Ignore the Task part and only include the actual return value")]
    public required string? ReturnValueDescription { get; set; }

    [Description("Make at least 3 examples")]
    public required WikiEntryCodeExample[]? CodeExamples { get; set; }

    public string ToMarkdown()
    {
        StringBuilder sb = new();
        sb.AppendLine(AddLinks(WhatDoesTheMethodDo));
        sb.AppendLine();

        if (MethodSignatures.Length == 1)
        {
            sb.AppendLine("## Method Signature");
            sb.AppendLine("```csharp");
            sb.AppendLine(MethodSignatures.First());
            sb.AppendLine("```");
            sb.AppendLine();
        }
        else
        {
            sb.AppendLine("## Method Signatures");
            sb.AppendLine("```csharp");
            foreach (var methodSignature in MethodSignatures)
            {
                sb.AppendLine(methodSignature);
                if (methodSignature != MethodSignatures.Last())
                {
                    sb.AppendLine();
                    sb.AppendLine("***");
                    sb.AppendLine();
                }
            }

            sb.AppendLine("```");
            sb.AppendLine();
        }

        if (ParameterDescriptions != null)
        {
            sb.AppendLine("### Parameters");
            foreach (string parameterDescription in ParameterDescriptions)
            {
                sb.AppendLine("- " + AddLinks(parameterDescription));
            }
        }

        if (!string.IsNullOrWhiteSpace(ReturnValueDescription))
        {
            sb.AppendLine("### Return value");
            sb.AppendLine(AddLinks(ReturnValueDescription));
        }

        if (CodeExamples != null)
        {
            sb.AppendLine("## Examples");
            int exampleCounter = 1;
            foreach (WikiEntryCodeExample codeExample in CodeExamples)
            {
                sb.AppendLine("```csharp");
                sb.AppendLine($"// Example {exampleCounter}: " + codeExample.DescriptionOfExample);
                sb.AppendLine(codeExample.ExampleCode.Replace("\n", Environment.NewLine));
                sb.AppendLine("```");
                exampleCounter++;
            }
        }

        return sb.ToString();
    }

    private string AddLinks(string input)
    {
        input = input.Replace("`GetCardOptions`", "[`GetCardOptions`](GetCardOptions)");
        return input;
    }
}

public class WikiEntryCodeExample
{
    [Description("A short description of what the example does")]
    public string DescriptionOfExample { get; set; }

    [Description("Never include instantiation of the 'trelloClient'. Just assume it is there. use a verbose syntax allowing more linebreaks and when using object initializer add each property on a new line. Remmber to include await if method suffix is 'Async'. make all variable local variables instead of inlining them and for id parameters always write \"<your_'type'_id>\" (Example \"<your_card_id>\" or \"<your_board_id>\"). Never use 'var'")]
    public string ExampleCode { get; set; }
}