using System.ComponentModel;
using JetBrains.Annotations;

namespace Shared.Ai.StructuredOutputModels;

[UsedImplicitly]
internal class Intent
{
    public bool IsMessageJustPleasantries { get; set; }

    [Description("Take the users question and add elaborate on what the are seeking. Add context from your system message and fit it for a Vector Similarity Search. If the user example 'ask What is this?' they are seeking information on what you as an AI can do")]
    public required string ElaboratedMessage { get; set; }
}