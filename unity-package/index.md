# Box3Blocks（神岛材质包）for Unity

Box3Blocks（神岛材质包） 是一个基于 **Unity** 的神岛方块工具包，用于将 Box3 方块世界能力引入 Unity：

- **可视化方块编辑**：在 Unity 编辑器中像积木一样搭建、删除、替换、旋转方块。
- **地形导入导出**：支持 `.gz` 地形数据导入与导出，方便与外部流程协同。
- **运行时 API**：支持在游戏运行时通过脚本动态生成、删除、旋转方块。
- **支持从 Minecraft 工作流迁移**：你可以先在 Minecraft 中搭建内容，再导入 Unity 进行展示、编辑与玩法开发。

安装并配置完成后，你可以在 Unity 中快速完成神岛风格场景搭建，并将同一套方块能力用于关卡制作与运行时玩法测试。

## 安装前准备

- Unity：`2022.3 LTS`

## 下载与安装方式

你可以通过 Unity Package Manager 直接安装：

1. 打开 `Window > Package Manager`
2. 点击左上角 `+`
3. 选择 `Add package from git URL...`
4. 输入：

```
https://github.com/box3lab/Box3Blocks-unityPackage.git
```

## 验证插件是否安装成功

安装后请按以下步骤验证：

1. 在 Unity 菜单中查看是否出现 `Box3` 菜单组。
2. 打开 `Box3/方块库`，确认窗口可正常显示。
3. 方块资源会生成，确认项目中生成 `Assets/Box3`。

如果以上步骤都正常，说明包已成功安装并可用。
