# GameDataStorage / GameStorage（d.ts 对齐）

> 本页内容从 `mc-api/globals.d.ts` 抽取，作为当前模块的权威签名。

```typescript
interface GameDataStorage {
  /**
   * 获取存储空间名称 (只读)。
   * @en Returns the read‑only namespace name.
   */
  readonly key: string;

  /**
   * 存入一个键值对。值必须是可 JSON 序列化的类型。
   * Stores a key‑value pair. Value must be JSON‑serializable.
   * @param key - 键 / key
   * @param value - 值 (number | string | boolean | object | array | null) / value
   */
  set(key: string, value: unknown): void;

  /**
   * 读取键对应的值, 不存在则返回 null。
   * Retrieves the value for a key, or null if it does not exist.
   * @returns 存储的值, 或 null
   */
  get(key: string): unknown;

  /**
   * 获取当前存储空间中的所有键。
   * Lists all keys in this storage namespace.
   */
  keys(): string[];

  /**
   * 原子更新: 取出当前值, 用 handler(currentValue) 的结果覆盖。
   * Atomically updates a value using a callback.
   * @param key - 键 / key
   * @param handler - (prevValue) => newValue / callback receiving the old value, returning the new one
   * @remarks 如果键不存在, 不会创建新条目 (遵循 Box3 规范)。
   *          If the key does not exist, nothing happens (per Box3 spec).
   */
  update(key: string, handler: (prevValue: unknown) => unknown): void;

  /**
   * 删除键, 返回旧值 (不存在则返回 null)。
   * Removes a key and returns its previous value, or null.
   * @returns 被删除的旧值 / the previous value, or null
   */
  remove(key: string): unknown;

  /**
   * 原子递增 (delta 默认为 1)。
   * Atomically increments a numeric value by delta (default 1).
   * @param key - 键 / key
   * @param delta - 增量 (可选, 默认 1) / increment amount (optional, default 1)
   * @returns 递增后的新值 / the new value after incrementing
   * @remarks 键不存在时从 0 + delta 开始。
   *          If the key doesn't exist, starts from 0 + delta.
   */
  increment(key: string, delta?: number): number;

  /**
   * 分页查询存储条目。
   * Paginated query of stored entries.
   * @param options - 查询选项 / query options
   * @param options.cursor - 起始游标 (页码) / starting cursor (page number * pageSize)
   * @param options.pageSize - 每页条目数 (1‑100, 默认 100) / items per page (1–100, default 100)
   * @param options.ascending - 是否升序排列 / sort ascending if true
   * @param options.max - 值的上限过滤 / maximum value filter
   * @param options.min - 值的下限过滤 / minimum value filter
   * @param options.constraintTarget - 排序/过滤的目标路径 (如 "a.b.c") / nested path for sorting/filtering
   * @returns 分页结果对象 / paginated query result
   */
  list(options?: {
    cursor?: number;
    pageSize?: number;
    ascending?: boolean;
    max?: number;
    min?: number;
    constraintTarget?: string;
  }): QueryList;

  /**
   * 销毁该存储空间 (删除对应 JSON 文件)。
   * Destroys this storage namespace (deletes the backing JSON file).
   */
  destroy(): void;
}

/**
 * 分页查询结果 (由 GameDataStorage.list() 返回)。
 * Paginated query result returned by GameDataStorage.list().
 */
interface QueryList {
  /** 是否已到达最后一页。Whether the last page has been reached. */
  isLastPage: boolean;

  /**
   * 获取当前页的条目数组。
   * Returns the entries for the current page.
   */
  getCurrentPage(): ReturnValue[];

  /**
   * 移动到下一页。
   * Advances the cursor to the next page.
   */
  nextPage(): void;
}

/**
 * 单个存储条目 (包含元数据)。
 * A single stored entry with metadata.
 */
interface ReturnValue {
  /** 键名 / key name */
  key: string;
  /** 值 / stored value */
  value: unknown;
  /** 更新时间 (Unix 毫秒) / last‑modified timestamp (Unix ms) */
  updateTime: number;
  /** 创建时间 (Unix 毫秒) / creation timestamp (Unix ms) */
  createTime: number;
  /** 版本标识符 (可用于乐观锁) / version identifier (usable for optimistic locking) */
  version: string;
}

/**
 * 全局存储入口 — 脚本中通过 `storage` 访问。
 * Global storage entry point — accessed via `storage` in scripts.
 *
 * @remarks
 * 项目间数据隔离: 每个项目自动使用项目名作为存储文件前缀。
 * Per‑project isolation: each project's storage is automatically prefixed with the project name.
 * 跨项目共享: `getGroupStorage` 使用 `__shared__/` 命名空间, 所有项目访问同一数据。
 * Cross‑project sharing: `getGroupStorage` uses a `__shared__/` namespace visible to all projects.
 */
interface GameStorage {
  /** 始终返回空字符串 (MC 本地存储无 key, 只读)。Always returns "" for MC local storage, readonly. */
  readonly key: string;

  /**
   * 打开或创建指定名称的数据存储空间 (项目隔离)。
   * Opens or creates a named data‑storage namespace (per‑project isolated).
   * @param name - 命名空间 (可含 "/" 作为目录分隔) / namespace (may contain "/" as directory separator)
   * @remarks 不同项目使用同一 name 会访问不同文件。
   *          Different projects using the same name access different files.
   */
  getDataStorage(name: string): GameDataStorage;

  /**
   * 获取跨项目共享存储 — 所有项目通过同一 name 读写同一份数据。
   * Shared cross‑project storage — all projects read/write the same data by name.
   * @param name - 命名空间 / namespace
   * @remarks 底层使用 `__shared__/` 前缀, 适合全服排行榜、全局配置等场景。
   *          Uses `__shared__/` prefix internally; suitable for global leaderboards, shared config, etc.
   */
  getGroupStorage(name: string): GameDataStorage;
}

```
