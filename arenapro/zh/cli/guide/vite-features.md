# Vite 扩展能力

> 本文介绍 ArenaPro CLI 项目里最常用的几种 Vite 扩展能力。它们都是**建立在 ES Module 之上**的增强，而不是 Vite 自创的私有语法。

- `import.meta` / `import.meta.env`：在代码里读取构建时环境变量；
- `import.meta.glob`：按通配符批量导入模块；
- `import.meta.hot`：热更新相关接口（一般只需要知道有它即可）。

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
VITE_UPDATE_FILE=true
```

在脚本中可以这样使用：

```ts
const currentBundle = import.meta.env.VITE_CURRENT_FILE;
const shouldAutoUpload = import.meta.env.VITE_UPDATE_FILE === "true";
```

推荐做法：

- 把和部署行为相关的开关（是否上传、当前 bundle 名等）放在 `.env`；
- 在代码里通过 `import.meta.env` 读取，只做轻量分支判断；
- 真正敏感的值尽量只在构建脚本 / 服务端使用，避免下发到运行时代码中。

### 1.2 `env.d.ts` 中的类型声明

项目里通常会有一个 `env.d.ts`（或类似文件）对 `import.meta.env` 进行类型声明，例如：

```ts
interface ImportMetaEnv {
  readonly VITE_CURRENT_FILE: string;
  readonly VITE_UPDATE_FILE: string;
}
```

当你新增 `VITE_*` 变量时，记得同步更新这里，这样 IDE 才会给出正确的补全和类型检查。

## 2. 与 `.env` / `dao3.config.ts` 的关系

简单可以理解为：

- `.env`：提供「账号 + 行为」类配置，比如谁在部署、当前 bundle 名、是否自动上传；
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

`import.meta.hot` 是 Vite 的热模块替换（HMR）接口，可以用来定制模块更新时的行为。但在 ArenaPro CLI 的常规使用场景里：

- 脚手架已经帮你接好了常见的热更新流程；
- 绝大多数情况下**不需要**直接操作 `import.meta.hot`；
- 正常保存文件，让 Vite 和 Arena 完成刷新即可。

只有当你在做非常高级的自定义（例如自己编写 UI 层的热更新逻辑）时，才建议参考 Vite 官方文档深入了解 `import.meta.hot` 的用法。
