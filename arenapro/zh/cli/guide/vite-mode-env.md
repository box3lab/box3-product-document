# 在代码中区分 development / production / debug 模式

这篇文章关注的是「**在代码里** 如何根据当前模式切换行为」。

关于 `npm run dev` / `npm run build` / VSCode debug 本身各自做什么，可以先参考：

- 《dev / build / debug 三种命令的使用场景》

很多时候，你会希望「**同一份脚本** 在开发、发布构建、调试构建时行为不一样」，例如：

- 开发模式多打一些日志；
- 发布构建去掉调试信息；
- debug 构建开启额外的断言 / 检查。

在 ArenaPro Vite 脚手架中，可以通过 `import.meta.env.MODE` 来区分当前运行模式。

## 1. `import.meta.env.MODE` 是什么？

脚手架会在构建时注入一个环境变量 `MODE` 到 Vite 的运行时环境中，你可以在任意脚本里通过 `import.meta.env.MODE` 读取：

```ts
const mode = import.meta.env.MODE;
```

约定的取值有三种：

- `development`
- `production`
- `debug`

## 2. 在代码中根据模式切换行为

最常见的用法就是根据 `MODE` 做条件分支：

```ts
const mode = import.meta.env.MODE;

if (mode === "development") {
  // 开发模式：打开详细日志 / DevTools
  logger.enableDebug();
} else if (mode === "debug") {
  // debug 构建：开启更严格的检查
  enableExtraAssertions();
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
export const isDebugBuild = mode === "debug";
```

然后在其它模块中直接使用：

```ts
import { isDev, isProd, isDebugBuild } from "./envMode";

if (isDev) {
  console.log("[DEV] extra logs...");
}

if (isDebugBuild) {
  enableExtraAssertions();
}

if (isProd) {
  // 只在正式环境上报埋点
  reportAnalytics();
}
```

## 3. 什么时候会是 debug 模式？

当你使用 debug 构建命令时（在 `package.json` 里预设的）：

- `debug:server`
- `debug:client`

脚手架会以 `MODE = "debug"` 的形式进行构建。此时：

- 你可以在代码中开启更严格的检查和断言；
- 同时保留源码映射（source map），方便断点调试；
- 可以选择暂时停止自动上传到 Arena，只在本地验证构建结果。

## 5. 实战建议

- **日志控制**：
  - 开发 / debug 模式打开详细日志；
  - 生产模式只保留必要日志。
- **特性开关**：
  - 在开发 / debug 模式下打开实验特性，在生产模式关闭；
- **断言与检查**：
  - debug 构建中打开成本较高的断言代码（如深度校验数据结构），生产模式下去掉。

通过 `import.meta.env.MODE` 做这些区分，可以在不修改构建脚本的前提下，让**同一份代码**在不同构建命令下表现出最合适的行为。
