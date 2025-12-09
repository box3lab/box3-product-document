# ArenaPro Vite CLI 命令一览

> 本文只讲「命令做什么、常用怎么写」，方便你查表使用。

## 地图相关命令

### `apc list`

查看当前账号的扩展地图（UGC）列表（最近 30 条）：

```bash
apc list                      # 使用 .env 作为本地凭据
apc list --env dev            # 使用 .env.dev 作为本地凭据
apc list --env prod           # 使用 .env.prod 作为本地凭据
apc list --keyword 迷宫       # 仅显示名称中包含“迷宫”的地图
apc list --audit-status 1     # 只看审核通过的作品
apc list --content-status 1   # 只看已发布的作品
apc list --ownership 0        # 只看自己创建的作品
apc list --order-by 2         # 按发布时间排序
apc list --order-by 3 --order-desc false  # 按创建时间正序
```

**功能：**

- **从神岛接口拉取当前账号下的扩展地图列表**（最近预览过的前 30 条）
- **名称支持在支持 OSC 8 的终端中点击**，直接打开对应编辑链接 `https://dao3.fun/edit/<Hash>`
- 显示每张地图的：名称、ID、发布时间 / 更新时间、是否已发布、是否有协作者等信息
- **自动将结果缓存到本地全局配置**，方便后续使用 `apc set` 写入 env

> 注意：需要先通过 `apc login` 完成登录授权，`apc list` 会优先读取当前工程 `.env[.mode]` 中的 `VITE_DAO3_AUTH` / `VITE_DAO3_UA`，若本地未配置，则回退到全局配置中的登录信息。

**参数：**

- `-e, --env [mode]`：可选，指定使用的 env 文件后缀：
  - 不带参数：使用 `.env`
  - 带普通后缀：使用 `.env.<mode>`，例如 `--env dev` -> `.env.dev`
- `-k, --keyword [kw]`：按地图名称关键字过滤列表，例如 `--keyword 迷宫`
- `--audit-status [status]`：审核状态过滤，`0` pending、`1` approved、`2` denied
- `--content-status [status]`：作品发布状态过滤，`0` notPublish、`1` published
- `--order-by [field]`：排序字段，`1` updatedAt（更新时间）、`2` publishedAt（发布时间）、`3` createdAt（创建时间），默认 `1`
- `--order-desc [flag]`：是否倒序，`true | false`，默认 `true`
- `--ownership [owner]`：创作者身份过滤，`0` owner、`1` collaborator

### `apc set [keyword]`

根据关键字搜索一张地图，并将其信息写入当前工程的 env 文件：

```bash
apc set 100005475                # 按地图 ID 写入 .env
apc set 100005475 --env dev      # 按地图 ID 写入 .env.dev
apc set 超时空                # 按标题 / 名称关键字搜索
apc set 9181e2f0fe4c31f7fc     # 按 playHash / editHash 搜索
apc set 455          # 按作者 ID 搜索
apc set 沙漠                     # 可命中子图名称，最终仍写入主地图
```

**参数：**

- `keyword`：用于搜索的关键字，可以是：
  - 地图 ID（主图 ID 或子图 ID）
  - `playHash` / `editHash`（主图或子图）
  - 地图标题 / 名称
  - 地图简介 `describe`
  - 作者 ID
- `-e, --env [mode]`：目标 env 文件：
  - 不带参数：`.env`
  - 例如 `--env dev` → `.env.dev`

**行为：**

- 从本地全局地图缓存（由 `apc list` 写入）中搜索匹配的地图：
  - 先按 **主图 ID / 子图 ID** 精确匹配；
  - 再按 **主图 / 子图的 playHash / editHash** 精确匹配；
  - 若仍未命中，则在 **主图 + 所有子图** 的多个字段上做模糊搜索：
    - 主图：`id / mapId / contentId / playHash / editHash / name / title / describe / authorId`
    - 子图：`id / playHash / editHash / name / authorId`
- 若模糊搜索只命中 **一条主图**，则直接使用该主图；
- 若模糊搜索命中 **多条主图**，会列出候选清单并提示你缩小关键字范围，此时不会写入 env；
- 如果命中来源是 **subMaps（子地图）**，最终仍以其所属的 **主地图** 作为写入目标：
  - `VITE_DAO3_MAP_ID` 始终为主地图 ID；
  - `VITE_DAO3_PLAY_HASH` / `VITE_DAO3_EDIT_HASH` / `VITE_DAO3_MAP_NAME` 也都来自主地图。
- 最终在指定 env 中写入 / 更新：
  - `VITE_DAO3_MAP_ID`（主地图 ID）
  - `VITE_DAO3_PLAY_HASH`（主地图游玩 Hash）
  - `VITE_DAO3_EDIT_HASH`（主地图创作 Hash）
  - `VITE_DAO3_MAP_NAME`（主地图名称，作为元数据参考）

### `apc preview [mode]`

别名：`apc p`

在浏览器中预览当前工程绑定的地图（基于 env 中的 Hash）：

```bash
apc preview                # 打开当前地图的创作页（使用 VITE_DAO3_EDIT_HASH）
apc preview play           # 打开当前地图的游玩页（使用 VITE_DAO3_PLAY_HASH）
apc preview --env dev      # 使用 .env.dev 中的 Hash 打开创作页
apc preview play --env dev # 使用 .env.dev 中的 Hash 打开游玩页
```

**参数：**

- `mode`：不填为创作页，填任意值（如 `play`）为游玩页。
- `-e, --env [mode]`：选择使用的 env 文件后缀，规则同上。

