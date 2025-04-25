# CodeRag
An AI Expert for your C# Codebase

## Do your C# Code Repo have
- [ ] Inline Documentation (XML Summaries)?
- [ ]  External Documentation (Wiki)?
- [ ]  An expert who helps...
  - [ ]  with Usage (Internal/External)?
  - [ ]  with Reviews?

# What if we made AI help with filling the above boxes? 😎

CodeRag is an AI Solution that parses your C# Code Repo + existing documentation you may have; add it to a VectorStore (RAG) and offer you (and users/colleagues) an AI solution to help better understand the code, help with documentation, and even Code Reviews

## Public or Private
``PUBLIC`` CodeRag offers any GitHub public repos to be indexed, with the Owner getting access to tweak settings.

``PRIVATE`` For Private Repos, you can clone this Repo and self-host for code-security (Require an Azure OpenAI Resource and an Azure SQL Database)

## Features

### Frontend
- AI Chat Experience to learn the Codebase

### Admin Backend Workbench.
- Parsing/Ingestion of C# Code into SQL Azure VectorStore
- XML Summary Generation/Maintenance
- Markdown Documentation Generation
- GitHub Pull Request Reviews
