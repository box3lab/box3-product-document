# 导入神奇代码岛建筑

模组支持将 **神奇代码岛** 中的建筑导入到 Minecraft 世界中。

![](https://cdn-community.bcmcdn.com/47/community/ohaendUwhlx1C0Dtpn8RxurfwPLtW6XqSVujL55smQT3.png?hash=linPFKR0M05RHsyj4zkDtWNPIQV4)

## 1. 获取神奇代码岛建筑文件

要从神奇代码岛导出建筑，需要先通过指定网页，把建筑转换为模组可识别的压缩地形文件（`.gz`）。

1. 打开建筑转换网页：
   - 访问：[https://box3lab.com/build2mc](https://box3lab.com/build2mc)
2. 在网页中，你会看到一个输入框，要求你填写 **地图 Hash**：
   - 这个 Hash 可以唯一标识一张神岛某个版本建筑等数据；
   - **注意：地图 Hash 较为敏感，为了安全起见，需要人工验证后才能使用。**
3. 加入指定[QQ交流群](https://qm.qq.com/cgi-bin/qm/qr?k=Eb8Si98qgQ2qjsbyu-yGWySrDg_W3RzQ&jump_from=webapi&authKey=gd9ytJNMgkQ9ndZGxr3HLiexbu5kUkHLi87kjN101IoQa1Y7dGJJY0bf1WA8WMzF)，向管理员说明你要导出的地图，并**向管理员索取合法可用的地图 Hash**：
   - 请不要随意将 Hash 泄露给其他任何人；
   - 管理员会在确认后提供可用于导出的 Hash。
4. 在网页中填写管理员提供的 **地图 Hash**，提交并进行转换。
5. 网页会生成并提供一个压缩地形文件，后缀通常为：
   - `xxxx.gz`
6. 将下载得到的 `xxxx.gz` 文件保存到本地。

## 2. 将建筑文件放入模组配置目录

模组会从固定目录下读取可导入的建筑文件，你需要把上一步获得的 `.gz` 文件放到对应位置。

1. 找到你的 Minecraft 游戏目录。
2. 在游戏目录下找到 `config` 文件夹：
   - 一般路径类似：`minecraft/config/`
3. 在 `config` 下找到或创建 `box3mod` 目录：
   - 最终路径应为：`minecraft/config/box3mod/`
4. 将刚才下载的 `xxxx.gz` 建筑文件复制或移动到：
   - `minecraft/config/box3mod/` 目录中。

完成以上步骤后，模组就可以在游戏中识别到这份建筑数据。

## 3. 在游戏中导入建筑到世界

本页主要介绍**如何获取并放置建筑文件**。完成以上步骤后，就可以在游戏中通过对应导入命令，将建筑生成到你的世界里。

关于具体的「导入命令」与使用方式，请参见下一页的详细说明。

## 导入时的注意事项

- **备份世界存档**：
  - 建议在首次尝试导入大体量建筑之前，先对世界存档做一份备份，以防导入位置不当或出现意外。

- **选择足够大的空地**：
  - 大型建筑可能会覆盖较大范围，尽量在空地导入，避免压掉你原有的建筑。

- **Hash 与权限安全**：
  - 地图 Hash 包含与你作品相关的敏感信息，不要泄露自己的地图 Hash。
  - `.gz` 地形数据与 Hash 同样重要，如果这不是你愿意公开的作品，请勿向任何人分享该文件。
