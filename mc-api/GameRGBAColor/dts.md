# GameRGBAColor（d.ts 对齐）

> 本页内容从 `mc-api/globals.d.ts` 抽取，作为当前模块的权威签名。

```typescript
declare class GameRGBAColor {
  /** 红色通道 (0.0‑1.0)。Red channel. */
  r: number;
  /** 绿色通道 (0.0‑1.0)。Green channel. */
  g: number;
  /** 蓝色通道 (0.0‑1.0)。Blue channel. */
  b: number;
  /** Alpha (不透明度), 范围 0.0–1.0。Alpha (opacity), range 0.0–1.0. */
  a: number;

  constructor(r: number, g: number, b: number, a: number);

  /** 原地设置所有四个通道。Sets all four channels in‑place. */
  set(r: number, g: number, b: number, a: number): GameRGBAColor;

  /** 原地复制另一个颜色的值。Copies values from another RGBA color in‑place. */
  copy(c: GameRGBAColor): GameRGBAColor;

  /** 深拷贝。Returns a new independent copy. */
  clone(): GameRGBAColor;

  /** 逐通道加法 (返回新对象)。Channel‑wise addition (returns new object). */
  add(rgba: GameRGBAColor): GameRGBAColor;

  /** 逐通道减法 (返回新对象)。Channel‑wise subtraction (returns new object). */
  sub(rgba: GameRGBAColor): GameRGBAColor;

  /** 逐通道乘法 (返回新对象)。Channel‑wise multiplication (returns new object). */
  mul(rgba: GameRGBAColor): GameRGBAColor;

  /** 逐通道除法 (返回新对象, 除以 0 得 0)。Channel‑wise division (returns new object; divide‑by‑zero → 0). */
  div(rgba: GameRGBAColor): GameRGBAColor;

  /** 原地加法。Addition in‑place. */
  addEq(rgba: GameRGBAColor): GameRGBAColor;

  /** 原地减法。Subtraction in‑place. */
  subEq(rgba: GameRGBAColor): GameRGBAColor;

  /** 原地乘法。Multiplication in‑place. */
  mulEq(rgba: GameRGBAColor): GameRGBAColor;

  /** 原地除法 (除以 0 跳过该通道)。Division in‑place (divide‑by‑zero skips that channel). */
  divEq(rgba: GameRGBAColor): GameRGBAColor;

  /** 线性插值。Linear interpolation between this and rgba by ratio n. */
  lerp(rgba: GameRGBAColor, n: number): GameRGBAColor;

  /** 近似相等检查 (容差 1e‑6)。Approximate equality within 1e‑6 tolerance. */
  equals(rgba: GameRGBAColor): boolean;

  /**
   * Alpha 混合: 将自身 RGBA 颜色混合到 RGB 背景上。
   * Blends this RGBA color onto an RGB background, returning the displayed RGB.
   */
  blendEq(rgb: GameRGBColor): GameRGBColor;

  toString(): string;
}

```
