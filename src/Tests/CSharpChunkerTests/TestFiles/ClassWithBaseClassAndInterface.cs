namespace CSharpChunkerTests.TestFiles;

public class ClassWithBaseClassAndInterface : DummyBaseClass, IDummyInterface
{
    public string Caption { get; set; }

    public string Foo()
    {
        Console.WriteLine("Hello");
        return "42";
    }
}