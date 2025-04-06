using Blazor.Shared.Extensions;
using Blazored.LocalStorage;
using CodeRag.Shared.BusinessLogic.Ai;
using CodeRag.Shared.BusinessLogic.Ai.Models;
using CodeRag.Shared.BusinessLogic.Chunking;
using CodeRag.Shared.BusinessLogic.CodeIngestion;
using CodeRag.Shared.BusinessLogic.VectorStore;
using MudBlazor.Services;
using Workbench.Components;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddMudServices();
builder.Services.AddBlazorShared();
builder.Services.AddBlazoredLocalStorage();
builder.Services.AddScoped<CodeIngestionCommand>();
builder.Services.AddScoped<CSharpCodeChunker>();
builder.Services.AddScoped<SemanticKernelQuery>();

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

app.Run();