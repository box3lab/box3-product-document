# 从 Minecraft 工作流导入（与当前实现对齐）

本流程的核心是：

- Minecraft 侧负责产出 `.gz` 地形数据。
- Unity 侧通过 `Box3/地形导入` 读取 `.gz`。

## 前提条件

- 你已经在 Minecraft/神岛相关工具链中完成搭建。
- 你手里有可用的 `.gz` 文件。

参考文档：

- [Box3Blocks MC 模组文档](https://docs.box3lab.com/mc-mod/)

## Unity 侧标准导入步骤

1. 打开 Unity 菜单 `Box3/地形导入`
2. 选择来源：
   - `Local File`（本地 `.gz`）
   - `URL`（远程 `.gz`）
3. 配置基础字段：
   - `Parent`
   - `Origin`
4. 配置导入选项：
   - `Ignore Barrier`
   - `Replace previous __VoxelImportGz`
   - `Realtime Light Mode`（`None` / `All` / `DataOnly`）
5. 配置 Chunk 参数：
   - `Collider Mode`
   - `Chunk Size`
   - `Chunks Per Tick`
   - `Voxels Per Tick`
6. 点击 `Import` 并等待完成

## 参数建议（大地图）

- 优先使用 Chunk 导入。
- 初次导入建议降低：
  - `Voxels Per Tick`
  - `Chunks Per Tick`
- 先保证导入稳定，再逐步提速。

## 兼容边界（重要）

- 当前 Unity 包面向神岛相关方块数据。
- 非神岛原版/第三方模组方块或复杂模型，不保证可正确还原。
- 若 Minecraft 侧导出内容超出神岛方块体系，Unity 侧可能出现缺失或跳过。

## 导入完成后的检查清单

1. Root 是否正确挂载到 `Parent`
2. `Origin` 偏移是否符合预期
3. 碰撞模式是否满足玩法需求
4. 灯光数量是否符合性能预算
5. 关键区域是否有方块缺失或材质异常

## 常见问题

### 导入失败 / 无内容

- `.gz` 路径或 URL 无效
- `.gz` 数据格式不符合当前工具链
- 源数据为空或无可识别方块

### 导入后卡顿

- 降低 `Voxels Per Tick`、`Chunks Per Tick`
- 分区域分批导入，不要一次塞满整张图

### 导入后效果不一致

- 检查是否包含非神岛方块或外部模型数据
- 核对 Minecraft 侧导出配置是否正确
