using BlazorUtilities.Helpers;
using Microsoft.Extensions.DependencyInjection;

namespace BlazorUtilities.Extensions;

public static class IServiceCollectionExtensions
{
    public static void AddBlazorShared(this IServiceCollection services)
    {
        services.AddScoped<CopyToClipboardHelper>();
        services.AddScoped<OpenNewTabHelper>();
        services.AddScoped<DownloadFileHelper>();
        services.AddScoped<BlazorUtils>();
    }

    //todo - move js Download Excel stuff here (Assume it is possible)
}