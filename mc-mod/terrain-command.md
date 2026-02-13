# 地形导入命令

本页介绍如何使用 `/box3import` 命令，将上一页中准备好的地形文件（`.gz`）导入到 Minecraft 世界中。

在阅读本页前，请先完成：

- 按照上一页的说明，从神奇代码岛导出建筑并获得 `xxxx.gz` 文件；
- 将该文件放置到 `minecraft/config/box3mod/` 目录下。

![](https://cdn-community.bcmcdn.com/47/community/ohaendUwhlx1C0Dtpn8RxurfwPLtW6XqSVujL55smQT3.png?hash=linPFKR0M05RHsyj4zkDtWNPIQV4)

## 列出可导入的地形文件

- **语法**：
  - `/box3import`
- **作用**：
  - 列出 `config/box3mod/` 目录下所有可导入的压缩地形文件（`.gz`）。

当你不确定当前目录里有哪些文件时，可以先执行一次该命令查看列表，然后再选择要导入的文件名。

## 按文件名导入建筑

- **语法**：
  - `/box3import <fileName>`
- **作用**：
  - 从 `config/box3mod/<fileName>.gz` 导入对应的建筑到当前世界。
- **注意**：
  - 命令中的 `<fileName>` **不需要** 带 `.gz` 后缀，会自动补全。
  - 默认会以**玩家当前位置所在的坐标**作为基点，在其附近生成建筑结构。

**示例：**

- 目录中存在 `park.gz`：
  - 执行：`/box3import park`
  - 效果：导入名为 `park` 的建筑。

## 忽略屏障方块导入

- **语法**：
  - `/box3import <fileName> <ignoreBarrier>`
- **参数说明**：
  - `ignoreBarrier = true`：导入时**跳过屏障方块**（不会在世界中放置这些方块）；
  - `ignoreBarrier = false`：正常导入所有方块（包含屏障）。

**适用场景：**

- 只想要建筑的**外观和结构**，但不希望带上屏障碰撞；
- 在调试或拍照时，希望场景更干净、没有隐形的挡路方块。

**示例：**

- 导入 `park`，忽略屏障方块：
  - `/box3import park true`

## 统一替换为原版水

- **语法**：
  - `/box3import <fileName> <ignoreBarrier> <useVanillaWater>`
- **参数说明**：
  - `useVanillaWater = true`：导入时将所有流体统一替换为 **Minecraft 原版水方块**；
  - `useVanillaWater = false`：保留原始流体配置。

**适用场景：**

- 希望导入后的水体与原版世界完全一致；
- 避免某些自定义流体在整合包 / 服务器环境中出现兼容问题。

**示例：**

- 导入 `park`，忽略屏障，并将所有流体替换为原版水：
  - `/box3import park true true`
