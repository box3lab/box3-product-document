# API 总览与工程接入

## 命名空间与入口

- Editor API：`Box3Blocks.Editor.Box3Api`
- Runtime API：`Box3Blocks.Box3Api`

使用原则：

- 编辑器工具、批处理、离线构建：使用 Editor API。
- Play 模式和正式运行时逻辑：使用 Runtime API。

## 快速接入

1. 安装包并确认 `Box3` 菜单可用。
2. 打开 `Box3/方块库` 触发资源准备。
3. 运行时调用前执行 `PrepareGeneratedAssets()` 检查资源。
4. 项目中确保存在 `Assets/Box3/Runtime/Box3BlocksCatalog.asset`。

## 示例导入

通过 Package Manager 导入示例：

1. 打开 `Window > Package Manager`
2. 选中 `Box3 Blocks`
3. 切换到 `Samples`
4. 导入：

- `Editor Noise Terrain Demo`
- `Runtime Place/Erase Demo`

## 两套 API 的共同能力

- 放置：`TryPlaceBlockAt`、`TryPlaceBlockOnTop`、`PlaceBlocksInBounds`
- 删除：`EraseBlockAt`、`EraseBlocksInBounds`
- 替换：`ReplaceBlockAt`、`ReplaceBlocksInBounds`
- 旋转：`RotateBlockAt`、`RotateBlocksInBounds`
- 查询：`TryGetBlockIdAt`、`ExistsAt`、`GetTopY`、`GetAvailableBlockIds`、`IsTransparent`

## 关键差异

- Editor API 额外提供：`BuildChunkFromRoot(...)`
- Runtime API 额外提供：
  - `SetDefaultRuntimeCatalog` / `GetDefaultRuntimeCatalog`
  - `SetDefaultColliderMode` / `GetDefaultColliderMode`

## 默认值说明（与工具窗口对齐）

- `BuildChunkFromRoot(...)` 里 `realtimeLightMode` 的 API 默认值是 `None`。
- Builder 里的“生成Chunk”窗口默认值是 `DataOnly`（UI 策略）。
- 如果你在代码中想与窗口一致，请显式传入 `Box3RealtimeLightMode.DataOnly`。

## 最小调用示例

### Editor

```csharp
using Box3Blocks.Editor;
using UnityEngine;

public class EditorExample
{
    public static void PlaceOne(Transform root)
    {
        Box3Api.PrepareGeneratedAssets();
        Box3Api.TryPlaceBlockAt(root, "blue_grass", new Vector3Int(0, 0, 0));
    }
}
```

### Runtime

```csharp
using Box3Blocks;
using UnityEngine;

public class RuntimeExample : MonoBehaviour
{
    [SerializeField] private Transform root;

    private void Start()
    {
        if (!Box3Api.PrepareGeneratedAssets()) return;
        Box3Api.TryPlaceBlockAt(root, "blue_grass", new Vector3Int(0, 0, 0));
    }
}
```

## 接入建议

- 程序层封装一层项目侧 Facade，避免业务直接散落调用底层 API。
- 大场景优先 Chunk 工作流，减少层级与渲染开销。
- 将方块 ID 统一收口到配置文件，避免硬编码字符串分散。
