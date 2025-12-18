# useTimeline 是什么？

`useTimeline` 是一个很轻量的“时间轴” Hook：它在内部推进时间，并输出一个 `progress`（范围 0~1）。

你可以把这个 `progress` 用在两类地方：

- **驱动 `useMotion`**：把 `progress` 作为 `drivenProgress` 传给 `useMotion`，实现“外部控制进度”。
- **做通用插值**：用 `progress` 自己去映射任何业务值（例如冷却条、过场 UI、数值增长）。

## 示例：旋转 0~360

```tsx
import React from "react";
import { Box } from "@dao3fun/react-ui";
import { useTimeline } from "@dao3fun/react-motion";
import { createRoot } from "@dao3fun/react-ui/dom";

export function TimelineRotate() {
  const [t] = useTimeline({
    duration: 1200,
    autoPlay: true,
    loop: "infinite",
    yoyo: true,
  });

  const rotation = 360 * t;
  const s = 0.7 + 0.4 * t;
  const opacity = 0.35 + 0.65 * t;

  return (
    <Box
      style={{
        position: { offset: Vec2.create({ x: 30, y: 30 }) },
        size: {
          offset: Vec2.create({ x: 120, y: 120 }),
          scale: Vec2.create({ x: s, y: s }),
        },
        backgroundColor: Vec3.create({ r: 255, g: 64, b: 129 }),
        backgroundOpacity: opacity,
        rotation,
      }}
    />
  );
}
createRoot(ui).render(<TimelineRotate />);
```

## 常用参数

- **`duration`**：总时长（ms）
- **`delay`**：延迟启动（ms）
- **`autoPlay`**：是否自动播放
- **`loop`**：循环次数或 `"infinite"`
- **`yoyo`**：往返播放

## 常用组合：驱动 useMotion（drivenProgress）

当你希望 `useMotion` 的进度不由它内部播放逻辑决定，而是由你提供的进度决定：

```tsx
import React from "react";
import { Box } from "@dao3fun/react-ui";
import { useMotion, useTimeline } from "@dao3fun/react-motion";

export function DrivenByTimeline() {
  const [t] = useTimeline({ duration: 1200, autoPlay: true, loop: "infinite" });

  const [style] = useMotion<UiBox>({
    to: [
      { value: { rotation: 0 }, duration: 0 },
      { value: { rotation: 360 }, duration: 1200, ease: "linear" },
    ],
    drivenProgress: t,
  });

  return <Box style={style} />;
}
```
