# 地形导出（与当前实现对齐）

菜单入口：`Box3/地形导出`

## Export 区

字段：

- `Export Root`
- `GZ File`
- `Browse`
- `Include Realtime Light Data`

按钮：

- `Export`
- `Cancel`

## 导出步骤

1. 指定 `Export Root`
2. 选择导出路径（`.gz`）
3. 按需开启/关闭 `Include Realtime Light Data`
4. 点击 `Export`

## 注意事项

- 导出目标是 `Export Root` 下可识别的方块对象。
- 若根节点为空或没有有效方块，会导出失败并提示。
- 建议导出后立即用导入工具回灌验证一致性。
