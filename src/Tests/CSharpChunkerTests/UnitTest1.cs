using SimpleRag.DataSources.CSharp;
using SimpleRag.DataSources.CSharp.Models;

namespace CSharpChunkerTests;

public class UnitTest1
{
    [Fact]
    public void Test1()
    {
        string code = File.ReadAllText("TestFiles\\ClassWithConstructors.cs");

        CSharpChunker chunker = new();
        List<CSharpChunk> chunks = chunker.GetCodeEntities(code);
    }

    [Fact]
    public void Test2()
    {
        string code = File.ReadAllText("TestFiles\\ClassWithBaseClassAndInterface.cs");

        CSharpChunker chunker = new();
        List<CSharpChunk> chunks = chunker.GetCodeEntities(code);
    }

    [Fact]
    public void Test3()
    {
        string code = File.ReadAllText("TestFiles\\ClassWithNestedObjects.cs");

        CSharpChunker chunker = new();
        List<CSharpChunk> chunks = chunker.GetCodeEntities(code);
    }

    [Fact]
    public void Test4()
    {
        string code = File.ReadAllText("TestFiles\\StaticClass.cs");

        CSharpChunker chunker = new();
        List<CSharpChunk> chunks = chunker.GetCodeEntities(code);
    }


    [Fact]
    public void Test5()
    {
        string code = File.ReadAllText("TestFiles\\Operators.cs");
        CSharpChunker chunker = new();
        List<CSharpChunk> chunks = chunker.GetCodeEntities(code);
    }

    [Fact]
    public void Test6()
    {
        string code = File.ReadAllText("TestFiles\\AbstractClass.cs");
        CSharpChunker chunker = new();
        List<CSharpChunk> chunks = chunker.GetCodeEntities(code);
    }
}