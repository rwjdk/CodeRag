# CodeRag
An AI Expert for your C# Codebase

## What is this?

CodeRag is an AI Solution that parses your C# Code Repo + existing documentation you may have; add it to a VectorStore (RAG) and offer you (and users/colleagues) an AI solution to help better understand the code, help with documentation, and even Code Reviews

> WARNING: This Repo is in a Preview state meaning that things are subject to change and certain feature combinations are not yet support. See the Issue Tracker for known limitations and issues

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
In order to clone and run this repo locally you will need the following Azure Resources
- An Azure OpenAI Service Resource ([How to Guide for setup](Guides/HowToCreateAnAzureOpenAiServiceResourceInAzure.md))
- An Azure SQL Database (for VectorStore)
- (Optional) An GitHub Account with a configured Fine Grained Token
  - Needed permissions: `Read access to code and metadata` + `Read and Write access to pull requests`

### Clone and Run Code Locally

1. Clone the Repo (in folder of your choice)
```
git clone https://github.com/rwjdk/CodeRag.git
```

2. Navigate to the repo

3. Open Solution (`CodeRag.sln`) in VS or VS code and run it there -or- run the dotnet run command in `CodeRag/src/Website`

> Note: EF Database Migration is built into the Startup process of the Website so no need to run this on your own.

### Configuration Variables
Based on the above Resources you need the following configuration variables

| Configuration Key | Sensitive Information |
| --- | --- |
| AiEndpoint | No |
| AiKey | Yes |
| AiEmbeddingDeploymentName | No |
| AiModelDeployments | No |
| SqlServerConnectionString | Yes |
| GitHubToken (Optional) | Yes |

> Note: I tend to locally keep both sensitive and not sensitive in secrets.json to have them in single place, but feel free to move none-sensitive variables to appsettings.json instead

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