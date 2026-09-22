# 欢迎来到 APC

> APC 用于连接 BOX Creator，管理本地 TypeScript 工程、永久地图 ID、资源索引、脚本和预览运行。

## 为什么选择？

- **开箱即用**：内置脚手架模板与默认配置，安装 CLI 后即可创建并运行第一个 ArenaPro 项目。
- **支持 TypeScript**：CLI 默认生成 TS 项目，内置类型声明和配置；如需简单试验，也可以改用 JavaScript 开发。
- **开发更顺畅**：构建几乎毫秒级反馈，把 TypeScript / ESLint 严格检查留在构建阶段。
- **工作流更专业**：支持在 CI 中统一构建检查，多入口 bundle 轻松管理。
- **Profile 与地图配置更清晰**：使用 Creator Profile、CLI Token 和永久地图 ID 完成连接、绑定与资源同步。
- **工程结构可控、易于扩展**：`dao3.config.ts`、`.env` 与分组命令都可纳入团队规范。
- **不被单一 IDE 绑定**：CLI 只依赖 Node 和终端，任何编辑器都能完整开发，不再依赖特定插件。

## 快速安装

在开始之前，请确认你的电脑已安装 [**Node.js 22 或更高版本**](https://nodejs.org/)，并已由服主授予 Creator 访问权限和 CLI Token。

在终端中执行以下命令，全局安装 ArenaPro CLI：

::: code-group

```sh [npm]
npm install -g @box3lab/arenapro-cli
```

```sh [pnpm]
pnpm install -g @box3lab/arenapro-cli
```

```sh [yarn]
yarn global add @box3lab/arenapro-cli
```

```sh [bun]
bun add -g @box3lab/arenapro-cli
```

:::

安装完成后，可以通过运行下面的命令验证是否安装成功：

```bash
apc -v
```

如需更新脚手架版本，请执行：

::: code-group

```sh [npm]
npm update -g @box3lab/arenapro-cli
```

```sh [pnpm]
pnpm update -g @box3lab/arenapro-cli
```

```sh [yarn]
yarn global upgrade @box3lab/arenapro-cli
```

```sh [bun]
bun add -g @box3lab/arenapro-cli@latest
```

:::

如果是团队协作开发，建议所有开发者都在自己的电脑上全局安装一次 CLI。
