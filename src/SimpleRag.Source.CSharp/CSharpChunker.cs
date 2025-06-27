using System.Text;
using JetBrains.Annotations;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using SimpleRag.Source.CSharp.Models;

namespace SimpleRag.Source.CSharp
{
    [UsedImplicitly]
    public class CSharpChunker
    {
        public List<CSharpChunk> GetCodeEntities(string code)
        {
            SyntaxTree tree = CSharpSyntaxTree.ParseText(code);
            var root = tree.GetRoot();

            List<CSharpChunk> entries = [];
            entries.AddRange(ProcessTypeDeclaration<ClassDeclarationSyntax>(root, CSharpKind.Class));
            entries.AddRange(ProcessTypeDeclaration<StructDeclarationSyntax>(root, CSharpKind.Struct));
            entries.AddRange(ProcessTypeDeclaration<RecordDeclarationSyntax>(root, CSharpKind.Record));
            entries.AddRange(ProcessEnums(root));
            entries.AddRange(ProcessDelegates(root));
            entries.AddRange(ProcessInterfaces(root));
            return entries;
        }

        private List<CSharpChunk> ProcessInterfaces(SyntaxNode root)
        {
            List<CSharpChunk> result = [];
            InterfaceDeclarationSyntax[] nodes = root.DescendantNodes()
                .OfType<InterfaceDeclarationSyntax>()
                .ToArray();
            foreach (InterfaceDeclarationSyntax node in nodes)
            {
                if (!IsPublic(node.Modifiers))
                {
                    continue;
                }

                string ns = GetNamespace(node);
                string xmlSummary = GetXmlSummary(node);
                string name = node.Identifier.ValueText;
                var parent = GetParentFromNesting(node.Parent);
                CSharpKind parentKind = GetParentType(node.Parent);
                result.Add(new CSharpChunk(CSharpKind.Interface, ns, parent, parentKind, name, xmlSummary, node.ToString(), [], root));
            }

            return result;
        }

        private List<CSharpChunk> ProcessDelegates(SyntaxNode root)
        {
            List<CSharpChunk> result = [];
            DelegateDeclarationSyntax[] nodes = root.DescendantNodes()
                .OfType<DelegateDeclarationSyntax>()
                .ToArray();

            foreach (DelegateDeclarationSyntax node in nodes)
            {
                if (!IsPublic(node.Modifiers))
                {
                    continue;
                }

                string ns = GetNamespace(node);
                string xmlSummary = GetXmlSummary(node);
                string name = node.Identifier.ValueText;
                var parent = GetParentFromNesting(node.Parent);
                CSharpKind parentKind = GetParentType(node.Parent);
                result.Add(new CSharpChunk(CSharpKind.Delegate, ns, parent, parentKind, name, xmlSummary, node.ToString(), [], node));
            }

            return result;
        }

        private List<CSharpChunk> ProcessEnums(SyntaxNode root)
        {
            List<CSharpChunk> result = [];
            EnumDeclarationSyntax[] nodes = root.DescendantNodes().OfType<EnumDeclarationSyntax>().ToArray();
            foreach (EnumDeclarationSyntax node in nodes)
            {
                if (!IsPublic(node.Modifiers))
                {
                    continue;
                }

                string ns = GetNamespace(node);
                string xmlSummary = GetXmlSummary(node);
                string name = node.Identifier.ValueText;
                var parent = GetParentFromNesting(node.Parent);
                CSharpKind parentKind = GetParentType(node.Parent);
                result.Add(new CSharpChunk(CSharpKind.Enum, ns, parent, parentKind, name, xmlSummary, RemoveAttributes(node).ToString(), [], node));
            }

            return result;
        }

