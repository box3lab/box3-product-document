# 使用 react-i18next 做多语言

本节介绍如何在 ArenaPro React 项目中集成 [react-i18next](https://react.i18next.com/)，实现界面多语言切换。

> 前置要求：已经创建好一个基础的 ArenaPro React 项目，并具有可运行的 React 客户端代码。

## 安装依赖

在项目中安装 `react-i18next` 依赖：

::: code-group

```sh [npm]
npm install react-i18next
```

```sh [pnpm]
pnpm install react-i18next
```

```sh [yarn]
yarn add react-i18next
```

```sh [bun]
bun add react-i18next
```

:::

## 修改 i18n 实例

接着在项目的 `i18n/index.ts` 中接入 `react-i18next` 插件：

```ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 主要新增 use(initReactI18next)
i18n.use(initReactI18next).init({
  // 其他配置
});

export default i18n;
```

然后在你的 React 入口文件中引入该模块，保证在渲染前完成初始化，例如：

```ts
// client/src/App.ts
import "@root/i18n"; // 在入口文件导入一次即可

// ...
```

> 关键点：`import '@root/i18n';` 必须在 `render` 之前执行。

## 在组件中使用 useTranslation

在任意 React 组件中，可以通过 `useTranslation` 读取国际化文案：

```tsx
// client/src/App.tsx
import React from "react";
import "@root/i18n";
import { Box, Text } from "@dao3fun/react-ui";
import { useTranslation } from "react-i18next";
import { createRoot } from "@dao3fun/react-ui/dom";

export function App() {
  const { t } = useTranslation();

  return (
    <Box
      style={{
        backgroundOpacity: 0.6,
      }}
    >
      <Text>{t("welcome_game")}</Text>
    </Box>
  );
}
const root = createRoot(ui);
root.render(<App />);
```

说明：

- `const { t } = useTranslation()` 获取翻译函数 `t`
- `t('welcome_game')` 会根据当前语言解析对应的文案

## 普通 i18n vs react-i18next：行为对比

下面这个完整示例，对比了 **直接调用 `i18n.t`** 和 **在组件中使用 `useTranslation`** 的效果：

- 点击根组件切换语言（在 `zh-CN` / `en` 间切换）
- 对比不同位置的 `i18n.t` 与 `useTranslation` 文案是否会随着语言变化而自动更新

```tsx
import React, { memo } from "react";
import { Box, Text } from "@dao3fun/react-ui";
import { createRoot } from "@dao3fun/react-ui/dom";
import i18n from "@root/i18n";
import { useTranslation } from "react-i18next";

const PlainI18nText = memo(() => {
  return <Text y={90}>【子组件】直接 i18n.t：{i18n.t("welcome_game")}</Text>;
});

const HookText: React.FC = () => {
  const { t } = useTranslation();
  return <Text y={110}>【子组件】useTranslation：{t("welcome_game")}</Text>;
};

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = () => {
    if (i18n.language === "zh-CN") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("zh-CN");
    }
  };

  return (
    <Box x={100} onClick={changeLanguage}>
      <Text>切换语言测试</Text>
      <Text y={30}>【当前组件】useTranslation：{t("welcome_game")}</Text>
      <Text y={60}>【当前组件】直接 i18n.t：{i18n.t("welcome_game")}</Text>
      <PlainI18nText />
      <HookText />
    </Box>
  );
}

// ui 由神岛客户端提供，对应根 UI 节点
const root = createRoot(ui);
root.render(<App />);
```

![](https://assets.box3.fun/u226/gds6yBnCNtZ8/iZk8I4k1KTgmDg4yn1FG_H6IfX-jxuGRg06HJdGXn7k.gif)

**对比说明：**

- 在同一个组件中：
  - 使用 `useTranslation` 的 `t('welcome_game')` 会随着 `i18n.language` 改变自动触发重渲染。
  - 直接在 JSX 里调用 `i18n.t('welcome_game')`，也能显示当前语言，但是否更新取决于组件有没有因为别的状态变化而重新渲染。
- 在子组件中：
  - 使用 `useTranslation` 的 `HookText`，会在语言变更时自动更新文案。
  - 只用 `i18n.t` 的 `PlainI18nText`，如果自身没有因 props/state 变化触发重渲染，就可能一直停留在旧文案。

因此，**在 React 组件里推荐优先使用 `useTranslation`**：

- 它会自动处理订阅/重渲染逻辑，更符合 React 的数据流模式；
- 而 `i18n.t` 更适合在非 React 环境（例如纯逻辑模块、服务端代码）里直接调用。

### 在非 React 代码里想用 i18next

在非 React 代码（例如工具函数、服务端逻辑）中，也可以直接复用同一个 `i18n` 实例：

```ts
import i18n from "@root/i18n";

const text = i18n.t("welcome_game");
```

> 注意：在非 React 环境下使用时，仍需保证 `i18n` 已按前述方式初始化。
