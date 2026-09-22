# APC 命令一览

当前 APC 使用分组命令。运行 `apc <分组> <命令> --help` 可以查看当前安装版本支持的选项。

## 命令总览

```text
apc project create|bind|info
apc map list|resource
apc profile add|list|test|remove
apc script get|upload
apc storage list|get|set|delete
apc runtime status|start|restart|stop|logs
apc scene capture
apc package list
apc docs
```

除项目创建外，自动化场景建议加 `--json`，并只解析标准输出中的 JSON 结果。

## 使用约定

- `<...>` 表示必填参数，实际执行时用真实值替换；`[...]` 表示可选参数。
- 大部分访问 Creator 的命令需要有效 Profile、CLI Token 与相应权限。工程命令默认从当前目录的 `.env` 读取 `VITE_BOX_CREATOR_PROFILE` 和 `VITE_BOX_CREATOR_PROJECT_ID`。
- `--profile <name>` 临时选择 Creator Profile；`--project <id>` 临时选择永久地图 ID。它们不会改写 `.env`。
- `--env [mode]` 读取或写入 `.env.<mode>`；不传时使用 `.env`。例如 `--env staging` 对应 `.env.staging`。
- 需要脚本化调用时在命令后增加 `--json`。正常输出面向人阅读；JSON 输出面向程序解析。
- 删除数据、停止预览和覆盖脚本会改变 Creator 状态。先用读取命令确认目标，再执行写操作。

## Profile：连接 Creator 服务

```bash
apc profile add local --endpoint 127.0.0.1:3127 --token "$BOX_CREATOR_TOKEN"
apc profile list
apc profile test local --json
apc profile remove local
```

- `add <name>`：新增或更新一台 Creator 服务。局域网地址可省略协议；公网地址必须使用 `https://`。
- `list`：列出已保存的 Profile。
- `test [profile]`：检查连接，并记录 Creator 的服务实例身份。
- `remove <name>`：删除 Profile 和保存在本机的 CLI Token。

CLI Token 可通过 `--token` 或 `BOX_CREATOR_TOKEN` 提供。不要把 Token 写入工程 `.env` 或提交到 Git。

### `apc profile add <name>`

新增或更新一个 Creator Profile。必须传入 `--endpoint`；`--token` 可传入 CLI Token，也可先设置 `BOX_CREATOR_TOKEN`。

```bash
apc profile add local --endpoint 127.0.0.1:3127 --token "$BOX_CREATOR_TOKEN"
apc profile add production --endpoint https://creator.example --token "$BOX_CREATOR_TOKEN"
```

| 参数 | 说明 | 效果 |
| --- | --- | --- |
| `<name>` | Profile 名称，例如 `local`、`staging` | 用于工程 `.env` 和 `--profile` 选择服务器。 |
| `--endpoint <url>` | Creator 服务地址 | 保存到 APC 本机 Profile。局域网地址可省略协议；公网地址使用 `https://`。 |
| `--token <token>` | CLI Token | 保存到该 Profile 的本机私密凭据，不写入工程目录。 |

同名 Profile 会更新地址；传入 Token 时会同时更新本机凭据。

### `apc profile list`

列出当前电脑保存的所有 Profile、地址和默认标记。不会连接服务器，也不会显示 Token 内容。

```bash
apc profile list
apc profile list --json
```

### `apc profile test [profile]`

检查指定 Profile 的 Creator 服务是否可访问，并记录服务器实例身份。

```bash
apc profile test local
apc profile test production --json
```

省略 `profile` 时，CLI 按当前工程 `.env` 选择 Profile。输出会说明连接是否成功及 Token 是否已配置，但不会验证每一项业务权限。

### `apc profile remove <name>`

删除本机保存的 Profile 与它对应的本机 CLI Token：

```bash
apc profile remove staging
```

不会删除 Creator 服务器、地图或工程 `.env`。重新使用该名称时需要再次 `profile add`。

## 工程与地图

```bash
apc project create my-map
cd my-map
apc map list --profile local --keyword "测试"
apc project bind <permanentMapId> --profile local
apc project info --json
```

- `project create <name>`：创建 Creator Vite 工程。
- `map list`：查看所选 Creator 服务中的地图，可用 `--keyword` 按地图名、描述或永久地图 ID 过滤。
- `project bind <permanentMapId>`：绑定地图，并默认验证该 ID 是否属于所选 Creator 服务。
- `project info`：查看工程 `.env`、Profile、Token 是否已配置以及 Creator 健康状态。

`project bind` 会写入：

```env
VITE_BOX_CREATOR_PROFILE=local
VITE_BOX_CREATOR_PROJECT_ID=<permanentMapId>
```

仅在已确认地图 ID 且 Creator 暂时不可访问时使用 `--skip-verify`。`--profile` 和 `--project` 可以临时覆盖工程配置，不会修改 `.env`。

