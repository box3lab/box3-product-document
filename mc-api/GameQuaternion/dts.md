# GameQuaternion / AxisAngle（d.ts 对齐）

> 本页内容从 `mc-api/globals.d.ts` 抽取，作为当前模块的权威签名。

```typescript
declare class GameQuaternion {
  /** 实部 (标量分量)。Real (scalar) component. */
  w: number;
  /** 虚部 X 分量。Imaginary X component. */
  x: number;
  /** 虚部 Y 分量。Imaginary Y component. */
  y: number;
  /** 虚部 Z 分量。Imaginary Z component. */
  z: number;

  /** 创建单位四元数 (1, 0, 0, 0)。Creates an identity quaternion. */
  constructor();

  /** 用指定的 w/x/y/z 分量创建四元数。 */
  constructor(w: number, x: number, y: number, z: number);

  /** 原地设置所有分量。Sets all components in‑place. */
  set(w: number, x: number, y: number, z: number): GameQuaternion;

  /** 原地复制。Copies values from another quaternion in‑place. */
  copy(v: GameQuaternion): GameQuaternion;

  /** 深拷贝。Returns a new independent copy. */
  clone(): GameQuaternion;

  /** 逐分量加法。Component‑wise addition. */
  add(v: GameQuaternion): GameQuaternion;

  /** 逐分量减法。Component‑wise subtraction. */
  sub(v: GameQuaternion): GameQuaternion;

  /**
   * 四元数乘法 (汉密尔顿积): this × q。
   * Hamilton product: this × q.
   * @remarks 注意乘法不满足交换律。Multiplication is NOT commutative.
   */
  mul(q: GameQuaternion): GameQuaternion;

  /**
   * 共轭四元数 (对单位四元数等价于逆)。
   * Conjugate of this quaternion (equals inverse for unit quaternions).
   */
  inv(): GameQuaternion;

  /** 除法: this × q⁻¹。Division: this × q⁻¹. */
  div(q: GameQuaternion): GameQuaternion;

  /** 点积: this · q。Dot product. */
  dot(q: GameQuaternion): number;

  /** 模长 (范数)。Magnitude (norm). */
  mag(): number;

  /** 模长平方。Squared magnitude. */
  sqrMag(): number;

  /**
   * 单位化: 返回模长为 1 的新四元数。
   * Normalizes this quaternion; returns a unit quaternion.
   */
  normalize(): GameQuaternion;

  /**
   * 球面线性插值 (Slerp): 在 this 和 q 之间平滑旋转。
   * Spherical linear interpolation — smooth rotation between this and q.
   * @param t - 插值比率 (0=this, 1=q) / interpolation factor
   */
  slerp(q: GameQuaternion, t: number): GameQuaternion;

  /**
   * 返回 this 和 q 之间的角度 (弧度)。
   * Angular difference between this and q (in radians).
   */
  angle(q: GameQuaternion): number;

  /**
   * 返回四元数对应的轴‑角表示。
   * Decomposes this quaternion into axis‑angle representation.
   * @returns 包含 `angle` 和 `axis` 字段的对象 / object with `angle` and `axis` fields
   */
  getAxisAngle(): AxisAngle;

  // ── 旋转操作 / Rotation operations ──

  /** 绕 X 轴旋转 (在左侧乘以旋转四元数)。Rotate around X axis. */
  rotateX(rad: number): GameQuaternion;
  /** 绕 Y 轴旋转。Rotate around Y axis. */
  rotateY(rad: number): GameQuaternion;
  /** 绕 Z 轴旋转。Rotate around Z axis. */
  rotateZ(rad: number): GameQuaternion;

  // ── 静态构造器 / Static constructors ──

  /** 从轴‑角表示创建四元数。Create from axis‑angle representation. */
  static fromAxisAngle(axis: GameVector3, rad: number): GameQuaternion;

  /**
   * 从欧拉角创建四元数 (YZX 旋转顺序)。
   * Create from Euler angles (YZX rotation order: Y → Z → X).
   */
  static fromEuler(x: number, y: number, z: number): GameQuaternion;

  /**
   * 计算从向量 a 旋转到向量 b 的最短弧四元数。
   * Shortest‑arc quaternion rotating from vector a to vector b.
   */
  static rotationBetween(a: GameVector3, b: GameVector3): GameQuaternion;

  /** 近似相等检查 (容差 1e‑6)。 */
  equals(v: GameQuaternion): boolean;

  toString(): string;
}

/**
 * 轴‑角表示的返回类型 (由 getAxisAngle() 返回)。
 * Return type for quaternion.getAxisAngle().
 */
interface AxisAngle {
  /** 旋转角度 (弧度) / rotation angle in radians */
  angle: number;
  /** 旋转轴 (单位向量) / rotation axis (unit vector) */
  axis: GameVector3;
}

```
