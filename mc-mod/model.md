# 导入神岛模型物品

模组支持将**神奇代码岛中的模型**以物品形式导入到 Minecraft，在创造模式中直接拿取和摆放。整体流程为：

```
导出 glTF → 转为 .vox → Blockbench 编辑 → 生成资源包 → 加载使用
```

![](https://cdn-community.bcmcdn.com/47/community/030jNSnW6bxNSQOYPpwEQiNq5KgAO3xa6wnCvv1CdE83.png?hash=FhfE0Rva4LSZIQ0BQqShmZxMKxQn)

## 1. 从神岛导出模型

在神奇代码岛 Voxa 编辑器中：

1. 打开你要导出的模型；
2. 选择 **整体导出**，导出为 **glTF** 格式。

## 2. 转换为 .vox 格式

1. 打开转换页面：[https://box3lab.com/gltf2vox](https://box3lab.com/gltf2vox)
2. 上传上一步导出的 glTF 文件；
3. 等待转换完成后，下载生成的 **`.vox` 模型文件**。

## 3. 在 Blockbench 中编辑

将 `.vox` 文件导入 **Blockbench**，按 Minecraft Java 版模型规范进行调整。

1. 在 Blockbench 中创建 **"Java 方块 / 物品"** 类型的项目。
2. 安装 [`Voxel Importer`](https://www.blockbench.net/plugins/vox_importer) 插件，导入 `.vox` 文件。
3. 根据需要调整模型：
   - 尺寸、位置和旋转；
   - 拆分或合并部件；
   - 贴图的调整与替换；
   - 方块/物品的渲染选项。
4. 编辑完成后，导出为 Minecraft Java 模型：
   - 导出模型文件（`.json`）；
   - 同时导出对应的纹理图片（`.png`），**文件名需与模型文件一致**。

::: warning 模型复杂度限制
Minecraft 对单个模型的元素数量有上限。如果 Blockbench 提示模型格子过多，你需要删减元素，否则导入游戏后模型可能无法正常显示。

![](https://cdn-community.bcmcdn.com/47/community/zNtCBWvPjPxYL8qk7Sq0V6cVwpWCEGI6ArgyvFTYNFqB.png?hash=FrnVhLQq7FnHWgFxvHWmPbdMmvkc)
:::

> 命名建议：模型和纹理文件名使用纯英文与下划线，避免 Minecraft 读取失败。

## 4. 生成模型资源包

1. 打开资源包生成页面：[https://box3lab.com/mc-resource-pack](https://box3lab.com/mc-resource-pack)
2. 上传上一步导出的 `.json` 模型文件和 `.png` 纹理。
3. 网页会自动打包为适用于本模组的 Minecraft 资源包。
4. 下载生成的 `.zip` 文件。

::: tip 了解资源包结构
如果你想了解生成的资源包内部包含哪些文件、目录结构如何组织，可参考：[资源包结构说明](resource-pack.md)。
:::

## 5. 加载资源包

1. 启动 Minecraft，进入主界面。
2. 打开 **选项 → 资源包**。
3. 将下载的 `.zip` 文件拖入，点击将其移动到右侧的"已启用"列表。
4. 点击"完成"，重启游戏。

## 6. 在创造模式中找到模型

资源包加载成功后，模型物品会出现在创造模式物品栏的专用标签页：

- 标签页名称：**`Box3:模型`**
- 所有模型物品集中展示在此，你可以像普通物品一样将它们拖到快捷栏中使用。

## 7. 在游戏中调整模型

放置好模型后，可以通过**右键模型本体**切换配置模式，再用特定物品进行精细调整。

### 切换模式

- **空手**右键模型：在以下模式之间循环切换：
  - 缩放模式
  - X 轴偏移模式
  - Y 轴偏移模式
  - Z 轴偏移模式
  - 旋转模式

### 调整参数

| 手持物品 | 右键效果 |
|----------|---------|
| 木棍 (`minecraft:stick`) | 当前模式的数值 **增加** |
| 烈焰棒 (`minecraft:blaze_rod`) | 当前模式的数值 **减少** |

### 复制粘贴参数

| 手持物品 | 右键效果 |
|----------|---------|
| 纸 (`minecraft:paper`) | **复制**当前模型的全部参数 |
| 书 (`minecraft:book`) | 将复制的参数**粘贴**到目标模型 |

通过复制粘贴，你可以快速让多个模型保持相同的缩放、偏移和旋转设置。
