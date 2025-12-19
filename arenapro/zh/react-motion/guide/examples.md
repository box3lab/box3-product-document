# 示例合集

提示：示例默认运行在 **神岛 Arena 客户端 React UI** 环境；示例里的 `ui` 为根节点，`createRoot(ui)` 后即可渲染。

## 1) 自动播放一个关键帧动画

![](https://assets.box3.fun/u226/r2i_IBHu5s2G/9He7JIyygGuOwB7ETpFofRloeW-W30ZRAuH5AP4tfDc.gif)

这个示例展示 `useMotion` 的最小闭环：只提供 `to`（关键帧数组），开启 `autoPlay` 后组件会在挂载时自动从第一段播放到最后一段。

你可以关注：

- **`to`**：每一段用 `value` 描述目标样式，用 `duration` 描述该段时长。
- **`ease`**：缓动会影响该段“时间进度 -> 动效进度”的映射（这里用 `quadOut`）。

```tsx
import React from "react";
import { createRoot } from "@dao3fun/react-ui/dom";
import { Box } from "@dao3fun/react-ui";
import { useMotion } from "@dao3fun/react-motion";

export function App() {
  const [style] = useMotion<UiBox>({
    to: [
      { value: { backgroundOpacity: 0 }, duration: 0 },
      { value: { backgroundOpacity: 1 }, duration: 1000, ease: "quadOut" },
    ],
    autoPlay: true,
  });

  return <Box style={style} />;
}

createRoot(ui).render(<App />);
```

## 2) 手动触发一个关键帧动画

![](https://assets.box3.fun/u226/r2i_IBHu5s2G/0iPHbeXg0AKeT7ZQe93eOfaoJHIaaA5AxDGfdMYlTVc.gif)

这个示例展示“交互触发”：把 `autoPlay` 关掉，通过 `motion.play()` 在点击时开始播放。

你可以关注：

- **第二个返回值 `motion`**：它是控制器，用来 `play/pause/reset/...`。
- **`duration: 0`**：常用于“立刻把样式对齐到起始状态”（比如先设置为完全不透明）。

```tsx
import React from "react";
import { createRoot } from "@dao3fun/react-ui/dom";
import { Box, Text } from "@dao3fun/react-ui";
import { useMotion } from "@dao3fun/react-motion";

export function App() {
  const [style, motion] = useMotion<UiBox>({
    autoPlay: false,
    to: [
      { value: { backgroundOpacity: 1 }, duration: 0 },
      { value: { backgroundOpacity: 0 }, duration: 400, ease: "quadOut" },
    ],
  });

  return (
    <Box style={style} onClick={motion.play}>
      <Text style={{ textFontSize: 14 }}>点我播放</Text>
    </Box>
  );
}

createRoot(ui).render(<App />);
```

## 3) 循环与往返

![](https://assets.box3.fun/u226/r2i_IBHu5s2G/BcTc6M5KdYHWH65SzralNQfqFr3MNvVvz75__imjBH8.gif)

这个示例展示循环与往返播放：

- `loop: "infinite"`：无限循环。
- `yoyo: true`：每次播到结尾会反向播回去（0->1->0->1...）。

适合用在呼吸灯、提示动效、循环等待态等场景。

```tsx
import React from "react";
import { createRoot } from "@dao3fun/react-ui/dom";
import { Box } from "@dao3fun/react-ui";
import { useMotion } from "@dao3fun/react-motion";

export function App() {
  const [style] = useMotion<UiBox>({
    loop: "infinite",
    yoyo: true,
    autoPlay: true,
    to: [
      { value: { backgroundOpacity: 0 }, duration: 0 },
      { value: { backgroundOpacity: 1 }, duration: 1000, ease: "sineInOut" },
    ],
  });

  return <Box style={style} />;
}

createRoot(ui).render(<App />);
```

## 4) 外部数据驱动进度

![](https://assets.box3.fun/u226/r2i_IBHu5s2G/yXkZndZDq2rTeAT6D1_kvYVYwAgMtA8VaPNsOW5csNY.gif)

`useTimeline` 产出 `0~1` 的进度；把它传给 `useMotion.drivenProgress` 后，motion 不再内部计时推进。

你可以把它理解为：“`useTimeline` 负责产出时间进度，`useMotion` 负责把进度映射成样式”。

你可以关注：

- **`drivenProgress` 传入后**，通常不需要对该 motion 调用 `play()`。
- 关键帧里的 `duration` 仍然有意义：它用于把整体进度拆分到各段（每段占比由时长决定）。

```tsx
import React from "react";
import { createRoot } from "@dao3fun/react-ui/dom";
import { Box } from "@dao3fun/react-ui";
import { useMotion, useTimeline } from "@dao3fun/react-motion";

export function App() {
  const [t] = useTimeline({
    duration: 1000,
    autoPlay: true,
    loop: "infinite",
  });

  const [style] = useMotion<UiBox>({
    to: [
      { value: { rotation: 0 }, duration: 0 },
      { value: { rotation: 360 }, duration: 1000 },
    ],
    drivenProgress: t,
  });

  return <Box style={style} />;
}

createRoot(ui).render(<App />);
```

## 5) 等待完成与取消

![](https://assets.box3.fun/u226/r2i_IBHu5s2G/_H-FiViXldBS8cX4KRzALkCSXZ24Y9yCPfRC4EKHGTA.gif)

这个示例展示如何“拿到播放句柄并等待完成”。`motion.play()` 会返回 `MotionPlayHandle`，你可以：

- `await handle.finished`：等待播放结束/被取消/被 reset。
- `handle.cancel()`：在需要时中断本次播放（例如组件卸载、重复触发要打断上一轮）。

这里用 `console.log("finished")` 演示“播放完成后再做事”的时机。

```tsx
import React from "react";
import { createRoot } from "@dao3fun/react-ui/dom";
import { Box, Text } from "@dao3fun/react-ui";
import { useMotion } from "@dao3fun/react-motion";

export function App() {
  const [style, motion] = useMotion<UiBox>({
    autoPlay: false,
    to: [
      { value: { backgroundOpacity: 1 }, duration: 0 },
      { value: { backgroundOpacity: 0 }, duration: 800, ease: "quadOut" },
      { value: { backgroundOpacity: 1 }, duration: 800, ease: "quadIn" },
    ],
  });

  const onClick = async () => {
    const handle = motion.play();
    await handle.finished;
    console.log("finished");
  };

  return (
    <Box style={style} onClick={onClick}>
      <Text style={{ textFontSize: 14 }}>点我播放并等待结束</Text>
    </Box>
  );
}

createRoot(ui).render(<App />);
```

## 6) 多动画编排

当你有多个 motion 需要统一调度（一起进场、一起退场、错峰播放）时，可以用 `useMotionOrchestrator` 把控制逻辑集中管理。

### 6.1 并行播放

![](https://assets.box3.fun/u226/r2i_IBHu5s2G/m7rnfUutjDM0RiG_apcer9eYsVn-diB4vCVMDDFumK4.gif)

这个示例把两个 `useMotion` 的控制器交给 orchestrator：每次点击会取消上一轮，然后重置并并行播放。

你可以关注：

- `group.resetAll()`：让所有 motion 回到起始状态。
- `group.parallel()`：并行播放所有 motion，返回一个可取消的句柄。

```tsx
import React, { useRef } from "react";
import { createRoot } from "@dao3fun/react-ui/dom";
import { Box, Text } from "@dao3fun/react-ui";
import { useMotion, useMotionOrchestrator } from "@dao3fun/react-motion";

export function App() {
  const [s0, m0] = useMotion<UiBox>({
    autoPlay: false,
    to: [
      { value: { rotation: 0 }, duration: 0 },
      { value: { rotation: 180 }, duration: 600, ease: "quadOut" },
    ],
  });

  const [s1, m1] = useMotion<UiBox>({
    autoPlay: false,
    to: [
      { value: { backgroundOpacity: 0.2 }, duration: 0 },
      { value: { backgroundOpacity: 1 }, duration: 600, ease: "quadOut" },
    ],
  });

  const group = useMotionOrchestrator([m0, m1]);
  const lastRunRef = useRef<ReturnType<typeof group.parallel> | null>(null);

  const runParallel = () => {
    lastRunRef.current?.cancel();
    group.resetAll();
    lastRunRef.current = group.parallel();
  };

  return (
    <>
      <Box onClick={runParallel} style={{ ...s0 }} />
      <Box
        onClick={runParallel}
        style={{ position: { scale: Vec2.create({ x: 0.3, y: 0.3 }) }, ...s1 }}
      />
    </>
  );
}

createRoot(ui).render(<App />);
```

### 6.2 串行播放

![](https://assets.box3.fun/u226/r2i_IBHu5s2G/HstuxaW1NwfWN7wSoYMJMupwGfrIZ3seMyHZMy0XCW0.gif)

串行播放适合“一个接一个”的动效队列（例如多个元素依次出现）。

上面的项目里，把 `group.parallel()` 改成 `group.sequence()` 即可：

```ts
lastRunRef.current = group.sequence();
```

### 6.3 错峰播放

错峰播放适合“整体并行但有节奏差”的效果：每个 motion 会相对前一个延迟 `gapMs` 开始。

上面的项目里，把 `group.parallel()` 改成 `group.stagger(1000)` 即可：

```ts
lastRunRef.current = group.stagger(1000);
```
