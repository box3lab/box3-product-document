# 配置信息

在「用 APC 创建第一个 Creator 工程」中，你已经完成了基础准备工作：

- 全局安装 CLI，并用 `apc project create` 创建了项目；
- 通过 `apc profile add`、`apc map list`、`apc project bind` 绑定了一张 Creator 地图；
- 在 `.env` 中写入了 Profile 名称和永久地图 ID。

本篇不再重复这些步骤，而是重点说明两件事：

- `.env` 中的工程绑定和构建字段**分别控制什么行为**；
- `dao3.config.ts` 中的 **bundle 配置** 如何决定「构建哪些脚本、上传到哪里」。

## 一、在 `.env` 中配置

脚手架通过环境变量保存工程绑定和构建行为。CLI Token 不写入 `.env`，而是通过 `BOX_CREATOR_TOKEN` 或 Profile 的本地凭据提供。

本脚手架的 `.env` 可包含以下变量：

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
# 构建脚本完成后是否上传到 Creator
# 仅严格为 true 时上传；其他值不上传
VITE_UPDATE_FILE=true

# 【版本化上传】
# 严格为 true 时，在远程脚本文件名中追加根 package.json 的 version
VITE_BOX_CREATOR_VERSION=false


# ========================
# 地图资源配置
# ========================


# 【UI节点过滤前缀】
# 按节点名前缀筛选 UI 元素，留空表示显示全部
# 示例：VITE_UI_INDEX_PREFIX=btn_ （仅显示 btn_ 开头的节点）
VITE_UI_INDEX_PREFIX=


# 【Creator Profile 与目标地图】
# 由 apc project bind <permanentMapId> 自动写入
VITE_BOX_CREATOR_PROFILE=local
VITE_BOX_CREATOR_PROJECT_ID=
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

- **作用**：控制构建完成后，脚手架是否**自动将构建结果上传到 Creator**。
- **取值**（布尔值）：

  ```env
  VITE_UPDATE_FILE=true   # 构建后自动上传
  VITE_UPDATE_FILE=false  # 只本地构建，不上传
  ```

常见用法：

- 开发期 / 日常联调：设为 `true`，构建之后自动同步，减少手动步骤；
- 特殊场景（只想看本地构建结果或调试 build pipeline）：临时改成 `false`。

### 3. `VITE_BOX_CREATOR_VERSION`：是否使用版本化脚本文件名

- 设为 `true` 时，远程脚本文件名会追加根 `package.json` 的 `version`；
- 开发调试通常设为 `false`，以便持续覆盖固定脚本名；
- 此字段不改变地图 ID、Profile 或脚本权限。

## 二、在 `dao3.config.ts` 中配置 bundle 信息

`dao3.config.ts` 决定了：

- 项目中有哪些 **bundle**；
- 每个 bundle 对应的 **client/server 入口文件**。

示例配置（TypeScript 版本）：

```ts
import type { IBoxCreatorConfig } from "vite-plugin-arenapro-script";

export default {
  bundles: {
    main: {
      client: { entry: "App.ts" },
      server: { entry: "App.ts" },
      enable: true,
    },
  },
} satisfies IBoxCreatorConfig;
```

### 1. `bundles`：多入口 / 多模式脚本配置

`bundles` 是一个「名字 → 配置」的映射，每个 key 对应一个可独立构建和上传的 bundle。

- **bundle 名（如 `"main"`）**：
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
} satisfies IBoxCreatorConfig;
```

通过切换 `.env` 中的 `VITE_CURRENT_FILE`，可以在不同 bundle 之间切换构建 / 上传目标。
