# 使用神岛方块

模组新增了 **372 种方块**，涵盖字母、数字、符号、颜色、元素等多个类别，全部按用途整理在创造模式物品栏的 **9 个标签页** 中。

## 浏览方块

1. 进入创造模式世界，打开物品栏（默认 `E` 键）。
2. 翻到带有 Box3 图标的标签页分组区域。
3. 你会看到以下 9 个分类标签：

| 标签 | 内容 |
|------|------|
| `Box3:字母` | A–Z 字母方块 |
| `Box3:数字` | 0–9 数字方块 |
| `Box3:符号` | 加号、减号、感叹号、问号等 |
| `Box3:颜色` | 各色纯色方块 |
| `Box3:元素` | 化学元素相关方块 |
| `Box3:食物` | 食物造型方块 |
| `Box3:灯光` | 自带发光效果的方块 |
| `Box3:自然` | 自然材质方块（草、土、石等） |
| `Box3:建筑` | 建筑材料方块 |

从标签页中，将你需要的方块拖到快捷栏，即可在世界中放置使用。

![](https://cdn-community.bcmcdn.com/47/community/ZUMtBLfXDPbsNbk2y8G2tvLJbuzBlpy9oEM0uVaH2y9Y.png?hash=FqXkR-ou9cY6sej0nonfaWXiJOds)

![建筑示例](https://cdn-community.bcmcdn.com/47/community/ExrJV8EZ4R5zUcAupx6gRqbkWbLTr2WF02Q2b4Y8qja0.png?hash=FmFVOLPPS9PpWZpmbfbg-RommvFm)

## 屏障方块可见性

神岛中用于做空气墙/碰撞的"屏障方块"在模组中同样存在。无论屏障是否可见，**碰撞体积始终存在**，区别只在于是否渲染。

使用 `/box3barrier` 命令控制屏障的显示状态。

### 显示状态

屏障方块以特殊纹理渲染，方便查看和编辑：

![](https://cdn-community.bcmcdn.com/47/community/3NQ6xjeUXgN1JRYo6YGLJz0DzyImzQwPVbuo8V2XB25p.png?hash=FqQNO1DlaJKMOY8VJzd1lT-gsZNn)

### 隐藏状态

屏障方块不可见，仅保留碰撞：

![](https://cdn-community.bcmcdn.com/47/community/ey3nU6084MdnMlBVLSenysDXWOP2clk9QyFeDaMndzow.png?hash=FkCv_lKliG9EJQ7S3UbpnSv1btiT)

### 命令用法

| 命令 | 效果 |
|------|------|
| `/box3barrier` | 查看当前屏障是否可见 |
| `/box3barrier true` | 开启屏障显示 |
| `/box3barrier false` | 关闭屏障显示 |
| `/box3barrier toggle` | 在开启和关闭之间快速切换 |

切换后的状态会**自动保存**到本地配置文件，下次进入同一世界时沿用上次的设置。
