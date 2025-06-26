using SimpleRag.Source.CSharp;
using SimpleRag.Source.CSharp.Models;

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
}