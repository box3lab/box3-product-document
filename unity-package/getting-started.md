# 快速上手

这篇指南帮你 5 分钟跑通 Box3Blocks 最核心的流程。

## 前置条件

- Unity 2022.3 LTS 已安装
- 一个空场景或测试场景

## 第一步：安装包

1. 打开 `Window > Package Manager`
2. 点击左上角 `+` → `Add package from git URL...`
3. 输入：
```
https://github.com/box3lab/Box3Blocks-unityPackage.git
```
4. 等待导入完成，菜单栏会出现 `Box3` 菜单

## 第二步：打开方块库

点击菜单 `Box3/方块库`，会打开 **Box3Blocks Builder** 窗口：

![Builder 窗口结构](/unity.png)

窗口分为三块：
- **顶部** — World Root（根节点管理）
- **中部** — Editor Tool（编辑工具）
- **底部** — Block Library（方块选择）

## 第三步：创建根节点

1. 在 Builder 窗口顶部点击 **创建根节点**
2. 场景中会生成一个 `Box3Root` 对象
3. 所有后续放置的方块都会挂在这个对象下面

> 你也可以把已有的空 GameObject 拖入 `Root` 字段来手动指定根节点。

## 第四步：选择方块

在 Block Library 区域：

1. 点击左侧分类（如 "自然"、"建筑"）筛选方块
2. 或在搜索框中输入关键词（如 `grass`）
3. 点击卡片即可选中方块

## 第五步：放置第一个方块

1. 确保工具标签选中 **Place**（默认已选中）
2. 在 Scene 视图中，将鼠标移动到可碰撞表面上
3. 会看到预览线框出现在表面外侧
4. 点击鼠标即可放置方块

## 第六步：试试其他工具

- **Erase** — 点击删除方块（`Shift+2` 切换）
- **Replace** — 将已有方块换成当前选中的方块（`Shift+3`）
- **Rotate** — 旋转方块朝向（`Shift+4`）

## 第七步：导入地形

如果你想导入现有的地形数据：

1. 打开 `Box3/地形导入`
2. 选择 `.gz` 文件或输入 URL
3. 点击 `Import`

详见 [地形导入](/art/AL-GzImport) 了解更多参数。

## 接下来

- [方块库操作指南](/art/AL-BuilderWorkflow) — 画笔、批量编辑、碰撞策略
- [Chunk 构建系统](/art/AL-ChunkSystem) — 将静态方块转为高效网格
- [程序 API 概览](/programmer/PG-OverviewAndSetup) — 代码操作方块世界
