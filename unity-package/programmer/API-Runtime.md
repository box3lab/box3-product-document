# Runtime API 详细文档

命名空间：

```csharp
using Box3Blocks;
using UnityEngine;
```

入口类型：`Box3Blocks.Box3Api`

## 一、枚举说明

### `Box3QuarterTurn`

- `R0`：0°
- `R90`：90°
- `R180`：180°
- `R270`：270°

### `Box3ColliderMode`

- `None`：不生成碰撞体
- `TopOnly`：仅顶面碰撞
- `Full`：完整碰撞（MeshCollider）

## 二、运行时前置资源

运行时放置依赖：

- `Assets/Box3` 生成资源
- `Box3BlocksRuntimeCatalog`（通常位于 `Assets/Box3/Runtime/Box3BlocksCatalog.asset`）

建议启动时检查：

- `PrepareGeneratedAssets()` 是否返回 `true`
- Catalog 是否成功注入（可通过 `SetDefaultRuntimeCatalog` 显式指定）

## 三、放置类 API

### `TryPlaceBlockAt(...)`

```csharp
bool TryPlaceBlockAt(
    Transform root,
    string blockId,
    Vector3Int position,
    bool replaceExisting = true,
    Box3QuarterTurn rotationQuarter = Box3QuarterTurn.R0,
    bool? spawnRealtimeLight = null,
    Box3ColliderMode? colliderMode = null)
```

功能说明：

- 在给定 `x, z` 列上，从 `baseY` 开始向上搜索最高方块的位置，并在其**顶部**放置一个新方块。

参数说明：

- `root`：方块根节点；
- `blockId`：要放置的方块 ID；
- `x, z`：水平方向坐标；
- `baseY`：起始搜索高度（通常为 0 或地面高度）；
- 其余参数含义与 `TryPlaceBlockAt` 一致。

返回值：

- `true`：成功在顶部放置了方块；
- `false`：未找到合适位置或资源未准备好。

参数说明：

- 与 Editor 版本的 `TryPlaceBlockAt` 含义一致：
  - `root`：方块根节点，新生成的方块对象会挂在该节点下；
  - `blockId`：方块 ID，可通过 `GetAvailableBlockIds()` 或 `blocks-id.json` 查询；
  - `position`：目标格子坐标；
  - `replaceExisting`：目标位置已有方块时是否覆盖；
  - `rotationQuarter`：放置旋转（90° 步进）；
  - `spawnRealtimeLight`：是否生成实时点光源；`null` 表示使用当前全局默认策略；
  - `colliderMode`：碰撞体模式；
- **区别点**：
  - `colliderMode = null`：使用 Runtime 层当前默认碰撞模式（由 `SetDefaultColliderMode` 控制）。

返回值：

- `true`：放置成功；
- `false`：放置失败（如资源未准备好、位置非法等）。

### `TryPlaceBlockOnTop(...)`

```csharp
bool TryPlaceBlockOnTop(
    Transform root,
    string blockId,
    int x,
    int z,
    int baseY = 0,
    bool replaceExisting = true,
    Box3QuarterTurn rotationQuarter = Box3QuarterTurn.R0,
    bool? spawnRealtimeLight = null,
    Box3ColliderMode? colliderMode = null)
```

### `PlaceBlocksInBounds(...)`

```csharp
int PlaceBlocksInBounds(
    Transform root,
    string blockId,
    Vector3Int minInclusive,
    Vector3Int maxInclusive,
    bool replaceExisting = true,
    Box3QuarterTurn rotationQuarter = Box3QuarterTurn.R0,
    bool? spawnRealtimeLight = null,
    Box3ColliderMode? colliderMode = null)
```

## 四、删除类 API

### `EraseBlockAt(...)`

```csharp
bool EraseBlockAt(Transform root, Vector3Int position)
```

功能说明：

- 删除指定 `position` 处的方块。

返回值：

- `true`：确实删除了一个方块；
- `false`：该位置本就没有方块或删除失败。

### `EraseBlocksInBounds(...)`

```csharp
int EraseBlocksInBounds(Transform root, Vector3Int minInclusive, Vector3Int maxInclusive)
```

功能说明：

- 删除给定边界盒内的所有方块。

返回值：

- 返回被删除的方块数量。

## 五、替换类 API

### `ReplaceBlockAt(...)`

```csharp
bool ReplaceBlockAt(
    Transform root,
    string blockId,
    Vector3Int position,
    Box3QuarterTurn rotationQuarter = Box3QuarterTurn.R0,
    bool? spawnRealtimeLight = null,
    Box3ColliderMode? colliderMode = null)
```

