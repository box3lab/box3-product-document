# GameVector3（d.ts 对齐）

> 本页内容从 `mc-api/globals.d.ts` 抽取，作为当前模块的权威签名。

```typescript
declare class GameVector3 {
  /** X 分量 — X component (east‑west) */
  x: number;
  /** Y 分量 — Y component (up‑down) */
  y: number;
  /** Z 分量 — Z component (north‑south) */
  z: number;

  /**
   * 创建一个零向量 (0, 0, 0)。
   * Creates a zero vector at origin.
   */
  constructor();

  /**
   * 创建一个指定坐标的向量。
   * Creates a vector with the given coordinates.
   * @param x - X 坐标 / X coordinate
   * @param y - Y 坐标 / Y coordinate
   * @param z - Z 坐标 / Z coordinate
   */
  constructor(x: number, y: number, z: number);

  /**
   * 设置向量的 X / Y / Z 分量 (会改变调用者自身)。
   * Sets all three components in‑place (mutates the vector).
   * @returns 调用者本身 / this vector
   */
  set(x: number, y: number, z: number): GameVector3;

  /** 原地复制 v 的值。Copies values from v in‑place. */
  copy(v: GameVector3): GameVector3;

  /** 深拷贝。Returns a new independent copy. */
  clone(): GameVector3;

  /**
   * 向量加法: this + v。
   * Vector addition: this + v.
   * @returns 一个新向量 / a new vector
   */
  add(v: GameVector3): GameVector3;

  /**
   * 向量减法: this - v。
   * Vector subtraction: this - v.
   * @returns 一个新向量 / a new vector
   */
  sub(v: GameVector3): GameVector3;

  /** 逐分量乘法 (返回新对象)。Component‑wise multiplication (returns new vector). */
  mul(v: GameVector3): GameVector3;

  /** 逐分量除法 (返回新对象, 除以 0 得 0)。Component‑wise division (divide‑by‑zero → 0). */
  div(v: GameVector3): GameVector3;

  /**
   * 标量乘法: 每个分量乘以 n。
   * Scalar multiplication: each component multiplied by n.
   * @returns 一个新向量 / a new vector
   */
  scale(n: number): GameVector3;

  /** 原地加法。Addition in‑place. */
  addEq(v: GameVector3): GameVector3;

  /** 原地减法。Subtraction in‑place. */
  subEq(v: GameVector3): GameVector3;

  /** 原地乘法。Multiplication in‑place. */
  mulEq(v: GameVector3): GameVector3;

  /** 原地除法 (除以 0 跳过该分量)。Division in‑place (divide‑by‑zero skips that component). */
  divEq(v: GameVector3): GameVector3;

  /**
   * 点积 (内积): this · v。
   * Dot (inner) product: this · v.
   */
  dot(v: GameVector3): number;

  /** 叉积: this × v。Cross product. */
  cross(v: GameVector3): GameVector3;

  /**
   * 向量长度 (模)。
   * Magnitude (length) of this vector.
   */
  mag(): number;

  /**
   * 向量长度的平方 (比 mag() 更快)。
   * Squared magnitude — faster than mag() when comparing distances.
   */
  sqrMag(): number;

  /**
   * 单位化: 返回方向相同、长度为 1 的新向量。
   * Normalizes this vector; returns a unit vector in the same direction.
   * 零向量会返回 (0,0,0)。
   */
  normalize(): GameVector3;

  /**
   * 计算 this 与 v 之间的欧几里得距离。
   * Euclidean distance between this and v.
   */
  distance(v: GameVector3): number;

  /**
   * 线性插值: 在 this 和 v 之间按比率 n 插值。
   * Linear interpolation between this and v by ratio n.
   * @param n - 插值比率 (0=this, 1=v) / interpolation factor
   */
  lerp(v: GameVector3, n: number): GameVector3;

  /**
   * 指向 v 的方向向量 (已单位化)。
   * Direction vector pointing toward v (normalized).
   */
  towards(v: GameVector3): GameVector3;

  /**
   * this 与 v 之间的夹角 (弧度)。
   * Angle between this and v in radians.
   */
  angle(v: GameVector3): number;

  /**
   * 近似相等检查 (容差 1e‑6)。
   * Approximate equality within 1e‑6 tolerance.
   */
  equals(v: GameVector3): boolean;

  /** 精确相等检查 (分量完全相等)。Exact component‑wise equality. */
  exactEquals(v: GameVector3): boolean;

  /** 逐分量取较大值 (返回新对象)。Component‑wise max. */
  max(v: GameVector3): GameVector3;

  /** 逐分量取较小值 (返回新对象)。Component‑wise min. */
  min(v: GameVector3): GameVector3;

  /**
   * 从球坐标创建向量。
   * Creates a vector from spherical coordinates.
   * @param mag - 半径 / radius (magnitude)
   * @param phi - 方位角 / azimuth angle (radians, horizontal rotation around Y)
   * @param theta - 仰角 / elevation angle (radians, from horizontal plane)
   */
  static fromPolar(mag: number, phi: number, theta: number): GameVector3;

  /** 返回 "(x, y, z)" 格式的字符串表示。 */
  toString(): string;
}

```
