# Box3Blocks（神岛材质包）for Minecraft

Box3Blocks（神岛材质包）是一款为 **Minecraft Java 版** 提供神奇代码岛建筑方块与模型支持的模组。

- **372 种神岛原汁原味的方块**，在 MC 里还原神岛的视觉风格。
- **一键将神岛建筑迁移到 Minecraft**，无需手动搭建。
- **支持导入神岛模型物品**，在 MC 里使用已有模型内容。
- **支持从 MC 导出建筑到 Unity**，打通两个创作平台的资产流转。

安装并启用该模组后，你可以像使用普通方块一样，在创造模式中自由搭建神岛风格的建筑，也可以将神岛中的作品快速搬运到 MC 进行展示或二次创作。

## 支持的平台

Box3Blocks 同时支持三大模组加载器，覆盖主流 Minecraft 版本：

| 加载器 | Minecraft 版本 |
|--------|---------------|
| Fabric | 1.20.1 / 1.21.1 / 1.21.11 / 26.1 |
| NeoForge | 1.21.1 / 26.1 |
| Forge | 1.20.1 |

前往 [CurseForge](https://www.curseforge.com/minecraft/mc-mods/box3-blocks)、[Modrinth](https://modrinth.com/mod/box3-blocks) 或 [GitHub Releases](https://github.com/box3lab/Box3Blocks-MCMod/releases) 下载对应平台的构建文件。

## 安装模组

Box3Blocks 依赖对应加载器的 API，请先确保你已安装：

- **Fabric**：需安装 [Fabric Loader](https://fabricmc.net/use/) 和 [Fabric API](https://modrinth.com/mod/fabric-api)
- **NeoForge**：需安装对应版本的 NeoForge
- **Forge**：需安装对应版本的 Minecraft Forge（仅 1.20.1）

大多数主流启动器（HMCL、PCL2、BakaXL 等）内置了上述环境的快捷安装入口，通常**不需要手动去各网站单独下载**，在启动器中选择对应版本即可。

安装模组本身：

1. 在启动器内置模组市场中搜索 **Box3Blocks** 并安装；
2. 或从上述平台手动下载 `.jar` 文件，放入游戏目录的 `mods` 文件夹。

## 验证安装

进入游戏主界面后：

1. 创建或进入任意世界。
2. 将游戏模式切换为 **创造模式**。
3. 打开物品栏（默认 `E` 键），翻到第二页左右。

如果你能在物品栏中看到类似下图的方块分组界面，说明模组已成功加载：

![](https://cdn-community.bcmcdn.com/47/community/ZUMtBLfXDPbsNbk2y8G2tvLJbuzBlpy9oEM0uVaH2y9Y.png?hash=FqXkR-ou9cY6sej0nonfaWXiJOds)

## 快速上手

根据你的需求，选择对应的指南：

| 我想... | 阅读 |
|---------|------|
| 在创造模式中使用神岛方块搭建 | [使用方块](blocks.md) |
| 把神岛里的建筑搬到 MC 里 | [导入建筑](import-terrain.md) |
| 把 MC 里的建筑导出为地形文件 | [导出建筑](export-terrain.md) |
| 把神岛模型导入为 MC 物品 | [导入模型](model.md) |
| 了解资源包内部结构 | [资源包结构](resource-pack.md) |
| 管理命令权限（服主） | [命令与权限](commands.md) |
