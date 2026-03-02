# Editor API 详细文档

命名空间：

```csharp
using Box3Blocks.Editor;
using UnityEngine;
```

入口类型：`Box3Blocks.Editor.Box3Api`

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

## 二、放置类 API

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

- `root`：方块根节点。新对象会挂到该节点下。
- `blockId`：方块 ID，可参考项目中的 `blocks-id.json` 文件查看完整列表。
- `position`：目标格子坐标。
- `replaceExisting`：目标位置已有方块时是否覆盖。
- `rotationQuarter`：放置旋转（90° 步进）。
- `spawnRealtimeLight`：是否生成实时点光源；`null` 表示使用全局默认。
- `colliderMode`：碰撞体模式。

返回值：

- `true`：放置成功。
- `false`：放置失败（如参数无效、资源未就绪、位置不可放置）。

示例：

```csharp
Box3Api.TryPlaceBlockAt(
    root,
    "blue_grass",
    new Vector3Int(0, 0, 0),
    replaceExisting: true,
    rotationQuarter: Box3QuarterTurn.R90,
    spawnRealtimeLight: null,
    colliderMode: Box3ColliderMode.TopOnly);
```

---

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

参数补充：

- `x, z`：列坐标。
- `baseY`：该列为空时使用的初始 Y。

场景：快速“堆高”或地表追加方块。

---

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

参数补充：

- `minInclusive / maxInclusive`：包围盒最小/最大角（包含边界）。

返回值：成功放置数量。

示例：

```csharp
int placed = Box3Api.PlaceBlocksInBounds(
    root,
    "stone",
    new Vector3Int(0, 0, 0),
    new Vector3Int(16, 4, 16),
    replaceExisting: false,
    colliderMode: Box3ColliderMode.None);
```

## 三、删除类 API

### `EraseBlockAt(...)`

```csharp
bool EraseBlockAt(Transform root, Vector3Int position)
```

返回值：`true` 表示删除成功。

### `EraseBlocksInBounds(...)`

```csharp
int EraseBlocksInBounds(Transform root, Vector3Int minInclusive, Vector3Int maxInclusive)
```

返回值：成功删除数量。

## 四、替换类 API

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

返回值：`true` 表示替换成功。

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

返回值：成功替换数量。

## 五、旋转类 API

### `RotateBlockAt(...)`

```csharp
bool RotateBlockAt(
    Transform root,
    Vector3Int position,
    Box3QuarterTurn stepQuarter = Box3QuarterTurn.R90)
```

返回值：`true` 表示旋转成功。

### `RotateBlocksInBounds(...)`

```csharp
int RotateBlocksInBounds(
    Transform root,
    Vector3Int minInclusive,
    Vector3Int maxInclusive,
    Box3QuarterTurn stepQuarter = Box3QuarterTurn.R90)
```

返回值：成功旋转数量。

## 六、查询类 API

### `TryGetBlockIdAt(...)`

```csharp
bool TryGetBlockIdAt(Transform root, Vector3Int position, out string blockId)
```

- 命中方块时返回 `true`，并输出 `blockId`。

### `ExistsAt(...)`

```csharp
bool ExistsAt(Transform root, Vector3Int position)
```

- 判断坐标是否有方块。

### `GetTopY(...)`

```csharp
int GetTopY(Transform root, int x, int z, int fallbackY = 0)
```

- 返回指定列顶部 Y；空列返回 `fallbackY`。

### `GetAvailableBlockIds()`

```csharp
IReadOnlyList<string> GetAvailableBlockIds()
```

- 返回可用方块 ID 列表。

### `IsTransparent(...)`

```csharp
bool IsTransparent(string blockId)
```

- 判断方块是否透明。

## 七、资源与全局设置 API

### `PrepareGeneratedAssets()`

```csharp
bool PrepareGeneratedAssets()
```

用途：预热并生成关键资源（网格、图集、材质）。

返回：关键资源可用时 `true`。

### `SetSpawnRealtimeLightForEmissive(...)`

```csharp
void SetSpawnRealtimeLightForEmissive(bool enabled)
```

- 设置“发光方块默认是否生成点光源”。

### `GetSpawnRealtimeLightForEmissive()`

```csharp
bool GetSpawnRealtimeLightForEmissive()
```

- 获取当前默认设置。
