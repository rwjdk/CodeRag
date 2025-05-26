> [!Caution]
> This Repo is in an Early Preview state, meaning that everythings are subject to change and certain feature combinations are not yet supported. Use/Clone/Fork at own risk


# CodeRag
An AI Expert for your C# Codebase

## What is this?

CodeRag is an AI Solution that parses your C# Code Repo + existing documentation you may have; add it to a VectorStore (RAG) and offer you (and users/colleagues) an AI solution to help better understand the code, help with documentation, and even Code Reviews

## Why also use this when things like GitHub Copilot and CursorAI Exist?
While other AIs that integrate directly into your IDE are cool to use, they require access to the actual source code to function. This is technically fine in a Public Repo, it is a task most developers do not go through (cloning the repo), and in Private Repos, this is of cause not an option. So this is primarily aimed at people who use your source code in a compiled form (nuget, DLL, etc), but still need to understand how to use the API you expose, but leveraging a ChatBot to ask questions about the API without direct access to the source code (CodeRag only extract public classes, methods, etc.).

## Features

## Frontend
- AI Chat Experience to learn the Codebase

### Admin Backend Workbench.
- Parsing/Ingestion of C# Code into SQL Azure VectorStore
- XML Summary Generation/Maintenance
- Markdown Documentation Generation
- GitHub Pull Request Reviews

### (Additional Planned Features)
- GitHub WebHook Integration for automated PR Reviews on creation/sync
- API Access for automation of ingestion
- MCP Support

## Architecture

![Architecture](Images/Architecture.png)

## How to run locally
In order to clone and run this repo locally, you will need the following Azure Resources
- An Azure OpenAI Service Resource ([How to Guide for setup](Guides/HowToCreateAnAzureOpenAiServiceResourceInAzure.md))
- An SQL Server 2025 or Azure SQL Database (for VectorStore)
- (Optional) A GitHub Account with a configured Fine Grained Token
  - Needed permissions: `Read access to code and metadata` + `Read and Write access to pull requests`

### Clone and Run Code Locally

1. Clone the Repo (in folder of your choice)
```
git clone https://github.com/rwjdk/CodeRag.git
```

2. Navigate to the repo

3. Open Solution (`CodeRag.sln`) in VS or VS Code and run it there -or- run the dotnet run command in `CodeRag/src/Website`

> Note: EF Database Migration is built into the Startup process of the Website so no need to run this on your own.

### Configuration Variables
Based on the above Resource,s you need the following configuration variables

| Configuration Key | Description | Sensitive Information |
| --- | --- | --- |
| AiEndpoint | Your Azure OpenAI Endpoint | No |
| AiKey | Your Azure OpenAI Service Key | Yes |
| AiEmbeddingDeploymentName | Your name of your EmbeddingModel deployed in Azure OpenAI | No |
| AiModelDeployments | One or more ChatModelDeployments (see below) | No |
| SqlServerConnectionString | Your SQL ConnectionString | Yes |
| GitHubToken (Optional) | Your optional GitHub Token that allows interaction with the GitHub Repo | Yes |

> Note: I tend to locally keep both sensitive and non-sensitive in secrets.json to have them in a single place, but feel free to move non-sensitive variables to appsettings.json instead

#### New to user-secrets?
- See https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets on how to work with user-secrets

### Sample secrets.json 

```js
{
  "AiEndpoint": "https://myService.openai.azure.com/", //Your Azure OpenAI Endpoint
  "AiKey": "1234567890abcdefg", //Your Azure OpenAI Service Key
  "AiEmbeddingDeploymentName": "text-embedding-3-small", //Your name of you EmbeddingModel deployed in Azure OpenAI
  "AiModelDeployments": [ //One or more ChatModelDeployments
    {
      "DeploymentName": "gpt-4.1-mini", //Name of Deployment
      "Temperature": 0 //Temp to use (Between 0 and 2; lower value is recommended)
    },
    {
      "DeploymentName": "gpt-4.1",
      "Temperature": 0
    },
    {
      "DeploymentName": "o3-mini",
      "ReasoningEffortLevel": "high", //For Reasoning Models you can define low/medium/high for reasoning effort
      "TimeoutInSeconds": 300 //As reasoning models tend to 'think' longer a higher timeout is normally needed
    }
  ],

  "SqlServerConnectionString": "Server=tcp:myserver.database.windows.net,1433;Initial Catalog=myDb;Persist Security Info=False;User ID=myuser;Password=myPW;", //Your SQL Server ConnectionString
  "GitHubToken": "github_pat_1234567890abcdefg" //Your GitHubToken  
}
```
