# 欢迎来到 ArenaPro React Motion

示例项目：[UI 动画-示例](https://dao3.fun/exp/experience/detail/100536524)
（示例代码从设计到实现均由 Chat GPT5.2 自动生成）

## 什么是 ArenaPro React Motion？

ArenaPro React Motion 是一套 **适用于神岛 Arena 客户端 React UI** 的轻量动画库。

它的目标不是“做一个 Web 动画引擎”，而是用更贴近神岛 UI 的方式解决两类常见问题：

- **关键帧驱动的 UI 动效**：让一个样式对象按时间从 A 过渡到 B（并支持缓动、循环、yoyo）。
- **多动画编排**：多个动效并行 / 串行 / 错峰播放，并能在需要时取消。

## 安装

::: code-group

```sh [npm]
npm install @dao3fun/react-motion
```

```sh [pnpm]
pnpm install @dao3fun/react-motion
```

```sh [yarn]
yarn add @dao3fun/react-motion
```

```sh [bun]
bun add @dao3fun/react-motion
```

:::

## 运行环境与前置依赖

ArenaPro React Motion 面向 **神岛 Arena 客户端的 React UI** 场景：

- **UI 渲染**：配合 `@dao3fun/react-ui` 使用（`Box/Text` 等 UI 组件）。
- **运行时**：在神岛客户端环境中运行；示例里的 `ui` 为根节点，`createRoot(ui)` 后即可渲染。
- **数学类型**：示例里用到的 `Vec2/Vec3` 等通常由神岛运行时提供；

## 示例：点击触发一个动效

点击后让一个 `Box` 从红色淡出。

![](https://assets.box3.fun/u226/3s8FACqRrUPa/x9vmSFkvnAnhkeUJQuRExTGQ6zzbUn30XeLJuvUgH2c.gif)

```tsx
import React from "react";
import { Box, Text } from "@dao3fun/react-ui";
import { createRoot } from "@dao3fun/react-ui/dom";
import { useMotion } from "@dao3fun/react-motion";

// 神岛 UI 的颜色用 Vec3 表示（r/g/b: 0~255）
const RED = Vec3.create({ r: 255, g: 0, b: 0 });
const WHITE = Vec3.create({ r: 255, g: 255, b: 255 });

export function HelloMotion() {
  // useMotion 返回：
  // 1) style：当前时刻计算出来的样式（直接合并进组件 style）
  // 2) motion：控制器（play/pause/reset/seek...）
  const [style, motion] = useMotion<UiBox>({
    // 这里演示“点击触发”，所以不自动播放
    autoPlay: false,

    // to 是关键帧数组：每段有 value(目标样式) + duration(时长) + ease(缓动)
    to: [
      // 第 0 段：立刻设置为完全不透明（作为起始状态）
      { value: { backgroundOpacity: 1 }, duration: 0 },

      // 第 1 段：560ms 内从 1 -> 0（逐渐淡出）
      { value: { backgroundOpacity: 0 }, duration: 560, ease: "quadOut" },

      // 第 2 段：淡出结束后，直接隐藏（避免透明但仍可点击/占位）
      { value: { visible: false }, duration: 0 },
    ],
  });

  return (
    <Box
      // 先给一个固定底色，再把 motion 计算出来的 style 合并进来
      style={{
        backgroundColor: RED,
        ...style,
      }}
      // 点击后开始播放关键帧
      onClick={motion.play}
    >
      <Text
        style={{
          textColor: WHITE,
        }}
      >
        点我触发淡出
      </Text>
    </Box>
  );
}

// 神岛客户端里 ui 是根节点；createRoot(ui) 后即可渲染 React 组件
createRoot(ui).render(<HelloMotion />);
```

你会注意到：

- **`to` 是一组关键帧**：每一帧用 `value` 表示目标样式，用 `duration` 表示这一段时间。
- **`useMotion` 返回两个值**：
  - `style`：计算出来的“当前帧样式”（直接喂给组件 `style`）
  - `motion`：控制器（`play/pause/reset/...`）
