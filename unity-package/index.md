# Box3Blocks（神岛材质包）for Unity

Box3Blocks（神岛材质包）是一个用于 Unity 的神岛方块工具包，覆盖编辑器搭建、地形导入导出、Chunk 构建和运行时脚本控制。

## 适用对象

| 角色 | 可以做什么 | 从哪里开始 |
|------|-----------|-----------|
| 美术/关卡 | 可视化搭建方块世界，导入导出地形 | [快速上手](/getting-started) → [方块库操作](/art/AL-BuilderWorkflow) |
| 程序 | 通过 API 操作方块，集成到游戏逻辑 | [API 概览](/programmer/PG-OverviewAndSetup) |
| TA | 调整图集质量、运行时目录、性能优化 | [资源管理](/art/AL-AssetManagement) |

## 核心能力

- **方块编辑**：Place / Erase / Replace / Rotate，支持画笔体积、空心搭建
- **地形导入导出**：`.gz` 格式，支持本地文件和远程 URL
- **Chunk 构建**：将静态方块烘焙为合并网格，大幅提升性能
- **自动 Chunk 预览**：编辑时实时预览 Chunk 效果
- **Runtime API**：运行时动态放置/删除/查询方块
- **双语支持**：中英文界面自动切换

## 环境要求

- Unity：`2022.3 LTS`
- 无额外第三方包依赖

## 安装

1. 打开 `Window > Package Manager`
2. 点击左上角 `+`
3. 选择 `Add package from git URL...`
4. 输入：

```text
https://github.com/box3lab/Box3Blocks-unityPackage.git
```

5. 等待导入完成，菜单栏出现 `Box3` 菜单

## 菜单入口一览

| 菜单 | 用途 |
|------|------|
| `Box3/方块库` | 打开方块编辑主窗口 |
| `Box3/地形导入` | 从 .gz 文件/URL 导入地形 |
| `Box3/地形导出` | 导出场景方块为 .gz |
| `Box3/资源/图集质量` | 调整纹理图集设置 |
| `Box3/资源/清理未引用 Import 网格` | 清理废弃 Chunk 网格 |
| `Box3/运行时/构建 UV 目录` | 生成运行时 Catalog |

## 文档导航

### 新手入门
- [快速上手](/getting-started) — 5 分钟跑通核心流程

### 编辑器操作
- [方块库操作指南](/art/AL-BuilderWorkflow) — 编辑工具、画笔、碰撞策略
- [地形导入](/art/AL-GzImport) — .gz 导入选项与参数调优
- [地形导出](/art/AL-GzExport) — 导出场景方块
- [Chunk 构建系统](/art/AL-ChunkSystem) — 方块烘焙、自动预览、性能调优
- [从 Minecraft 导入](/art/AL-FromMinecraft) — MC 模组工作流
- [资源管理](/art/AL-AssetManagement) — 图集、运行时目录、网格清理

### 程序开发
- [API 概览与工程接入](/programmer/PG-OverviewAndSetup) — 命名空间、差异、快速示例
- [Editor API 参考](/programmer/API-Editor) — 完整 Editor API 文档
- [Runtime API 参考](/programmer/API-Runtime) — 完整 Runtime API 文档

### 附录
- [菜单入口速查](/appendix/menu-reference) — 全部菜单 + 快捷键
- [常见问题](/appendix/faq) — 安装、编辑、导入导出、API 常见问题
