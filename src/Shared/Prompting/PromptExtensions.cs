namespace Shared.Prompting;

public static class PromptExtensions
{
    public static Prompt AddRule(this Prompt prompt, string rule)
    {
        prompt.Rules.Add(new PromptRule(rule));
        return prompt;
    }

    public static Prompt AddStep(this Prompt prompt, string rule)
    {
        prompt.Steps.Add(new PromptStep(rule));
        return prompt;
    }

    public static Prompt AddExample(this Prompt prompt, string example)
    {
        prompt.Examples.Add(new PromptExample(example));
        return prompt;
    }
}