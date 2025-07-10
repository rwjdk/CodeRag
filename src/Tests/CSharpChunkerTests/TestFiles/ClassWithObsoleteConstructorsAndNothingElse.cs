namespace CSharpChunkerTests.TestFiles;

public class ClassWithObsoleteConstructorsAndNothingElse
{
    [Obsolete("Do not use")]
    public ClassWithObsoleteConstructorsAndNothingElse()
    {
        //Empty
    }

    /// <summary>
    /// C Constructor
    /// </summary>
    /// <param name="p1">P1 Param</param>
    public ClassWithObsoleteConstructorsAndNothingElse(string p1)
    {
    }

    /// <summary>
    /// C Constructor
    /// </summary>
    /// <param name="p1">P1 Param</param>
    /// <param name="p2">P2 Param</param>
    public ClassWithObsoleteConstructorsAndNothingElse(string p1, string p2)
    {
    }
}