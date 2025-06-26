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
    public static string StringList { get; set; }
}

public class MultilingualCollection
{
}