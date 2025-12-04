# 配置神岛信息：从本地到 Arena 的最后一公里

要让 ArenaPro Vite 项目的构建结果自动部署到神岛 Arena，需要告诉脚手架两类关键信息：

- 你**是谁**：神岛账户的 token、UA 等（通过 `.env` 注入）
- 你要**部署 bundle 配置**：bundle 信息（通过 `dao3.config.ts` 和 `.env` 配置）

本文将分别介绍这两部分的配置方式和推荐工作流。

## 一、在 `.env` 中配置神岛账户信息

脚手架通过环境变量把「账号信息」和「部署行为」注入到构建流程中。  
本脚手架的 `.env` 中会包含以下这些变量（下面是一份示例注释版模板）：

```env
# ========================
# 构建与上传配置
# ========================


# 【目标构建模块】
# 指定要构建的 bundle 名称，对应 dao3.config.ts → bundles 的 key
# 留空：构建所有启用的 bundle（多入口模式）
# 示例：VITE_CURRENT_FILE=bundle
VITE_CURRENT_FILE=


# 【自动上传开关】
# 构建脚本完成后是否上传到神岛地图
# 可选值：true | false
VITE_UPDATE_FILE=true


# ========================
# 地图资源配置
# ========================


# 【UI节点过滤前缀】
# 按节点名前缀筛选 UI 元素，留空表示显示全部
# 示例：VITE_UI_INDEX_PREFIX=btn_ （仅显示 btn_ 开头的节点）
VITE_UI_INDEX_PREFIX=


# 【目标地图ID】
# 脚本要上传的目标地图ID，必须为「扩展地图」类型
VITE_DAO3_MAP_ID=
```

### 1. `VITE_CURRENT_FILE`：当前构建 / 上传的 bundle 名

- **作用**：告诉构建脚本「这次要上传的是哪一个 bundle」。
- **取值范围**：必须是 `dao3.config.ts -> bundles` 下的某个 key 或留空。

例如，上面示例中只有一个名为 `bundle` 的配置；此时在 `.env` 中可以设置：

```env
VITE_CURRENT_FILE=bundle
```

- 当 `VITE_CURRENT_FILE` 留空时，脚手架会对 `dao3.config.ts` 中所有已启用的 bundle 进行多入口打包和监听，适合需要同时调试多套入口的场景。

### 2. `VITE_UPDATE_FILE`：是否在构建后自动上传脚本

- **作用**：控制构建完成后，脚手架是否**自动将构建结果上传到 Arena**。
- **取值**（布尔值）：

  ```env
  VITE_UPDATE_FILE=true   # 构建后自动上传
  VITE_UPDATE_FILE=false  # 只本地构建，不上传
  ```

常见用法：

- 开发期 / 日常联调：设为 `true`，构建之后自动同步，减少手动步骤；
- 特殊场景（只想看本地构建结果或调试 build pipeline）：临时改成 `false`。

## 二、在 `dao3.config.ts` 中配置 bundle 信息

`dao3.config.ts` 决定了：

- 项目中有哪些 **bundle**；
- 每个 bundle 对应的 **client/server 入口文件**。

示例配置（TypeScript 版本）：

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
} as IDao3Config;
```

### 1. `bundles`：多入口 / 多模式脚本配置

`bundles` 是一个「名字 → 配置」的映射，每个 key 对应一个可独立构建和上传的 bundle。

- **bundle 名（如 `"bundle"`）**：
  - 必须与 `.env` 中的 `VITE_CURRENT_FILE` 一致；
- **`client.entry` / `server.entry`**：
  - 分别指定客户端 / 服务端入口脚本文件名（相对于各自源码根目录）；

当你有多个玩法或多张地图时，可以在 `dao3.config.ts` 中新增多个 bundle，例如：

```ts
export default {
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
} as IDao3Config;
```

通过切换 `.env` 中的 `VITE_CURRENT_FILE`，可以在不同 bundle 之间切换构建 / 上传目标。

---

通过 `.env` + `dao3.config.ts` 的组合，你可以清晰地表达：

- 「谁在部署」（账号 / UA）；
- 「部署什么」（哪一个 bundle）；
- 「部署到哪」（哪张地图 / 哪个版本，对应 `.env` 中的地图相关变量）。

这样 ArenaPro Vite 就不仅能帮你打包代码，还能完成「从本地到神岛 Arena」的一键部署流程。
