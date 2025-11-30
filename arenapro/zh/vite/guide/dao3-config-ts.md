# 脚手架配置文件：dao3.config.ts

> 本文专门介绍根目录下的 `dao3.config.ts` 配置文件，它决定了脚本是如何被打包成 Arena 可用的 bundle，以及这些 bundle 与地图之间的绑定关系。
>
> 配置类型来自 `vite-plugin-arenapro-script` 提供的 `IDao3Config`。日常你只需要按约定修改字段值，无需自己定义类型。

## 1. 文件示例与整体结构

在项目根目录下，你可以看到一个默认的 `dao3.config.ts`：

```ts
import type { IDao3Config } from "vite-plugin-arenapro-script";

export default {
  bundles: {
    bundle: {
      client: { entry: "App.ts" },
      server: { entry: "App.ts" },
      enable: true,
    },
  },
  uiIndexPrefix: "",
  map: {
    id: "",
    playHash: "",
  },
} as IDao3Config;
```

它大致可以拆成三块：

- `bundles`：定义有哪些可构建 / 可上传的脚本 bundle。
- `uiIndexPrefix`：与 UI 脚本索引路径相关的前缀。
- 顶层 `map`：项目级默认地图信息。

下面按字段展开说明。

## 2. `bundles`：多入口 / 多模式脚本配置

`bundles` 是一个「名称 → 配置」的映射，每个 key 就是一个 bundle 名，对应一套可独立构建和上传的脚本。

```ts
bundles: {
  bundle: {
    client: { entry: "App.ts" },
    server: { entry: "App.ts" },
    enable: true,
  },
},
```

- **bundle 名（如 `"bundle"`）**

  - 必须与 `.env` 中的 `VITE_CURRENT_FILE` 一致，才能正确选择要构建 / 上传哪一套脚本。除非 VITE_CURRENT_FILE 留空

- **`client.entry` / `server.entry`**

  - 分别指定客户端 / 服务端入口脚本文件名；
  - 路径通常是相对于各自源码根目录的文件（例如 `client/src/App.ts` / `server/src/App.ts`）；
  - 如果你改用了其他入口（如 `Main.ts`），记得同步改这里。

当你有多个玩法或多张地图时，可以新增多个 bundle，例如：

```ts
bundles: {
  pve: {
    client: { entry: "App.ts" },
    server: { entry: "App.ts" },
    enable: true,
  },
  pvp: {
    client: { entry: "App2.ts" },
    server: { entry: "App2.ts" },
    enable: true,
  },
},
```

然后在 `.env` 中通过切换 `VITE_CURRENT_FILE=pve` / `pvp`，选择本次构建 / 上传的目标 bundle。留空除外

## 3. `uiIndexPrefix`：UI 索引前缀

```ts
uiIndexPrefix: "",
```

- 用于配置 UI 索引路径的统一前缀；
- 对于不涉及复杂 UI 路径管理的项目，可以保持默认空字符串。

如果你在项目中使用了 UI 索引（例如将多个 UI 脚本按某个前缀分类），可以在后续 UI 文档中按照团队约定来调整此字段。

## 4. 顶层 `map`：项目级默认地图信息

```ts
map: {
  id: "",
  playHash: "",
},
```

- 通常用于配置**项目级默认地图**的信息；

## 5. 与 `.env` 和构建流程的关系

`dao3.config.ts` 主要负责描述「项目内部结构与地图绑定」，而 `.env` 更偏向「当前这次构建要用哪一套配置」。例如：

- `.env` 中：
  - `VITE_CURRENT_FILE`：选择要构建 / 上传的 bundle 名（对应 `bundles` 的某个 key），留空为多入口；
  - `VITE_UPDATE_FILE`：控制构建完成后是否自动上传脚本；
- `dao3.config.ts` 中：
  - 为每个 bundle 定义 client/server 入口和地图信息；
  - 配置项目级的 `map` 默认值。

在构建流程中：

1. 构建脚本会读取 `.env`，确定本次要构建的 bundle 名以及是否自动上传；
2. 再根据 `dao3.config.ts` 中对应 bundle 的配置，找到 client/server 入口和地图信息；
3. 最终完成「打包 → 关联地图 →（按需）上传到 Arena」这一整条链路。

