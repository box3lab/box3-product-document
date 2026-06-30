# GameRGBColor（d.ts 对齐）

> 本页内容从 `mc-api/globals.d.ts` 抽取，作为当前模块的权威签名。

```typescript
declare class GameRGBColor {
  /** 红色通道 (0.0‑1.0)。Red channel. */
  r: number;
  /** 绿色通道 (0.0‑1.0)。Green channel. */
  g: number;
  /** 蓝色通道 (0.0‑1.0)。Blue channel. */
  b: number;

  /**
   * 用指定的 R / G / B 值创建颜色。
   * Creates a color with the given R/G/B values.
   */
  constructor(r: number, g: number, b: number);

  /** 原地设置所有通道。Sets all three channels in‑place. */
  set(r: number, g: number, b: number): GameRGBColor;

  /** 原地复制另一个颜色的值。Copies values from another color in‑place. */
  copy(o: GameRGBColor): GameRGBColor;

  /** 深拷贝。Returns a new independent copy. */
  clone(): GameRGBColor;

  /** 逐通道加法 (返回新对象)。Channel‑wise addition (returns new object). */
  add(o: GameRGBColor): GameRGBColor;

  /** 逐通道减法 (返回新对象)。Channel‑wise subtraction (returns new object). */
  sub(o: GameRGBColor): GameRGBColor;

  /** 逐通道乘法 (返回新对象)。Channel‑wise multiplication (returns new object). */
  mul(o: GameRGBColor): GameRGBColor;

  /** 逐通道除法 (返回新对象, 除以 0 得 0)。Channel‑wise division (divide‑by‑zero → 0). */
  div(o: GameRGBColor): GameRGBColor;

  /** 原地加法。Addition in‑place. */
  addEq(o: GameRGBColor): GameRGBColor;

  /** 原地减法。Subtraction in‑place. */
  subEq(o: GameRGBColor): GameRGBColor;

  /** 原地乘法。Multiplication in‑place. */
  mulEq(o: GameRGBColor): GameRGBColor;

  /** 原地除法 (除以 0 跳过该通道)。Division in‑place (divide‑by‑zero skips that channel). */
  divEq(o: GameRGBColor): GameRGBColor;

  /**
   * 在 this 和 o 之间线性插值。
   * Linear interpolation between this and o by ratio n.
   */
  lerp(o: GameRGBColor, n: number): GameRGBColor;

  /** 近似相等检查 (容差 1e‑6)。Approximate equality within 1e‑6 tolerance. */
  equals(o: GameRGBColor): boolean;

  /** 转为 "rgba(r,g,b,1.0)" 格式字符串。Converts to an rgba CSS string. */
  toRGBA(): string;

  /**
   * 生成一个随机 RGB 颜色 (每个通道 0‑1)。
   * Generates a random RGB color (each channel 0–1).
   */
  static random(): GameRGBColor;

  toString(): string;
}

```
