using Blazored.LocalStorage;
using BlazorUtilities.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.SqlServer;
using MudBlazor.Services;
using Shared.Ai;
using Shared.EntityFramework;
using Shared.EntityFramework.DbModels;
using Shared.GitHub;
using Workbench;
using Workbench.Extensions;
using Workbench.Models;

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
    builder.Services.AddSingleton(new Ai(configuration.Endpoint, configuration.Key, configuration.EmbeddingDeploymentName, configuration.ChatModels));
    builder.Services.AddDbContextFactory<SqlDbContext>(options => { options.UseSqlServer(configuration.SqlServerConnectionString); });
    builder.Services.AddScoped<IVectorStore, SqlServerVectorStore>(_ => new SqlServerVectorStore(configuration.SqlServerConnectionString));
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