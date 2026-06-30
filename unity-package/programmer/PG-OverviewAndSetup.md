# API 总览与工程接入

## 两套 API 总览

Box3Blocks 提供两套独立的 API，分别服务于编辑器和运行时场景：

| | Editor API | Runtime API |
|------|------------|-------------|
| **命名空间** | `Box3Blocks.Editor` | `Box3Blocks` |
| **入口类型** | `Box3Blocks.Editor.Box3Api` | `Box3Blocks.Box3Api` |
| **可用范围** | 仅 `#if UNITY_EDITOR` | Editor + Play 模式 |
| **底层实现** | `EditorCoreBackend` | `Box3BlocksRuntimeBackend` |
| **额外能力** | `BuildChunkFromRoot` | `SetDefaultColliderMode`、`SetDefaultRuntimeCatalog` |

**使用原则：**

- 编辑器工具、批处理、离线构建 → 使用 Editor API
- Play 模式和运行时逻辑 → 使用 Runtime API
- 两者**不要在同一上下文混用**

## 快速接入步骤

### 1. 安装包

确认 `Box3` 菜单可用。

### 2. 准备资源

打开 `Box3/方块库` 一次，触发 Editor 端资源准备（网格、图集、材质）。

### 3. 构建运行时 Catalog

点击 `Box3/运行时/构建 UV 目录`，生成 `Assets/Box3/Runtime/Box3BlocksCatalog.asset`。运行时 API 依赖此资源。

### 4. 导入示例（可选）

通过 Package Manager 导入官方示例：

1. `Window > Package Manager` → 选中 `Box3 Blocks`
2. 切换到 `Samples` 标签
3. 导入 `Editor Noise Terrain Demo`（编辑器噪声地形）
4. 导入 `Runtime Place/Erase Demo`（运行时放置/删除）

## 两套 API 共同能力

- **放置**：`TryPlaceBlockAt`、`TryPlaceBlockOnTop`、`PlaceBlocksInBounds`
- **删除**：`EraseBlockAt`、`EraseBlocksInBounds`
- **替换**：`ReplaceBlockAt`、`ReplaceBlocksInBounds`
- **旋转**：`RotateBlockAt`、`RotateBlocksInBounds`
- **查询**：`TryGetBlockIdAt`、`ExistsAt`、`GetTopY`、`GetAvailableBlockIds`、`IsTransparent`

## API 差异对照

| 能力 | Editor API | Runtime API |
|------|-----------|-------------|
| `PrepareGeneratedAssets()` | 有 | 有 |
| `SetSpawnRealtimeLightForEmissive()` | 有 | 有 |
| `GetSpawnRealtimeLightForEmissive()` | 有 | 有 |
| `BuildChunkFromRoot()` | **有** | 无 |
| `SetDefaultRuntimeCatalog()` | 无 | **有** |
| `GetDefaultRuntimeCatalog()` | 无 | **有** |
| `SetDefaultColliderMode()` | 无 | **有** |
| `GetDefaultColliderMode()` | 无 | **有** |

## 默认值说明

| API | 参数 | API 默认值 | 窗口 UI 默认值 |
|-----|------|-----------|---------------|
| `BuildChunkFromRoot` | `realtimeLightMode` | `None` | `DataOnly` |
| `BuildChunkFromRoot` | `colliderMode` | `None` | `Full` |

> 代码调用时若要与窗口行为一致，请显式传入对应枚举值。

## 最小示例

### Editor API

```csharp
using Box3Blocks.Editor;
using UnityEngine;
using UnityEditor;

public class EditorExample
{
    public static void PlaceOne(Transform root)
    {
        // 1. 确保资源就绪
        if (!Box3Api.PrepareGeneratedAssets())
        {
            Debug.LogError("资源准备失败");
            return;
        }

        // 2. 放置方块
        bool ok = Box3Api.TryPlaceBlockAt(
            root,
            "blue_grass",
            new Vector3Int(0, 0, 0),
            replaceExisting: true,
            rotationQuarter: Box3QuarterTurn.R0,
            colliderMode: Box3ColliderMode.Full);

        Debug.Log(ok ? "放置成功" : "放置失败");
    }

    public static void GenerateNoiseTerrain(Transform root)
    {
        Box3Api.PrepareGeneratedAssets();

        int placed = 0;
        for (int x = 0; x < 24; x++)
        {
            for (int z = 0; z < 24; z++)
            {
                float n = Mathf.PerlinNoise(x * 0.12f, z * 0.12f);
                int h = Mathf.Max(1, Mathf.RoundToInt(n * 8));

                for (int y = 0; y < h; y++)
                {
                    if (Box3Api.TryPlaceBlockAt(root, "stone",
                        new Vector3Int(x, y, z)))
                    {
                        placed++;
                    }
                }
            }
        }

        Debug.Log($"生成了 {placed} 个方块");

        // 转为 Chunk
        Box3Api.BuildChunkFromRoot(
            sourceRoot: root,
            chunkSize: 32,
            deleteSourceBlocksAfterBuild: true);
    }
}
```

### Runtime API

```csharp
using Box3Blocks;
using UnityEngine;

public class RuntimeExample : MonoBehaviour
{
    [SerializeField] private Transform root;
    [SerializeField] private Box3BlocksRuntimeCatalog catalog;

    private void Start()
    {
        if (catalog != null)
            Box3Api.SetDefaultRuntimeCatalog(catalog);

        // TryPlaceBlockAt 会自动创建 RuntimeService 并注入 Catalog
        bool placed = Box3Api.TryPlaceBlockAt(root, "stone", new Vector3Int(0, 0, 0));

        // 然后检查资源是否完全就绪
        if (!Box3Api.PrepareGeneratedAssets())
            Debug.LogWarning("运行时资源未完全就绪，方块可能显示异常");

        // 查询
        if (placed && Box3Api.TryGetBlockIdAt(root, new Vector3Int(0, 0, 0), out string id))
            Debug.Log($"位置 (0,0,0) 的方块是: {id}");

        // 批量放置
        int count = Box3Api.PlaceBlocksInBounds(
            root, "grass",
            new Vector3Int(0, 0, 0),
            new Vector3Int(4, 0, 4));
        Debug.Log($"批量放置了 {count} 个方块");
    }
}
```

## 接入建议

1. **封装项目 Facade** — 在业务层和 `Box3Api` 之间加一层薄封装，统一收口方块 ID 和默认参数
2. **方块 ID 集中管理** — 将常用方块 ID 定义为常量或配置文件，避免硬编码字符串分散
3. **大场景先 Chunk 后加载** — 编辑器构建 Chunk → 运行时加载 Mesh，而非运行时逐块放置
4. **合理设置碰撞** — 仅对需要物理交互的区域开启 `Full` 碰撞，地面类使用 `TopOnly` 或 `None`
5. **批量操作优于循环单次调用** — 使用 `PlaceBlocksInBounds` 而非循环调用 `TryPlaceBlockAt`