### `ReplaceBlocksInBounds(...)`

```csharp
int ReplaceBlocksInBounds(
    Transform root,
    string blockId,
    Vector3Int minInclusive,
    Vector3Int maxInclusive,
    Box3QuarterTurn rotationQuarter = Box3QuarterTurn.R0,
    bool? spawnRealtimeLight = null,
    Box3ColliderMode? colliderMode = null)
```

## 六、旋转类 API

### `RotateBlockAt(...)`

```csharp
bool RotateBlockAt(Transform root, Vector3Int position, Box3QuarterTurn stepQuarter = Box3QuarterTurn.R90)
```

功能说明：

- 对目标位置的方块进行 90° 步进旋转（可多次调用累积旋转）。

返回值：

- `true`：该位置存在可旋转方块且旋转成功；
- `false`：没有方块或该方块不支持旋转逻辑。

### `RotateBlocksInBounds(...)`

```csharp
int RotateBlocksInBounds(
    Transform root,
    Vector3Int minInclusive,
    Vector3Int maxInclusive,
    Box3QuarterTurn stepQuarter = Box3QuarterTurn.R90)
```

功能说明：

- 对给定边界盒中的所有方块进行统一 90° 步进旋转。

返回值：

- 返回本次成功旋转的方块数量。

## 七、查询类 API

### `TryGetBlockIdAt(...)`

```csharp
bool TryGetBlockIdAt(Transform root, Vector3Int position, out string blockId)
```

功能说明：

- 尝试获取指定位置处的方块 ID。

返回值：

- `true`：该位置存在方块，并在 `blockId` 中返回其 ID；
- `false`：该位置没有方块。

### `ExistsAt(...)`

```csharp
bool ExistsAt(Transform root, Vector3Int position)
```

功能说明：

- 检查指定位置是否存在任意方块。

### `GetTopY(...)`

```csharp
int GetTopY(Transform root, int x, int z, int fallbackY = 0)
```

功能说明：

- 在给定 `x,z` 坐标上，从上到下（或从指定规则）搜索最高的方块高度，并返回其 `y` 值；
- 如果未找到方块，则返回 `fallbackY`。

### `GetAvailableBlockIds()`

```csharp
IReadOnlyList<string> GetAvailableBlockIds()
```

功能说明：

- 返回当前运行时可用的全部方块 ID 列表（等价于查询 Catalog / `blocks-id.json`）。

### `IsTransparent(...)`

```csharp
bool IsTransparent(string blockId)
```

功能说明：

- 判断给定 `blockId` 所对应的方块在渲染上是否被视为“透明”（常用于视线、光照或交互判定）。

## 八、运行时 Catalog 与默认策略 API

### `PrepareGeneratedAssets()`

```csharp
bool PrepareGeneratedAssets()
```

- 检查运行时关键资源是否可用（纹理、材质、Catalog 等）。返回 `false` 时通常说明资源未生成或被清理。

### `SetDefaultRuntimeCatalog(...)`

```csharp
void SetDefaultRuntimeCatalog(Box3BlocksRuntimeCatalog catalog)
```

- 设置全局默认 Catalog。建议在游戏启动阶段调用一次。

### `GetDefaultRuntimeCatalog()`

```csharp
Box3BlocksRuntimeCatalog GetDefaultRuntimeCatalog()
```

- 获取当前全局默认 Catalog。

返回：当前设置的 `Box3BlocksRuntimeCatalog` 实例。

### `SetSpawnRealtimeLightForEmissive(...)`

```csharp
void SetSpawnRealtimeLightForEmissive(bool enabled)
```

- 设置对自发光方块（emissive）是否默认生成实时点光源。

参数说明：

- `enabled`：是否启用，`true` 为生成点光源，`false` 为不生成。

### `GetSpawnRealtimeLightForEmissive()`

```csharp
bool GetSpawnRealtimeLightForEmissive()
```

- 返回当前自发光方块是否会默认生成实时点光源的设置值。

### `SetDefaultColliderMode(...)`

```csharp
void SetDefaultColliderMode(Box3ColliderMode mode)
```

- 设置 Runtime 层默认的碰撞模式，用于 `colliderMode = null` 的情况。

参数说明：

- `mode`：碰撞模式，可选值为 `Box3ColliderMode.Full`、`Box3ColliderMode.TopOnly` 或 `Box3ColliderMode.None`。

### `GetDefaultColliderMode()`

```csharp
Box3ColliderMode GetDefaultColliderMode()
```

- 获取当前 Runtime 层默认的碰撞模式。

返回：当前设置的 `Box3ColliderMode` 枚举值。
