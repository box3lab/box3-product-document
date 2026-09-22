# 环境变量与地图绑定 Q&A

## 为什么先列出地图再绑定？

使用 `apc map list` 查看选中 Creator 服务器中的地图，再使用 `apc project bind` 将永久地图 ID 写入当前工程：

```bash
apc map list --profile local
apc project bind <permanentMapId> --profile local
```

`apc project bind` 会实时连接 Creator 验证地图 ID，不依赖本地地图缓存。验证通过后，它写入当前 `.env` 的：

```env
VITE_BOX_CREATOR_PROFILE=local
VITE_BOX_CREATOR_PROJECT_ID=<permanentMapId>
```

## 可以直接绑定吗？

可以。已经确认永久地图 ID 且 Profile 正确时，直接执行：

```bash
apc project bind <permanentMapId> --profile local
```

仅在 Creator 暂时无法访问、且地图 ID 已经由可靠渠道确认时，才使用 `--skip-verify`。该选项会跳过服务器验证，错误的 ID 会在之后同步资源或上传脚本时失败。

## 如何绑定不同环境？

`--env` 选择要写入的环境文件：

```bash
apc project bind <permanentMapId> --profile staging --env staging
apc project bind <permanentMapId> --profile production --env production
```

命令分别写入 `.env.staging` 和 `.env.production`。日常执行构建前，确认当前 Vite 模式会读取对应的环境文件，并使用 `apc project info` 检查实际的 Profile、地图 ID 与连通性。