        private List<CSharpChunk> ProcessTypeDeclaration<T>(SyntaxNode root, CSharpKind kind) where T : TypeDeclarationSyntax
        {
            List<CSharpChunk> result = [];
            var nodes = root.DescendantNodes().OfType<T>().ToArray();
            foreach (T node in nodes)
            {
                if (!IsPublic(node.Modifiers))
                {
                    continue;
                }

                PropertyDeclarationSyntax[] properties = GetPublicProperties(node.Members);
                MethodDeclarationSyntax[] methods = GetPublicMethods(node.Members);
                FieldDeclarationSyntax[] constants = GetPublicConstants(node.Members);
                ConversionOperatorDeclarationSyntax[] implicitOperators = GetPublicImplicitOperators(node.Members);
                ConstructorDeclarationSyntax[] constructors = GetPublicConstructors(node.Members);
                //todo - Support more types (https://github.com/rwjdk/CodeRag/issues/1)

                string ns = GetNamespace(node);

                //Store methods separately
                foreach (MethodDeclarationSyntax method in methods)
                {
                    string name = method.Identifier.ValueText;
                    string xmlSummary = GetXmlSummary(method);
                    string content = (method.ToString().Replace(method.Body?.ToString() ?? Guid.NewGuid().ToString(), "").Trim()).Trim();
                    string parent = node.Identifier.ValueText;
                    CSharpKind parentKind = kind;
                    List<string> dependencies = GetMethodDependencies(method);
                    result.Add(new CSharpChunk(CSharpKind.Method, ns, parent, parentKind, name, xmlSummary, content, dependencies, method));
                }

                //Store constructors separately
                foreach (ConstructorDeclarationSyntax constructor in constructors.Where(x => x.ParameterList.Parameters.Count > 0))
                {
                    string name = constructor.Identifier.ValueText;
                    string xmlSummary = GetXmlSummary(constructor);
                    ConstructorDeclarationSyntax content = constructor.WithBody(null);
                    string parent = node.Identifier.ValueText;
                    CSharpKind parentKind = kind;
                    var dependencies = constructor.ParameterList.Parameters.Select(x => x.Type?.ToString() ?? "unknown").ToList();
                    dependencies = RemoveDuplicateAndTrivialDependencies(dependencies);
                    result.Add(new CSharpChunk(CSharpKind.Constructor, ns, parent, parentKind, name, xmlSummary, content.ToString(), dependencies, constructor));
                }

                if (properties.Length != 0 || constants.Length != 0 || implicitOperators.Length != 0)
                {
                    //Store the Type itself with everything but the Methods
                    string name = node.Identifier.ValueText;
                    List<string> dependencies = [];
                    StringBuilder sb = new();

                    sb.Append("public ");
                    if (IsStatic(node.Modifiers))
                    {
                        sb.Append("static ");
                    }

                    sb.Append($"{kind.ToString().ToLowerInvariant()} {name}"); //Do this better (partial stuff support)!

                    //Base Types and Interfaces
                    if (node.BaseList != null)
                    {
                        bool first = true;
                        foreach (var @base in node.BaseList.Types)
                        {
                            string separator = ", ";
                            if (first)
                            {
                                separator = ": ";
                                first = false;
                            }

                            sb.Append($"{separator}{@base.Type.ToString()} ");
                        }
                    }

                    sb.AppendLine();
                    sb.AppendLine("{");

                    foreach (FieldDeclarationSyntax constant in constants)
                    {
                        sb.Append(GetXmlSummary(constant));
                        sb.AppendLine(constant.ToString());
                        sb.AppendLine();
                        TypeSyntax type = constant.Declaration.Type;
                        dependencies.Add(type.ToString());
                    }

                    foreach (PropertyDeclarationSyntax property in properties)
                    {
                        string xmlSummary = GetXmlSummary(property);
                        sb.Append(xmlSummary);
                        string value = RemoveAttributes(RemoveExpressionBody(property)).ToString();
                        sb.AppendLine(value);
                        sb.AppendLine();
                        TypeSyntax type = property.Type;
                        dependencies.Add(type.ToString());
                    }

                    foreach (ConversionOperatorDeclarationSyntax @operator in implicitOperators)
                    {
                        string xmlSummary = GetXmlSummary(@operator);
                        sb.Append(xmlSummary);
                        string value = (@operator.ToString().Replace(@operator.Body?.ToString() ?? Guid.NewGuid().ToString(), "").Trim()).Trim();
                        sb.AppendLine(value);
                        sb.AppendLine();
                        dependencies.AddRange(@operator.ParameterList.Parameters.Select(x => x.Type?.ToString() ?? "unknown").ToList());
                    }

                    sb.AppendLine("}");
                    var parent = GetParentFromNesting(node.Parent);
                    CSharpKind parentKind = GetParentType(node.Parent);
                    dependencies = RemoveDuplicateAndTrivialDependencies(dependencies);
                    result.Add(new CSharpChunk(kind, ns, parent, parentKind, name, GetXmlSummary(node), sb.ToString(), dependencies, node));
                }
            }

            return result;
        }