### `apc project create <name>`

创建一个新的 BOX Creator Vite 工程。该命令会复制脚手架模板并生成工程 `package.json`，不会创建远程地图或自动申请权限。

```bash
apc project create my-map
cd my-map
npm install
```

创建后继续执行 `profile add`、`project bind` 和 `map resource`，再开始开发。

### `apc project bind <permanentMapId>`

把 Creator 永久地图 ID 写入工程环境文件，并在默认情况下实时验证该地图属于所选 Profile。

```bash
apc project bind map-abc123 --profile local
apc project bind map-staging --profile staging --env staging
apc project bind map-known-id --profile local --skip-verify
```

| 参数或选项 | 说明 | 效果 |
| --- | --- | --- |
| `<permanentMapId>` | Creator 分配的永久地图 ID | 不能用地图名称、临时 hash 或展示 ID 代替。 |
| `--profile <name>` | 指定 Profile | 写入对应的 `VITE_BOX_CREATOR_PROFILE`。 |
| `--env [mode]` | 指定环境文件 | 将 Profile 和 ID 写入 `.env` 或 `.env.<mode>`。 |
| `--skip-verify` | 跳过服务器验证 | 仅用于 Creator 暂时不可用且 ID 已确认的场景。 |

成功后会写入 `VITE_BOX_CREATOR_PROFILE` 和 `VITE_BOX_CREATOR_PROJECT_ID`，不会写入 endpoint 或 Token。

### `apc project info`

检查当前工程绑定状态、Profile、CLI Token 是否配置、Creator 健康状态和 Node.js 版本：

```bash
apc project info
apc project info --env production
apc project info --profile staging --json
```

它只读取工程配置并检查连通性，不上传脚本、不启动预览。发布前建议先执行一次。

### `apc map list`

读取一个 Creator Profile 下可访问的地图列表。可以按地图名称、描述或永久地图 ID 过滤：

```bash
apc map list --profile local
apc map list --profile local --keyword "测试"
apc map list --env staging --json
```

结果包含地图名称、永久地图 ID、状态、地图角色和更新时间。该命令不会写本地缓存，也不会修改工程绑定。

## 资源与类型定义

```bash
apc map resource --type dts
apc map resource --type assets --project <permanentMapId>
apc map resource --type all --ui-prefix HUD
```

`--type dts` 同步 TypeScript 类型定义；`--type assets` 同步模型、图片、音频和 UI 索引；`--type all` 依次执行两者。资源索引由 Creator 生成，不要手动修改生成文件。

### `apc map resource`

将资源索引或 TypeScript DTS 同步到当前工程：

```bash
# 只同步公开 DTS，不需要 Profile 或 Token
apc map resource --type dts

# 使用工程绑定同步地图资源索引
apc map resource --type assets

# 同步 DTS 和资源索引
apc map resource --type all

# 临时同步另一张地图，并只索引 HUD 开头的 UI 节点
apc map resource --type assets --profile staging --project map-staging --ui-prefix HUD
```

| 选项 | 说明 | 效果 |
| --- | --- | --- |
| `--type assets` | 默认类型 | 从 Creator 拉取模型、图片、音频和 UI 索引。需要资源读取权限。 |
| `--type dts` | DTS 类型定义 | 从公开源同步客户端与服务端 DTS，不需要 Profile 或 Token。 |
| `--type all` | 完整同步 | 先同步 DTS，再同步地图资源索引。 |
| `--ui-prefix <prefix>` | UI 节点前缀 | 只影响生成的 UI 索引，不会删除或修改 Creator 中的 UI。 |
| `--profile` / `--project` / `--env` | 临时目标或环境文件 | 覆盖本次读取的工程配置，不写回 `.env`。 |

资源和 UI 在 Creator 中变化后，重新执行该命令。生成文件是派生输出，手动编辑会在下次同步时被覆盖。

## 脚本

```bash
apc script get --json
apc script get bootstrap.js --side server --out ./bootstrap.js
apc script upload <permanentMapId> server bootstrap.js --file ./dist/server/bootstrap.server.js
```

`script get` 不带入口时列出共享脚本；读取指定脚本时必须提供 `--side server|client`。`script upload` 上传或覆盖一个脚本，内容最大 20 MiB。

日常 Vite 工程使用 `npm run dev` 或 `npm run build` 构建。仅当 `VITE_UPDATE_FILE=true` 时，构建完成后会按工程配置上传脚本。

### `apc script get [entry]`

读取当前地图的共享脚本；不传入口时列出脚本清单：

```bash
# 列出当前地图所有共享脚本
apc script get

# 输出服务端脚本内容到终端
apc script get bootstrap.js --side server

# 保存客户端脚本到本地文件
apc script get hud.js --side client --out ./backup/hud.js
```

