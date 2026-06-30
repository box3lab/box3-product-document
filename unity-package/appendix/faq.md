# 常见问题

## 安装与启动

### 安装后菜单没出现 Box3

- 检查 Unity 版本是否为 2022.3 LTS
- 确认 Package Manager 中没有编译错误（红色报错）
- 尝试 `Window > Package Manager` 中移除再重新安装

### 打开方块库报错

最常见的两个原因：

1. **Shader 未编译完成** — 等待 Unity 后台编译完成后再试
2. **源纹理缺失** — 确保 `Packages/com.box3lab.box3/Editor/SourceAssets/block/` 目录完整

## 方块编辑

### 放置方块后看不见

可能原因：

1. **Scene 视图光照不足** — 检查场景灯光或切换到 Lit 模式
2. **方块落在视野外** — 选中 Root 对象按 F 键聚焦
3. **材质未生成** — 确认 `Assets/Box3/Materials/M_Block.mat` 存在

### 编辑时 Scene 视图卡顿

1. 缩小画笔范围（减小 `Horizontal` 和 `Height`）
2. 关闭 `Auto Chunk Preview`（自动 Chunk 预览）
3. 分区域编辑，不要在一个 Root 下堆积过多方块
4. 暂时关闭 `Generate Collider`

### 怎样批量修改方块

1. 选中 Replace 工具（`Shift+3`）
2. 在 Block Library 选中目标方块
3. 调整画笔大小覆盖需要替换的区域
4. 点击场景中的方块即可批量替换

### 空心搭建怎么用

勾选 `Hollow Build (Shell Only)` 后，画笔只会放置外壳方块，内部留空。适用于：
- 快速建造房间/建筑外壳
- 减少方块数量

## 地形导入导出

### 导入 .gz 无反应

1. 确认文件路径正确且文件存在
2. 检查 `.gz` 内容是否有效 JSON（不是所有 gzip 文件都是 Box3 格式）
3. 检查 Console 错误日志
4. 确保 Parent 节点设置正确

### 导入后材质异常

导入完成后检查：
- `Assets/Box3/Materials/M_Block_Chunk_Opaque.mat` 是否存在
- Shader 是否正确（应为 `Box3Blocks/ChunkOpaqueTiled`）
- 图集纹理是否完整

### 导入大量方块卡住

1. 降低 `Voxels Per Tick`（如 10000）
2. 降低 `Chunks Per Tick`（如 2）
3. 考虑分批导入不同区域
4. 如果长时间无响应，点击 Cancel 后降参再试

### 导出的 .gz 能在哪里用

- 其他 Unity 项目中通过 `Box3/地形导入` 导入
- 神岛 Minecraft 模组中加载

## Chunk 相关

### Chunk 和原始方块的区别

Chunk 是将多个方块合并为单个 Mesh，不再保留独立方块的 GameObject。构建后无法单独编辑某个方块，只能重新构建整个 Chunk。

### 构建 Chunk 后还能编辑吗

不能直接编辑 Chunk 中的单个方块。正确做法是：

1. 保留原始方块数据（不勾选 `Delete Source Blocks After Build`）
2. 在原始方块上编辑
3. 编辑完成后重新构建 Chunk

### 自动 Chunk 预览的用途

在编辑器里实时预览 Chunk 构建后的效果（材质、光照、遮挡），帮助你在编辑时就发现可能的问题。

### Chunk 碰撞不准确

- 检查 `Collider Mode` 是否正确设置
- `TopOnly` 只生成顶面碰撞，适合行走表面
- `Full` 生成精确 Mesh Collider，但性能开销更大

## API 编程

### Editor API 和 Runtime API 能混用吗

不建议。Editor API 只在 `#if UNITY_EDITOR` 下可用，Runtime API 在 Play 模式下运行。两者底层实现不同（Editor 用 `EditorCoreBackend`，Runtime 用 `Box3BlocksRuntimeBackend`）。

### 运行时 API 需要什么前置条件

1. 场景中存在 `Box3BlocksRuntimeService`（API 会自动添加）
2. Runtime Catalog 已构建（`Box3/运行时/构建 UV 目录`）
3. 调用 `Box3Api.PrepareGeneratedAssets()` 确保资源就绪

### 如何获取可用方块 ID 列表

```csharp
// Editor
var ids = Box3Blocks.Editor.Box3Api.GetAvailableBlockIds();

// Runtime
var ids = Box3Blocks.Box3Api.GetAvailableBlockIds();
```
