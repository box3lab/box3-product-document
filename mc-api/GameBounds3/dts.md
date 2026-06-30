# GameBounds3（d.ts 对齐）

> 本页内容从 `mc-api/globals.d.ts` 抽取，作为当前模块的权威签名。

```typescript
declare class GameBounds3 {
  /** 最小角 (三个分量均为最小值)。Lower/minimum corner. */
  lo: GameVector3;
  /** 最大角 (三个分量均为最大值)。Upper/maximum corner. */
  hi: GameVector3;

  /**
   * 用两个对角顶点构造包围盒。
   * Constructs bounds from two opposing corners.
   */
  constructor(lo: GameVector3, hi: GameVector3);

  /** 原地设置所有边界。Sets all boundaries in‑place. */
  set(
    lox: number,
    loy: number,
    loz: number,
    hix: number,
    hiy: number,
    hiz: number,
  ): GameBounds3;

  /** 原地复制 b 的值。Copies values from b in‑place. */
  copy(b: GameBounds3): GameBounds3;

  /**
   * 判断当前包围盒是否与 other 相交。
   * Returns true if this bounds intersects with other.
   */
  intersects(other: GameBounds3): boolean;

  /**
   * 计算交集包围盒 (无交集返回 null)。
   * Returns the intersection bounds, or null if they don't overlap.
   */
  intersect(other: GameBounds3): GameBounds3 | null;

  /**
   * 判断点 v 是否位于包围盒内部 (含边界)。
   * Returns true if point v is inside (or on the boundary of) this bounds.
   */
  contains(v: GameVector3): boolean;

  /** 判断是否完全包含另一个包围盒。Whether this bounds fully contains b. */
  containsBounds(b: GameBounds3): boolean;

  /** 从 GameVector3 数组创建最小包围盒。Creates bounds from an array of GameVector3. */
  static fromPoints(points: GameVector3[]): GameBounds3 | null;

  toString(): string;
}

```
