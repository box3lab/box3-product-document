# ArenaPro Vite 脚手架快速创建

> 本文只讲「怎么跑起来」，不讲 Vite 原理。

## 前置条件

- 已安装 Node.js（推荐使用 LTS 版本）。

## 1. 创建 ArenaPro Vite 脚手架项目

如果你还没有项目，可以先用官方脚手架命令在一个**干净目录**下创建：

```bash
npx create-arena-vite-project my-app
```

- `my-app` 可以替换成你自己的项目名；
- 脚手架会自动拉取模板并初始化基础配置。

执行完成后，进入新项目目录：

```bash
cd my-app
```

## 2. 安装依赖

在项目根目录执行（命令以团队约定为准）：

```bash
npm install
# 或 pnpm install / yarn install
```

安装完成后，项目的依赖会被下载到 `node_modules/`。

## 3. 启动开发服务器

```bash
npm run dev
```

启动成功后，你可以：

- 修改 `server/src/` 或 `client/src/` 目录下的脚本；
- 保存文件后，会自动局部热更新并同步至云端 Arena 编辑器；
- 几乎可以「一边写代码一边看效果」。

## 4. 构建生产包

当你想把当前版本上传到 Arena 或用于正式发布时，执行：

```bash
npm run build
```

此步骤会启动 TypeScript 类型检查和 ESLint 检查并进行构建；如果检查或构建过程中发现错误，将输出错误信息并终止构建。
构建完成后：

- 产物会被输出到脚手架配置好的目录（例如 `dist/`）；
- 构建结果自动同步到 Arena 编辑器 。

## 5. 脚手架内置命令一览

这一套脚手架已经在 `package.json` 里帮你预置了常用命令，大致分为：

- **必须掌握的日常命令**
- **可选 / 进阶命令（按需使用或扩展）**

### 5.1 必须掌握的命令

- **`npm run dev`**  
  并行启动开发环境（等价于同时跑 `dev:*`），包含 server / client 的开发构建和监听。

- **`npm run build`**  
  并行执行所有构建任务（等价于同时跑 `build:*`）：
  - 在构建过程中会执行 **TypeScript 类型检查** 和 **ESLint 检查**；
  - 如发现错误会输出错误信息并终止构建；
  - 构建成功后，产物输出到预设目录，并同步到 Arena 编辑器。

> 一般开发流程只需要记住：`npm run dev` 做日常开发，`npm run build` 做发布前检查和构建。

### 5.2 可选 / 进阶命令（按需使用）

这些命令更细粒度地控制「只构建 server / client」或「仅做检查」，可以根据团队需要扩展或替换。

- **开发相关**

  - `npm run dev:server`：仅以 **server** 为目标启动开发构建（持续 watch）。
  - `npm run dev:client`：仅以 **client** 为目标启动开发构建（持续 watch）。

- **构建相关**

  - `npm run build:server`：只构建 server 侧脚本，产物用于部署到 Arena 的服务端环境。
  - `npm run build:client`：只构建 client 侧脚本，产物用于部署到 Arena 的客户端环境。

- **资源同步相关**

  - `npm run sync:resources`：
    - 会同步当前地图内的各类资源（图片、UI、商品、音频、模型等）；
    - 同时更新最新的游戏 API 类型声明（d.ts）；
    - 除了游戏 API 声明外，其它资源同步前需要先完成登录，并在配置中填写目标地图的 ID，才能成功获取。

- **调试模式（debug 构建）**

  - `npm run debug:server`：以 `debug` 模式构建 server，会保留源码映射，停止部署到 Arena。
  - `npm run debug:client`：以 `debug` 模式构建 client，会保留源码映射，停止部署到 Arena。

- **类型检查 / 工程化工具**

  - `npm run tsc:server`：仅对 `server` 侧代码执行 TypeScript 编译检查（不打包）。
  - `npm run tsc:client`：仅对 `client` 侧代码执行 TypeScript 编译检查（不打包）。
  - `npm run eslint:fix`：运行 ESLint 并尝试自动修复可以修复的问题。
  - `npm run prettier:write`：使用 Prettier 对整个项目进行代码格式化。