| 参数或选项 | 说明 |
| --- | --- |
| `[entry]` | 可选脚本文件名；省略时只列出脚本清单。 |
| `--side server\|client` | 读取具体脚本时必填，用于区分同名客户端与服务端脚本。 |
| `--out <path>` | 将脚本内容保存到本地文件；省略时写入标准输出。 |
| `--profile` / `--project` | 临时指定 Profile 或永久地图 ID。 |

该命令为只读操作，不会改动远程脚本。

### `apc script upload <projectId> <side> <entry>`

上传或覆盖一份 JavaScript 脚本。它直接修改 Creator 地图中的目标脚本，适合紧急修复或自动化；日常 TypeScript 开发优先使用 `npm run dev` 或 `npm run build`。

```bash
apc script upload map-abc123 server bootstrap.js \
  --file ./dist/server/bootstrap.server.js

apc script upload map-abc123 client hud.js \
  --file ./dist/client/hud.client.js \
  --profile production --token "$BOX_CREATOR_TOKEN"
```

| 参数或选项 | 说明 |
| --- | --- |
| `<projectId>` | 必填永久地图 ID。 |
| `<side>` | 必须为 `server` 或 `client`。 |
| `<entry>` | 远程脚本文件名。存在时会被覆盖。 |
| `--file <path>` | 必填，本地 UTF-8 JavaScript 文件。 |
| `--profile <name>` | 指定 Creator Profile。 |
| `--token <token>` | 仅本次上传使用的 Token，优先级最高。 |

成功时会返回脚本 side、entry 和 revision。上传前确认地图 ID、side 和文件路径；覆盖操作不会自动保留旧版本。

## 数据空间

```bash
apc storage list player --page 0 --limit 50
apc storage get player user_123
apc storage set player user_123 --value '{"coins":100}'
apc storage set player user_123 --file ./user_123.json
apc storage delete player user_123 --yes
apc storage list leaderboard --scope group
```

默认访问地图的项目数据空间；使用 `--scope group` 访问同地图组共享的数据空间。`delete` 必须带 `--yes`，写入值必须是标准 JSON。

### 数据空间通用选项

`storage` 的四个子命令都支持以下选项：

| 选项 | 说明 |
| --- | --- |
| `--scope project\|group` | 数据范围；`project` 为当前地图独立数据，`group` 为同地图组共享数据。默认 `project`。 |
| `--profile <name>` | 临时指定 Creator Profile。 |
| `--project <id>` | 临时指定永久地图 ID。 |

`<space>` 是数据空间名称，`<key>` 是记录键。所有写入值都必须是合法 JSON。

### `apc storage list <space>`

分页读取一个数据空间中的记录：

```bash
apc storage list player
apc storage list player --page 0 --limit 100
apc storage list leaderboard --scope group --json
```

`--page` 从 `0` 开始，默认 `0`；`--limit` 取值为 `1` 到 `100`，默认 `50`。输出包含键、截断后的值摘要、更新时间和版本号，不会修改数据。

### `apc storage get <space> <key>`

读取一条记录：

```bash
apc storage get player user_123
apc storage get config season-1 --scope group --json
```

未找到键时会明确返回空结果，不会创建空记录。

### `apc storage set <space> <key>`

新增或覆盖一条 JSON 记录。必须且只能选择 `--value` 或 `--file` 之一：

```bash
apc storage set player user_123 --value '{"coins":100,"items":["sword"]}'
apc storage set config season-1 --file ./configs/season-1.json --scope group
```

| 选项 | 说明 |
| --- | --- |
| `--value <json>` | 直接传入 JSON 字面量；shell 引号必须完整保留。 |
| `--file <path>` | 读取本地 JSON 文件。 |

该命令会覆盖相同空间和键的已有值。建议先用 `storage get` 备份重要记录。

### `apc storage delete <space> <key>`

删除一条记录：

```bash
apc storage delete player user_123 --yes
apc storage delete config season-1 --scope group --yes
```

必须显式添加 `--yes` 才会执行。删除不可通过 CLI 自动撤销；找不到目标键时会返回“无需删除”，不会报成删除成功。

## 预览运行与日志

```bash
apc runtime status
apc runtime start
apc runtime restart
apc runtime stop
apc runtime logs --follow --side server --level error
```

这些命令控制 Creator 编辑器中同一地图的预览运行，不会打开浏览器、发布游玩地图或新建游玩容器。`runtime logs` 订阅实时 SSE 控制台；`--follow` 会在短暂断线后重连。

### `apc runtime status`

查看当前地图在 Creator 编辑器中的 Preview Run 状态：

```bash
apc runtime status
apc runtime status --profile staging --project map-staging --json
```

只读取运行状态，不启动、停止或重启地图。

### `apc runtime start`

启动当前 Creator 编辑器已经打开地图的 Preview Run：

