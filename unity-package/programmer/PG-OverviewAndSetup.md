# API 总览与工程接入

- Editor API：`Box3Blocks.Editor.Box3Api`
- Runtime API：`Box3Blocks.Box3Api`

原则：

- 编辑器工具、批处理、导入流程：使用 Editor API
- Play 模式与玩家行为：使用 Runtime API

## 示例导入

你可以通过 Unity Package Manager 导入示例，快速参考 API 用法：

1. 打开 `Window > Package Manager`
2. 选中 `Box3 Blocks`
3. 切换到 `Samples`
4. 导入示例：

- `Editor Noise Terrain Demo` - 编辑器示例
- `Runtime Place/Erase Demo` - 运行时示例

每个示例导入后，目录中都会附带一个 `README` 或说明文档，建议**按照示例自带的说明步骤运行场景**，以便快速理解推荐的接入与调用方式。

## 统一能力集合

两套 API 都提供：

- 放置/删除/替换/旋转
- 区域批量操作（Bounds）
- 查询当前格子信息

## 必要资源

运行时依赖：

- `Assets/Box3` 生成资源
- `Assets/Box3/Runtime/Box3BlocksCatalog.asset` UV映射表
