using Blazor.Shared.Extensions;
using Blazored.LocalStorage;
using CodeRag.Shared.EntityFramework.DbModels;
using MudBlazor.Services;
using Workbench;
using Workbench.Components;
using Workbench.Extensions;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();
builder.Services.AddMudServices();
builder.Services.AddBlazorShared();
builder.Services.AddBlazoredLocalStorage();
builder.AutoRegisterServicesViaReflection(typeof(Program));
builder.AutoRegisterServicesViaReflection(typeof(ProjectEntity));
builder.AddAi();
builder.AddVectorStore();
builder.AddGitHub();

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

app.MigrateDatabase();
app.Run();