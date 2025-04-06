using System.Text;

namespace CodeRag.Shared.BusinessLogic.Prompting
{
    public class Prompt
    {
        internal string Instructions { get; }

        public static Prompt Create(string instructions)
        {
            return new Prompt(instructions);
        }

        private Prompt(string instructions)
        {
            Instructions = instructions;
        }

        internal List<PromptRule> Rules { get; set; } = new List<PromptRule>();
        internal List<PromptExample> Examples { get; set; } = new List<PromptExample>();
        internal List<PromptStep> Steps { get; set; } = new List<PromptStep>();

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

    internal class PromptRule
    {
        public string Value { get; }

        public PromptRule(string value)
        {
            Value = value;
        }
    }

    internal class PromptStep
    {
        public string Value { get; }

        public PromptStep(string value)
        {
            Value = value;
        }
    }

    internal class PromptExample
    {
        public string Value { get; }

        public PromptExample(string value)
        {
            Value = value;
        }
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

        public static Prompt AddRuleThatIfYouDontKnowThenDontAnswer(this Prompt prompt, string rule = null)
        {
            prompt.Rules.Add(!string.IsNullOrWhiteSpace(rule) ? new PromptRule(rule) : new PromptRule("Do not answer or make stuff up if your confidence is low or you do not have knowledge. Instead answer 'Sorry, I don't know this'"));

            return prompt;
        }


        public static Prompt AddExample(this Prompt prompt, string example)
        {
            prompt.Examples.Add(new PromptExample(example));
            return prompt;
        }
    }
}