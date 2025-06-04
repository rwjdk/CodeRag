using JetBrains.Annotations;
using Octokit;
using Shared.EntityFramework.DbModels;
using Shared.GitHub;
using Shared.RawFiles.Models;

namespace Shared.RawFiles;

[UsedImplicitly]
public class RawFileGitHubQuery(GitHubQuery gitHubQuery) : RawFileQuery, IScopedService
{
    public override async Task<RawFile[]?> GetRawContentForSourceAsync(ProjectEntity project, ProjectSourceEntity source, string fileExtensionType)
    {
        SharedGuards(source, expectedLocation: ProjectSourceLocation.GitHub);

        if (string.IsNullOrWhiteSpace(project.GitHubOwner) || string.IsNullOrWhiteSpace(project.GitHubRepo))
        {
            throw new RawFileException("GitHub Owner and Repo is not defined");
        }

        List<RawFile> result = [];

        OnNotifyProgress("Exploring GitHub");
        var gitHubClient = gitHubQuery.GetGitHubClient();

        var commit = await gitHubQuery.GetLatestCommit(gitHubClient, project.GitHubOwner, project.GitHubRepo);
        if (source.LastGitGubCommitTimestamp.HasValue && commit.Committer.Date <= source.LastGitGubCommitTimestamp.Value)
        {
            OnNotifyProgress("No new Commits detected in the repo so skipping retrieval");
            return null;
        }

        var treeResponse = await gitHubQuery.GetTreeAsync(gitHubClient, commit, project.GitHubOwner, project.GitHubRepo, source.Recursive);
        fileExtensionType = "." + fileExtensionType;


        TreeItem[] items;
        if (source.Path == "/")
        {
            //Root defined
            items = treeResponse.Tree.Where(x => x.Type == TreeType.Blob && x.Path.EndsWith(fileExtensionType, StringComparison.InvariantCultureIgnoreCase)).ToArray();
        }
        else
        {
            string prefix = source.Path;
            if (!prefix.EndsWith("/"))
            {
                prefix += "/";
            }

            items = treeResponse.Tree.Where(x => x.Type == TreeType.Blob && x.Path.StartsWith(prefix) && x.Path.EndsWith(fileExtensionType, StringComparison.InvariantCultureIgnoreCase)).ToArray();
        }

        NotifyNumberOfFilesFound(items.Length);
        List<string> ignoredFiles = [];
        int counter = 0;
        foreach (string path in items.Select(x => x.Path))
        {
            counter++;
            if (source.IgnoreFile(path))
            {
                ignoredFiles.Add(path);
                continue;
            }

            OnNotifyProgress("Downloading files from GitHub", counter, items.Length);
            var pathWithoutRoot = path.Replace(source.Path, string.Empty);
            var content = await gitHubQuery.GetFileContentAsync(gitHubClient, project.GitHubOwner, project.GitHubRepo, path);
            if (string.IsNullOrWhiteSpace(content))
            {
                continue;
            }

            result.Add(new RawFile(path, content, pathWithoutRoot));
        }

        NotifyIgnoredFiles(ignoredFiles);

        return result.ToArray();
    }
}