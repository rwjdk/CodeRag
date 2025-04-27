namespace Website.Models;

public record MissingConfiguration(string Variable, bool Sensitive, string Instructions, string MoreInfoUrl);