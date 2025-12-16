# React 钩子函数（Hooks）

在 ArenaPro React 中，你既可以使用标准 React 的 Hooks，也可以使用一些**针对神岛场景封装的实用 Hook**。本章节主要介绍几个常用的「神岛实用 Hook」及它们适合解决的问题。

导入方式：

```ts
import { useScreenSize, useClientRemoteChannel } from "@dao3fun/react-ui/hooks";
```

下面示例中出现的 `useState` / `useEffect` / `useRef` / `useCallback` 均来自 React 本身。

## useScreenSize：监听屏幕尺寸变化

**作用：**

- 提供当前游戏屏幕的宽度和高度，并在屏幕尺寸变化时自动更新。
- 适合做自适应布局、按分辨率调整 UI。

**使用示例：**

```tsx
import { useScreenSize } from "@dao3fun/react-ui/hooks";

function ResponsivePanel() {
  const { screenWidth, screenHeight } = useScreenSize();

  return (
    <Box>
      <Text>
        当前分辨率：{screenWidth} × {screenHeight}
      </Text>
    </Box>
  );
}
```

## useClientRemoteChannel：客户端 ↔ 服务端事件通道

**作用：**

- 封装客户端与服务端之间的事件收发逻辑。
- 自动订阅服务端事件，保存最近一次收到的事件，并提供一个 `send` 方法发送事件到服务端。

**使用示例：**

```tsx
import { useClientRemoteChannel } from "@dao3fun/react-ui/hooks";

type ServerEvent =
  | { type: "chat"; message: string }
  | { type: "system"; code: number };

function ChatPanel() {
  const { lastEvent, send } = useClientRemoteChannel<ServerEvent>();

  useEffect(() => {
    if (!lastEvent) return;
    if (lastEvent.type === "chat") {
      console.log("收到聊天消息：", lastEvent.message);
    }
  }, [lastEvent]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    send({ type: "chat", message: text });
  };

  return (
    <Box>
      <Input
        placeholder="输入聊天内容，回车发送"
        onChange={(value) => handleSend(value)}
      />
    </Box>
  );
}
```

## useAudio：管理音频加载与状态

**作用：**

- 根据给定音频地址创建并管理一个底层 `Audio` 实例。
- 提供一个简单的状态机：`idle` / `loading` / `ready` / `ended` / `error`。

**使用示例：**

```tsx
import { useAudio } from "@dao3fun/react-ui/hooks";

function BgmController() {
  const { audio, status } = useAudio(
    "https://static.dao3.fun/block/QmSkEpcxqFYvZNwZg2EwzTz7y9XNxQnChZ18CDCM8Q8uvE"
  );

  useEffect(() => {
    if (!audio) return;
    if (status === "ready") {
      audio.play();
    }
  }, [audio, status]);

  return <Text>当前音频状态：{status}</Text>;
}
```

## usePointerLock：指针锁定状态管理

**作用：**

- 监听并控制「鼠标指针锁定」（pointer lock）状态。
- 提供当前是否锁定、错误次数，以及主动锁定/解锁的方法。

**使用示例：**

```tsx
import { usePointerLock } from "@dao3fun/react-ui/hooks";

function FpsLikeController() {
  const { isLocked, lockPointer, unlockPointer, errorCount } = usePointerLock();

  return (
    <Box>
      <Text>当前是否锁定：{isLocked ? "是" : "否"}</Text>
      <Text>发生错误次数：{errorCount}</Text>

      <Box onClick={lockPointer}>
        <Text>锁定指针</Text>
      </Box>

      <Box onClick={unlockPointer}>
        <Text>解除锁定</Text>
      </Box>
    </Box>
  );
}
```
