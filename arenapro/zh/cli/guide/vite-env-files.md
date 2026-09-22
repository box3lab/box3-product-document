# 按环境管理 `.env`

Creator 工程的环境文件只保存公开的构建选择、Profile 名称和永久地图 ID。Token、Creator endpoint、密码和其他机密不能写入任何 `.env` 文件。

## 1. 支持的工程变量

```env
VITE_CURRENT_FILE=
VITE_BOX_CREATOR_PROFILE=local
VITE_BOX_CREATOR_PROJECT_ID=
VITE_UPDATE_FILE=false
VITE_BOX_CREATOR_VERSION=false
VITE_UI_INDEX_PREFIX=
```

各字段的含义见《[环境变量一览](./cli-env-vars)》。这些 `VITE_` 变量会被 Vite 暴露到客户端代码，因此只能填写公开信息。

## 2. 不同环境文件

- `.env`：所有模式的基础默认值；
- `.env.development`：`npm run dev` 时覆盖同名字段；
- `.env.production`：`npm run build` 时覆盖同名字段；
- `.env.example`：提交到仓库的无敏感模板，不会被 Vite 自动读取。

例如，可以让开发和正式环境绑定不同的 Creator：

```env
# .env.development
VITE_BOX_CREATOR_PROFILE=staging
VITE_BOX_CREATOR_PROJECT_ID=<stagingPermanentMapId>
VITE_UPDATE_FILE=true
```

```env
# .env.production
VITE_BOX_CREATOR_PROFILE=production
VITE_BOX_CREATOR_PROJECT_ID=<productionPermanentMapId>
VITE_UPDATE_FILE=true
VITE_BOX_CREATOR_VERSION=true
```

同一个变量同时出现在多个文件时，当前模式对应的文件会覆盖 `.env` 的值。可通过 `apc project info` 检查当前工程的实际 Profile、地图 ID 和上传开关。

## 3. `.env.example` 模板

```env
VITE_CURRENT_FILE=
VITE_BOX_CREATOR_PROFILE=local
VITE_BOX_CREATOR_PROJECT_ID=
VITE_UPDATE_FILE=false
VITE_BOX_CREATOR_VERSION=false
VITE_UI_INDEX_PREFIX=
```

新成员复制为 `.env` 后，使用 `apc profile add` 在本机配置 Creator 地址和 CLI Token，再通过 `apc project bind` 写入正确的 Profile 与永久地图 ID。不要将本机 Token 或 endpoint 复制到工程文件。
