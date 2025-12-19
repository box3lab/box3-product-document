# Hooks

本页列出 React Motion 提供的核心 Hooks。

## useMotion

**用途**：关键帧动画 Hook，按关键帧推进并输出可直接使用的 `style`。

**签名（概念）**：

`useMotion‹T extends UiRenderable›(options: UseMotionOptions‹T›)`

**返回值**：

| 返回值   | 类型                  | 说明                                                              |
| -------- | --------------------- | ----------------------------------------------------------------- |
| `style`  | `Partial‹T›`          | 当前时刻计算出的样式/属性，直接合并进组件 `style` 即可            |
| `motion` | `UseMotionController` | 控制器：播放/暂停/重置/定位等（兼容 `MotionController` 最小接口） |

**参数（UseMotionOptions‹T›）**：

| 参数             | 类型（概念）           | 默认值  | 说明                                            |
| ---------------- | ---------------------- | ------- | ----------------------------------------------- |
| `to`             | `MotionKeyframe‹T›[]`  | -       | 关键帧数组，每段包含 `value/duration/ease`      |
| `delay`          | `number`               | `0`     | 起播延迟（ms）                                  |
| `speed`          | `number`               | `1`     | 速度倍率（> 0）                                 |
| `autoPlay`       | `boolean`              | `true`  | 是否自动播放                                    |
| `drivenProgress` | `number \| undefined`  | -       | 外部驱动进度（0~1）。传入后内部不再自动计时推进 |
| `loop`           | `number \| "infinite"` | `0`     | 循环次数；`"infinite"` 表示无限循环             |
| `yoyo`           | `boolean`              | `false` | 是否往返播放（A->B->A）                         |
| `onStart`        | `() =› void`           | -       | 第一次开始播放时触发                            |
| `onUpdate`       | `(payload) =› void`    | -       | 每次样式更新时触发（见下方 payload）            |
| `onComplete`     | `() =› void`           | -       | 自然播放结束且不再循环时触发                    |

**onUpdate(payload)**：

| 字段       | 类型（概念） | 说明                 |
| ---------- | ------------ | -------------------- |
| `progress` | `number`     | 当前进度（0~1）      |
| `style`    | `Partial‹T›` | 当前时刻计算出的样式 |

**相关类型**：

**EasingFn**：

| 类型                    | 说明                                             |
| ----------------------- | ------------------------------------------------ |
| `(t: number) => number` | `t` 为归一化进度（0~1），返回缓动后的进度（0~1） |

**EasingName**：内置缓动预设名称。

`'linear' | 'sineIn' | 'sineOut' | 'sineInOut' | 'smoothstep' | 'smootherstep' | 'easeInOut' | 'easeIn' | 'easeOut' | 'quadIn' | 'quadOut' | 'quadInOut' | 'cubicIn' | 'cubicOut' | 'cubicInOut' | 'quartIn' | 'quartOut' | 'quartInOut' | 'quintIn' | 'quintOut' | 'quintInOut' | 'expoIn' | 'expoOut' | 'expoInOut' | 'circIn' | 'circOut' | 'circInOut' | 'backIn' | 'backOut' | 'backInOut' | 'bounceIn' | 'bounceOut' | 'bounceInOut' | 'springIn' | 'springOut' | 'springInOut' | 'elasticIn' | 'elasticOut' | 'elasticInOut'`

在关键帧里填 `ease` 时，可以传入预设名（`EasingName`）或自定义 `EasingFn`。

**OffsetScaleConfig**：用于 `position/size` 字段的偏移与缩放配置。

| 字段     | 类型   | 说明                |
| -------- | ------ | ------------------- |
| `offset` | `Vec2` | 尺寸偏移量          |
| `scale`  | `Vec2` | 尺寸缩放比例（0~1） |

**MotionKeyframeValue‹T›**：关键帧的 `value` 类型（只对传入字段做动画）。

- `position?: OffsetScaleConfig`
- `size?: OffsetScaleConfig`
- 其余字段：`Partial<T>`（但不包含 `position/size` 原始字段）

**MotionKeyframe‹T›**：单个关键帧。

| 字段       | 类型（概念）             | 说明                                 |
| ---------- | ------------------------ | ------------------------------------ |
| `value`    | `MotionKeyframeValue‹T›` | 部分样式对象；只会对传入的字段做动画 |
| `duration` | `number`                 | 该段动画的持续时间（ms）             |
| `ease`     | `EasingName \| EasingFn` | 可传预设名或自定义缓动函数           |

**控制器（UseMotionController）方法**：

