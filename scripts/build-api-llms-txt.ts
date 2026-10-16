// modified from https://github.com/honojs/website/blob/main/scripts/build-llm-docs.ts
import fs from "node:fs";
import path from "node:path";
import { glob } from "glob";

const frontmatterRegex = /^\n*---(\n.+)*?\n---\n/;

const apiOutDir = path.resolve(__dirname, "../dist/api");
const docsDir = path.resolve(__dirname, "../api");
const docsUrl = process.argv.includes("--dev")
  ? "http://localhost:4173"
  : "https://docs.box3lab.com";

const sliceExt = (file: string) => {
  return file.split(".").slice(0, -1).join(".");
};

const extractLabel = (file: string) => {
  // hono 原有的这种方式导致所有index.md都叫做index，应该选取第一个大标题最好
  // return sliceExt(file.split('/').pop() || '')
  const fileContent = fs.readFileSync(path.resolve(docsDir, file), "utf-8");
  const match = fileContent.match(/^# (.+)$/m);
  return match ? match[1] : sliceExt(file.split("/").pop() || "");
};

async function generateLLMDocs() {
  const outputListFile = path.resolve(apiOutDir, "llms.txt");

  const optionalFiles = await glob("**/*.md", { cwd: docsDir });

  const optionals: string[] = [];

  for await (const file of optionalFiles) {
    const filePath = file.replaceAll("\\", "/");
    optionals.push(
      `- [${extractLabel(filePath)}](${docsUrl}/api/${sliceExt(filePath)}.md)`
    );
    fs.copyFileSync(path.resolve(docsDir, file), path.resolve(apiOutDir, file));
  }

  fs.writeFileSync(
    outputListFile,
    "\uFEFF" +
      [
        "# 神奇代码岛 API",
        "",
        "> 神奇代码岛是一个多人联机协作游戏引擎（平台），支持TypeScript/JavaScript语法编写游戏。引擎分为server（文档中以S-前缀）和client（文档中以C-前缀）两端，两端的api不通用，请留意。",
        "",
        "## Docs 完整文档如下：",
        "",
        `- [完整文档](${docsUrl}/api/llms-full.txt) 神奇代码岛API完整文档`,
        // TODO: 哪些用于Tiny版文档？
        // '- [Tiny Docs](${docsUrl}/api/llms-small.txt): Tiny documentation of 神奇代码岛. (includes only desciption of core)',
        "",
        "## 各个文档页面的入口",
        "你可以使用Web抓取URL的方式阅读以下文档，它们都是markdown格式的。如果你需要提供html版本的给用户，请将.md后缀改为.html",
        ...optionals,
      ].join("\n"),
    "utf-8"
  );
  console.log(`< Output '${outputListFile}' `);

  const outputFullFile = path.resolve(__dirname, "../dist/api/llms-full.txt");
  const files = await glob("**/*.md", { cwd: docsDir });

  const fullContent = await generateContent(
    files,
    docsDir,
    "<SYSTEM>这是神奇代码岛API的完整文档。</SYSTEM>\n\n"
  );

  fs.writeFileSync(outputFullFile, "\uFEFF" + fullContent, "utf-8");
  console.log(`< Output '${outputFullFile}' `);

  // const outputTinyFile = path.resolve('api/.vitepress/dist/llms-small.txt')

  // const tinyExclude = [];
  // const tinyFiles = await glob('**/*.md', {
  //   cwd: docsDir,
  //   exclude: (filename: string) => tinyExclude.includes(filename),
  // })

  // const tinyContent = await generateContent(
  //   tinyFiles,
  //   docsDir,
  //   '<SYSTEM>This is the tiny developer documentation for 神奇代码岛.</SYSTEM>\n\n'
  // )

  // fs.writeFileSync(outputTinyFile, tinyContent, 'utf-8')
  // console.log(`< Output '${outputTinyFile}' `)
}

async function generateContent(
  files: NodeJS.AsyncIterator<string>,
  docsDir: string,
  header: string
): Promise<string> {
  let content = header + "# 神奇代码岛文档开头\n";

  for await (const file of files) {
    console.log(`> Generating docs for '${file}' `);
    const fileContent = fs.readFileSync(path.resolve(docsDir, file), "utf-8");
    content += fileContent.replace(frontmatterRegex, "") + "\n\n";
  }

  return content;
}

generateLLMDocs().catch(console.error);