```bash
apc runtime start
```

不会上传脚本、创建容器或发布游玩端。需要运行控制权限。

### `apc runtime stop`

停止当前地图的 Preview Run：

```bash
apc runtime stop
```

这会结束当前预览运行；地图配置、脚本和游玩端容器不受影响。

### `apc runtime restart`

按顺序停止再启动 Preview Run：

```bash
apc runtime restart
```

适合在脚本已上传后重新加载运行状态。若停止或启动任一步失败，命令会返回错误。

### `apc runtime logs`

订阅 Preview Run 控制台日志：

```bash
# 一次读取连接期间的日志
apc runtime logs

# 持续重连并跟随全部日志
apc runtime logs --follow

# 只查看服务端错误，且显示完整堆栈
apc runtime logs --follow --side server --level error --verbose

# 查找包含 spawn 的原始日志行
apc runtime logs --follow --grep spawn --raw
```

| 选项 | 说明 |
| --- | --- |
| `--follow` | 日志流断线后每秒尝试重连。 |
| `--side client\|server` | 只显示某一侧日志。 |
| `--level error\|warn\|info\|debug` | 按日志级别过滤。 |
| `--grep <text>` | 只显示包含文本的日志。 |
| `--verbose` | 显示完整异常调用栈。 |
| `--raw` | 保留逐行原始输出，而不是按时间分组显示。 |

CLI 会尝试用本地 `dist/` 中的 sourcemap 将部分异常堆栈映射回 TypeScript；开发调试时保留匹配的构建输出可得到更好的定位结果。

## 场景截图与扩展包

```bash
apc scene capture --out ./artifacts/player-view.png
apc scene capture --view 3d --out ./artifacts/world.png
apc package list
apc docs
```

`scene capture` 需要目标地图已在 Creator 编辑器中打开，并要求 `--out` 保存 PNG。`package list` 只查询可用 npm 扩展包，不会安装任何依赖。`apc docs` 输出 CLI 随包提供的完整 Markdown 说明。

### `apc scene capture`

截取 Creator 编辑器当前地图的画面并保存为本地 PNG。该命令只读，不会启动预览、不连接游戏引擎，也不会改动地图数据。

```bash
# 截取完整玩家画面
apc scene capture --out ./artifacts/player-view.png

# 只截取 3D 或 2D 视图
apc scene capture --view 3d --out ./artifacts/world.png
apc scene capture --view 2d --out ./artifacts/ui.png

# 临时指定目标地图和 Profile
apc scene capture --profile staging --project map-staging --out ./artifacts/staging.png
```

| 选项 | 说明 |
| --- | --- |
| `--out <path>` | 必填，本地 PNG 输出路径；父目录不存在时会自动创建。 |
| `--view 3d\|2d` | 可选；省略时截取完整玩家画面。 |
| `--profile` / `--project` | 临时指定 Creator Profile 与永久地图 ID。 |

Creator 编辑器必须已打开目标地图，并且当前 Token 具备读取场景的权限。

### `apc package list`

查询 npm 上 `@dao3fun` 组织下的可用扩展包：

```bash
apc package list
apc package list --json
```

结果按发布时间倒序列出包名、版本、说明、发布者和日期。此命令只查询 npm registry，不会安装、升级或修改工程依赖。安装包请使用包管理器：

```bash
npm install <包名>
npm install <包名> -D
npm uninstall <包名>
```

网络不可访问 npm registry 时，命令会返回网络错误。

### `apc docs`

输出当前安装版本随包发布的完整 APC Markdown 文档：

```bash
# 输出完整文档到终端
apc docs

# 只输出随包文档入口文件路径
apc docs --file

# 以 JSON 输出文档路径和内容，适合自动化读取
apc docs --json
```

`--file` 不读取文档内容，只返回入口路径和参考文件路径。该命令只读取本机已安装的 APC 文件，不会连接 Creator 或修改工程。

## 常见流程

### 新建并接入一张地图

```bash
apc profile add local --endpoint 127.0.0.1:3127 --token "$BOX_CREATOR_TOKEN"
apc profile test local
apc project create my-map
cd my-map
apc map list --profile local
apc project bind <permanentMapId> --profile local
apc map resource --type all
npm install
npm run dev
```

### 发布前检查

```bash
npm run build
apc project info --json
apc runtime status --json
```

确认 Profile、永久地图 ID、Creator 连通性、脚本上传开关和预览运行状态均符合预期后，再进行测试或发布。

### 自动化调用

```bash
apc map list --profile production --json
apc project info --json
apc storage list player --page 0 --limit 100 --json
```

自动化应只解析 JSON 标准输出，保留非零退出码作为失败信号。Token 通过 CI Secret 注入 `BOX_CREATOR_TOKEN` 或在任务中执行 `apc profile add` 配置，绝不能写入工程 `.env`。