        private static PropertyDeclarationSyntax RemoveExpressionBody(PropertyDeclarationSyntax property)
        {
            if (property.ExpressionBody != null)
            {
                property = property.WithExpressionBody(null)
                    .WithSemicolonToken(SyntaxFactory.Token(SyntaxKind.None))
                    .WithAccessorList(SyntaxFactory.AccessorList(
                        SyntaxFactory.List([
                            SyntaxFactory.AccessorDeclaration(SyntaxKind.GetAccessorDeclaration)
                                .WithSemicolonToken(SyntaxFactory.Token(SyntaxKind.SemicolonToken))
                        ])));
            }

            return property;
        }

        private static PropertyDeclarationSyntax RemoveAttributes(PropertyDeclarationSyntax property)
        {
            return property.WithAttributeLists(SyntaxFactory.List<AttributeListSyntax>());
        }

        private static EnumDeclarationSyntax RemoveAttributes(EnumDeclarationSyntax enumDecl)
        {
            var enumTrivia = enumDecl.GetLeadingTrivia();

            enumDecl = enumDecl
                .WithAttributeLists([])
                .WithLeadingTrivia(enumTrivia);

            var newMembers = SyntaxFactory.SeparatedList(
                enumDecl.Members.Select(m =>
                {
                    var memberTrivia = m.GetLeadingTrivia();
                    return m.WithAttributeLists([])
                        .WithLeadingTrivia(memberTrivia);
                })
            );

            return enumDecl.WithMembers(newMembers);
        }

        private static string GetXmlSummary(SyntaxNode node)
        {
            DocumentationCommentTriviaSyntax? trivia = node.GetLeadingTrivia().Select(t => t.GetStructure()).OfType<DocumentationCommentTriviaSyntax>().FirstOrDefault();
            if (trivia == null)
            {
                return string.Empty;
            }

            string xmlSummary = trivia.ToString();
            while (xmlSummary.Contains(" /"))
            {
                xmlSummary = xmlSummary.Replace(" /", "/");
            }

            return "///" + xmlSummary;
        }

        private static bool IsPublic(SyntaxTokenList modifiers)
        {
            return modifiers.Any(m => m.IsKind(SyntaxKind.PublicKeyword));
        }

        private static bool IsConstant(SyntaxTokenList modifiers)
        {
            return modifiers.Any(m => m.IsKind(SyntaxKind.ConstKeyword));
        }

        private static bool IsStatic(SyntaxTokenList modifiers)
        {
            return modifiers.Any(m => m.IsKind(SyntaxKind.StaticKeyword));
        }

        private static PropertyDeclarationSyntax[] GetPublicProperties(SyntaxList<MemberDeclarationSyntax> members)
        {
            return members.OfType<PropertyDeclarationSyntax>().Where(x => IsPublic(x.Modifiers)).ToArray();
        }

        private static FieldDeclarationSyntax[] GetPublicConstants(SyntaxList<MemberDeclarationSyntax> members)
        {
            return members.OfType<FieldDeclarationSyntax>().Where(x => IsPublic(x.Modifiers) && IsConstant(x.Modifiers)).ToArray();
        }

        private static ConstructorDeclarationSyntax[] GetPublicConstructors(SyntaxList<MemberDeclarationSyntax> members)
        {
            return members.OfType<ConstructorDeclarationSyntax>().Where(x => IsPublic(x.Modifiers)).ToArray();
        }

        private static MethodDeclarationSyntax[] GetPublicMethods(SyntaxList<MemberDeclarationSyntax> members)
        {
            return members.OfType<MethodDeclarationSyntax>().Where(x => IsPublic(x.Modifiers)).ToArray();
        }

        private static string GetNamespace(SyntaxNode node)
        {
            SyntaxNode? current = node;
            while (current != null)
            {
                if (current is NamespaceDeclarationSyntax namespaceDeclaration)
                    return namespaceDeclaration.Name.ToString();
                if (current is FileScopedNamespaceDeclarationSyntax fileScopedNamespace)
                    return fileScopedNamespace.Name.ToString();

                current = current.Parent;
            }

            return string.Empty;
        }

        private static List<string> GetMethodDependencies(MethodDeclarationSyntax method)
        {
            List<string> result = [];
            result.AddRange(method.ParameterList.Parameters.Select(p => p.Type?.ToString() ?? "unknown"));
            result = RemoveDuplicateAndTrivialDependencies(result);
            return result;
        }

