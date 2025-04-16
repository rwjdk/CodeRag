using CodeRag.Shared.Interfaces;
using JetBrains.Annotations;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace CodeRag.Shared.Chunking.CSharp
{
    [UsedImplicitly]
    public class CSharpChunker_FullSplit : IScopedService
    {
        public List<CSharpChunk> GetCodeEntities(string code) //todo allow the passing of settings
        {
            SyntaxTree tree = CSharpSyntaxTree.ParseText(code);
            SyntaxNode root = tree.GetRoot();

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
                if (!IsPublic(node.Modifiers)) //todo - support non-public content
                {
                    continue;
                }

                string ns = GetNamespace(node);
                string xmlSummary = GetXmlSummary(node);
                string name = node.Identifier.ValueText;
                string parent = string.Empty;
                result.Add(new CSharpChunk(CSharpKind.Interface, ns, parent, CSharpKind.None, name, xmlSummary, node.ToString(), []));
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
                if (!IsPublic(node.Modifiers)) //todo - support non-public content
                {
                    continue;
                }

                string ns = GetNamespace(node);
                string xmlSummary = GetXmlSummary(node);
                string name = node.Identifier.ValueText;
                string parent = string.Empty;
                result.Add(new CSharpChunk(CSharpKind.Delegate, ns, parent, CSharpKind.None, name, xmlSummary, node.ToString(), []));
            }

            return result;
        }

        private List<CSharpChunk> ProcessEnums(SyntaxNode root)
        {
            List<CSharpChunk> result = [];
            EnumDeclarationSyntax[] nodes = root.DescendantNodes().OfType<EnumDeclarationSyntax>().ToArray();
            foreach (EnumDeclarationSyntax node in nodes)
            {
                if (!IsPublic(node.Modifiers)) //todo - support non-public content
                {
                    continue;
                }

                string ns = GetNamespace(node);
                string xmlSummary = GetXmlSummary(node);
                string name = node.Identifier.ValueText;
                string parent = string.Empty;
                result.Add(new CSharpChunk(CSharpKind.Enum, ns, parent, CSharpKind.None, name, xmlSummary, RemoveAttributes(node).ToString(), []));
            }

            return result;
        }

        private List<CSharpChunk> ProcessTypeDeclaration<T>(SyntaxNode root, CSharpKind parentKind) where T : TypeDeclarationSyntax
        {
            List<CSharpChunk> result = [];
            T[] nodes = root.DescendantNodes()
                .OfType<T>()
                .ToArray();
            foreach (T node in nodes)
            {
                if (!IsPublic(node.Modifiers))
                {
                    continue;
                }

                /*todo Things yet to support inside Types
                        DestructorDeclarationSyntax – Destructors
                        EventDeclarationSyntax – Events declared with explicit accessors
                        IndexerDeclarationSyntax – Indexers
                        OperatorDeclarationSyntax – Operator overloads
                        ConversionOperatorDeclarationSyntax – Implicit/explicit conversion operators
                        ClassDeclarationSyntax – Nested classes
                        StructDeclarationSyntax – Nested structs
                        InterfaceDeclarationSyntax – Nested interfaces
                        RecordDeclarationSyntax – Nested records
                    */

                PropertyDeclarationSyntax[] properties = GetPublicProperties(node.Members);
                MethodDeclarationSyntax[] methods = GetPublicMethods(node.Members);
                FieldDeclarationSyntax[] constants = GetPublicConstants(node.Members);
                ConstructorDeclarationSyntax[] constructors = GetPublicConstructors(node.Members);

                string ns = GetNamespace(node);
                var nodeXmlSummary = GetXmlSummary(node);
                var parentNodeName = node.Identifier.Text;
                //Store the Type
                switch (parentKind)
                {
                    case CSharpKind.Class:
                        result.Add(new CSharpChunk(parentKind, ns, null, null, parentNodeName, nodeXmlSummary, "public class { /*...*/ }", []));
                        break;
                    case CSharpKind.Struct:
                        result.Add(new CSharpChunk(parentKind, ns, null, null, parentNodeName, nodeXmlSummary, "public struct { /*...*/ }", []));
                        break;
                    case CSharpKind.Record:
                        result.Add(new CSharpChunk(parentKind, ns, null, null, parentNodeName, nodeXmlSummary, "public record { /*...*/ }", []));
                        break;
                }

                foreach (MethodDeclarationSyntax method in methods)
                {
                    string name = method.Identifier.ValueText;
                    string xmlSummary = GetXmlSummary(method);
                    string content = (method.ToString().Replace(method.Body?.ToString() ?? Guid.NewGuid().ToString(), "").Trim() + " { /*...*/ }").Trim();
                    List<string> dependencies = GetMethodDependencies(method);
                    dependencies = dependencies.Distinct().ToList();

                    result.Add(new CSharpChunk(CSharpKind.Method, ns, parentNodeName, parentKind, name, xmlSummary, content, dependencies));
                }

                foreach (ConstructorDeclarationSyntax constructor in constructors)
                {
                    var xmlSummary = GetXmlSummary(constructor);
                    ConstructorDeclarationSyntax constructorWithoutBody = constructor.WithBody(null);
                    var content = constructorWithoutBody + " { /*...*/ }";
                    var dependencies = constructor.ParameterList.Parameters.Select(x => x.Type?.ToString() ?? "unknown").ToList();
                    result.Add(new CSharpChunk(CSharpKind.Constructor, ns, parentNodeName, parentKind, parentNodeName, xmlSummary, content, dependencies));
                }

                foreach (FieldDeclarationSyntax constant in constants)
                {
                    var xmlSummary = GetXmlSummary(constant);
                    var content = constant.ToString();
                    TypeSyntax type = constant.Declaration.Type;
                    result.Add(new CSharpChunk(CSharpKind.Constant, ns, parentNodeName, parentKind, parentNodeName, xmlSummary, content, [type.ToString()]));
                }

                foreach (PropertyDeclarationSyntax property in properties)
                {
                    string xmlSummary = GetXmlSummary(property);
                    string content = RemoveAttributes(RemoveExpressionBody(property)).ToString(); //Todo - Make this configurable (remove attributes or not)
                    TypeSyntax type = property.Type;
                    result.Add(new CSharpChunk(CSharpKind.Property, ns, parentNodeName, parentKind, parentNodeName, xmlSummary, content, [type.ToString()]));
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
                .WithAttributeLists(new SyntaxList<AttributeListSyntax>())
                .WithLeadingTrivia(enumTrivia);

            var newMembers = SyntaxFactory.SeparatedList(
                enumDecl.Members.Select(m =>
                {
                    var memberTrivia = m.GetLeadingTrivia();
                    return m.WithAttributeLists(new SyntaxList<AttributeListSyntax>())
                        .WithLeadingTrivia(memberTrivia);
                })
            );

            return enumDecl.WithMembers(newMembers);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="node"></param>
        /// <returns></returns>
        private static string GetXmlSummary(SyntaxNode node)
        {
            //#if DEBUG
            //            return string.Empty; //todo- remove again after test
            //#endif

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
            //Todo - Support primary constructors
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
            List<string> result = new List<string>();
            result.AddRange(method.ParameterList.Parameters.Select(p => p.Type?.ToString() ?? "unknown"));
            return result;
        }
    }
}