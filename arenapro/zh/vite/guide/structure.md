# Vite 脚手架项目结构总览

> 这一篇帮助你看懂：脚手架里每个目录大致负责什么。

不同版本的脚手架目录可能略有差异，这里用一个典型结构来说明：

```text
vite
├─ pnpm-lock.yaml
├─ tsconfig.base.json
├─ env.d.ts
├─ .prettierignore
├─ dao3.config.json
├─ README.md
├─ .lintstagedrc
├─ package.json
├─ .env
├─ .prettierrc
├─ .env.example
├─ vite.config.ts
├─ eslint.config.mjs
├─ client
│  ├─ tsconfig.json
│  ├─ src
│  │  └─ App.ts
│  └─ types
│     └─ ClientAPI.d.ts
├─ shares
│  └─ App.ts
├─ i18n
│  ├─ index.ts
│  ├─ types
│  │  └─ i18n.d.ts
│  └─ res
│     ├─ en
│     │  └─ translation.json
│     └─ zh-CN
│        └─ translation.json
├─ .vscode
│  ├─ settings.json
│  ├─ extensions.json
│  ├─ launch.json
│  └─ tasks.json
└─ server
   ├─ tsconfig.json
   ├─ src
   │  └─ App.ts
   └─ types
      └─ GameAPI.d.ts

```

## client/：客户端脚本

`client/` 目录下是客户端运行时相关的代码和类型声明：

- `client/src/App.ts`：
  - 客户端入口脚本，通常负责初始化客户端逻辑、注册事件等；
  - 会作为 Vite 构建 client bundle 的入口。
- `client/types/ClientAPI.d.ts`：
  - 客户端可用 API 的类型声明文件；
  - 让编辑器在编写客户端脚本时有完整的智能提示和类型检查。

## server/：服务端脚本

`server/` 与 `client/` 结构对称，用于放置服务端逻辑：

- `server/src/App.ts`：
  - 服务端入口脚本，负责房间管理、战斗结算等服务端逻辑；
  - 会作为 Vite 构建 server bundle 的入口。
- `server/types/GameAPI.d.ts`：
  - 服务端可用 API 的类型声明文件；
  - 为服务端代码提供类型安全和补全支持。

## shares/：客户端与服务端共享代码

`shares/` 用于存放**同时被 client 与 server 引用的模块**，例如：

- 共享的数据结构与协议类型；
- 公共的工具函数、常量；
- 可以在客户端和服务端复用的业务逻辑片段。

推荐在这里尽量保持「无平台依赖」：

- 不直接依赖只存在于 client 或 server 的 API；
- 通过参数注入或接口抽象，把与平台强相关的部分隔离到各自目录中。

## i18n/：多语言与文案资源

`i18n/` 目录用于管理多语言文本和相关类型：

- 国际化入口，负责加载多语言资源并提供查询接口
- i18n 相关的类型声明，让你在使用文案 key 时有类型提示
- 各语言的 JSON 文案文件，例如：
  - `res/en/translation.json`
  - `res/zh-CN/translation.json`

通过这种结构，可以在保持文案与代码分离的同时，获得良好的类型安全和可维护性。

## .vscode/：工程配置（推荐导入）

`.vscode/` 目录中包含了一些推荐的编辑器配置：

- `settings.json`：项目级 VS Code 设置，例如缩进、保存自动格式化等；
- `extensions.json`：推荐安装的插件列表；
- `launch.json`：调试配置；
- `tasks.json`：预定义的任务（如一键运行脚本）。

这些文件不是运行时必须的，但能帮助团队在同一套工程配置下协作开发。

## 根目录配置文件：项目行为的“仪表盘”

在项目根目录下，还有一批与你日常开发高度相关的配置文件：

- `dao3.config.json`：
  - ArenaPro 的核心配置文件；
  - 定义 bundles、client/server 入口、地图 ID / playHash 等信息；
  - 配合 `.env` 一起控制脚本如何被部署到神岛 Arena。
- `vite.config.ts`：Vite 配置入口（见下节）。
- `.env` / `.env.example`：环境变量文件，配置神岛账户、UA、当前 bundle 等信息。
- `package.json`：脚本命令与依赖列表（可配合「快速上手」一文查看）。
- `tsconfig.base.json`：基础 TypeScript 配置，被 client/server 各自的 tsconfig 继承。

理解这些文件的职责，有助于你在需要自定义行为（例如切换 bundle、调整构建方式）时，知道应该改哪里。

## vite.config.ts：Vite 配置入口

在 ArenaPro 脚手架中，你通常会看到一个已经写好的 `vite.config.ts`：

- 集成了与 Arena 运行环境相关的插件；
- 配置了基础路径（`base`）、别名、构建输出目录等；
- 预置了开发 / 生产环境通用的最佳实践。

多数情况下，你只需要在这里做**少量增量配置**，例如：

- 增加额外的别名；
- 注册一个简单的 Vite 插件；
- 调整构建输出目录结构。

## package.json：脚本与依赖

`package.json` 中最重要的信息有三类：

- `scripts`：定义了常用命令，例如 `dev`、`build`、`test` 等；
- `dependencies`：运行时依赖，例如 React、状态管理库等；
- `devDependencies`：开发时依赖，例如 TypeScript、ESLint、Vite 本身等。

你可以把它看作「项目能力清单」，决定了你能在代码里直接使用哪些库。

## tsconfig.json：类型系统与路径别名

`tsconfig.json` 通常会包含：

- TypeScript 的编译目标、模块系统等基础选项；
- 路径别名配置（`paths`），配合 Vite 的别名一起使用；
- 对编辑器智能提示、类型检查有直接影响。

当你在项目中引入新目录或重构目录结构时，
记得同时更新这里的设置，确保类型系统能正确解析到新路径。