        private static List<string> RemoveDuplicateAndTrivialDependencies(List<string> dependencies)
        {
            dependencies = dependencies.Distinct().ToList();
            // List of basic C# types to remove, including common collection types and date/time types
            HashSet<string> trivialTypes = new(StringComparer.OrdinalIgnoreCase)
            {
                "Stream", "Exception", "CancellationToken", "string", "int", "long", "short", "byte", "bool", "char", "float", "double", "decimal",
                "uint", "ulong", "ushort", "sbyte", "object", "dynamic", "void",
                "string[]", "int[]", "long[]", "short[]", "byte[]", "bool[]", "char[]", "float[]", "double[]", "decimal[]",
                "uint[]", "ulong[]", "ushort[]", "sbyte[]", "object[]", "dynamic[]",
                "List<string>", "List<int>", "List<long>", "List<short>", "List<byte>", "List<bool>", "List<char>", "List<float>", "List<double>", "List<decimal>",
                "List<uint>", "List<ulong>", "List<ushort>", "List<sbyte>", "List<object>", "List<dynamic>",
                "IEnumerable<string>", "IEnumerable<int>", "IEnumerable<long>", "IEnumerable<short>", "IEnumerable<byte>", "IEnumerable<bool>", "IEnumerable<char>", "IEnumerable<float>", "IEnumerable<double>", "IEnumerable<decimal>",
                "IEnumerable<uint>", "IEnumerable<ulong>", "IEnumerable<ushort>", "IEnumerable<sbyte>", "IEnumerable<object>", "IEnumerable<dynamic>",
                "IList<string>", "IList<int>", "IList<long>", "IList<short>", "IList<byte>", "IList<bool>", "IList<char>", "IList<float>", "IList<double>", "IList<decimal>",
                "IList<uint>", "IList<ulong>", "IList<ushort>", "IList<sbyte>", "IList<object>", "IList<dynamic>",
                "ICollection<string>", "ICollection<int>", "ICollection<long>", "ICollection<short>", "ICollection<byte>", "ICollection<bool>", "ICollection<char>", "ICollection<float>", "ICollection<double>", "ICollection<decimal>",
                "ICollection<uint>", "ICollection<ulong>", "ICollection<ushort>", "ICollection<sbyte>", "ICollection<object>", "ICollection<dynamic>",
                // Date and time types
                "DateTime", "DateOnly", "TimeOnly", "DateTimeOffset",
                "DateTime?", "DateOnly?", "TimeOnly?", "DateTimeOffset?",
                "DateTime[]", "DateOnly[]", "TimeOnly[]", "DateTimeOffset[]",
                "List<DateTime>", "List<DateOnly>", "List<TimeOnly>", "List<DateTimeOffset>",
                "IEnumerable<DateTime>", "IEnumerable<DateOnly>", "IEnumerable<TimeOnly>", "IEnumerable<DateTimeOffset>",
                "IList<DateTime>", "IList<DateOnly>", "IList<TimeOnly>", "IList<DateTimeOffset>",
                "ICollection<DateTime>", "ICollection<DateOnly>", "ICollection<TimeOnly>", "ICollection<DateTimeOffset>"
            };

            // Remove nullable, array, and generic collection forms as well
            return dependencies
                .Where(dep =>
                {
                    var typeName = dep.Trim();
                    // Remove nullable marker
                    if (typeName.EndsWith("?"))
                        typeName = typeName.TrimEnd('?');
                    // Remove array brackets
                    typeName = typeName.TrimEnd('[', ']');
                    // Remove whitespace in generics
                    typeName = typeName.Replace(" ", "");
                    return !trivialTypes.Contains(typeName);
                })
                .ToList();
        }


        private string GetParentFromNesting(SyntaxNode? parent)
        {
            return parent switch
            {
                ClassDeclarationSyntax @class => @class.Identifier.Text,
                RecordDeclarationSyntax record => record.Identifier.Text,
                StructDeclarationSyntax @struct => @struct.Identifier.Text,
                InterfaceDeclarationSyntax @interface => @interface.Identifier.Text,
                _ => string.Empty
            };
        }

        private CSharpKind GetParentType(SyntaxNode? parent)
        {
            return parent switch
            {
                ClassDeclarationSyntax => CSharpKind.Class,
                RecordDeclarationSyntax => CSharpKind.Record,
                StructDeclarationSyntax => CSharpKind.Struct,
                InterfaceDeclarationSyntax => CSharpKind.Interface,
                _ => CSharpKind.None
            };
        }

        private static ConversionOperatorDeclarationSyntax[] GetPublicImplicitOperators(SyntaxList<MemberDeclarationSyntax> members)
        {
            return members.OfType<ConversionOperatorDeclarationSyntax>().Where(x => IsPublic(x.Modifiers)).ToArray();
        }
    }
}