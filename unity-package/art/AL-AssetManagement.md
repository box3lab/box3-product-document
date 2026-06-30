# 资源管理

Box3Blocks 会在项目中生成和管理多种资源。本文说明如何查看、调整和清理这些资源。

## 生成资源位置

工具运行后会在 `Assets/Box3` 下生成资源：

```
Assets/Box3/
├── Textures/           # 图集纹理
│   ├── T_Block.png     # 方块颜色图集
│   ├── T_Block_Bump.png
│   ├── T_Block_Metallic.png
│   └── T_Block_Emission.png
├── Materials/          # 材质
│   ├── M_Block.mat     # 编辑模式方块材质
│   ├── M_Block_Chunk_Opaque.mat      # Chunk 不透明材质
│   └── M_Block_Chunk_Transparent.mat # Chunk 透明材质
├── Meshes/             # 网格
│   ├── M_Cube.fbx      # 方块基础网格
│   └── Import/         # Chunk 导入网格 (__box3gen__ 前缀)
└── Runtime/            # 运行时目录
    └── Box3BlocksCatalog.asset
```

## 图集质量设置

菜单：`Box3/资源/图集质量`

图集系统将数百个方块纹理打包到一张大图（Texture Atlas）中。你可以在此设置：

- **图集尺寸** — 影响纹理清晰度和显存占用
- **纹理格式** — 压缩格式选择

> 图集质量设置后通常需要重新生成 Chunk 才能生效。

## 运行时 UV 目录

菜单：`Box3/运行时/构建 UV 目录`

此操作为所有方块预先计算 UV 坐标并生成 `Box3BlocksCatalog.asset`。这是 **运行时 API 正常工作的前提**：

1. 点击 `Box3/运行时/构建 UV 目录`
2. 等待构建完成
3. `Assets/Box3/Runtime/Box3BlocksCatalog.asset` 被创建或更新

> 每次方块纹理有更新或新增方块后，都需要重新执行此操作。

## 清理未引用网格

菜单：`Box3/资源/清理未引用 Import 网格`

多次导入/构建 Chunk 后，`Assets/Box3/Meshes/Import/` 下可能积累大量不再使用的网格资产。此操作会：

1. 扫描 Import 目录下的所有 `__box3gen__` 前缀网格
2. 检查是否还被场景中的 Chunk 对象引用
3. 删除未引用的网格

> 建议每次大规模重新导入后执行一次清理。

## 方块源纹理

方块纹理源文件位于：

```
Packages/com.box3lab.box3/Editor/SourceAssets/block/
```

每个方块由 6 个面纹理组成（每个面一张 PNG）：

- `{name}_back.png`
- `{name}_bottom.png`
- `{name}_front.png`
- `{name}_left.png`
- `{name}_right.png`
- `{name}_top.png`

> 这些是包内置纹理，不应手动修改。如需自定义纹理，建议通过外部工具链处理后再导入。

## 方块数据文件

| 文件 | 路径 | 用途 |
|------|------|------|
| `block-id.json` | `Editor/SourceAssets/` | 方块 ID 与分类定义 |
| `block-spec.json` | `Editor/SourceAssets/` | 方块行为规则（透明、发光等） |

## 资源故障排查

### 方块显示粉色（材质丢失）

- 检查 `Assets/Box3/Materials/` 是否存在
- 重新打开 `Box3/方块库` 触发资源准备
- 检查 Console 是否有 Shader 缺失报错

### 方块纹理错乱

- 图集可能需要重建 — 删除 `Assets/Box3/Textures/` 后重新打开方块库
- 或在方块库窗口执行资源重新生成

### 运行时 API 报 Catalog 缺失

- 确认已执行 `Box3/运行时/构建 UV 目录`
- 确认 `Assets/Box3/Runtime/Box3BlocksCatalog.asset` 存在
- 在代码中调用 `Box3Api.SetDefaultRuntimeCatalog(catalog)` 显式设置
