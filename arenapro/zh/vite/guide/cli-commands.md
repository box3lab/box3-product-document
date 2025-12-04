# ArenaPro Vite CLI 命令一览

> 本文只讲「命令做什么、常用怎么写」，方便你查表使用。

## 命令一览

## 项目构建与调试

### `apc dev [target]`

别名：`apc d`

开发构建（development），以 watch 模式持续编译：

```bash
apc dev           # 同时编译 client + server（默认）
apc dev client    # 只编译 client
apc dev server    # 只编译 server
```

参数说明：

- **target**：`all | client | server`，默认 `all`

## 地图相关命令

### `apc list`

查看当前账号的扩展地图（UGC）列表（最近 30 条）：

```bash
apc list               # 使用 .env 作为本地凭据
apc list --env dev     # 使用 .env.dev 作为本地凭据
apc list --env prod    # 使用 .env.prod 作为本地凭据
```

功能包括：

- **从神岛接口拉取当前账号下的扩展地图列表**（最近预览过的前 30 条）
- **名称支持在支持 OSC 8 的终端中点击**，直接打开对应编辑链接 `https://dao3.fun/edit/<Hash>`
- 显示每张地图的：名称、ID、发布时间 / 更新时间、是否已发布、是否有协作者等信息
- **自动将结果缓存到本地全局配置**，方便后续使用 `apc set` 写入 env

> 注意：需要先通过 `apc login` 完成登录授权，`apc list` 会优先读取当前工程 `.env[.mode]` 中的 `VITE_DAO3_AUTH` / `VITE_DAO3_UA`，若本地未配置，则回退到全局配置中的登录信息。

### `apc set [mapid]`

将指定地图信息写入当前工程的 env 文件：

```bash
apc set 100005475             # 将100005475相关地图信息写入 .env
apc set 100005475 --env dev   # 将100005475相关地图信息写入 .env.dev
```

参数说明：

- **mapid**：地图 ID，来自 `apc list` 输出中的 `[ID: xxx]`
- **--env [mode]**：可选，指定写入的 env 文件后缀：
  - 不带参数：写入 `.env`
  - 带普通后缀：写入 `.env.<mode>`，例如 `-env dev` -> `.env.dev`

行为说明：

- 从全局地图缓存中查找对应 ID 的地图：
  - 全局缓存由 `apc list` 调用接口后写入缓存
  - 未找到或缓存为空时，会提示先执行 `apc list` 刷新缓存
- 找到地图后，会在指定的 env 文件中写入 / 更新以下变量：
  - `VITE_DAO3_MAP_ID`
  - `VITE_DAO3_PLAY_HASH`
  - `VITE_DAO3_EDIT_HASH`
  - `VITE_DAO3_MAP_NAME`（地图名称，作为元数据参考）

写入完成后，可以通过 `apc resource` 使用这些配置从神岛地图中同步资源。

### `apc preview [mode]`

别名：`apc p`

在浏览器中预览当前工程绑定的地图（基于 env 中的 Hash）：

```bash
apc preview                # 打开当前地图的创作页（使用 VITE_DAO3_EDIT_HASH）
apc preview play           # 打开当前地图的游玩页（使用 VITE_DAO3_PLAY_HASH）
apc preview --env dev      # 使用 .env.dev 中的 Hash 打开创作页
apc preview play --env dev # 使用 .env.dev 中的 Hash 打开游玩页
```

说明：

- `apc preview` 会从指定的 `.env[.mode]` 中读取：
  - `VITE_DAO3_MAP_ID`
  - `VITE_DAO3_MAP_NAME`
  - `VITE_DAO3_PLAY_HASH`
  - `VITE_DAO3_EDIT_HASH`
- 不带 `mode` 参数时默认打开创作链接：`https://dao3.fun/edit/<Hash>`
- 带任意 `mode` 参数（如 `play`）时打开游玩链接：`https://dao3.fun/play/<Hash>`
- 如果 env 中缺少上述配置，会提示先执行 `apc set <地图ID>` 绑定一张地图

## NPM 包管理命令

### `apc npmlist`

别名：`apc nl`

查看神岛组织下的 npm 包列表（当前为 `@dao3fun`）：

```bash
apc npmlist
```

功能包括：

- 从 npm registry 搜索 `@dao3fun` 组织下的所有包
- 按发布时间倒序排序，展示：包名、版本、简介、发布时间、发布者
- 包名支持在支持 OSC 8 的终端中点击，跳转至对应 npm 包页面

### `apc install [pkg]`

别名：`apc in`

在当前工程中安装神岛组织下的 npm 包：

```bash
apc install react             # 实际安装 @dao3fun/react 到 dependencies
apc install react -D          # 安装到 devDependencies
apc install react -p pnpm     # 使用 pnpm 安装
apc install @dao3fun/react    # 也支持显式带作用域
```

参数说明：

- **pkg**：包名；如果不带作用域，会自动补全为 `@dao3fun/<pkg>`
- **-D, --dev**：是否安装到 devDependencies
- **-p**：包管理器，`npm | pnpm | yarn | bun`，默认 `npm`

安装过程会打印：

- 使用的包管理器
- 实际安装的完整包名
- 安装到 dependencies 还是 devDependencies

### `apc uninstall [pkg]`

别名：`apc un`

