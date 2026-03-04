# Runtime API 详细文档（中文）

命名空间：

```csharp
using Box3Blocks;
using UnityEngine;
```

入口类型：`Box3Blocks.Box3Api`

## 枚举说明

### `Box3QuarterTurn`

- `R0`
- `R90`
- `R180`
- `R270`

### `Box3ColliderMode`

- `None`
- `TopOnly`
- `Full`

## 运行时前置说明

- 需要提供 `root`（方块根节点）。
- API 会在 `root` 上自动获取或添加 `Box3BlocksRuntimeService`。
- 运行前建议调用 `PrepareGeneratedAssets()`。

## 放置类 API

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

参数说明：

- `root`：方块根节点。
- `blockId`：方块 ID。
- `position`：目标格子坐标。
- `replaceExisting`：已有方块时是否替换。
- `rotationQuarter`：放置朝向。
- `spawnRealtimeLight`：是否生成实时点光；`null` 用默认策略。
- `colliderMode`：碰撞模式；`null` 用服务默认模式。

返回值：

- `true`：放置成功。
- `false`：放置失败。

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

参数说明：

- `root`：方块根节点。
- `blockId`：方块 ID。
- `x`：列 X。
- `z`：列 Z。
- `baseY`：空列起始高度。
- `replaceExisting`：落点已有方块时是否替换。
- `rotationQuarter`：放置朝向。
- `spawnRealtimeLight`：是否生成实时点光；`null` 用默认策略。
- `colliderMode`：碰撞模式；`null` 用服务默认模式。

返回值：

- `true`：放置成功。
- `false`：放置失败。

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

参数说明：

- `root`：方块根节点。
- `blockId`：方块 ID。
- `minInclusive`：包围盒最小角点（包含）。
- `maxInclusive`：包围盒最大角点（包含）。
- `replaceExisting`：范围内已有方块时是否替换。
- `rotationQuarter`：放置朝向。
- `spawnRealtimeLight`：是否生成实时点光；`null` 用默认策略。
- `colliderMode`：碰撞模式；`null` 用服务默认模式。

返回值：

- 成功放置数量。

## 删除类 API

### `EraseBlockAt(...)`

```csharp
bool EraseBlockAt(Transform root, Vector3Int position)
```

参数说明：

- `root`：方块根节点。
- `position`：目标格子坐标。

返回值：

- `true`：删除成功。
- `false`：删除失败。

### `EraseBlocksInBounds(...)`

```csharp
int EraseBlocksInBounds(Transform root, Vector3Int minInclusive, Vector3Int maxInclusive)
```

参数说明：

- `root`：方块根节点。
- `minInclusive`：包围盒最小角点（包含）。
- `maxInclusive`：包围盒最大角点（包含）。

返回值：

- 成功删除数量。

## 替换类 API

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

参数说明：

- `root`：方块根节点。
- `blockId`：替换后的方块 ID。
- `position`：目标格子坐标。
- `rotationQuarter`：替换后朝向。
- `spawnRealtimeLight`：是否生成实时点光；`null` 用默认策略。
- `colliderMode`：碰撞模式；`null` 用服务默认模式。

返回值：

- `true`：替换成功。
- `false`：替换失败。

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

参数说明：

- `root`：方块根节点。
- `blockId`：替换后的方块 ID。
- `minInclusive`：包围盒最小角点（包含）。
- `maxInclusive`：包围盒最大角点（包含）。
- `rotationQuarter`：替换后朝向。
- `spawnRealtimeLight`：是否生成实时点光；`null` 用默认策略。
- `colliderMode`：碰撞模式；`null` 用服务默认模式。

返回值：

- 成功替换数量。

## 旋转类 API

### `RotateBlockAt(...)`

```csharp
bool RotateBlockAt(Transform root, Vector3Int position, Box3QuarterTurn stepQuarter = Box3QuarterTurn.R90)
```

参数说明：

- `root`：方块根节点。
- `position`：目标格子坐标。
- `stepQuarter`：旋转步长。

返回值：

- `true`：旋转成功。
- `false`：旋转失败。

### `RotateBlocksInBounds(...)`

```csharp
int RotateBlocksInBounds(
    Transform root,
    Vector3Int minInclusive,
    Vector3Int maxInclusive,
    Box3QuarterTurn stepQuarter = Box3QuarterTurn.R90)
```

参数说明：

- `root`：方块根节点。
- `minInclusive`：包围盒最小角点（包含）。
- `maxInclusive`：包围盒最大角点（包含）。
- `stepQuarter`：旋转步长。

返回值：

- 成功旋转数量。

## 查询类 API

### `TryGetBlockIdAt(...)`

```csharp
bool TryGetBlockIdAt(Transform root, Vector3Int position, out string blockId)
```

参数说明：

- `root`：方块根节点。
- `position`：目标格子坐标。
- `blockId`：输出方块 ID。

返回值：

- `true`：成功获取。
- `false`：该位置无方块或查询失败。

### `ExistsAt(...)`

```csharp
bool ExistsAt(Transform root, Vector3Int position)
```

参数说明：

- `root`：方块根节点。
- `position`：目标格子坐标。

返回值：

- 是否存在方块。

### `GetTopY(...)`

```csharp
int GetTopY(Transform root, int x, int z, int fallbackY = 0)
```

参数说明：

- `root`：方块根节点。
- `x`：列 X。
- `z`：列 Z。
- `fallbackY`：空列时返回值。

返回值：

- 顶部 Y；空列返回 `fallbackY`。

### `GetAvailableBlockIds()`

```csharp
IReadOnlyList<string> GetAvailableBlockIds()
```

返回值：

- 可用方块 ID 列表。

### `IsTransparent(...)`

```csharp
bool IsTransparent(string blockId)
```

参数说明：

- `blockId`：方块 ID。

返回值：

- 是否透明方块。

## 资源与目录 API

### `PrepareGeneratedAssets()`

```csharp
bool PrepareGeneratedAssets()
```

作用：

- 预热并检查运行时资源可用性。

返回值：

- `true`：关键资源可用。
- `false`：资源未准备好。

### `SetDefaultRuntimeCatalog(...)`

```csharp
void SetDefaultRuntimeCatalog(Box3BlocksRuntimeCatalog catalog)
```

参数说明：

- `catalog`：默认运行时目录资源。

### `GetDefaultRuntimeCatalog()`

```csharp
Box3BlocksRuntimeCatalog GetDefaultRuntimeCatalog()
```

返回值：

- 当前默认目录资源（可能为 `null`）。

## 默认策略 API

### `SetSpawnRealtimeLightForEmissive(...)`

```csharp
void SetSpawnRealtimeLightForEmissive(bool enabled)
```

参数说明：

- `enabled`：发光方块默认是否生成实时点光。

### `GetSpawnRealtimeLightForEmissive()`

```csharp
bool GetSpawnRealtimeLightForEmissive()
```

返回值：

- 当前默认发光策略状态。

### `SetDefaultColliderMode(...)`

```csharp
void SetDefaultColliderMode(Box3ColliderMode mode)
```

参数说明：

- `mode`：默认碰撞模式。

### `GetDefaultColliderMode()`

```csharp
Box3ColliderMode GetDefaultColliderMode()
```

返回值：

- 当前默认碰撞模式。

注意：

- 默认碰撞模式仅影响未显式传 `colliderMode` 的放置/替换 API。
