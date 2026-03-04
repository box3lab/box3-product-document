# Editor API 详细文档（中文）

命名空间：

```csharp
using Box3Blocks.Editor;
using UnityEngine;
```

入口类型：`Box3Blocks.Editor.Box3Api`

## 枚举说明

### `Box3QuarterTurn`

- `R0`：0°
- `R90`：90°
- `R180`：180°
- `R270`：270°

### `Box3ColliderMode`

- `None`：不生成碰撞
- `TopOnly`：仅顶面碰撞
- `Full`：完整碰撞

### `Box3Api.Box3RealtimeLightMode`

- `None = 0`：不生成实时灯光
- `AllEmissive = 1`：所有发光方块都生成灯光
- `DataOnly = 2`：仅对带灯光数据的发光方块生成灯光

## 资源准备

### `PrepareGeneratedAssets()`

```csharp
bool PrepareGeneratedAssets()
```

作用：

- 检查并准备编辑器侧所需资源（网格、图集、材质等）。

返回值：

- `true`：核心资源可用。
- `false`：核心资源缺失（会输出错误日志）。

建议：

- 在批量放置/替换前先调用一次。

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
    Box3ColliderMode colliderMode = Box3ColliderMode.Full)
```

参数说明：

- `root`：方块根节点，生成对象会挂到该节点下。
- `blockId`：方块 ID（例如 `blue_grass`）。
- `position`：目标格子坐标。
- `replaceExisting`：目标格已有方块时是否替换。
- `rotationQuarter`：放置朝向（90° 步进）。
- `spawnRealtimeLight`：是否生成实时点光；`null` 表示使用全局默认策略。
- `colliderMode`：碰撞生成模式。

返回值：

- `true`：放置成功。
- `false`：放置失败（参数无效、资源未就绪等）。

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
    Box3ColliderMode colliderMode = Box3ColliderMode.Full)
```

参数说明：

- `root`：方块根节点。
- `blockId`：目标方块 ID。
- `x`：列坐标 X。
- `z`：列坐标 Z。
- `baseY`：空列时的起始高度。
- `replaceExisting`：最终落点已存在方块时是否替换。
- `rotationQuarter`：放置朝向。
- `spawnRealtimeLight`：是否生成实时点光；`null` 用全局默认。
- `colliderMode`：碰撞生成模式。

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
    Box3ColliderMode colliderMode = Box3ColliderMode.Full)
```

参数说明：

- `root`：方块根节点。
- `blockId`：目标方块 ID。
- `minInclusive`：包围盒最小角点（包含）。
- `maxInclusive`：包围盒最大角点（包含）。
- `replaceExisting`：范围内已有方块时是否替换。
- `rotationQuarter`：放置朝向。
- `spawnRealtimeLight`：是否生成实时点光；`null` 用全局默认。
- `colliderMode`：碰撞生成模式。

返回值：

- 成功放置的方块数量。

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
- `false`：删除失败或该位置无方块。

### `EraseBlocksInBounds(...)`

```csharp
int EraseBlocksInBounds(Transform root, Vector3Int minInclusive, Vector3Int maxInclusive)
```

参数说明：

- `root`：方块根节点。
- `minInclusive`：包围盒最小角点（包含）。
- `maxInclusive`：包围盒最大角点（包含）。

返回值：

- 成功删除的方块数量。

## 替换类 API

### `ReplaceBlockAt(...)`

```csharp
bool ReplaceBlockAt(
    Transform root,
    string blockId,
    Vector3Int position,
    Box3QuarterTurn rotationQuarter = Box3QuarterTurn.R0,
    bool? spawnRealtimeLight = null,
    Box3ColliderMode colliderMode = Box3ColliderMode.Full)
```

参数说明：

- `root`：方块根节点。
- `blockId`：替换后的方块 ID。
- `position`：目标格子坐标。
- `rotationQuarter`：替换后朝向。
- `spawnRealtimeLight`：是否生成实时点光；`null` 用全局默认。
- `colliderMode`：碰撞生成模式。

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
    Box3ColliderMode colliderMode = Box3ColliderMode.Full)
```

