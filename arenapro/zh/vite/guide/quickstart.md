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

如果是团队协作开发，建议所有开发者都在自己的电脑上全局安装一次 CLI。

```bash
npm install -g @box3lab/arenapro-cli
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
npm update -g @box3lab/arenapro-cli
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
# 目标构建模块名，对应 dao3.config.ts → bundles 的 key
VITE_CURRENT_FILE=

# 是否在构建后自动上传脚本：true | false
VITE_UPDATE_FILE=true

# UI 节点过滤前缀（可选），留空表示全部
VITE_UI_INDEX_PREFIX=

# 目标地图ID，必须为「扩展地图」
VITE_DAO3_MAP_ID=
```

### 4.1 快速获取授权信息

在项目根目录执行：

```bash
apc login
```

CLI 会打开一个本地授权页面。

### 4.2 链接一张扩展地图

登录完成后，需要先把当前工程和某一张「扩展地图」绑定起来，后续同步资源 / 上传脚本都会指向这张地图。

1. 在终端中列出当前账号下的扩展地图列表并写入本地：

   ```bash
   apc list
   ```

   记下你要开发的那一张地图的 ID（例如 `100005475`）。

2. 使用 `apc set` 将缓存地图信息写入当前项目的 `.env`：

   ```bash
   apc set 100005475
   ```

   这一步会在 `.env` 中写入 / 更新：

   - `VITE_DAO3_MAP_ID`
   - `VITE_DAO3_PLAY_HASH`
   - `VITE_DAO3_EDIT_HASH`
   - `VITE_DAO3_MAP_NAME`

完成以上两步后，这个项目就和一张具体的扩展地图建立了关联。

## 5. 同步神岛资源到本地

登录并链接好地图后，在项目根目录执行：

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