`apc preview` 会从指定的 `.env[.mode]` 中读取：

- `VITE_DAO3_MAP_ID`
- `VITE_DAO3_MAP_NAME`
- `VITE_DAO3_PLAY_HASH`
- `VITE_DAO3_EDIT_HASH`

并打开对应的 `https://dao3.fun/edit/<Hash>` 或 `https://dao3.fun/play/<Hash>` 链接。

## NPM 包管理命令

### `apc npmlist`

别名：`apc nl`

查看神岛组织下的 npm 包列表（当前为 `@dao3fun` ）：

```bash
apc npmlist
```

**功能：**

- 从 npm registry 搜索 `@dao3fun` 组织下的所有包。
- 按发布时间倒序排序，展示：包名、版本、简介、发布时间、发布者。
- 包名支持在支持 OSC 8 的终端中点击，跳转至对应 npm 包页面。

在当前工程中安装 / 卸载某个包（手动执行 npm 命令）：

```bash
npm install <包名>            # 安装到 dependencies
npm install <包名> -D        # 安装到 devDependencies
npm uninstall <包名>        # 卸载包
```

## 资源同步与脚本上传

### `apc resource`

别名：`apc r`

从神岛地图内同步资源（共享资源）：

```bash
apc resource               # 使用 .env 同步全部资源
apc resource --env dev     # 使用 .env.dev 同步
apc resource --env prod    # 使用 .env.prod 同步
apc resource -s assets     # 仅同步静态资源
apc resource -s api        # 仅同步 API 定义
```

**参数：**

- `-e, --env [mode]`：选择 `.env` 文件后缀，例如 `dev` 对应 `.env.dev`。
- `-s, --scope`：`all | api | assets`，默认 `all`。

在 scope 为 `assets | all` 时，会检查以下环境变量是否齐全：

- `VITE_DAO3_MAP_ID`
- `VITE_DAO3_AUTH`
- `VITE_DAO3_UA`

缺少时会提示先执行 `apc login` 完成授权，或在本地 env 中补全配置。

### `apc upload [target]`

别名：`apc u`

如果你使用的是 Vite 架构，推荐直接搭配 `vite-plugin-arenapro-script` 在构建后自动上传脚本，会比手动执行命令更方便。

将 JS 脚本上传到神岛 Arena 编辑器。会从当前工程的构建输出目录中读取脚本文件并逐个上传：

```bash
apc upload                          # 依次上传 server + client 两端脚本
apc upload server                   # 只上传 server 端脚本（默认 dist/server，也可配合 --dir）
apc upload client                   # 只上传 client 端脚本（默认 dist/client，也可配合 --dir）
apc upload --env dev                # 使用 .env.dev 选择凭据 / 地图配置
apc upload server --dir dist/custom # 从自定义目录上传 server 端脚本
```

**参数：**

- `target`：`server | client`，不填时依次处理 `server + client`。
- `-e, --env [mode]`：选择 env 文件后缀。
- `-d, --dir [dir]`：自定义上传目录（默认根据 target 使用 `dist/server` 或 `dist/client`）。

**行为：**

- 只上传 `.js/.cjs/.mjs` 文件，上传时统一改为 `.js` 后缀。
- 每个目标（server/client）内部按文件顺序串行上传。
- 任何文件上传失败或接口返回非 200，会立刻终止并退出非 0。
- 登录信息和地图 ID 从当前工程 env 和全局配置中读取（优先本地 `VITE_DAO3_AUTH` / `VITE_DAO3_UA` / `VITE_DAO3_MAP_ID`，否则使用全局 `authToken` / `userAgent`）。

## 工程创建

### `apc create <name>`

别名：`apc c`

在当前目录下创建 ArenaPro Vite 基础工程：

```bash
apc create my-project
```

**参数：**

- `name`：必填，新工程目录名。

## 登录与环境

### `apc login`

别名：`apc l`

从神岛授权账户信息，可写入全局配置或当前工程 `.env` ：

```bash
apc login              # 写入全局配置（推荐，一次登录，全局复用）
apc login --env        # 仅写入当前工程的 .env（不写全局）
apc login --env dev    # 仅写入当前工程的 .env.dev（不写全局）
```

**参数：**

- `-e, --env [mode]`：可选，改为只写入当前工程的 env 文件，不写入全局配置：
  - 不带参数：写入 `.env`
  - 带普通后缀：写入 `.env.<mode>`，例如 `--env dev` -> `.env.dev`

### `apc info`

别名：`apc i`

查看神岛登录状态（本地 + 全局）、当前工程的地图配置与运行环境，以及 CLI 运行环境信息：

**功能包括：**

- 显示当前工作目录。
- 显示神岛登录配置，并注明实际使用优先级：本地 env > 全局配置：
  - 全局 Token / User-Agent 是否已配置。
  - 本地 `.env` 中的 Token / User-Agent 是否已配置。
- 显示当前地图配置（从当前工程的 `.env` 中读取）：
  - `VITE_DAO3_MAP_ID`（地图 ID）
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
- 显示全局配置：
  - 全局配置目录
  - `auth.json` / `ugc-maps.json` 是否存在
- 显示当前工程目录下存在的所有 `.env` / `.env.*` 文件（自动过滤 `.env.example` 等模版文件）。
- 显示终端 / Shell 相关环境变量（`SHELL` / `COMSPEC` / `TERM`）。
- 显示当前 `apc` 调用参数（`process.argv`）。
