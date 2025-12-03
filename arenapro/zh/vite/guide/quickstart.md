# ArenaPro Vite 新手安装教程

提示：本篇主要介绍 **ArenaPro Vite 脚手架的快速上手流程**，不会从零讲解 Node.js 或前端开发等基础知识。

如果你是 **第一次接触 ArenaPro**，建议先阅读 [依赖插件的脚手架教程](/zh/guide/02-getting-started/01-install)，先了解整体概念，再回来看本篇效果会更好。

## 1. 环境准备

### 1.1 安装 Node.js

- 推荐版本：**Node.js 22+**
- 打开官网下载安装：
  - https://nodejs.org/

安装完成后，终端中执行：

```bash
node -v
npm -v
```

能正常输出版本号即可。

## 2. 安装全局 CLI

首次使用时，需要先全局安装脚手架包：

```bash
npm install -g @box3lab/arenapro-vite-cli
```

安装成功后，终端中检查命令：

```bash
apc -h
```

如果能看到帮助信息，说明 CLI 安装成功。

> 提示：
>
> - Windows：在 CMD / PowerShell / Git Bash 中都可以直接运行 `apc`
> - macOS / Linux：在任意终端（zsh/bash 等）都可以直接运行 `apc`

如需更新脚手架版本，请执行：

```bash
npm update -g @box3lab/arenapro-vite-cli
```

## 3. 创建新项目

在你希望存放项目的目录里执行：

```bash
# 1) 使用脚手架创建项目
apc create my-arena-app
# 或使用
# create-arena-vite-project my-arena-app
```

以上两种方式有如下区别：

使用 `apc create` 时，脚本会自动完成：

1. 生成项目目录 `my-arena-app`
2. 根据你选择的包管理器安装依赖，默认为 npm
3. 测试项目能否正常构建并上传

使用 `create-arena-vite-project` 时，仅会生成项目目录 `my-arena-app`。

### 3.1 进入项目目录

```bash
cd my-arena-app
```

项目结构大致如下：

```text
my-arena-app/
  client/        # 客户端脚本
  server/        # 服务端脚本
  shares/        # client/server 共享代码
  dao3.config.ts # 项目打包配置（bundle 列表等）
  .env           # 环境变量配置（神岛授权、构建参数等）
  package.json
  vite.config.ts
  ...
```

## 4. 配置环境变量（.env）

项目根目录下有一个 `.env` 配置文件：

`.env` 中主要几个变量：

```env
# 神岛用户身份令牌（Authorization）
VITE_DAO3_AUTH=

# 浏览器标识 User-Agent（需和上面的 AUTH 一致）
VITE_DAO3_UA=

# 目标构建模块名，对应 dao3.config.ts → bundles 的 key
VITE_CURRENT_FILE=

# 是否在构建后自动上传脚本：true | false
VITE_UPDATE_FILE=true

# UI 节点过滤前缀（可选），留空表示全部
VITE_UI_INDEX_PREFIX=

# 目标地图ID，必须为「扩展地图」
VITE_DAO3_MAP_ID=
```

### 4.1 快速获取授权信息（推荐）

在项目根目录执行：

```bash
apc login
# 或通过 npm script
# npm run dao3:login
```

CLI 会打开一个本地授权页面，引导你登录神岛并将 `VITE_DAO3_AUTH` / `VITE_DAO3_UA` 写回 `.env`。

### 4.2 手动填写（可选）

如果你想手动填写：

1. 登录：https://code-api-pc.dao3.fun/auth/user
   - 复制返回的 `data.token` → 填到 `VITE_DAO3_AUTH`
2. 访问：https://www.lzltool.com/UserAgent
   - 复制一个浏览器 User-Agent → 填到 `VITE_DAO3_UA`
3. 在神岛后台找到你的**扩展地图 ID** → 填到 `VITE_DAO3_MAP_ID`

## 5. 同步神岛资源到本地

配置好 `.env` 后，在项目根目录执行：

```bash
apc resource
```

同步完成后，你会在 `client/`、`server/`、`types/` 等目录下看到对应的自动生成的地图资源文件。

## 6. 启动开发 / 调试

在项目根目录执行：

### 6.1 启动开发构建（watch 模式）

```bash
# 同时 watch server + client
apc dev

# 仅 server
apc dev server

# 仅 client
apc dev client
```

这会根据 `VITE_BUILD_TARGET` 和 `dao3.config.ts` 自动进行 Vite 打包（watch）。

## 7. 正式构建与上传脚本

### 7.1 正式构建

```bash
# 同时构建 server + client
apc build

# 单侧构建
apc build server
apc build client
```

### 7.2 自动上传脚本

- `.env` 中：

  ```env
  VITE_UPDATE_FILE=true
  ```

- 并配置好 `VITE_DAO3_AUTH`、`VITE_DAO3_UA`、`VITE_DAO3_MAP_ID` 等

构建完成后，`ArenaUpdateScript` 插件会自动将脚本上传到目标地图。

如果你只想构建，不上传：

```env
VITE_UPDATE_FILE=false
```

## 9. 遇到问题怎么办？

遇到以下情况时，可以尝试：

- **`apc` 不是内部或外部命令**

  - 检查是否已将 CLI 安装为全局包。
  - 重开一个终端再试

- **同步资源 / 上传脚本失败**
  - 检查 `.env` 中的 `VITE_DAO3_AUTH`、`VITE_DAO3_UA`、`VITE_DAO3_MAP_ID`
  - 确认目标地图是**扩展地图**
