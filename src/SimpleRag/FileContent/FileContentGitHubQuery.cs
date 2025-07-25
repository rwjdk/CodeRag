﻿using JetBrains.Annotations;
using Octokit;
using SimpleRag.FileContent.Models;
using SimpleRag.Integrations.GitHub;

namespace SimpleRag.FileContent;

[UsedImplicitly]
public class FileContentGitHubQuery(GitHubQuery gitHubQuery) : FileContentQuery
{
    public async Task<Models.FileContent[]?> GetRawContentForSourceAsync(FileContentSourceGitHub source, string fileExtensionType)
    {
        SharedGuards(source);

        if (string.IsNullOrWhiteSpace(source.GitHubOwner) || string.IsNullOrWhiteSpace(source.GitHubRepo))
        {
            throw new FileContentException("GitHub Owner and Repo is not defined");
        }

        List<Models.FileContent> result = [];

        OnNotifyProgress("Exploring GitHub");
        var gitHubClient = gitHubQuery.GetGitHubClient();

        var commit = await gitHubQuery.GetLatestCommit(gitHubClient, source.GitHubOwner, source.GitHubRepo);
        if (source.GitHubLastCommitTimestamp.HasValue && commit.Committer.Date <= source.GitHubLastCommitTimestamp.Value)
        {
            OnNotifyProgress("No new Commits detected in the repo so skipping retrieval");
            return null;
        }

        var treeResponse = await gitHubQuery.GetTreeAsync(gitHubClient, commit, source.GitHubOwner, source.GitHubRepo, source.Recursive);
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
            var content = await gitHubQuery.GetFileContentAsync(gitHubClient, source.GitHubOwner, source.GitHubRepo, path);
            if (string.IsNullOrWhiteSpace(content))
            {
                continue;
            }

            result.Add(new Models.FileContent(path, content, pathWithoutRoot));
        }

        NotifyIgnoredFiles(ignoredFiles);

        return result.ToArray();
    }
}