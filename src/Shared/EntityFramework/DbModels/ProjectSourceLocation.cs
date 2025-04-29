namespace Shared.EntityFramework.DbModels;

/// <summary>Specifies the location of the project source</summary>
public enum ProjectSourceLocation
{
    /// <summary>
    /// The Source Path refer to Local Files
    /// </summary>
    Local = 1,

    /// <summary>
    /// The Source Path refer to files in a GitHub Repo
    /// </summary>
    GitHub = 2
}