| 方法               | 返回值             | 说明                                        |
| ------------------ | ------------------ | ------------------------------------------- |
| `play()`           | `MotionPlayHandle` | 开始或继续播放，返回可取消句柄与 `finished` |
| `reverse(dir)`     | `void`             | 设置播放方向：`1` 正向，`-1` 反向           |
| `pause()`          | `void`             | 暂停                                        |
| `reset()`          | `void`             | 重置（回到初始状态/进度）                   |
| `setProgress(p)`   | `void`             | 设置整体进度（0~1）                         |
| `seekToSegment(i)` | `void`             | 跳到第 `index` 段片段的起点                 |

**控制器（UseMotionController）状态字段（常用）**：

| 字段        | 类型      | 说明                          |
| ----------- | --------- | ----------------------------- |
| `isPlaying` | `boolean` | 是否正在播放                  |
| `progress`  | `number`  | 当前整体进度（0~1）           |
| `direction` | `number`  | 当前方向：`1` 正向，`-1` 反向 |

**MotionPlayHandle**：

| 字段/方法  | 类型（概念）                                                | 说明                                           |
| ---------- | ----------------------------------------------------------- | ---------------------------------------------- |
| `cancel()` | `() =› void`                                                | 取消本次播放                                   |
| `finished` | `Promise‹{ reason: 'finished' \| 'cancelled' \| 'reset' }›` | 播放自然结束/取消/reset 时 resolve，并给出原因 |

**说明**：`MotionController` 是 `useMotionOrchestrator` 所需的最小控制器接口（包含 `play/pause/reset/setProgress`）。`useMotion` 返回的控制器是 `UseMotionController`（更完整）。

## useTimeline

**用途**：时间轴 Hook，输出 0~1 的 `progress`，可用于驱动 `useMotion` 或自行插值。

**签名（概念）**：

`useTimeline(options: UseTimelineOptions)`

**返回值**：

| 返回值       | 类型                 | 说明                          |
| ------------ | -------------------- | ----------------------------- |
| `progress`   | `number`             | 时间轴进度（0~1）             |
| `controller` | `TimelineController` | 控制器：播放/暂停/重置/定位等 |

**参数（UseTimelineOptions）**：

| 参数       | 类型（概念）                      | 默认值  | 说明                                |
| ---------- | --------------------------------- | ------- | ----------------------------------- |
| `duration` | `number`                          | -       | 总时长（ms）                        |
| `delay`    | `number`                          | `0`     | 延迟启动（ms）                      |
| `autoPlay` | `boolean`                         | `true`  | 是否自动播放                        |
| `loop`     | `boolean \| number \| "infinite"` | `0`     | 循环次数；`"infinite"` 表示无限循环 |
| `yoyo`     | `boolean`                         | `false` | 是否往返播放                        |

**控制器（TimelineController）方法**：

| 方法        | 返回值 | 说明                                |
| ----------- | ------ | ----------------------------------- |
| `play()`    | `void` | 开始或继续播放                      |
| `pause()`   | `void` | 暂停                                |
| `reset()`   | `void` | 重置到起始状态，并停止播放          |
| `seekTo(p)` | `void` | 跳转到指定进度（0~1），不会自动播放 |

**控制器（TimelineController）状态字段（常用）**：

| 字段        | 类型      | 说明                                           |
| ----------- | --------- | ---------------------------------------------- |
| `isPlaying` | `boolean` | 是否正在播放                                   |
| `progress`  | `number`  | 当前进度（0~1）                                |
| `direction` | `number`  | 当前方向：`1` 正向，`-1` 反向（yoyo 时会切换） |

## useMotionOrchestrator

**用途**：多动画编排，统一调度多个 `useMotion` 的控制器。

**签名（概念）**：

`useMotionOrchestrator(controllers: MotionController[])`

**参数**：

| 参数          | 类型                 | 说明                                |
| ------------- | -------------------- | ----------------------------------- |
| `controllers` | `MotionController[]` | 由多个 `useMotion` 返回的控制器组成 |

**常用方法**：

| 方法             | 参数     | 返回值             | 说明                                    |
| ---------------- | -------- | ------------------ | --------------------------------------- |
| `parallel()`     | -        | `MotionPlayHandle` | 并行播放所有 motion                     |
| `sequence()`     | -        | `MotionPlayHandle` | 串行播放（一个接一个）                  |
| `stagger(gapMs)` | `number` | `MotionPlayHandle` | 错峰播放：每个 motion 延迟 `gapMs` 开始 |
| `pauseAll()`     | -        | `void`             | 暂停所有 motion                         |
| `resetAll()`     | -        | `void`             | 重置所有 motion                         |
