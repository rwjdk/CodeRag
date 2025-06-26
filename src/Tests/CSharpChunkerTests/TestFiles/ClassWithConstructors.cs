namespace CSharpChunkerTests.TestFiles;

public class ClassWithConstructors
{
    public ClassWithConstructors()
    {
        //Empty
    }

    /// <summary>
    /// C Constructor
    /// </summary>
    /// <param name="p1">P1 Param</param>
    public ClassWithConstructors(string p1)
    {
    }

    /// <summary>
    /// C Constructor
    /// </summary>
    /// <param name="p1">P1 Param</param>
    /// <param name="p2">P2 Param</param>
    public ClassWithConstructors(string p1, string p2)
    {
    }

    public required string Hello { get; set; }
}