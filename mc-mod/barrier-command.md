# 屏障可见性切换命令

为了和神岛中的屏障体验保持一致，模组提供了一个专门用于控制 **屏障方块可见性** 的命令：`/box3barrier`。

无论是否可见，屏障方块始终存在碰撞体积，只是**要不要渲染出来**的区别。

### 显示状态

![](https://cdn-community.bcmcdn.com/47/community/3NQ6xjeUXgN1JRYo6YGLJz0DzyImzQwPVbuo8V2XB25p.png?hash=FqQNO1DlaJKMOY8VJzd1lT-gsZNn)

### 隐藏状态

![](https://cdn-community.bcmcdn.com/47/community/ey3nU6084MdnMlBVLSenysDXWOP2clk9QyFeDaMndzow.png?hash=FkCv_lKliG9EJQ7S3UbpnSv1btiT)

## 屏障可见性切换

- **查询当前状态**
  - `/box3barrier`
  - 用途：查看当前世界中，屏障方块是否处于**可见**状态。

- **显式设置开关**
  - `/box3barrier <bool>`
  - 参数：
    - `true`：开启屏障显示（屏障方块会以特殊纹理渲染出来，方便查看和编辑）。
    - `false`：关闭屏障显示（屏障方块隐藏，仅保留碰撞效果）。
  - 示例：
    - `/box3barrier true`：打开屏障显示；
    - `/box3barrier false`：关闭屏障显示。

- **快速切换当前状态**
  - `/box3barrier toggle`
  - 用途：在「开启显示」和「关闭显示」之间一键切换，无需关心当前状态。
  - 说明：
    - 每次执行都会在 **可见 / 不可见** 两种状态之间来回切换；
    - 状态会保存到本地配置文件，下次进入同一个世界时会自动沿用上次的设置。
