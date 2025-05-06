using Blazored.LocalStorage;
using BlazorUtilities.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Connectors.SqlServer;
using Microsoft.SemanticKernel.Embeddings;
using MudBlazor.Services;
using Shared.Ai;
using Shared.Ai.Queries;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;
using Shared.GitHub;
using Website;
using Website.Extensions;
using Website.Models;

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

    builder.Services.AddAzureOpenAITextEmbeddingGeneration(configuration.EmbeddingDeploymentName, configuration.Endpoint, configuration.Key);
    builder.Services.AddSingleton(new AiConfiguration(configuration.Endpoint, configuration.Key, configuration.ChatModels));
    builder.Services.AddDbContextFactory<SqlDbContext>(options => { options.UseSqlServer(configuration.SqlServerConnectionString); });
    builder.Services.AddScoped<IVectorStore, SqlServerVectorStore>(_ => new SqlServerVectorStore(configuration.SqlServerConnectionString, new SqlServerVectorStoreOptions
    {
        EmbeddingGenerator = new AzureOpenAITextEmbeddingGenerationService(configuration.EmbeddingDeploymentName, configuration.Endpoint, configuration.Key).AsEmbeddingGenerator()
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

if (configuration != null)
{
    app.MigrateDatabase();
}

app.Run();