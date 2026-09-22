# 用 APC 创建第一个 Creator 工程

本页使用当前 APC 命令。需要 Node.js 22 或更高版本。

> 开始前请向服主申请 CLI Token，并确认 Token 已授予所需 Creator 权限。没有有效 Token 时，无法通过 CLI 读取地图、同步资源、上传脚本、操作数据空间或控制预览运行。

## 1. 安装 CLI

```bash
npm install -g @box3lab/arenapro-cli
apc --help
```

也可使用 pnpm、yarn 或 bun 全局安装同一包。

## 2. 添加 Creator Profile

一个 Profile 对应一台 Creator 服务。先向服主获取 Creator 地址与 CLI Token，再将 Token 放进当前终端或 CI Secret：

```bash
export BOX_CREATOR_TOKEN='bxc_...'
apc profile add local --endpoint 127.0.0.1:3127 --token "$BOX_CREATOR_TOKEN"
apc profile test local
```

`profile test` 会检查服务连接并保存服务实例身份。公网 Creator 地址必须以 `https://` 开头；不要添加 `/api/creator/v1` 路径。

## 3. 创建工程并绑定地图

```bash
apc project create my-map
cd my-map
apc map list --profile local
apc project bind <permanentMapId> --profile local
```

`project bind` 会验证地图属于当前 Creator，并将 Profile 名和永久地图 ID 写入工程 `.env`：

```env
VITE_BOX_CREATOR_PROFILE=local
VITE_BOX_CREATOR_PROJECT_ID=<permanentMapId>
```

## 4. 同步类型和资源

```bash
apc map resource --type all
```

此命令同步 TypeScript 类型定义，以及模型、图片、音频和 UI 资源索引。Creator 中修改资源或 UI 后，再运行一次同步。

## 5. 开发、上传与预览

```bash
npm run dev
apc runtime start
apc runtime logs --follow
```

`npm run dev` 监听 client/server 构建。仅当 `.env` 中 `VITE_UPDATE_FILE=true` 时，构建完成后会上传脚本；设为 `false` 时只做本地构建。

预览通过 Creator 的运行时控制：使用 `runtime start`、`status`、`restart`、`stop` 和 `logs`。它不再通过 CLI 打开旧版创作或游玩页面。

## 6. 发布前检查

```bash
npm run build
apc project info --json
apc runtime status --json
```

确认 Profile、永久地图 ID、Creator 健康状态和预览运行状态均正确。生产自动化使用独立 Token，并仅授予所需权限。
