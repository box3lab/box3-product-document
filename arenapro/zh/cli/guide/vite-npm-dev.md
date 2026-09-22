# 开发可发布的 NPM 包

> 本文介绍如何为独立库项目配置并发布 NPM 包。
>
> Creator 脚手架默认用于构建和上传地图脚本，是私有工程；它不预置 `exports`、`files`、`npm run tsc` 或 NPM 发布流程。需要发布复用库时，建议单独创建库项目，并按本文配置。

## 1. 配置 exports 与 files

在独立库项目的 `package.json` 中，可以按入口实际输出配置：

```jsonc
{
  "exports": {
    ".": {
      "import": "./dist/server/src/App.js",
      "types": "./dist/server/src/App.d.ts"
    },
    "./client": {
      "import": "./dist/client/src/App.js",
      "types": "./dist/client/src/App.d.ts"
    },
    "./server": {
      "import": "./dist/server/src/App.js",
      "types": "./dist/server/src/App.d.ts"
    },
    "./shares": {
      "import": "./dist/shares/src/App.js",
      "types": "./dist/shares/src/App.d.ts"
    }
  },
  "files": ["dist/**/*"]
}
```

完成配置后：

- 你的包默认会导出几类入口：
  - 根入口 `"."`（通常指向 server 侧逻辑）；
  - `"./client"`：客户端入口；
  - `"./server"`：服务端入口；
  - `"./shares"`：共享模块入口。
- 使用者可以这样引用：

  ```ts
  import serverEntry from "your-package";
  import clientEntry from "your-package/client";
  import shared from "your-package/shares";
  ```

- `files: ["dist/**/*"]` 表示：
  - 发布到 NPM 时，只会包含 `dist/` 目录下的构建产物；
  - 源码（`src/` 等）不会被一并发布。

如果你后续调整了构建输出路径（例如不再使用 `dist/server/src/App.js` 这一套路径），**务必同步更新 `exports` 中的 `import`/`types` 指向**，否则使用者会拿到错误的入口或类型声明。

## 2. 如何产出 NPM 包需要的 dist 目录

为库项目增加对应的 TypeScript 构建脚本后，才可以执行 `tsc` 产出 JS 与 d.ts。Creator 地图工程的 `npm run build` 只用于构建 Creator 脚本，不能直接作为 NPM 包的发布产物。

在构建之前，建议先清空库项目的 `dist` 目录，避免遗留无效文件，然后运行已配置的构建脚本：

::: code-group

```sh [npm]
# 同时编译 server + client
npm run tsc
```

```sh [pnpm]
# 同时编译 server + client
pnpm tsc
```

```sh [yarn]
# 同时编译 server + client
yarn tsc
```

```sh [bun]
# 同时编译 server + client
bun run tsc
```

:::

常见做法：

- 确认 `tsconfig` 的 `outDir` 指向 `dist/`（或与上面的 `exports` 配置一致的目录）；
- 运行对应的 `tsc` 命令（例如上面的 `npx tsc`，或在 `package.json` 中封装的 `npm run build:types` 等脚本），把 TS 编译为 JS + d.ts；
- 确认 `dist/` 目录中已经包含：
  - `dist/client/src/App.js` / `App.d.ts`
  - `dist/server/src/App.js` / `App.d.ts`
  - `dist/shares/src/App.js` / `App.d.ts`

如果你修改了入口文件名或目录结构：

- 比如不再用 `App.ts` 作为入口，而是改成 `index.ts`；
- 或者把输出目录从 `dist/server/src` 改成了 `dist/server`；

需要同时检查三处是否保持一致：

- `tsconfig` 中的 `outDir`、`rootDir` 等；
- Vite / 构建脚本中对输出路径的约定（如果有）；
- `package.json` 的 `exports` 中 `import`/`types` 的具体路径。

## 3. 发布到 NPM 时的基本流程

当 `dist/` 目录和 `exports` 配置都准备好之后，你可以按照常规 NPM 包流程发布：

1. 确认 `package.json` 中的：
   - `name`：包名；
   - `version`：版本号；
   - `main` / `module` / `types`（如果你有额外配置）。
2. 确认已经登录 NPM：

   ```bash
   npm login
   ```

3. 在项目根目录执行发布：

   ```bash
   npm publish --access=public
   ```

> 提醒：
>
> - 更改导出路径或入口文件后，一定要重新检查 `exports` 与 `files`，避免发布出「能安装但无法正确导入」的版本。
> - **如果这个包是打算给神岛社区使用的，推荐发布到 `@dao3fun` 组织名下**，并参考「[投稿社区：发布 NPM 包](/zh/guide/06-advanced-topics/contributing-to-dao3fun)」一文的流程说明。

完成这些库项目配置后，就具备了「从 TS 源码 → dist 输出 → NPM 包导出」的基础。Creator 地图工程使用此类公共包时，安装依赖即可；不要把 Creator Profile、永久地图 ID 或 CLI Token 打进 NPM 包。

- 保证编译的输出路径与 `exports` 对齐；
- 在需要时调整入口文件名 / 目录结构并同步配置；
- 按标准 NPM 流程发布即可。
