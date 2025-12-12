# 用 ArenaPro CLI 创建你的第一个项目

本篇会带你从零完成一件事：**用 ArenaPro CLI 创建并跑通第一个 ArenaPro 项目**。

在开始之前，请先通过 [**全局安装 CLI**](./index#快速安装)，这样才能在终端里直接使用 `apc` 命令。

## 1. 创建新项目

在你希望存放项目的目录里执行：

```bash
# 1) 使用脚手架创建项目
apc create my-arena-app
# 或使用简写
# apc c my-arena-app
```

会生成项目目录 `my-arena-app` 及文件。

### 2. 进入项目目录

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

### 3. 快速获取授权信息

在项目根目录执行：

```bash
apc login
# 或使用简写
# apc l
```

CLI 会打开一个本地授权页面。

默认情况下，`apc login` 会将登录信息写入**全局配置**，后续即使你切换到**其他项目**，也可以直接使用同一套登录态来上传脚本、拉取资源。

如果你只希望在当前项目内生效，可以使用：

```bash
apc login --env        # 仅写入当前项目 .env
apc login --env dev    # 仅写入当前项目 .env.dev
# 或使用简写
# apc l -e dev
```

CLI 在实际使用时会优先读取：

1. 当前项目的 `.env[.mode]` 中的 Token / UA（局部配置）；
2. 如果本地没有配置，再回退到全局登录信息。

### 4. 链接一张扩展地图

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
# 或使用简写
# apc r
```

同步完成后，你会在 `client/`、`server/`、`types/` 等目录下看到对应的自动生成的地图资源文件。

## 6. 启动开发 / 调试

在项目根目录执行：

::: code-group

```sh [npm]
# 同时 watch server + client
npm run dev
```

```sh [pnpm]
# 同时 watch server + client
pnpm dev
```

```sh [yarn]
# 同时 watch server + client
yarn dev
```

```sh [bun]
# 同时 watch server + client
bun run dev
```

:::

- 每次保存后快速重新编译，方便你马上看到效果。
- 不强制跑完整的类型检查 / 代码检查，更关注「能不能跑起来」。

## 7. 正式构建与上传脚本

::: code-group

```sh [npm]
# 同时构建 server + client
npm run build
```

```sh [pnpm]
# 同时构建 server + client
pnpm build
```

```sh [yarn]
# 同时构建 server + client
yarn build
```

```sh [bun]
# 同时构建 server + client
bun run build
```

:::

- 一次性打包所有目标脚本。
- 会按照项目配置执行更严格的检查，用来确认这版代码是否可以上线。

## 8. 运行你的脚本

构建完成后，你可以通过 CLI 打开当前工程绑定的地图，在神岛里完成脚本引入并运行：

```bash
# 打开创作端（编辑界面）
apc preview
# 或使用简写
# apc p
```

- 会根据 `.env` 中的 `VITE_DAO3_EDIT_HASH` 打开对应地图的创作页面；
- 在创作端中，把刚才构建好的脚本文件引入到地图配置里并保存。

在服务端的 `index.js` 中，引入刚才上传的 `bundle.server.js`：

```js
// Arena Server 使用 CJS 引入方式
require("./bundle.server.js");
```

在客户端的 `clientIndex.js` 中，引入构建上传后的 `bundle.client.js`：

```js
// Arena Client 使用 ESM 引入方式
import "./bundle.client.js";
```

运行地图，即可看到这次脚本改动的效果。
