# Chunk 构建系统

## 什么是 Chunk

Box3Blocks 有两种方块表示方式：

| 方式 | 结构 | 性能 | 适用场景 |
|------|------|------|----------|
| **GameObject 方块** | 每个方块是独立 GameObject | 数百到数千个 OK | 编辑阶段、小场景 |
| **Chunk 网格** | 多个方块合并为一个 Mesh | 数万到数十万个 | 发布/大地图 |

**Chunk 就是把方块"烘焙"成合并网格**：将一个区域的方块合成一个 Mesh 对象，大幅减少 Draw Call 和 GameObject 数量。

## 构建时机

你通常在以下情况需要构建 Chunk：

- 编辑完成，准备导出或打包场景
- 场景中方块超过几千个，编辑器开始卡顿
- 需要导出静态地形给其他系统
- 运行时需要加载预构建的地形

## 从 Builder 构建

### 方式一：通过 Builder 窗口

1. 在 `Box3/方块库` 中完成方块编辑
2. 点击顶部的 **生成Chunk** 按钮
3. 在弹出的配置窗口中调整参数
4. 点击 **构建 Chunk** 执行

### 方式二：通过代码

```csharp
using Box3Blocks.Editor;
using UnityEngine;

bool ok = Box3Api.BuildChunkFromRoot(
    sourceRoot: myRoot,
    parent: null,                         // null = 自动创建父节点
    origin: Vector3Int.zero,
    ignoreBarrier: false,
    clearPrevious: true,
    realtimeLightMode: Box3Api.Box3RealtimeLightMode.DataOnly,
    colliderMode: Box3ColliderMode.Full,
    chunkSize: 32,
    chunksPerTick: 6,
    voxelsPerTick: 25000,
    deleteSourceBlocksAfterBuild: true    // 构建后删除原始方块
);
```

## 参数详解

### 核心参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `sourceRoot` | (必填) | 包含 `Box3BlocksPlacedBlock` 组件的方块根节点 |
| `parent` | `null` | Chunk 网格的父节点；`null` 时自动创建 |
| `origin` | `(0,0,0)` | 原点偏移，用于拼接多区域 Chunk |
| `chunkSize` | `32` | 每个 Chunk 的边长（体素单位）。越大 = Chunk 数越少但单个越大 |

### 过滤选项

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `ignoreBarrier` | `false` | 是否跳过屏障方块（`barrier` 类型的不可见方块） |
| `clearPrevious` | `true` | 是否在构建前删除上次导入的 `__VoxelImportGz` 根节点 |
| `deleteSourceBlocksAfterBuild` | `false` | 构建成功后删除源方块的 GameObject |

### 性能参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `chunksPerTick` | `6` | 每 Tick 最多构建几个 Chunk。越大越快，但可能卡顿 |
| `voxelsPerTick` | `25000` | 每 Tick 最多处理多少体素。超过则暂停等下一 Tick |

### 灯光与碰撞

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `realtimeLightMode` | `None` | 实时灯光策略 |
| `colliderMode` | `None` | Chunk 碰撞模式 |

**实时灯光模式取值：**

- `None (0)` — 不生成任何实时点光源
- `AllEmissive (1)` — 所有发光方块都生成点光源
- `DataOnly (2)` — 仅导入数据中带有灯光信息的发光方块生成

**碰撞模式取值：**

- `None` — 无碰撞（纯视觉）
- `TopOnly` — 仅顶面有薄碰撞（适合行走表面）
- `Full` — 完整 Mesh Collider（适合需要精确碰撞的场景）

## 性能调优策略

### 调参口诀

```
卡顿 → 先降 VoxelsPerTick，再降 ChunksPerTick
构建慢 → 升 ChunksPerTick（前提是不卡顿）
内存高 → 加大 ChunkSize（减少 Chunk 数量）
加载慢 → 减小 ChunkSize（让 Chunk 更快出现）
```

### 参数组合建议

| 场景规模 | ChunkSize | ChunksPerTick | VoxelsPerTick |
|----------|-----------|---------------|---------------|
| 小型（<1万方块） | 16 | 12 | 100000 |
| 中型（1-10万方块） | 32 | 6 | 25000 |
| 大型（10万+方块） | 32 | 2 | 10000 |

### 大地图分区域策略

1. 不要一次构建全图 — 按区域拆多个 Root
2. 每个区域独立 `BuildChunkFromRoot`，使用不同 `origin` 偏移
3. 每个区域可以独立启用/禁用，做 LOD 或流式加载
4. 区域之间留 1-2 格重叠避免接缝

## 自动 Chunk 预览 (Auto Chunk Preview)

Builder 窗口中有一个 **自动 Chunk 预览** 开关：

- 开启后，每次编辑操作会自动触发 Chunk 重建（带 0.2 秒防抖）
- 让你实时看到方块转换为 Chunk 后的效果
- 预览 Chunk 挂在 `__AutoChunkPreview` 节点下
- 可以调节预览的 Chunk 尺寸（8-64）

> 建议在编辑中等规模场景时开启，帮助提前发现 Chunk 构建后的视觉效果差异。大规模编辑时可关闭以提升响应速度。

## 构建产物

Chunk 构建完成后，资源输出到：

- `Assets/Box3/Meshes/Import/` — Chunk 网格资产（`__box3gen__` 前缀）
- `Assets/Box3/Materials/` — Chunk 材质（`M_Block_Chunk_Opaque.mat`、`M_Block_Chunk_Transparent.mat`）

场景中的 Chunk 对象组织为：

```
__VoxelImportGz (根)
├── Chunk [0,0,0]
├── Chunk [32,0,0]
├── Chunk [0,32,0]
└── ...
```

每个 Chunk 节点名即为它的原点坐标。

## 清理

如果构建结果不理想，可以：

- 删除场景中的 `__VoxelImportGz` 对象重新构建
- 使用 `Box3/资源/清理未引用 Import 网格` 清理遗留的 Mesh 资产
