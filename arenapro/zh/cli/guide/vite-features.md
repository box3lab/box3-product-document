# Vite 扩展能力

> 本文介绍 ArenaPro CLI 项目里最常用的几种 Vite 扩展能力。它们都是**建立在 ES Module 之上**的增强，而不是 Vite 自创的私有语法。

- `import.meta` / `import.meta.env`：在代码里读取构建时环境变量；
- `import.meta.glob`：按通配符批量导入模块；
- `import.meta.hot`：Vite 的热模块替换接口；Creator 脚本开发通常不需要直接使用它。

下面的内容都假设你已经通过 CLI 创建好了项目，并按前一章配置了 `.env` / `dao3.config.ts`。

## 1. `import.meta` 与 `import.meta.env`

在由 Vite 构建的模块中，`import.meta` 是一个由打包工具注入的对象，其中最常用的是 `import.meta.env`：

```ts
console.log(import.meta.env.MODE); // 当前模式：development / production
console.log(import.meta.env.VITE_CURRENT_FILE); // 当前构建的 bundle 名称
```

### 1.1 从 `.env` 读取配置

Vite 约定：只有 **`VITE_` 前缀的变量** 才会被暴露到 `import.meta.env` 中。

在 ArenaPro CLI 项目中，你会在 `.env` 看到类似内容：

```env
VITE_CURRENT_FILE=bundle
VITE_BOX_CREATOR_PROFILE=local
VITE_BOX_CREATOR_PROJECT_ID=<permanentMapId>
VITE_UPDATE_FILE=true
VITE_BOX_CREATOR_VERSION=false
VITE_UI_INDEX_PREFIX=
```

在脚本中可以这样使用：

```ts
const currentBundle = import.meta.env.VITE_CURRENT_FILE;
const shouldAutoUpload = import.meta.env.VITE_UPDATE_FILE === "true";
```

这些字段会进入 `import.meta.env`，因此只能保存公开的构建选择和地图标识。Creator endpoint、CLI Token、密码等机密不属于工程环境变量，也不能通过 `VITE_` 变量传递。

### 1.2 `env.d.ts` 中的类型声明

项目里通常会有一个 `env.d.ts`（或类似文件）对 `import.meta.env` 进行类型声明，例如：

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CURRENT_FILE: string;
  readonly VITE_BOX_CREATOR_PROFILE: string;
  readonly VITE_BOX_CREATOR_PROJECT_ID: string;
  readonly VITE_UPDATE_FILE: string;
  readonly VITE_BOX_CREATOR_VERSION: string;
  readonly VITE_UI_INDEX_PREFIX: string;
}
```

Creator 工程已有的公开变量以《[环境变量一览](./cli-env-vars)》为准。不要为 Creator endpoint、CLI Token 或密码新增 `VITE_*` 声明；如业务代码确实需要新的公开构建开关，再同时更新自己的类型声明。

## 2. 与 `.env` / `dao3.config.ts` 的关系

简单可以理解为：

- `.env`：提供公开的构建选择、Profile 名称、永久地图 ID 与资源索引过滤条件；
- `dao3.config.ts`：描述项目结构，包括 bundle 列表以及每个 bundle 的 client / server 入口。

构建时，CLI 会读取这两份配置决定「这一轮要构建和上传什么」。
在你的脚本中，则可以用 `import.meta.env` 读取其中一小部分信息（例如当前 bundle），在必要时做一些分支逻辑。

## 3. `import.meta.glob`：按模式批量导入模块

`import.meta.glob` 是 Vite 提供的一个构建期工具，用来**按通配符一次性收集多个模块**，常见于需要按目录自动注册一批脚本的场景。

### 3.1 懒加载模式（默认）

```ts
const modules = import.meta.glob("./modules/*.ts");

for (const path in modules) {
  const loader = modules[path];
  loader().then((mod) => {
    // mod 就是对应文件的模块导出
  });
}
```

适用于：模块较多、只在特定条件下加载，或者希望利用代码分割的场景。

### 3.2 `eager` 模式：一次性加载

```ts
// eager: true 时，返回值是 Record<string, Module>
const modules = import.meta.glob("./modules/*.ts", { eager: true });

for (const mod of Object.values(modules)) {
  // 这里已经是具体模块对象
  mod.register?.();
}
```

适用于：你本来就希望所有匹配模块一起加载的情况，写法更直观，但对应的代码会被打进同一个构建产物。

> 提醒：`import.meta.glob` 只能在被 Vite 处理的模块中使用；模块数量不多时，依然推荐显式 `import`，避免过度「魔法化」。

## 4. `import.meta.hot`：知道有它就够了

`import.meta.hot` 是 Vite 的热模块替换（HMR）接口。APC 的 `npm run dev` 会监听并重新构建脚本，按 `VITE_UPDATE_FILE` 的设置上传到 Creator；它不是浏览器 HMR。绝大多数 Creator 脚本不需要直接操作 `import.meta.hot`。
