using System.ComponentModel;
using JetBrains.Annotations;

namespace Shared.Ai.StructuredOutputModels;

[UsedImplicitly]
public class XmlSummary
{
    [Description("A Single XML Summary (never include more than one despite there might be nested objects). If it is an Enum, only genereate for the Enum Header; not it's members")]
    public required string XmlSummaryAsString { get; init; }
}