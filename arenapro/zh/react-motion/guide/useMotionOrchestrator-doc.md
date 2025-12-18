# useMotionOrchestrator 是什么？

`useMotionOrchestrator` 用来做 **多动画编排**：当你有多个 `useMotion` 的控制器（`motion`）需要统一管理时，它可以帮你把“并行 / 串行 / 错峰 / 取消”这些逻辑集中起来。

它适合用在：

- 多个组件一起进场/退场
- Toast 队列、弹窗序列、引导步骤
- 粒子/卡片等批量动效

## 示例：并行播放两个 motion

```tsx
import React, { useRef } from "react";
import { Box, Text } from "@dao3fun/react-ui";
import { useMotion, useMotionOrchestrator } from "@dao3fun/react-motion";
import { createRoot } from "@dao3fun/react-ui/dom";

export function OrchestratorDemo() {
  const [s0, m0] = useMotion<UiBox>({
    autoPlay: false,
    to: [
      { value: { rotation: 0 }, duration: 0 },
      { value: { rotation: 180 }, duration: 1000, ease: "quadOut" },
    ],
  });

  const [s1, m1] = useMotion<UiBox>({
    autoPlay: false,
    to: [
      {
        value: {
          backgroundOpacity: 0.2,
          size: { scale: Vec2.create({ x: 0.3, y: 0.3 }) },
        },
        duration: 0,
      },
      {
        value: {
          backgroundOpacity: 1,
          size: { scale: Vec2.create({ x: 0.7, y: 0.7 }) },
        },
        duration: 1000,
        ease: "quadOut",
      },
    ],
  });

  const group = useMotionOrchestrator([m0, m1]);
  const lastRunRef = useRef<ReturnType<typeof group.parallel> | null>(null);

  const runParallel = () => {
    lastRunRef.current?.cancel();
    group.resetAll();
    lastRunRef.current = group.parallel();
  };

  const runSequence = () => {
    lastRunRef.current?.cancel();
    group.resetAll();
    lastRunRef.current = group.sequence();
  };

  return (
    <>
      <Box
        style={{
          position: { offset: Vec2.create({ x: 0, y: 0 }) },
          size: { offset: Vec2.create({ x: 140, y: 36 }) },
          backgroundColor: Vec3.create({ r: 76, g: 175, b: 80 }),
          backgroundOpacity: 1,
        }}
        onClick={runParallel}
      >
        <Text
          style={{
            position: { offset: Vec2.create({ x: 12, y: 8 }) },
            textFontSize: 14,
            textColor: Vec3.create({ r: 255, g: 255, b: 255 }),
          }}
        >
          同时播放
        </Text>
      </Box>

      <Box
        style={{
          position: { offset: Vec2.create({ x: 160, y: 0 }) },
          size: { offset: Vec2.create({ x: 140, y: 36 }) },
          backgroundColor: Vec3.create({ r: 255, g: 152, b: 0 }),
          backgroundOpacity: 1,
        }}
        onClick={runSequence}
      >
        <Text
          style={{
            position: { offset: Vec2.create({ x: 12, y: 8 }) },
            textFontSize: 14,
            textColor: Vec3.create({ r: 255, g: 255, b: 255 }),
          }}
        >
          顺序播放
        </Text>
      </Box>

      <Box
        style={{
          position: { offset: Vec2.create({ x: 0, y: 60 }) },
          size: { offset: Vec2.create({ x: 80, y: 80 }) },
          backgroundColor: Vec3.create({ r: 34, g: 197, b: 94 }),
          backgroundOpacity: 1,
          ...s0,
        }}
      />
      <Box
        style={{
          position: { offset: Vec2.create({ x: 100, y: 60 }) },
          size: { offset: Vec2.create({ x: 80, y: 80 }) },
          backgroundColor: Vec3.create({ r: 59, g: 130, b: 246 }),
          backgroundOpacity: 1,
          ...s1,
        }}
      />
    </>
  );
}
createRoot(ui).render(<OrchestratorDemo />);
```

## 常用方法

- `group.parallel()`
  - 同时播放所有 motion
- `group.sequence()`
  - 一个接一个播放
- `group.stagger(gapMs)`
  - 错峰播放：每个 motion 延迟 `gapMs` 开始

这些方法都会返回一个可取消的句柄，适合在“切换界面 / 组件卸载”时终止整个编排。
