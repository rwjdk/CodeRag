using System.Diagnostics;
using System.Text.Json;
using SimpleRag.Source.JavaScript;
using SimpleRag.Source.JavaScript.Models;
using SimpleRag.FileRetrieval;
using SimpleRag.Abstractions.Models;

// Dummy implementations or mocks for required dependencies
RawFileLocalQuery rawFileLocalQuery = new();

// Example JavaScriptSource object
JavaScriptSource source = new()
{
    CollectionId = "example-collection",
    Id = "example-id",
    Recursive = true,
    Path = "C:\\Users\\Simon\\Git\\relewise-sdk-javascript\\packages\\client",
    FileIgnorePatterns = null,
    Location = SourceLocation.Local, // or SourceLocation.GitHub
    GitHubOwner = null,
    GitHubRepo = null,
    GitHubLastCommitTimestamp = null,
    IgnoreFileIfMoreThanThisNumberOfLines = null
};

JavaScriptSourceCommand command = new(rawFileLocalQuery);

// Call the async method and wait for completion
await command.IngestAsync(source);

// Get the absolute path to the TypeScriptCodeAnalyzer directory
var projectRoot = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, "..", "..", "..", ".."));
var typeScriptAnalyzerDir = Path.Combine(projectRoot, "TypeScriptCodeAnalyzer");

var processStartInfo = new ProcessStartInfo
{
    FileName = "C:\\Program Files\\nodejs\\npx.cmd",
    Arguments = "ts-node app.ts",
    WorkingDirectory = typeScriptAnalyzerDir,
    RedirectStandardOutput = true,
    RedirectStandardError = true,
    UseShellExecute = false,
    CreateNoWindow = true
};

using var process = new Process { StartInfo = processStartInfo };
process.Start();

string output = await process.StandardOutput.ReadToEndAsync();
string error = await process.StandardError.ReadToEndAsync();

process.WaitForExit();

Console.WriteLine("TypeScript Output:");
Console.WriteLine(output);

if (!string.IsNullOrWhiteSpace(error))
{
    Console.WriteLine("TypeScript Error:");
    Console.WriteLine(error);
}

// Pretty print and write to output-result.json
try
{
    string codeRoot = Path.Combine(Directory.GetCurrentDirectory(), "code");

    using var jsonDoc = JsonDocument.Parse(output);
    var prettyJson = JsonSerializer.Serialize(jsonDoc.RootElement, new JsonSerializerOptions { WriteIndented = true });
    var outputPath = Path.Combine(codeRoot, "output-result.json");
    await File.WriteAllTextAsync(outputPath, prettyJson);
    Console.WriteLine($"Pretty-printed JSON written to: {outputPath}");
}
catch (JsonException)
{
    Console.WriteLine("Output is not valid JSON and could not be pretty-printed.");
}