# 地形导入（与当前实现对齐）

菜单入口：`Box3/地形导入`

## Source 区（导入来源）

当前支持两种来源：

- `Local File`
- `URL`

字段：

- `GZ File`（本地模式）
- `URL`（网络模式）
- `Parent`
- `Create Root`
- `Origin`

## Options 区（选项）

### General

- `Ignore Barrier`
- `Replace previous __VoxelImportGz`
- `Realtime Light Mode`
  - `None`
  - `All`
  - `DataOnly`

### Chunk

- `Collider Mode`
  - `None`
  - `Top`
  - `Full`
- `Chunk Size`
- `Chunks Per Tick`

### Performance

- `Voxels Per Tick`

## Run 区

- `Import`
- `Cancel`

## 参数调优建议

- 先保证可导入，再逐步提速。
- 卡顿先降 `Voxels Per Tick`，再降 `Chunks Per Tick`。
- 大地图优先 Chunk 流程并分区导入。

## 导入后检查

1. 导入根节点是否正确挂在 `Parent`
2. 坐标偏移 `Origin` 是否符合预期
3. 碰撞策略是否正确
4. 灯光数量是否符合目标性能
