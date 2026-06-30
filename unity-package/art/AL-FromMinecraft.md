# 从 Minecraft 工作流导入

本流程的核心：Minecraft 侧产出 `.gz` 地形数据 → Unity 侧通过 `Box3/地形导入` 读取。

## 前置条件

- 已在 Minecraft/神岛模组中完成搭建
- 已通过模组导出 `.gz` 地形文件

参考：[Box3Blocks MC 模组文档](https://docs.box3lab.com/mc-mod/)

## Unity 侧标准导入步骤

1. 打开 `Box3/地形导入`
2. 选择数据来源：
   - `Local File`（本地 `.gz` 文件）
   - `URL`（远程 `.gz` 文件）
3. 配置基础参数：
   - `Parent` — 导入根节点的父对象
   - `Origin` — 坐标偏移
4. 配置导入选项：
   - `Ignore Barrier` — 是否忽略屏障方块
   - `Replace previous __VoxelImportGz` — 是否替换上次导入
   - `Realtime Light Mode` — 灯光策略
5. 配置 Chunk 参数：
   - `Collider Mode` — 碰撞模式
   - `Chunk Size` — Chunk 尺寸
   - `Chunks Per Tick` — 每 Tick 构建 Chunk 数
   - `Voxels Per Tick` — 每 Tick 处理体素数
6. 点击 `Import` 等待完成

## 大地图参数建议

| 地图规模 | ChunkSize | ChunksPerTick | VoxelsPerTick |
|----------|-----------|---------------|---------------|
| 小型（< 1万方块） | 16 | 12 | 100000 |
| 中型（1-10万方块） | 32 | 6 | 25000 |
| 大型（10万+方块） | 32 | 2 | 10000 |

> 初次导入建议使用低参数，保证稳定后再逐步提速。

## 导入完成后的检查清单

1. Root 是否正确挂载到 `Parent`
2. `Origin` 偏移是否符合预期
3. 碰撞模式是否满足玩法需求
4. 灯光数量是否符合性能预算
5. 关键区域是否有方块缺失或材质异常
6. 对比 Minecraft 端视角确认整体还原度

## 兼容边界（重要）

- 当前 Unity 包面向**神岛方块体系**的数据
- 非神岛原版方块、第三方模组方块或复杂模型**不保证正确还原**
- 若 Minecraft 侧导出内容超出神岛方块体系，Unity 侧可能出现缺失或跳过

## 常见问题

### 导入失败 / 无内容

- `.gz` 路径或 URL 无效 — 检查文件是否存在、URL 是否可访问
- `.gz` 数据格式不符合当前工具链 — 确认导出端版本匹配
- 源数据为空或无可识别方块 — 检查 Minecraft 端导出配置

### 导入后卡顿

- 降低 `Voxels Per Tick`（如 10000）
- 降低 `Chunks Per Tick`（如 2）
- 分区域分批导入，不要一次塞满整张图

### 导入后效果与 Minecraft 不一致

- 检查是否包含非神岛方块或外部模型数据
- 核对 Minecraft 侧导出选项是否正确
- 灯光效果差异可能与 `Realtime Light Mode` 设置有关