参数说明：

- `root`：方块根节点。
- `blockId`：替换后的方块 ID。
- `minInclusive`：包围盒最小角点（包含）。
- `maxInclusive`：包围盒最大角点（包含）。
- `rotationQuarter`：替换后朝向。
- `spawnRealtimeLight`：是否生成实时点光；`null` 用全局默认。
- `colliderMode`：碰撞生成模式。

返回值：

- 成功替换的方块数量。

## 旋转类 API

### `RotateBlockAt(...)`

```csharp
bool RotateBlockAt(
    Transform root,
    Vector3Int position,
    Box3QuarterTurn stepQuarter = Box3QuarterTurn.R90)
```

参数说明：

- `root`：方块根节点。
- `position`：目标格子坐标。
- `stepQuarter`：旋转步长（默认 90°）。

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
- `stepQuarter`：旋转步长（90° 单位）。

返回值：

- 成功旋转的方块数量。

## 查询类 API

### `TryGetBlockIdAt(...)`

```csharp
bool TryGetBlockIdAt(Transform root, Vector3Int position, out string blockId)
```

参数说明：

- `root`：方块根节点。
- `position`：目标格子坐标。
- `blockId`：输出参数，命中时返回方块 ID。

返回值：

- `true`：该位置有方块且成功获取 ID。
- `false`：该位置无方块或查询失败。

### `ExistsAt(...)`

```csharp
bool ExistsAt(Transform root, Vector3Int position)
```

参数说明：

- `root`：方块根节点。
- `position`：目标格子坐标。

返回值：

- `true`：存在方块。
- `false`：不存在方块。

### `GetTopY(...)`

```csharp
int GetTopY(Transform root, int x, int z, int fallbackY = 0)
```

参数说明：

- `root`：方块根节点。
- `x`：列坐标 X。
- `z`：列坐标 Z。
- `fallbackY`：该列为空时返回值。

返回值：

- 该列顶部方块的 Y 值；若为空列则返回 `fallbackY`。

### `GetAvailableBlockIds()`

```csharp
IReadOnlyList<string> GetAvailableBlockIds()
```

返回值：

- 当前可用方块 ID 列表（只读）。

### `IsTransparent(...)`

```csharp
bool IsTransparent(string blockId)
```

参数说明：

- `blockId`：目标方块 ID。

返回值：

- `true`：该方块属于透明方块。
- `false`：非透明或未知方块。

## Chunk 构建 API

### `BuildChunkFromRoot(...)`

```csharp
bool BuildChunkFromRoot(
    Transform sourceRoot,
    Transform parent = null,
    Vector3Int origin = default,
    bool ignoreBarrier = false,
    bool clearPrevious = true,
    Box3Api.Box3RealtimeLightMode realtimeLightMode = Box3Api.Box3RealtimeLightMode.None,
    Box3ColliderMode colliderMode = Box3ColliderMode.None,
    int chunkSize = 32,
    int chunksPerTick = 6,
    int voxelsPerTick = 25000,
    bool deleteSourceBlocksAfterBuild = false)
```

参数说明：

- `sourceRoot`：源方块根节点（读取其下 `Box3BlocksPlacedBlock`）。
- `parent`：生成 Chunk 的父节点；`null` 时内部按流程处理。
- `origin`：额外原点偏移。
- `ignoreBarrier`：是否忽略屏障方块。
- `clearPrevious`：是否清理上一次导入结果。
- `realtimeLightMode`：实时灯光策略（默认 `None`）。
- `colliderMode`：Chunk 碰撞模式（默认 `None`）。
- `chunkSize`：Chunk 尺寸。
- `chunksPerTick`：每 Tick 构建的 Chunk 数。
- `voxelsPerTick`：每 Tick 处理的体素数。
- `deleteSourceBlocksAfterBuild`：构建成功后是否删除源方块。

返回值：

- `true`：构建成功。
- `false`：构建失败。

注意：

- API 默认灯光模式是 `None`。
- Builder 的“生成Chunk”窗口 UI 默认是 `DataOnly`。

## 全局发光策略 API

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
