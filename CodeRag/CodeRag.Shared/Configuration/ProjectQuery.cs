using System.Text.Json;
using JetBrains.Annotations;

namespace CodeRag.Shared.Configuration;

[UsedImplicitly]
public class ProjectQuery : IScopedService
{
    public Project[] GetProjects()
    {
        var projectRootFolder = GetProjectRootFolder();
        var projectFiles = Directory.GetFiles(projectRootFolder, $"*.{GetProjectExtension()}");
        return projectFiles.Select(x => JsonSerializer.Deserialize<Project>(File.ReadAllText(x))!).ToArray();
    }

    internal string GetProjectExtension()
    {
        return "CodeRagProject";
    }

    internal string GetProjectRootFolder()
    {
        var folder = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData), Constants.CompanyName, Constants.AppName);
        if (!Directory.Exists(folder))
        {
            Directory.CreateDirectory(folder);
        }

        return folder;
    }
}