# ArenaPro Vite CLI 命令一览

> 本文只讲「命令做什么、常用怎么写」，方便你查表使用。

## `apc dev [target]`

开发构建（development），以 **watch 模式** 持续编译：

```bash
apc dev           # 同时编译 client + server（默认）
apc dev client    # 只编译 client
apc dev server    # 只编译 server
```

参数说明：

- **target**：`all | client | server`，默认 `all`

适合场景：

- 日常编码和调试；
- 希望保存后几乎秒级看到效果。

## `apc build [target]`

正式构建（production），用于 **发布前的严格构建**：

```bash
apc build         # 同时构建 client + server（默认）
apc build client  # 只构建 client
apc build server  # 只构建 server
```

参数说明：

- **target**：`all | client | server`，默认 `all`

适合场景：

- 提交版本 / 上线前，做一次完整构建 + 检查；
- CI / 自动化流水线中的构建步骤。

## `apc debug [target]`

调试构建（debug），通常带有更多调试信息，方便本地排错：

```bash
apc debug         # 同时构建 client + server（默认）
apc debug client  # 只构建 client
apc debug server  # 只构建 server
```

参数说明：

- **target**：`all | client | server`，默认 `all`

适合场景：

- 需要结合 VSCode 等调试器做断点调试时使用。

## `apc res [mode]`

从神岛地图内同步资源（共享资源）：

```bash
apc res              # 使用 .env 同步全部资源
apc res dev          # 使用 .env.dev 同步
apc res prod         # 使用 .env.prod 同步

apc res -s assets    # 仅同步静态资源
apc res -s ui        # 仅同步 UI 资源
apc res -s api       # 仅同步 API 定义
```

参数说明：

- **mode**：可选，用于选择 `.env` 文件前缀，例如 `dev` 对应 `.env.dev`
- **-s, --scope**：`all | api | assets | ui`，默认 `all`

在 scope 为 `assets | ui | all` 时，会检查以下环境变量是否齐全：

- `VITE_DAO3_MAP_ID`
- `VITE_DAO3_UA`
- `VITE_DAO3_AUTH`

缺少时会提示先执行 `apc login` 完成授权。

## `apc create <name>`

创建 ArenaPro Vite 基础工程：

```bash
apc create my-project
apc create my-project -p pnpm
```

参数说明：

- **name**：必填，新工程目录名
- **-p**：包管理器，`npm | pnpm | yarn | bun`，默认 `npm`

命令会串行完成：

- 初始化脚手架工程（内部调用 `npx create-arena-vite-project <name>`）；
- 安装依赖；
- 在新工程目录中执行一次 `apc build` 验证构建是否正常。

## `apc login [mode]`

从神岛授权账户信息，写入对应 `.env` 文件：

```bash
apc login        # 写入 .env
apc login dev    # 写入 .env.dev
apc login prod   # 写入 .env.prod
```

参数说明：

- **mode**：可选，指定要写入的 env 文件后缀

效果：

- 自动写入 `VITE_DAO3_AUTH`、`VITE_DAO3_UA` 等账号相关信息。

## `apc info [mode]`

查看当前工程的 ArenaPro 配置与环境状态：

```bash
apc info       # 使用 .env
apc info dev   # 使用 .env.dev
apc info prod  # 使用 .env.prod
```

功能包括：

- 显示当前工作目录；
- 读取对应 env 文件并列出当前值，例如：
  - `VITE_DAO3_MAP_ID`
  - `VITE_DAO3_UA`
  - `VITE_DAO3_AUTH`
  - `VITE_UI_INDEX_PREFIX`

## `apc tsc [target]`

编译 TypeScript 并输出构建结果（JS + d.ts）：

```bash
apc tsc          # 同时编译 client + server（默认）
apc tsc client   # 只编译 client（使用 client/tsconfig.json）
apc tsc server   # 只编译 server（使用 server/tsconfig.json）
```

参数说明：

- **target**：`all | client | server`，默认 `all`

适合场景：

- 需要产出 NPM 包用的 `dist/` 目录；
- 或单独验证 TS 编译是否通过。

## `apc tsc-check [target]`

仅进行 TypeScript 类型检查（**不输出编译结果**）：

```bash
apc tsc-check          # 同时检查 client + server（默认）
apc tsc-check client   # 只检查 client
apc tsc-check server   # 只检查 server
```

参数说明：

- **target**：`all | client | server`，默认 `all`

适合场景：

- 作为 CI 中的“快速类型检查步骤”；
- 在不需要产物、只关心类型是否有问题时使用。

## 在 CI 中使用 `apc` 命令

如果你希望在 GitHub Actions / Gitee Go 等 CI 里自动跑 `apc tsc-check` / `apc build`，
可以参考单独的指南：

- **[在 CI 中使用 `apc` 命令](/zh/vite/guide/ci-apc-actions)**

该文包含：

- 只做「类型检查 + 构建、不上传」的最小 CI 示例；
- 如何在 CI 中安全地注入 Token / UA / 地图 ID；
- 如何迁移到其他 CI 平台的思路。

## 命令与 `.env` 依赖一览表

下面是常用命令与关键环境变量的对应关系，方便排查报错时快速对照：

| 命令                     | 主要读取的环境变量                                                           | 说明                                                   |
| ------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| `apc dev [target]`       | `VITE_CURRENT_FILE`、`VITE_UPDATE_FILE`                                      | 控制当前 bundle 以及是否在构建后自动上传               |
| `apc build [target]`     | `VITE_CURRENT_FILE`、`VITE_UPDATE_FILE`                                      | 正式构建；`VITE_UPDATE_FILE=true` 时会尝试上传         |
| `apc debug [target]`     | `VITE_CURRENT_FILE`                                                          | 调试构建；与自动上传无关                               |
| `apc res [mode]`         | `VITE_DAO3_AUTH`、`VITE_DAO3_UA`、`VITE_DAO3_MAP_ID`                         | 同步地图资源 / API 类型定义                            |
| `apc login [mode]`       | （无前置依赖）                                                               | 浏览器中登录后，写入 `VITE_DAO3_AUTH` / `VITE_DAO3_UA` |
| `apc info [mode]`        | `VITE_DAO3_AUTH`、`VITE_DAO3_UA`、`VITE_DAO3_MAP_ID`、`VITE_UI_INDEX_PREFIX` | 仅读取当前配置并展示，不会修改                         |
| `apc tsc [target]`       | （通常仅依赖 TypeScript 配置，与 `.env` 关系较弱）                           | 产出 JS + d.ts，主要用于 NPM 包或离线构建              |
| `apc tsc-check [target]` | （同上）                                                                     | 只做类型检查，不产出文件                               |

一般排查思路：

- 命令报「缺少 Token / UA / MapId」：先 `apc login`，再检查 `.env` 中 `VITE_DAO3_*` 是否填写；
- `dev` / `build` 找不到入口：检查 `VITE_CURRENT_FILE` 是否等于 `dao3.config.ts → bundles` 的某个 key；
- 构建完成却没有自动上传：检查 `VITE_UPDATE_FILE` 是否为 `true`，以及账号 / 地图配置是否完整。
