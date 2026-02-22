# Box3 模型资源包结构说明

如果你想了解 Minecraft 资源包的通用概念和更多细节，可以参考百科说明：[https://zh.minecraft.wiki/w/%E8%B5%84%E6%BA%90%E5%8C%85](https://zh.minecraft.wiki/w/%E8%B5%84%E6%BA%90%E5%8C%85) 。

下面以 [https://box3lab.com/mc-resource-pack](https://box3lab.com/mc-resource-pack) 生成的一个名为 `Box3 模型资源包` 的示例资源包为例：

```text
Box3 模型资源包
├─ pack.mcmeta
└─ assets
   └─ box3
      ├─ items
      │  └─ 物品映射文件 json（程序自动生成）
      ├─ lang
      │  └─ en_us.json（程序自动生成）
      ├─ models
      │  └─ item
      │     └─ 物品文件 json
      └─ textures
         └─ item
            └─ 物品文件 png
```

## 顶层文件

### `pack.mcmeta`

- 资源包的「描述文件」，Minecraft 用它来识别：
  - 资源包的格式版本（`pack_format`）；
  - 资源包名称与描述等信息。

## `assets/box3` 命名空间

`assets/box3` 是本模组的资源命名空间，所有与 Box3 模型物品相关的资源都会放在这里。

### `items/` 目录

```text
assets/box3/items/model.json
```

- 存放由程序自动生成的 **物品映射文件**，用于把「物品」关联到具体的模型：
- 一个典型的 `model.json` 内容示例如下：

```json
{
  "model": {
    "type": "minecraft:model",
    "model": "box3:item/model"
  }
}
```

- 这里的 `box3:item/model` 会指向下文 `models/item/model.json` 中定义的物品模型。

> 提示：这些映射文件由生成程序自动处理，**一般不需要你手动修改**。

### `lang/` 目录

```text
assets/box3/lang/en_us.json
```

- 存放 **语言与名称映射**，用于给物品、方块等添加显示名称。
- `en_us.json` 示例：
  - 为某个模型物品配置在英文环境下的显示名称；
  - 如果你有多语言需求，可以类似添加 `zh_cn.json` 等语言文件。

示例：

```json
{
  "item.box3.model": "Model"
}
```

### `models/item/` 目录

```text
assets/box3/models/item/model.json
```

- 存放 **物品模型定义文件**，告诉 Minecraft：
  - 这个物品在手上、在物品栏中如何渲染；
  - 使用哪一张纹理、使用怎样的模型结构。
- 这就是你在 Blockbench 中导出的 `model.json` 这一类模型文件。

在由程序处理后的模型文件中，纹理部分大致类似下面这样（仅示意）：

```json
{
  "textures": {
    "0": "box3:item/model",
    "particle": "box3:item/model"
  }
}
```

- 这里的 `box3:item/model` 会最终对应到 `textures/item/model.png` 这张贴图。

### `textures/item/` 目录

```text
assets/box3/textures/item/model.png
```

- 存放 **物品纹理图片**。
- `model.png` 就是你在 Blockbench 编辑模型时搭配导出的 `.png` 贴图：
  - 文件名与模型文件名保持一致（如 `model.json` 对应 `model.png`）；

Minecraft 会根据 `models/item/model.json` 中的纹理路径，找到这里的 `model.png` 并渲染在物品模型上。