如果你只是在调整入口文件名、bundle 名或地图 ID：

- **优先修改 `dao3.config.ts`** 中的对应字段；
- 同时确认 `.env` 中的 `VITE_CURRENT_FILE` 是否仍然指向正确的 bundle；
- 一般不需要改动构建脚本本身。

## 6. 为什么改用 `dao3.config.ts` 而不是 `dao3.config.json`

在 Webpack 版脚手架中，我们使用的是纯 JSON 配置（`dao3.config.json`）。在 Vite 版里改用 TypeScript 文件，有几个主要原因：

- **扩展性更高**：

  - TS 配置文件本质上是代码，可以按需拆分、复用、组合配置；
  - 例如可以按环境、按项目规模动态生成 `bundles`、根据常量表批量填充 `map` 信息等。

- **更容易和现有工具链集成**：
  - 与 `vite.config.ts`、`tsconfig` 等保持一致的 TS 风格，统一心智模型；
  - 在需要时可以引入简单的辅助函数来生成配置，而不必在 JSON 里手写大量重复结构。

下面给出两个简单示例，展示「把配置当代码用」的典型场景。

### 6.1 按环境切换部分配置

你也可以根据运行环境（例如 `NODE_ENV` 或自定义环境变量）来调整配置：

```ts
import type { IDao3Config } from "vite-plugin-arenapro-script";

const isProd = process.env.NODE_ENV === "production";

export default {
  bundles: {
    bundle: {
      client: { entry: "App.ts" },
      server: { entry: "App.ts" },
      enable: isProd,
    },
    bundle_dev: {
      client: { entry: "App.test.ts" },
      server: { entry: "App.test.ts" },
      enable: !isProd,
    },
  },
  uiIndexPrefix: "",
  map: {
    id: "",
    playHash: "",
  },
} as IDao3Config;
```

在简单项目里，你完全可以把 `dao3.config.ts` 当作「静态配置」来看待；
但一旦需要更复杂的控制，就可以像上面这样利用 TypeScript 的能力，
通过常量、循环和条件分支来帮你管理和生成配置，从而避免在 JSON 里做大量重复和容易出错的手工维护。

### 6.3 用工具函数减少重复代码

如果你的多个 bundle 结构非常相似，只是入口或地图信息不同，可以先写一个小工具函数：

```ts
import type { IDao3Config } from "vite-plugin-arenapro-script";

function createBundle(entry: string): IDao3Config["bundles"][string] {
  return {
    client: { entry },
    server: { entry },
    enable: true,
  };
}

export default {
  bundles: {
    pve: createBundle("App.ts"),
    pvp: createBundle("App2.ts"),
  },
  uiIndexPrefix: "",
  map: {
    id: "",
    playHash: "",
  },
} as IDao3Config;
```

当你需要调整 bundle 结构时，只需要改 `createBundle` 一处即可。

### 6.4 拆分配置模块，按玩法合并

项目变大之后，可以将不同模式 / 玩法的配置拆分到独立文件中，再在 `dao3.config.ts` 中统一合并：

```ts
// pve-config.ts
import type { IDao3Config } from "vite-plugin-arenapro-script";

export const pveBundle: IDao3Config["bundles"][string] = {
  client: { entry: "App.ts" },
  server: { entry: "App.ts" },
  enable: true,
};

// pvp-config.ts
import type { IDao3Config } from "vite-plugin-arenapro-script";

export const pvpBundle: IDao3Config["bundles"][string] = {
  client: { entry: "App2.ts" },
  server: { entry: "App2.ts" },
  enable: true,
};

// dao3.config.ts
import type { IDao3Config } from "vite-plugin-arenapro-script";
import { pveBundle } from "./pve-config";
import { pvpBundle } from "./pvp-config";

export default {
  bundles: {
    pve: pveBundle,
    pvp: pvpBundle,
  },
  uiIndexPrefix: "",
  map: {
    id: "",
    playHash: "",
  },
} as IDao3Config;
```

这种拆分方式在「一个项目承载多个大型玩法」时会更利于团队协作：

- 各玩法负责人只维护自己那部分配置；
- `dao3.config.ts` 只负责组装整体结构，保持文件本身简洁可读。
