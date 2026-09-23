# 🎉 神岛产品手册文档 创作者共建

🌟 **携手共创，打造完美产品指南！** 🌟

> 文档合集：[Arena 编辑器用户手册](https://docs.dao3.fun/arena/)，[Arena 编辑器 API 手册](https://docs.dao3.fun/api/)，[Voxa 编辑器用户手册](https://docs.dao3.fun/voxa/)，[ArenaPro 插件用户手册](https://docs.dao3.fun/arenapro/)，[本地引擎使用手册](https://docs.dao3.fun/local-engine/)

### 🚀 为什么我们需要这份文档？

官方因资源问题无法顾及到方方面面，难免会有疏漏与更新不及时之处。为了让每一位创作者都能获得最新、最详尽的产品指导，我们决定打破界限，**开放文档共建**！

想象一下，一个由无数热心创作者共同编织的知识宝库，每一份经验、每一次发现都被精心记录，这份力量将无可估量！

### 🌈 我们提供了什么？

- **一站式帮助中心**：汇集了`voxa`、`arena`、`arenaApi`、`arenaPro`等产品的详尽帮助文档。
- **全民参与的平台**：无论你是技术大牛还是新手，只要你有心，这里就有你的舞台。
- **持续更新的保证**：通过社区的力量，确保文档内容永远与时俱进，永不过时。

### 📝 如何参与编辑？

**第一步：Fork 仓库**  
只需简单几步，点击仓库页面右上角的“Fork”按钮，这份文档就归你本地所有啦！

**第二步：修改与优化**  
利用你的专业知识或个人体验，对文档进行补充、修正或优化。每一个字、每一句话，都可能成为他人解决问题的关键。

**第三步：提交 PR（Pull Request）**  
完成修改后，通过 Gitee 提交 PR，一旦通过文档审核，你的贡献将被永久收录，你也将荣登我们的贡献者名单！

### 🏆 成为贡献者的荣耀

每一次贡献，不仅是对文档的完善，更是对自己能力的认可与提升。你的名字将与这份文档同在，成为无数创作者、创作者信赖与感激的源泉。

### 🎉 欢迎加入我们！

无论你是产品爱好者、技术极客，还是渴望分享知识的灵魂，这里都有你的一席之地。让我们携手，将这份文档打造成为行业内最闪耀的知识灯塔！

### 🛠️ 如何运行项目

项目使用 [VitePress](https://vitepress.dev/) 构建，确保你的环境满足以下要求：

- Node.js 版本 >= 18
- npm 或 yarn 包管理器

**安装依赖**

```bash
npm install
# 或
yarn
```

**本地开发**

你可以选择运行不同产品的文档：

- Arena 编辑器文档：

  ```bash
  npm run arena:dev
  # 或 yarn arena:dev
  ```

- Voxa 编辑器文档：

  ```bash
  npm run voxa:dev
  # 或 yarn voxa:dev
  ```

- API 文档：

  ```bash
  npm run api:dev
  # 或 yarn api:dev
  ```

- ArenaPro 插件文档：
  ```bash
  npm run arenapro:dev
  # 或 yarn arenapro:dev
  ```

- 本地引擎使用手册：
  ```bash
  npm run local-engine:dev
  # 或 yarn local-engine:dev
  ```

**构建生产版本**

构建对应的生产版本：

- Arena 文档：`npm run arena:build`
- Voxa 文档：`npm run voxa:build`
- API 文档：`npm run api:build`
- ArenaPro 文档：`npm run arenapro:build`
- 本地引擎使用手册：`npm run local-engine:build`

构建后的文件将生成在对应目录的 `.vitepress/dist` 目录下。

---

**神岛产品手册文档，期待你的每一份精彩！**