在当前工程中卸载神岛组织下的 npm 包：

```bash
apc uninstall react          # 卸载 @dao3fun/react
apc uninstall react -p pnpm  # 使用 pnpm 卸载
```

参数说明：

- **pkg**：包名；如果不带作用域，会自动补全为 `@dao3fun/<pkg>`
- **-p**：包管理器，`npm | pnpm | yarn | bun`，默认 `npm`

卸载过程会打印：

- 使用的包管理器
- 实际卸载的完整包名

## 项目构建与调试（脚手架）

### `apc build [target]`

别名：`apc b`

正式构建（production）：

```bash
apc build         # 同时构建 client + server（默认）
apc build client  # 只构建 client
apc build server  # 只构建 server
```

参数说明：

- **target**：`all | client | server`，默认 `all`

### `apc debug [target]`

调试构建（debug），通常用于带更多调试信息的构建：

```bash
apc debug         # 同时构建 client + server（默认）
apc debug client  # 只构建 client
apc debug server  # 只构建 server
```

参数说明：

- **target**：`all | client | server`，默认 `all`

### `apc resource`

别名：`apc r`

从神岛地图内同步资源（共享资源）：

```bash
apc resource               # 使用 .env 同步全部资源
apc resource --env dev     # 使用 .env.dev 同步
apc resource --env prod    # 使用 .env.prod 同步
apc resource -s assets     # 仅同步静态资源
apc resource -s ui         # 仅同步 UI 资源
apc resource -s api        # 仅同步 API 定义
```

参数说明：

- **--env [mode]**：可选，用于选择 `.env` 文件后缀，例如 `dev` 对应 `.env.dev`
- **-s, --scope**：`all | api | assets | ui`，默认 `all`

在 scope 为 `assets | ui | all` 时，会检查以下环境变量是否齐全：

- `VITE_DAO3_MAP_ID`
- `VITE_DAO3_AUTH`（局部）
- `VITE_DAO3_UA`（局部）

缺少时会提示先执行 `apc login` 完成授权。登录信息（Token / User-Agent）会按如下优先级读取：

- 首选当前工程的 `.env[.mode]` 中的 `VITE_DAO3_AUTH`、`VITE_DAO3_UA`
- 若本地未配置，则回退使用全局配置中的 Token / User-Agent

### `apc create <name>`

别名：`apc c`

创建 ArenaPro Vite 基础工程：

```bash
apc create my-project
apc create my-project -p pnpm
```

参数说明：

- **name**：必填，新工程目录名
- **-p**：包管理器，`npm | pnpm | yarn | bun`，默认 `npm`

命令会串行完成：

- 初始化脚手架工程（`npx create-arena-vite-project <name>`）
- 安装依赖
- 在新工程目录中执行一次 `apc build` 以验证构建是否正常

## 登录与环境

### `apc login`

别名：`apc l`

从神岛授权账户信息，可写入全局配置或当前工程 `.env`：

```bash
apc login              # 写入全局配置（推荐，一次登录，全局复用）
apc login --env        # 仅写入当前工程的 .env（不写全局）
apc login --env dev    # 仅写入当前工程的 .env.dev（不写全局）
```

参数说明：

- **--env [mode]**：可选，改为只写入当前工程的 env 文件，不写入全局配置：
  - 不带参数：写入 `.env`
  - 带普通后缀：写入 `.env.<mode>`，例如 `-env dev` -> `.env.dev`

### `apc info`

别名：`apc i`

查看神岛登录状态（本地 + 全局）、当前工程的地图配置与运行环境：

功能包括：

- 显示当前工作目录
- 显示神岛登录配置，并注明实际使用优先级：本地 env > 全局配置：
  - 全局 Token / User-Agent 是否已配置
  - 本地 `.env` / `.env.<mode>` 中的 Token / User-Agent 是否已配置（默认 `.env`，可通过 `--env dev` / `--env prod` 指定）
- 显示当前地图配置（从指定的 `.env[.mode]` 中读取）：
  - `VITE_DAO3_MAP_ID`
  - `VITE_DAO3_MAP_NAME`（地图名称）
  - `VITE_DAO3_PLAY_HASH`（游玩 Hash）
  - `VITE_DAO3_EDIT_HASH`（创作 Hash）
- 显示运行时环境信息：
  - Node.js 版本
  - npm 版本（如果命令可用）
  - git 版本（如果命令可用）
- 显示 Git 仓库状态：
  - 当前分支（如果是 git 仓库）
  - 远程仓库地址 `remote.origin.url`（如果有配置）

## TypeScript 工具

### `apc tsc [target]`

别名：`apc t`

编译 TypeScript 并输出：

```bash
apc tsc          # 同时编译 client + server（默认）
apc tsc client   # 只编译 client（使用 client/tsconfig.json）
apc tsc server   # 只编译 server（使用 server/tsconfig.json）
```

参数说明：

- **target**：`all | client | server`，默认 `all`

### `apc tsc-check [target]`

别名：`apc tc`

仅进行 TypeScript 类型检查（不输出编译结果）：

```bash
apc tsc-check          # 同时检查 client + server（默认）
apc tsc-check client   # 只检查 client
apc tsc-check server   # 只检查 server
```

参数说明：

- **target**：`all | client | server`，默认 `all`
