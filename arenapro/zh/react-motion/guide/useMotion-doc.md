# useMotion 是什么？

`useMotion` 用来做 **关键帧动画**：你写一组关键帧（每帧是一个“部分样式对象”），它会在时间推进时做插值，并输出一个可以直接喂给组件的 `style`。

## 关键帧怎么写？

`to` 是一个数组，每一项就是一段关键帧：

- `value`：目标样式（只写你想动画的字段）
- `duration`：这段时长（ms）
- `ease`：缓动（例如 `"linear"` / `"quadOut"` / `"bounceOut"` 等）

## 示例：自动淡入（autoPlay）

```tsx
import React from "react";
import { Box } from "@dao3fun/react-ui";
import { useMotion } from "@dao3fun/react-motion";
import { createRoot } from "@dao3fun/react-ui/dom";

export function FadeIn() {
  const [style] = useMotion<UiBox>({
    autoPlay: true,
    to: [
      { value: { backgroundOpacity: 0 }, duration: 0 },
      { value: { backgroundOpacity: 1 }, duration: 2000, ease: "quadOut" },
    ],
  });

  return <Box style={style} />;
}
createRoot(ui).render(<FadeIn />);
```

如果你需要“反向播放”，可以使用 `motion.reverse(1 | -1)` 设置方向，再调用 `play()`。

## 点击触发：用 motion.play()

`useMotion` 的第二个返回值是控制器 `motion`。你可以把 `autoPlay` 关掉，然后在点击/悬停等交互里触发：

```tsx
import React from "react";
import { Box } from "@dao3fun/react-ui";
import { useMotion } from "@dao3fun/react-motion";
import { createRoot } from "@dao3fun/react-ui/dom";

export function FadeIn() {
  const [style, motion] = useMotion<UiBox>({
    autoPlay: false,
    to: [
      { value: { backgroundOpacity: 1 }, duration: 0 },
      { value: { backgroundOpacity: 0 }, duration: 2000, ease: "quadOut" },
    ],
  });

  return <Box style={style} onClick={motion.play} />;
}
createRoot(ui).render(<FadeIn />);
```

## 循环与往返：loop / yoyo

你可以让动画循环播放，或者“到头后反向播放”（yoyo）：

```tsx
import React from "react";
import { Box } from "@dao3fun/react-ui";
import { useMotion } from "@dao3fun/react-motion";
import { createRoot } from "@dao3fun/react-ui/dom";

export function FadeIn() {
  const [style] = useMotion<UiBox>({
    autoPlay: true,
    loop: "infinite",
    yoyo: true,
    to: [
      { value: { backgroundOpacity: 0 }, duration: 0 },
      { value: { backgroundOpacity: 1 }, duration: 2000, ease: "quadOut" },
    ],
  });

  return <Box style={style} />;
}
createRoot(ui).render(<FadeIn />);
```

## 分段与定位：seekToSegment / setProgress

当你希望把动画“跳到第 N 段”，或者直接把进度定位到某个位置，可以使用控制器方法：

```ts
const [style, motion] = useMotion<UiBox>({ autoPlay: false, to: frames });

motion.seekToSegment(1); // 跳到第 1 段（从0开始），对应到 { value: { backgroundOpacity: 1 }, duration: 2000, ease: "quadOut" }

motion.setProgress(0.5); // 直接定位到 50% 进度
```

## 播放句柄：取消 / 等待完成

`motion.play()` 会返回一个句柄（`MotionPlayHandle`），适合在“组件卸载/切换场景”时取消播放，或等待播放完成：

```ts
const handle = motion.play();

// 取消
handle.cancel();

// 等待完成
await handle.finished;
```

当 `handle.finished` resolve 时，会带上原因（`reason`）：

- `finished`：自然播放结束且不再循环
- `cancelled`：被 `cancel()` 中断
- `reset`：被 `reset()` 终止并回到起始状态

## 外部驱动进度：drivenProgress

如果你传入了 `drivenProgress`，`useMotion` **不会再内部自动计时推进**，你需要自行更新进度值（通常来自 `useTimeline`）。
