# FAQ：脱离 ArenaPro 插件后，如何快速同步地图资源和账户信息？

> 适用场景：你已经不再依赖 VSCode / ArenaPro 插件，但仍然希望在纯脚手架环境下，完成地图资源同步、API 类型更新，以及账户信息（Token / UA）的快速配置。

核心就靠两个命令：

- 资源相关：`npm run sync:resources`
- 账号相关：`npm run sync:auth`

下面按常见问题来说明。

## 1. 我现在只有脚手架，没有 ArenaPro 插件，还能同步地图资源吗？

可以。

脚手架内置了 **资源同步命令**：

- `npm run sync:resources`：
  - 会同步当前地图内的各类资源（图片、UI、商品、音频、模型等）；
  - 同时更新最新的游戏 API 类型声明（`d.ts`）；
  - 除了游戏 API 声明外，其它资源同步前需要先完成登录，并在配置中填写目标地图的 ID，才能成功获取。

**前置条件：**

- 你已经在浏览器登录了神岛账号；
- 项目里的 `dao3.config.ts` 中，已经配置好要同步的目标地图 ID（以及必要的 playHash 等信息）。

执行方式（在项目根目录）：

```bash
npm run sync:resources
```

执行成功后，你就可以在本地项目中使用最新的地图资源和 API 类型提示。

## 2. 不通过插件，怎么快速写入账户 Token 和 UA？

脱离 ArenaPro 插件后，账号信息同样可以通过脚手架命令自动完成：

- `npm run sync:auth`：
  - 一键完成当前账号在本机的授权流程；
  - 自动获取并写入神岛账户 Token（`VITE_DAO3_AUTH`）和 UA（`VITE_DAO3_UA`）到 `.env`；
  - 一般在**首次拉取项目后**或本地 Token / UA 过期、变更时执行一次即可。

执行方式：

```bash
npm run sync:auth
```

执行完成后，你可以在项目根目录的 `.env` 文件中看到类似配置：

```env
VITE_DAO3_AUTH=...
VITE_DAO3_UA=...
```

这些信息会在构建 / 同步脚本时自动注入到请求头里，用于身份校验。

## 3. 什么时候应该先跑 `sync:auth`，什么时候跑 `sync:resources`？

一个推荐的「**纯脚手架工作流**」顺序是：

1. **首次拉仓库 / 换电脑：**

   - 先执行：

     ```bash
     npm run sync:auth
     ```

     写入账号 Token / UA 到 `.env`。

   - 检查 `dao3.config.ts`，确认要操作的地图 ID / playHash 是否配置正确。

2. **需要更新地图资源 / API 类型时：**

   - 执行：

     ```bash
     npm run sync:resources
     ```

   - 获取最新的地图资源和 API 类型声明。

3. **日常开发 & 构建上传：**

   - 开发阶段：`npm run dev`
   - 发布前：`npm run build`

## 4. 常见问题速查

- **Q：`sync:resources` 报没有权限 / 获取不到资源？**

  - A：检查两点：
    - 浏览器是否已登录对应神岛账号；
    - `dao3.config.ts` 中目标地图 ID 是否填写正确。

- **Q：换了账号 / Token 过期了，怎么处理？**

  - A：重新执行一次 `npm run sync:auth`，让脚手架帮你重新写入最新的 Token / UA。
