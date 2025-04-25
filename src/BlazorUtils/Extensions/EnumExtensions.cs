using System.ComponentModel;
using System.Reflection;

namespace BlazorUtilities.Extensions;

public static class EnumExtensions
{
    public static string? Description(this Enum enumValue)
    {
        Type enumType = enumValue.GetType();
        string name = Enum.GetName(enumType, enumValue) ?? throw new InvalidOperationException($"Name is null for {enumValue} ({enumType})");
        FieldInfo field = enumType.GetField(name) ?? throw new InvalidOperationException($"Field is null for {enumValue} ({enumType})");
        return field.GetCustomAttribute<DescriptionAttribute>()?.Description;
    }
}