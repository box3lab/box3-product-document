# 导入神奇代码岛模型物品

模组支持将 **神奇代码岛** 中的模型以「物品」形式导入到 Minecraft 中，在创造模式里直接拿取和摆放。

![](https://cdn-community.bcmcdn.com/47/community/030jNSnW6bxNSQOYPpwEQiNq5KgAO3xa6wnCvv1CdE83.png?hash=FhfE0Rva4LSZIQ0BQqShmZxMKxQn)

## 获取神岛模型的 .vox 文件

在神奇代码岛编辑器中，模型默认导出为 **glTF** 格式。在导入 Minecraft 之前，你需要先使用在线转换工具：

1. 在神岛中按你需要的方式导出模型（glTF 格式）；
2. 打开转换页面：[https://box3lab.com/gltf2vox](https://box3lab.com/gltf2vox)
3. 按页面提示上传从神岛导出的 glTF 模型文件；
4. 等待转换完成后，下载生成的 **`.vox` 模型文件**。

完成 glTF → `.vox` 的转换后，你就获得了适合进一步加工或打包进资源包的神岛模型数据。

## 在 Blockbench 中编辑模型

把导出的 `.vox` 转换成适用于 Minecraft 的文件，你需要将模型导入到 **Blockbench** 中，使用「Java 方块 / 物品」类型进行编辑：

1. 打开 Blockbench，选择 **Java 方块 / 物品** 类型的项目；
2. 在 Blockbench 中导入 `.vox` 格式模型（需提前安装 [`Voxel Importer`](https://www.blockbench.net/plugins/vox_importer) 插件）；
3. 根据需要调整模型：
   - 修改模型尺寸、位置和旋转；
   - 拆分或合并部件；
   - 调整或替换贴图；
   - 为方块/物品设置合适的渲染选项；
4. 编辑完成后，将模型以 **Minecraft Java 方块 / 物品模型** 的方式导出：
   - 导出生成的模型文件（`.json`）；
   - 同时导出对应的纹理图片（`.png`），命名需要和模型文件名称一致；
   - 命名建议使用纯英文与下划线，避免 Minecraft 读取失败；
   - 如果导出时提示模型格子过多、不适用于 Minecraft，你可能需要删除溢出内容，否则导入游戏后大概率不会显示任何内容。
     ![](https://cdn-community.bcmcdn.com/47/community/zNtCBWvPjPxYL8qk7Sq0V6cVwpWCEGI6ArgyvFTYNFqB.png?hash=FrnVhLQq7FnHWgFxvHWmPbdMmvkc)

## 获取适用于本模组的模型资源包

要在游戏中使用神岛模型，首先需要准备一个包含模型的资源包：

1. 打开模型资源包生成页：[https://box3lab.com/mc-resource-pack](https://box3lab.com/mc-resource-pack)
2. 按页面提示选择或生成你需要的模型资源：
   - 选择刚才导出的 `.json` 模型文件和 `.png` 纹理，打包为一个适用于本模组的 Minecraft 资源包；
3. 下载生成好的资源包文件（`.zip`）。

## 将资源包放入 Minecraft 目录

1. 找到你的 Minecraft 游戏目录。
2. 在游戏目录下找到 `resourcepacks` 文件夹：
   - 一般路径类似：`minecraft/resourcepacks/`
3. 将刚才下载的模型资源包（`.zip`）复制或移动到 `resourcepacks` 目录下。

完成以上步骤后，资源包已经可以被 Minecraft 识别。

## 在游戏中加载模型资源包

1. 启动 Minecraft 并进入主界面。
2. 打开「选项」→「资源包」。
3. 在左侧列表中找到你刚放入的 **神岛模型资源包**。
4. 将其移动到右侧的「已启用资源包」列表中，点击「完成」后重启游戏。

## 在创造模式中找到模型物品

资源包加载完成后，模型物品会出现在创造模式物品栏的专用标签页中：

- **模型物品标签页**：`Box3:模型`
  - 用于集中展示当前可用的所有神岛模型物品；
  - 你可以像普通物品一样将它们拖到快捷栏中使用。

在游戏中：

1. 进入创造模式世界，打开物品栏（`E` 键，或你自己的按键设置）。
2. 切换到带有 `Box3:模型` 字样的创造标签页。
3. 从中选择你需要的模型物品，拖到快捷栏中。

## 摆放与删除模型：模型销毁桶

- **摆放模型**：
  - 选中某个模型物品，对准地面或方块右键，即可在世界中生成对应模型。

- **删除模型**：
  - 模组提供了一个专用道具：**模型销毁桶**；
  - 当你需要删除某个已经放置的模型时：
    1. 在创造物品栏中找到「模型销毁桶」道具；
    2. 手持模型销毁桶，对着要删除的模型右键；
    3. 该模型就会被安全移除，不影响周围其他方块。
