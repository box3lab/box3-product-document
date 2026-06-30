# 地形导出

菜单入口：`Box3/地形导出`

## Export 区

| 字段 | 说明 |
|------|------|
| `Export Root` | 要导出的方块根节点。其下所有 `Box3BlocksPlacedBlock` 都会被导出 |
| `GZ File` | 导出目标路径。点击 `Browse` 选择保存位置 |
| `Include Realtime Light Data` | 是否在导出数据中包含实时灯光信息 |

## 操作按钮

| 按钮 | 作用 |
|------|------|
| `Export` | 开始导出 |
| `Cancel` | 清空状态 |

## 导出步骤

1. 指定 `Export Root` — 拖入场景中的方块根节点
2. 选择导出路径 — 点击 `Browse` 选择 `.gz` 文件保存位置
3. 按需开启/关闭 `Include Realtime Light Data`
4. 点击 `Export` 执行导出
5. 检查状态输出确认成功

## 导出内容

导出的 `.gz` 文件包含：

- 每个方块的 ID、坐标 (x, y, z)
- 可选：发光方块的灯光数据

> 导出文件为 gzip 压缩的 JSON，可用标准工具解压查看。

## 注意事项

- 导出目标是 `Export Root` 下可识别的方块对象（带 `Box3BlocksPlacedBlock` 组件）
- 若根节点为空或没有有效方块，导出会失败并提示
- **建议导出后立即用导入工具回灌验证**一致性
- 导出的 `.gz` 可用于：
  - 其他 Unity 项目通过 `Box3/地形导入` 导入
  - 神岛 Minecraft 模组中加载

## 常见问题

### 导出失败

- 确认 `Export Root` 下存在有效方块
- 确认导出路径有写入权限
- 查看 Console 错误日志

### 导出后导入效果不一致

- 检查导出时是否开启了 `Include Realtime Light Data`，导入时灯光策略是否匹配
- 确认导出和导入使用相同版本的 Box3Blocks 包
