# 快速上手 ArenaPro React

本章节会带你在几分钟内跑起第一个 React 界面。

本篇默认你已经大致了解 React 的基础概念（组件、JSX、Hooks 等），因此不会再展开讲解 React 原理，而是重点说明在神岛中如何实际落地使用。

本指南默认你在 **神岛客户端环境** 下开发 UI，不支持服务端使用。

## 准备工作

在开始之前，请确保你已经：

- 拥有一个可以正常运行的 ArenaPro 项目

在该项目根目录终端执行：

::: code-group

```sh [npm]
npm install @dao3fun/react-ui
```

```sh [pnpm]
pnpm install @dao3fun/react-ui
```

```sh [yarn]
yarn add @dao3fun/react-ui
```

```sh [bun]
bun add @dao3fun/react-ui
```

:::

## 配置 JSX

要在项目中正常使用 React 语法（JSX / TSX），需要确保：

1. **在 client 目录有有效的 `tsconfig.json`**
2. **UI 入口文件使用 `.tsx` 后缀**

```jsonc
{
  "compilerOptions": {
    "jsx": "react" // 确保启用 JSX 支持
  }
}
```

同时，请确认你的 UI 脚本文件使用 **`.tsx` 后缀**，例如：

- ✅ `client/src/clientApp.tsx`
- ❌ `client/src/clientApp.ts`

## 配置入口

1. 在项目根目录下打开 `dao3.config.ts` / `dao3.config.json`
2. 将脚本入口指向你的客户端入口文件，例如：

::: code-group

```json [dao3.config.json]
{
  "entry": "src/clientApp.tsx"
}
```

```json [dao3.config.ts]
{
  "entry": "App.tsx"
}
```

:::

## 确认

你可以在脚本里尝试写一段代码来确认：

```tsx
import React, { useState } from "react";
import { Box, Text } from "@dao3fun/react-ui";
import { createRoot } from "@dao3fun/react-ui/dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box onClick={() => setCount((c: number) => c + 1)}>
      <Text>你好，React！你点我了 {count} 次</Text>
    </Box>
  );
}

// ui 由神岛客户端提供，对应根 UI 节点
const root = createRoot(ui);
root.render(<App />);
```

在上面的示例中：

- **`<Box>`**  
  来自 `@dao3fun/react-ui` 的容器组件，对应神岛里的一个 UI 区域。  
  我们把 `onClick` 绑定在 `Box` 上，所以点击这块区域时就会触发计数加一。

- **`<Text>`**  
  文本组件，对应神岛里的 `UiText`。  
  用来显示「你好，React！你点我了 X 次」这样的文字内容。

- **`createRoot(ui)`**  
  `ui` 是神岛客户端提供的根 UI 节点。  
  `createRoot(ui)` 会在这个根节点上创建一个 React 渲染根，之后 `root.render(<App />)` 就会把 `App` 渲染到这个 UI 树上。

- **`useState` 计数逻辑**  
  `count` 表示当前点击次数。  
  每次点击 `<Box>` 时，调用 `setCount((c) => c + 1)`，触发组件重新渲染，`<Text>` 中显示的次数也会随之更新。

最终效果是：在神岛客户端中，会看到一块可点击的区域，显示一行文字「你好，React！你点我了 N 次」，每点一次，次数就会加一。

![](https://assets.box3.fun/u226/w4Doxb3bmb_u/92UgoQGEDrPbKVCEj_XVpcoi9VEDLjV98laM7xy1f94.gif)
