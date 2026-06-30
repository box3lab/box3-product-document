# 地形导入

菜单入口：`Box3/地形导入`

## 支持的数据来源

| 来源 | 说明 |
|------|------|
| `Local File` | 本地 `.gz` 文件（gzip 压缩的 JSON） |
| `URL` | 远程 `.gz` 文件（通过 HTTP/HTTPS 下载） |

## Source 区（导入来源）

### 本地文件模式

- `GZ File` — 点击选择本地 `.gz` 文件

### 网络模式

- `URL` — 输入远程 `.gz` 文件的完整 URL

### 通用字段

| 字段 | 说明 |
|------|------|
| `Parent` | 导入根节点的父 Transform。`null` 时放在场景根下 |
| `Create Root` | 自动创建导入根节点 |
| `Origin` | 坐标偏移。用于将多个导入的地形拼接对齐 |

## Options 区（选项）

### General（通用选项）

| 选项 | 默认 | 说明 |
|------|------|------|
| `Ignore Barrier` | `false` | 是否跳过屏障方块（不可见的阻挡方块） |
| `Replace previous __VoxelImportGz` | 视情况 | 导入前是否删除上次导入的结果 |
| `Realtime Light Mode` | `DataOnly` | 实时灯光策略 |

**Realtime Light Mode 取值：**

- `None` — 不生成任何实时点光源
- `All` — 所有发光方块都生成点光源
- `DataOnly` — 仅导入数据中带有灯光信息的发光方块生成

### Chunk（分块选项）

| 选项 | 默认 | 说明 |
|------|------|------|
| `Collider Mode` | `Full` | `None` / `TopOnly` / `Full` |
| `Chunk Size` | `32` | 每个 Chunk 的边长（格） |

### Performance（性能选项）

| 选项 | 默认 | 说明 |
|------|------|------|
| `Voxels Per Tick` | `25000` | 每 Tick 处理体素数（过高会卡顿） |
| `Chunks Per Tick` | `6` | 每 Tick 构建的 Chunk 数量 |

## Run 区

| 按钮 | 作用 |
|------|------|
| `Import` | 开始导入 |
| `Cancel` | 取消导入 |

> 导入是 Tick 分步执行的，可以在 Unity 进度条看到进度。Cancel 按钮可随时中断。

## 导入后检查清单

1. Root 是否正确挂在 `Parent` 下
2. `Origin` 偏移是否符合预期
3. 碰撞策略是否正确（走上去有没有碰撞）
4. 灯光数量是否符合性能预算
5. 关键区域是否有方块缺失或材质异常
6. 是否需要执行 `Box3/资源/清理未引用 Import 网格`

## 参数调优建议

| 症状 | 调整方向 |
|------|----------|
| 导入过程卡顿 | 降低 `Voxels Per Tick`、降低 `Chunks Per Tick` |
| 导入时间长 | 提升 `Chunks Per Tick`（前提是不卡顿） |
| 导入后内存占用高 | 加大 `Chunk Size`（减少 Chunk 总数） |
| 大地图（10万+方块） | `ChunksPerTick=2`、`VoxelsPerTick=10000`、`ChunkSize=32` |

## 导入后资源清理

多次导入/测试后，`Assets/Box3/Meshes/Import/` 下可能积累未引用的网格资产。使用 `Box3/资源/清理未引用 Import 网格` 清理。

## 错误排查

### Import 按钮无反应

- 检查 .gz 文件路径或 URL 是否有效
- 查看 Console 中的错误日志
- 确认 .gz 内容为有效的 Box3 格式 JSON

### 导入后无内容

- 源数据可能为空
- 源数据中无可识别的方块 ID
- 检查 Origin 偏移是否过大导致方块在视野外

### 导入过程中卡死

- 降低 `Voxels Per Tick` 到 10000 以下
- 降低 `Chunks Per Tick` 到 2
- 点击 Cancel 后重新配置再试
