# 在代码中区分 development / production 模式

这篇文章关注的是「**在代码里** 如何根据当前模式切换行为」。

关于 `npm run dev` / `npm run build` 各自做什么，可以先参考：

- 《dev / build 三种命令的使用场景》

很多时候，你会希望「**同一份脚本** 在开发、发布构建、调试构建时行为不一样」，例如：

- 开发模式多打一些日志；
- 发布构建去掉调试信息；

在 ArenaPro Vite 脚手架中，可以通过 `import.meta.env.MODE` 来区分当前运行模式。

## 1. `import.meta.env.MODE` 是什么？

脚手架会在构建时注入一个环境变量 `MODE` 到 Vite 的运行时环境中，你可以在任意脚本里通过 `import.meta.env.MODE` 读取：

```ts
const mode = import.meta.env.MODE;
```

常用取值有两种：

- `development`
- `production`

## 2. 在代码中根据模式切换行为

最常见的用法就是根据 `MODE` 做条件分支：

```ts
const mode = import.meta.env.MODE;

if (mode === "development") {
  // 开发模式：打开详细日志 / DevTools
  logger.enableDebug();
} else if (mode === "production") {
  // 线上构建：关闭多余日志
  logger.disableDebug();
}
```

你也可以封装一个小工具函数，避免在项目里到处写字符串：

```ts
const mode = import.meta.env.MODE;

export const isDev = mode === "development";
export const isProd = mode === "production";
```

然后在其它模块中直接使用：

```ts
import { isDev, isProd } from "./envMode";

if (isDev) {
  console.log("[DEV] extra logs...");
}

if (isProd) {
  // 只在正式环境上报埋点
  reportAnalytics();
}
```

## 5. 实战建议

- **日志控制**：
  - 开发模式打开详细日志；
  - 生产模式只保留必要日志。
- **特性开关**：
  - 在开发模式下打开实验特性，在生产模式关闭；
- **断言与检查**：
  - 生产模式下去掉成本较高的断言代码（如深度校验数据结构）。

通过 `import.meta.env.MODE` 做这些区分，可以在不修改构建脚本的前提下，让**同一份代码**在不同构建命令下表现出最合适的行为。
