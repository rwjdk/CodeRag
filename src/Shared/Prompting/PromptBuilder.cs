using System.Text;

namespace Shared.Prompting
{
    public class Prompt
    {
        private string Instructions { get; }

        public static Prompt Create(string instructions)
        {
            return new Prompt(instructions);
        }

        private Prompt(string instructions)
        {
            Instructions = instructions;
        }

        internal List<PromptRule> Rules { get; } = [];
        internal List<PromptExample> Examples { get; } = [];
        internal List<PromptStep> Steps { get; } = [];

        public override string ToString()
        {
            var builder = new StringBuilder();
            builder.AppendLine(Instructions);
            if (Steps.Count > 0)
            {
                builder.AppendLine("<steps_to_complete_request>");
                int stepCounter = 1;
                foreach (PromptStep step in Steps)
                {
                    builder.AppendLine($" <step{stepCounter}>{step.Value}</step{stepCounter}>");
                    stepCounter++;
                }

                builder.AppendLine("</steps_to_complete_request>");
            }

            if (Rules.Count > 0)
            {
                builder.AppendLine("<rules>");
                foreach (PromptRule rule in Rules)
                {
                    builder.AppendLine($" <rule>{rule.Value}</rule>");
                }

                builder.AppendLine("</rules>");
            }

            if (Examples.Count > 0)
            {
                builder.AppendLine("<examples>");
                foreach (PromptExample example in Examples)
                {
                    builder.AppendLine($"  <example>{example.Value}</example>");
                }

                builder.AppendLine("</examples>");
            }

            return builder.ToString();
        }
    }

    internal class PromptRule(string value)
    {
        public string Value { get; } = value;
    }

    internal class PromptStep(string value)
    {
        public string Value { get; } = value;
    }

    internal class PromptExample(string value)
    {
        public string Value { get; } = value;
    }

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
}