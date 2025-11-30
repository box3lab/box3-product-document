# 配置神岛信息：从本地到 Arena 的最后一公里

要让 ArenaPro Vite 项目的构建结果自动部署到神岛 Arena，需要告诉脚手架两类关键信息：

- 你**是谁**：神岛账户的 token、UA 等（通过 `.env` 注入）
- 你要**部署到哪张地图 / bundle 配置**：地图 ID、playHash、bundle 信息等（通过 `dao3.config.json` 配置）

本文将分别介绍这两部分的配置方式和推荐工作流。

## 一、在 `.env` 中配置神岛账户信息

脚手架通过环境变量把「账号信息」和「部署行为」注入到构建流程中。  
本脚手架的 `.env` 中会包含以下变量：

```env
# 神岛账户 Token（Authorization 头）
# 获取地址：https://code-api-pc.dao3.fun/auth/user
VITE_DAO3_AUTH=

# 客户端 UA 标识，用于请求头 X-Dao-Ua / user-agent
# 获取地址：https://www.lzltool.com/UserAgent
VITE_DAO3_UA=


# 当前要构建 / 上传的 bundle 名，对应 dao3.config.ts -> bundles 的 key
VITE_CURRENT_FILE=bundle

# 是否在构建后自动上传脚本，字符串形式的布尔值："true" | "false"
VITE_UPDATE_FILE=true
```

### 1. `VITE_DAO3_AUTH`：神岛账户 Token

- **作用**：用于向神岛代码接口发起请求时，填入 HTTP `Authorization` 头。
- **获取方式**：在浏览器访问：

  ```text
  https://code-api-pc.dao3.fun/auth/user
  ```

  根据页面提示获取你的 token，然后填入 `.env` 中的 `VITE_DAO3_AUTH`。

- **安全建议**：
  - 不要把包含真实 token 的 `.env` 提交到公共仓库；
  - 团队协作时，用 `.env.example` 提示变量名和注释，让每个人本地填值。

### 2. `VITE_DAO3_UA`：客户端 UA 标识

- **作用**：用于请求头里的 `X-Dao-Ua` / `User-Agent` 字段，帮助服务端识别调用来源。
- **获取方式**：可以自定义一个 UA，或参考工具网站生成：

  ```text
  https://www.lzltool.com/UserAgent
  ```

  然后填入 `VITE_DAO3_UA`。

### 3. `VITE_CURRENT_FILE`：当前构建 / 上传的 bundle 名

- **作用**：告诉构建脚本「这次要上传的是哪一个 bundle」。
- **取值范围**：必须是 `dao3.config.json -> ArenaPro.bundles` 下的某个 key。

例如：

```json
"bundles": {
  "bundle": {
    "client": { "entry": "App.ts" },
    "server": { "entry": "App.ts" },
    "map": {
      "id": "",
      "playHash": "",
      "enable": false
    }
  }
}
```

此时应在 `.env` 中设置：

```env
VITE_CURRENT_FILE=bundle
```

如果你以后新增其他 bundle（例如 `pve`, `pvp`），需要在：

- `dao3.config.json` 中新增对应配置；
- `.env` 中按需要切换 `VITE_CURRENT_FILE`。

### 4. `VITE_UPDATE_FILE`：是否在构建后自动上传脚本

- **作用**：控制构建完成后，脚手架是否**自动将构建结果上传到 Arena**。
- **取值**（字符串）：

  ```env
  VITE_UPDATE_FILE=true   # 构建后自动上传
  VITE_UPDATE_FILE=false  # 只本地构建，不上传
  ```

常见用法：

- 开发期 / 日常联调：设为 `true`，构建之后自动同步，减少手动步骤；
- 特殊场景（只想看本地构建结果或调试 build pipeline）：临时改成 `false`。

## 二、在 `dao3.config.ts` 中配置地图与 bundle 信息

`dao3.config.ts` 决定了：

- 项目中有哪些 **bundle**；
- 每个 bundle 对应的 **client/server 入口文件**；
- 要部署的 **地图 ID / playHash** 等关联信息。

示例配置：

```json
{
  "bundles": {
    "bundle": {
      "client": { "entry": "App.ts" },
      "server": { "entry": "App.ts" },
      "map": {
        "id": "",
        "playHash": "",
        "enable": false
      }
    }
  },
  "uiIndexPrefix": "",
  "map": {
    "id": "",
    "playHash": ""
  }
}
```

### 1. `bundles`：多入口 / 多模式脚本配置

`bundles` 是一个「名字 → 配置」的映射，每个 key 对应一个可独立构建和上传的 bundle。

- **bundle 名（如 `"bundle"`）**：
  - 必须与 `.env` 中的 `VITE_CURRENT_FILE` 一致；
- **`client.entry` / `server.entry`**：
  - 分别指定客户端 / 服务端入口脚本文件名（相对于各自源码根目录）；
- **bundle 级 `map` 字段**：
  - `id`：希望这个 bundle 绑定的地图 ID；
  - `playHash`：对应地图版本的哈希；
  - `enable`：
    - `true`：启用该 bundle 与此地图 ID 的自动绑定 / 上传流程；
    - `false`：暂不启用该地图配置，采用全局配置。

当你有多个玩法或多张地图时，可以新增多个 bundle，例如：

```json
"bundles": {
  "pve": { ... },
  "pvp": { ... }
}
```

通过切换 `.env` 中的 `VITE_CURRENT_FILE`，可以在不同 bundle 之间切换构建 / 上传目标。

### 2. 顶层 `map`：项目级默认地图信息

```json
"map": {
  "id": "",
  "playHash": ""
}
```

- 通常用于配置**项目级默认地图**的信息；
- 当 bundle 级别没有单独配置 `map` 时，可以回退到这里的默认值；
- 具体优先级以脚手架实现为准，一般遵循「bundle.map 优先于全局 map」。

在实际项目中，常见做法是：

- 在全局 `map` 中配置主要地图的信息；
- 只在需要「一个项目服务多张地图」时，对某些 bundle 单独配置 `map` + `enable=true`。

---

通过 `.env` + `dao3.config.ts` 的组合，你可以清晰地表达：

- 「谁在部署」（账号 / UA）；
- 「部署什么」（哪一个 bundle）；
- 「部署到哪」（哪张地图 / 哪个版本）。

这样 ArenaPro Vite 就不仅能帮你打包代码，还能完成「从本地到神岛 Arena」的一键部署流程。
