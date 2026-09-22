# CLI 环境变量

Creator 工程只使用公开的构建选择、Profile 名称和永久地图 ID。Creator 服务地址与 CLI Token 属于私密配置，不会暴露给脚本代码。

## 工程 `.env`

工程中只保存不敏感的连接选择和构建行为：

```env
VITE_BOX_CREATOR_PROFILE=local
VITE_BOX_CREATOR_PROJECT_ID=<permanentMapId>
VITE_UPDATE_FILE=false
VITE_CURRENT_FILE=
VITE_BOX_CREATOR_VERSION=false
VITE_UI_INDEX_PREFIX=
```

| 变量 | 用途 |
| --- | --- |
| 变量 | 用途 |
| --- | --- |
| `VITE_CURRENT_FILE` | 指定 `dao3.config.ts` 的一个 bundle key；留空时构建所有 `enable: true` 的 bundle。 |
| `VITE_BOX_CREATOR_PROFILE` | 当前工程使用的 APC Creator Profile 名称，例如 `local`、`staging`。Profile 保存 Creator 服务地址。 |
| `VITE_BOX_CREATOR_PROJECT_ID` | Creator 分配的永久地图 ID。不要填写地图名称、发布版本、临时 hash 或展示用作品 ID。 |
| `VITE_UPDATE_FILE` | 仅当值严格为 `true` 时，构建完成后上传脚本；设为 `false` 时只做本地构建。 |
| `VITE_BOX_CREATOR_VERSION` | 值为 `true` 时，在远程脚本文件名中追加根 `package.json` 的版本号。 |
| `VITE_UI_INDEX_PREFIX` | `apc map resource` 生成 UI 索引时的节点名前缀过滤条件；留空时索引全部 UI 节点。 |

`apc project bind <permanentMapId>` 会写入 `VITE_BOX_CREATOR_PROFILE` 和 `VITE_BOX_CREATOR_PROJECT_ID`。使用 `--profile` 或 `--project` 的命令只临时覆盖，不会改写 `.env`。

这些变量带有 `VITE_` 前缀，Vite 会将它们暴露给客户端脚本；不要在工程 `.env`、`.env.example` 或 `env.d.ts` 中添加 endpoint、Token、密码等秘密。

## Token

CLI Token 不是工程环境变量。它有两种安全使用方式：

```bash
# 仅对当前终端有效
export BOX_CREATOR_TOKEN='bxc_...'

# 保存到指定 Profile 的本地凭据
apc profile add local --endpoint 127.0.0.1:3127 --token "$BOX_CREATOR_TOKEN"
```

查找顺序通常为：显式 `--token`（仅脚本上传）→ `BOX_CREATOR_TOKEN` → 选中 Profile 的本地 Token。不要在 `.env`、`.env.example`、代码、截图或 GitHub Actions 日志中保存 Token。

## CI

将 `BOX_CREATOR_TOKEN` 保存为 CI Secret，并在任务中注入：

```yaml
env:
  BOX_CREATOR_TOKEN: ${{ secrets.BOX_CREATOR_TOKEN }}
  VITE_BOX_CREATOR_PROFILE: production
  VITE_BOX_CREATOR_PROJECT_ID: ${{ secrets.BOX_CREATOR_PROJECT_ID }}
  VITE_UPDATE_FILE: "true"
```

CI Token 使用独立、最小权限的 Token。仅上传脚本的流水线通常只需要 `scripts.update`，不需要数据空间或运行控制权限。
