namespace CSharpChunkerTests.TestFiles;

public class ClassWithNestedObjects
{
    public string Caption { get; set; }

    public enum MySubEnum
    {
        Option1,
        Option2,
        Option3,
    }

    public struct MyNestedStruct
    {
        public string Caption1 { get; set; }
    }

    public class MyNestedClass
    {
        public string Caption2 { get; set; }

        public class MyDoubleNestedClass
        {
            public string Caption3 { get; set; }
        }
    }
}