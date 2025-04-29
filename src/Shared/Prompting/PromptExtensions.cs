namespace Shared.Prompting;

/// <summary>
/// Extensions for PromptBuilder
/// </summary>
public static class PromptExtensions
{
    /// <summary>
    /// Adds a rule to the prompt
    /// </summary>
    /// <param name="prompt">The prompt to add the rule to</param>
    /// <param name="rule">The rule to add</param>
    /// <returns>The prompt with the added rule</returns>
    public static Prompt AddRule(this Prompt prompt, string rule)
    {
        prompt.Rules.Add(new PromptRule(rule));
        return prompt;
    }

    /// <summary>
    /// Adds a step rule to the prompt
    /// </summary>
    /// <param name="prompt">The prompt to add the step to</param>
    /// <param name="rule">The step rule to add</param>
    /// <returns>The updated prompt</returns>
    public static Prompt AddStep(this Prompt prompt, string rule)
    {
        prompt.Steps.Add(new PromptStep(rule));
        return prompt;
    }

    /// <summary>
    /// Adds an example to the prompt
    /// </summary>
    /// <param name="prompt">The prompt to add the example to</param>
    /// <param name="example">The example to add</param>
    /// <returns>The updated prompt</returns>
    public static Prompt AddExample(this Prompt prompt, string example)
    {
        prompt.Examples.Add(new PromptExample(example));
        return prompt;
    }
}