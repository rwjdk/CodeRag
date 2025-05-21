using Azure.AI.OpenAI;
using Blazored.LocalStorage;
using BlazorUtilities.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.SqlServer;
using MudBlazor.Services;
using Shared.Ai;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;
using Shared.GitHub;
using System.ClientModel;
using Microsoft.AspNetCore.Mvc;
using Website;
using Website.Extensions;
using Website.Models;
using Website.Services;

var builder = WebApplication.CreateBuilder(args);

Configuration? configuration = builder.GetConfiguration(out AppState.MissingConfigurations);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddMudServices();
builder.Services.AddBlazorShared();
builder.Services.AddBlazoredLocalStorage();
if (configuration != null)
{
    builder.AutoRegisterServicesViaReflection(typeof(Program));
    builder.AutoRegisterServicesViaReflection(typeof(ProjectEntity));


    AzureOpenAIClient azureOpenAiClient = new(new Uri(configuration.Endpoint), new ApiKeyCredential(configuration.Key));
    builder.Services.AddEmbeddingGenerator(azureOpenAiClient.GetEmbeddingClient(configuration.EmbeddingDeploymentName).AsIEmbeddingGenerator());
    builder.Services.AddSingleton(new AiConfiguration(configuration.Endpoint, configuration.Key, configuration.ChatModels));
    builder.Services.AddDbContextFactory<SqlDbContext>(options => { options.UseSqlServer(configuration.SqlServerConnectionString); });
    builder.Services.AddScoped<VectorStore, SqlServerVectorStore>(options => new SqlServerVectorStore(configuration.SqlServerConnectionString, new SqlServerVectorStoreOptions
    {
        EmbeddingGenerator = options.GetRequiredService<IEmbeddingGenerator<string, Embedding<float>>>()
    }));
    builder.Services.AddSingleton(new GitHubConnection(configuration.GitHubToken));
}


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();


app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.MapPost("/sync_project", async Task<IResult> ([FromBody] UrlToProjectServiceRequest serviceRequest, UrlToProjectService service) =>
await service.ConvertRepoUrlToProject(serviceRequest));

if (configuration != null)
{
    app.MigrateDatabase();
}

app.Run();