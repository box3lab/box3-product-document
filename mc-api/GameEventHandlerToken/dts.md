# GameEventHandlerToken / TickInfo（d.ts 对齐）

> 本页内容从 `mc-api/globals.d.ts` 抽取，作为当前模块的权威签名。

```typescript
declare class GameEventHandlerToken {
  /** 取消事件监听 (不可逆)。Cancels the event listener (irreversible). */
  cancel(): void;

  /**
   * 尝试恢复已取消的监听 (会抛出 UnsupportedOperationException)。
   * Attempts to resume a cancelled listener — always throws UnsupportedOperationException.
   * @throws UnsupportedOperationException 始终抛出 / always thrown
   */
  resume(): void;

  /** 返回 true 表示监听仍处于活跃状态。Returns true if the listener is still active. */
  active(): boolean;
}

/**
 * onTick 回调的参数类型。
 * The info object passed to onTick handlers.
 */
interface TickInfo {
  /** 当前 tick 数。Current tick count. */
  tick: number;
  /** 上一 tick 数。Previous tick count. */
  prevTick: number;
  /** 自启动以来的毫秒数。Milliseconds elapsed since server start. */
  elapsedTimeMS: number;
  /** 跳过的 tick 数 (MC 下始终为 0)。Number of skipped ticks (always 0 in MC). */
  skip: number;
}

```
