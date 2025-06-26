import { Project } from "ts-morph";

const project = new Project({ tsConfigFilePath: "C:\\Users\\Simon\\Git\\relewise-sdk-javascript\\packages\\client\\tsconfig.json" });
const result = [];

for (const sourceFile of project.getSourceFiles()) {
  for (const cls of sourceFile.getClasses()) {
    // Get constructor info (if any)
    const constructors = cls.getConstructors();
    const constructorInfo = constructors.length > 0
      ? constructors.map(ctor => ({
          parameters: ctor.getParameters().map(p => ({
            name: p.getName(),
            type: p.getType().getText()
          })),
          docs: ctor.getJsDocs().map(doc => doc.getComment()).filter(Boolean)
        }))
      : [];

    result.push({
      file: sourceFile.getFilePath(),
      className: cls.getName(),
      abstract: cls.isAbstract(), // <-- Add this line
      constructor: constructorInfo,
      methods: cls.getMethods().map(method => ({
        name: method.getName(),
        parameters: method.getParameters().map(p => ({
          name: p.getName(),
          type: p.getType().getText()
        })),
        returnType: method.getReturnType().getText(),
        docs: method.getJsDocs().map(doc => doc.getComment()).filter(Boolean)
      })),
      docs: cls.getJsDocs().map(doc => doc.getComment()).filter(Boolean)
    });
  }
}

console.log(JSON.stringify(result));