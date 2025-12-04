# 在脚手架项目中使用神岛社区 NPM 包

> 本文介绍如何在 ArenaPro Vite 脚手架项目中，**使用神岛社区提供的 NPM 包**，例如 `@dao3fun/*` 系列。

## 1. 神岛社区包是什么？

ArenaPro 及社区会在 npm 上发布一批官方 / 社区维护的包，例如：

- `@dao3fun/*`：与神岛玩法、组件、工具函数相关的包
- 部分实验性或内部共用的库

在本地项目中使用这些包，可以：

- **复用官方最佳实践**，减少重复造轮子；
- 使用**统一维护的类型定义**和工具函数；
- 和 ArenaPro 生态保持一致的目录与运行时约定。

## 2. 用 `apc npmlist` 浏览可用包

在脚手架项目根目录执行：

```bash
apc npmlist
```

该命令会：

- 搜索 npm registry 中 `@dao3fun` 组织下的所有包；
- 按**发布时间倒序**展示：包名、版本、简介、发布时间、发布者；
- 在支持 OSC 8 的终端中，包名可以**点击跳转**到对应 npm 页面。

> 建议：
>
> - 开发前先跑一次 `apc npmlist`，了解当前生态里有哪些现成轮子；
> - 选用官方 / 社区推荐的包，而不是自己手写一套重复逻辑。

## 3. 用 `apc install` 安装社区包

在当前工程中，推荐通过 CLI 来安装神岛相关依赖，而不是手写 `npm install @dao3fun/xxx`，这样可以少记一些前缀和参数。

### 3.1 基本安装

```bash
apc install react
```

等价于在当前项目中执行：

```bash
npm install @dao3fun/react
```

说明：

- `apc install <pkg>` 会自动补全为 `@dao3fun/<pkg>`；
- 默认安装到 `dependencies`。

### 3.2 安装到 devDependencies

```bash
apc install eslint-config -D
```

说明：

- `-D` / `--dev`：安装到 `devDependencies`；
- 适用于只在构建 / 开发期使用的包（如 ESLint 配置、构建工具等）。

### 3.3 指定包管理器

如果你在项目中使用了 pnpm / yarn / bun，也可以通过 `-p` 显式指定：

```bash
apc install react -p pnpm
apc install react -p yarn
apc install react -p bun
```

CLI 会：

- 根据 `-p` 选择对应的包管理器；
- 打印实际执行的安装命令和最终安装的完整包名。

## 4. 用 `apc uninstall` 卸载社区包

不再需要某个包时，可以用 CLI 保持一致的体验：

```bash
apc uninstall react
apc uninstall react -p pnpm
```

说明：

- 同样会自动补全为 `@dao3fun/react`；
- 同样支持通过 `-p` 指定包管理器；
- 卸载过程会打印使用的包管理器和卸载的完整包名。
