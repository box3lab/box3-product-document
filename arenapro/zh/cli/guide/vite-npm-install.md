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

## 3. 用 `npm install` 安装社区包

### 3.1 基本安装

```bash
npm install @dao3fun/react
```

说明：

- 默认安装到 `dependencies`。

## 4. 用 `npm uninstall` 卸载社区包

```bash
npm uninstall @dao3fun/react
```
