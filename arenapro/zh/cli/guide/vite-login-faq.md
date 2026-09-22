# Creator Profile 与 CLI Token Q&A

Creator 访问由 Profile 和 CLI Token 组成。Profile 保存服务器地址，Token 保存在 APC 的本机私密凭据中；工程 `.env` 只保存 Profile 名称和永久地图 ID。

## 1. 如何配置 Creator 连接？

先从服主获取 Creator 地址和 CLI Token，再在终端中执行：

```bash
export BOX_CREATOR_TOKEN='bxc_...'
apc profile add local --endpoint 127.0.0.1:3127 --token "$BOX_CREATOR_TOKEN"
apc profile test local
```

`apc profile add` 会保存名为 `local` 的 Profile，并将 Token 存入 APC 的本机私密凭据。`apc profile test` 用于检查地址是否可连接，并显示服务器身份和 Token 是否已配置。

## 2. 一台电脑可以使用多个 Creator 吗？

可以。为每台 Creator 使用不同的 Profile 名称：

```bash
apc profile add staging --endpoint creator-staging.example:3127 --token "$BOX_CREATOR_TOKEN"
apc profile add production --endpoint creator.example:3127 --token "$BOX_CREATOR_TOKEN"
apc profile list
```

项目通过 `.env` 中的 `VITE_BOX_CREATOR_PROFILE` 选择默认 Profile。也可以在单条命令中使用 `--profile <name>` 临时选择，不会修改工程配置。

## 3. Token 从哪里读取？

需要授权的命令按以下顺序读取 Token：

1. `apc script upload` 明确传入的 `--token`；
2. 当前终端的 `BOX_CREATOR_TOKEN`；
3. 选中 Profile 的本机私密凭据。

`apc map resource --type dts` 只同步公开 DTS，不需要 Profile 或 Token。读取地图、资源、脚本、数据空间和运行控制均需要目标 Creator 的有效 Token 及相应权限。

## 4. Token 可以写进 `.env.example` 吗？

不可以。`VITE_` 变量会暴露给客户端代码，工程 `.env`、`.env.example`、Git、日志和截图中都不能出现 Token、endpoint 或密码。

`.env.example` 只保留公开的工程模板：

```env
VITE_CURRENT_FILE=
VITE_BOX_CREATOR_PROFILE=local
VITE_BOX_CREATOR_PROJECT_ID=
VITE_UPDATE_FILE=false
VITE_BOX_CREATOR_VERSION=false
VITE_UI_INDEX_PREFIX=
```

## 5. 如何更换或删除本机凭据？

使用相同名称再次执行 `apc profile add` 可以更新 Profile 地址和 Token。确认不再使用某台 Creator 后执行：

```bash
apc profile remove local
```

此命令会同时删除该 Profile 和它保存在本机的 CLI Token，不会影响其他 Profile 或工程 `.env`。
