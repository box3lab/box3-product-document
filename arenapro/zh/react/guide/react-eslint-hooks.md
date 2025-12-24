# 使用 ESLint 检查 React Hooks

- 项目已经使用 React
- 项目中已经初始化好 ESLint

## 安装依赖

在项目根目录执行命令：

::: code-group

```sh [npm]
npm install -D eslint-plugin-react-hooks
```

```sh [pnpm]
pnpm install -D eslint-plugin-react-hooks
```

```sh [yarn]
yarn add -D eslint-plugin-react-hooks
```

```sh [bun]
bun add -D eslint-plugin-react-hooks
```

:::

## 在 ESLint 中启用插件

示例（以 `eslint.config.mjs` 为例）：

```js
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks"; // [!code ++]

// ...

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...tseslint.configs.recommended.map((item) => {
    return { ignores: ignoresArr, ...item };
  }),
  reactHooks.configs.flat.recommended, // [!code ++]
  // ...
];
```

## 核心规则与更多说明

关于规则的详细设计背景、更多示例和推荐实践，建议直接参考 [React 官方规则](https://zh-hans.react.dev/reference/eslint-plugin-react-hooks)

## 快速自测是否生效

可以用一段故意写错的 Hooks 代码，来简单检查插件是否已经启用。

```tsx
import { useEffect, useState } from "react";

export function BadHooks({ value }: { value: number }) {
  if (value > 0) {
    // ❌ 条件里调用 Hook，会违反 rules-of-hooks
    const [count, setCount] = useState(0);

    useEffect(() => {
      // ❌ 使用了 value 和 count，但依赖数组留空
      console.log(value, count);
    }, []);
  }

  return null;
}
```

如果 `eslint-plugin-react-hooks` 已经正确启用，你应该能看到至少一条关于 `rules-of-hooks` 或 `exhaustive-deps` 的报错/警告；如果完全没有相关提示，多半是 eslint 插件未安装、未在配置中启用，或该文件未被 ESLint 匹配到。
