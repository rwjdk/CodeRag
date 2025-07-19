namespace CSharpChunkerTests.TestFiles;

public class DataValue
{
    public static implicit operator MultilingualCollection?(DataValue? value)
    {
        return value?.ValueAs<MultilingualCollection>();
    }

    public static implicit operator DataValue(List<string>? value)
    {
        return new DataValue();
    }


    public T ValueAs<T>()
    {
        throw new NotImplementedException();
    }
}

public class DataValueTypes
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    public static string StringList { get; set; }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
}

public class MultilingualCollection
{
}