# Vite 专属能力：import.meta

> 本文聚焦 Vite 在本脚手架中的「专属用法」，尤其是 `import.meta` 相关能力。
>
> 读这篇之前，你最好已经看过「认识 Vite」和「Vite 脚手架快速上手」。

## 1. 什么是 `import.meta`

在使用 Vite 构建的模块里，你可以访问一个特殊对象：`import.meta`。

它不是 JavaScript 标准里的普通变量，而是由打包工具在编译时注入的元信息。常见用途：

- 访问 **环境变量**：`import.meta.env`

## 2. `import.meta.env`：读取构建时环境变量

### 2.1 支持的变量前缀

Vite 规定：

- 只有以 **`VITE_` 开头** 的变量，才会被暴露到 `import.meta.env` 中；
- 其它变量（例如不带前缀的敏感信息）不会注入到运行时代码里。

结合本脚手架，你会在 `.env` 中看到类似配置：

```env
VITE_DAO3_AUTH=
VITE_DAO3_UA=
VITE_CURRENT_FILE=bundle
VITE_UPDATE_FILE=true
```

这些都可以在代码中通过 `import.meta.env` 访问：

```ts
const currentBundle = import.meta.env.VITE_CURRENT_FILE;
const shouldAutoUpload = import.meta.env.VITE_UPDATE_FILE === "true";
```

> **实践建议**：
>
> - 把「和部署行为相关」的开关、模式放进 `.env`，通过 `import.meta.env` 读取；
> - 对于真正敏感、只在构建脚本或服务端使用的值，尽量通过 `.env` + 构建脚本消费，而不是在运行时代码里直接读。

### 2.2 Vite 内置环境变量

除了你自己在 `.env` 里声明的变量之外，Vite 还会注入一些内置值：

- `import.meta.env.MODE`：当前运行模式（如 `development` / `production`）。

在 ArenaPro 项目中，你可以用这些变量来：

- 在开发模式下开启额外日志：

  ```ts
  if (import.meta.env.MODE === "development") {
    console.log("[DEBUG] 当前 bundle:", import.meta.env.VITE_CURRENT_FILE);
  }
  ```

### 2.3 `env.d.ts` 中的类型约束

在项目根目录下，有一个 `env.d.ts`（或类似命名的声明文件），通常会包含：

```ts
interface ImportMetaEnv {
  readonly VITE_DAO3_AUTH: string;
  readonly VITE_DAO3_UA: string;
  readonly VITE_CURRENT_FILE: string;
  readonly VITE_UPDATE_FILE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

这个声明文件会**约束编辑器里能看到的 `import.meta.env` 字段**：

- 如果某个变量没在 `ImportMetaEnv` 里声明，TypeScript 会认为它不存在；
- 当你新增 `.env` 变量（比如新的 `VITE_*`），记得同步在这里补上类型，IDE 才会给出正确的提示和检查。

你可以根据团队约定，选择：

- 严格枚举所有会用到的 `VITE_*` 变量（类型更安全）；
- 或者在上面基础上再加一个索引签名，允许额外的 `VITE_` 前缀字段。

- 在不同模式下切换某些行为（例如只在开发环境允许某些调试入口）。

## 3. 与 `.env` / `dao3.config.ts` 的关系

- `.env` 负责提供「账号 + 行为」类配置：
  - 谁在部署（`VITE_DAO3_AUTH`、`VITE_DAO3_UA`）；
  - 部署哪个 bundle（`VITE_CURRENT_FILE`）；
  - 构建后是否自动上传（`VITE_UPDATE_FILE`）。
- `dao3.config.ts` 负责声明「项目结构」：
  - bundle 列表；
  - 每个 bundle 的 client/server 入口等信息。

在构建流程中：

- 构建脚本会先读取 `.env` 和 `dao3.config.ts`，组合出「这一次要构建和上传什么」；
- 在你的 TypeScript 代码里，可以通过 `import.meta.env` 感知部分环境（如当前 bundle 名），从而做一些轻量分支逻辑。

## 4. `import.meta.glob`：批量导入模块

`import.meta.glob` 是 Vite 提供的一个工具，用于**按模式（glob）一次性收集多个模块**。

### 4.1 懒加载模式（默认）

默认情况下，`import.meta.glob` 返回的是**懒加载函数**：

```ts
const modules = import.meta.glob("./modules/*.ts");

for (const path in modules) {
  const loader = modules[path];
  loader().then((mod) => {
    // mod 就是对应文件的模块导出
    // 例如 mod.default、mod.register() 等
  });
}
```

适合场景：

- 模块较多，但只会在特定时机 / 条件下按需加载；
- 希望利用「代码分割」，减少首包体积。

### 4.2 `eager` 模式：一次性加载所有匹配模块

你也可以开启 `eager` 模式，在构建时**直接把所有匹配模块都加载进来**：

```ts
// eager: true 时，返回值是 Record<string, Module>
const modules = import.meta.glob("./modules/*.ts", { eager: true });

for (const path in modules) {
  const mod = modules[path];
  // 这里已经是具体模块对象，而不是函数
  // 可以直接调用导出，例如：
  // mod.register?.();
}
```

`eager` 的好处：

- 使用更简单，不需要 `await` / `then`；
- 在你确定「这些模块本来就应该一起加载」时更直观。

代价是：

- 所有匹配模块会被打进同一个构建产物里，不能再按需懒加载。

### 4.3 给模块加上类型

为了让 TypeScript 更聪明，你可以对 `modules` 做简单的类型标注。例如每个模块都导出一个 `register` 函数：

```ts
type ModuleWithRegister = {
  register: () => void;
};

const modules = import.meta.glob<ModuleWithRegister>("./modules/*.ts", {
  eager: true,
});

for (const mod of Object.values(modules)) {
  mod.register();
}
```

这样 IDE 会知道每个 `mod` 上有 `register()`，不会再把它当作 `any`。

不过也要注意：

- `import.meta.glob` 是 **构建期特性**，只能在被 Vite 处理的模块中使用；
- 如果只是少量模块，依然推荐使用显式 `import`，避免过度魔法化。

## 5. 关于 `import.meta.hot`

`import.meta.hot` 是 Vite 用于 **热模块替换（HMR）** 的接口，它允许你在模块内部声明：

- 模块被更新时如何处理旧状态；
- 是否要拦截默认的刷新行为。

在 ArenaPro 的使用场景里：

- 我们已经通过脚手架接好了常见的热更新流程；
- 绝大多数情况下，你**不需要**直接操作 `import.meta.hot`；
- 只要像平常一样保存文件，等待 Vite 和 Arena 帮你完成刷新即可。

如果你以后遇到非常高级的使用场景（例如手写某些 UI 层的热更新逻辑），再回到 Vite 官方文档查阅 `import.meta.hot` 的用法会更合适。
