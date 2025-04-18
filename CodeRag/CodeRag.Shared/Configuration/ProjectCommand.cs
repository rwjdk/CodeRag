using System.Text.Json;
using JetBrains.Annotations;

namespace CodeRag.Shared.Configuration;

[UsedImplicitly]
public class ProjectCommand(ProjectQuery projectQuery) : IScopedService
{
    public void SaveProject(Project project)
    {
        //todo - add other save locations like custom location, DB, shared drives or KeyVault. For now we just use app-data
        var projectRootFolder = projectQuery.GetProjectRootFolder();
        var path = $"{Path.Combine(projectRootFolder, project.Id.ToString())}.{projectQuery.GetProjectExtension()}";
        var json = JsonSerializer.Serialize(project);
        File.WriteAllText(path, json);
    }
}