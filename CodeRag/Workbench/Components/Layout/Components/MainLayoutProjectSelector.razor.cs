using Blazor.Shared;
using Blazored.LocalStorage;
using CodeRag.Shared;
using Microsoft.AspNetCore.Components;

namespace Workbench.Components.Layout.Components;

public partial class MainLayoutProjectSelector(ILocalStorageService localStorage)
{
    [CascadingParameter]
    public required BlazorUtils Utils { get; set; }

    [Parameter, EditorRequired]
    public required EventCallback<Project> ProjectChanged { get; set; }

    private Project[]? _projects;
    private Project? _project;

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            Guid? projectId = await localStorage.GetItemAsync<Guid>(Constants.LocalStorageKeys.Project);

            _projects =
            [
                //Todo - Persist projects
                new Project
                {
                    Id = Guid.Parse("9928f9e2-970d-487d-be15-e90b873db0e0"),
                    Name = "TrelloDotNet"
                },
                new Project
                {
                    Id = Guid.Parse("a785e913-23ce-461e-a139-a1379b2cf5e1"),
                    Name = "SemanticKernel"
                }
            ];

            await SelectProject(_projects.FirstOrDefault(x => x.Id == projectId) ?? _projects.FirstOrDefault());
        }
    }

    private async Task SelectProject(Project? project)
    {
        _project = project;
        if (_project != null)
        {
            await localStorage.SetItemAsync(Constants.LocalStorageKeys.Project, _project.Id);
        }
        else
        {
            await localStorage.RemoveItemAsync(Constants.LocalStorageKeys.Project);
        }

        await ProjectChanged.InvokeAsync(project);
    }

    private async Task NewProject()
    {
        await Task.CompletedTask; //todo-remove
        Utils.ShowNotImplemented("New Project"); //todo - implement
    }

    private async Task ShowProjectSettings()
    {
        await Task.CompletedTask; //todo-remove
        Utils.ShowNotImplemented("Show Project Settings"); //todo - implement
    }
}