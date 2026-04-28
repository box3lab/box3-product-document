# 导入神岛建筑

模组支持将**神奇代码岛中的建筑**一键导入到 Minecraft 世界中。整个流程分为三步：获取地形文件 → 放入配置目录 → 在游戏中执行导入命令。

![](https://cdn-community.bcmcdn.com/47/community/ohaendUwhlx1C0Dtpn8RxurfwPLtW6XqSVujL55smQT3.png?hash=linPFKR0M05RHsyj4zkDtWNPIQV4)

## 1. 获取地形文件

要从神奇代码岛导出建筑，需要先通过转换网页将建筑转为模组可识别的压缩地形文件（`.gz`）。

1. 打开建筑转换页面：[https://box3lab.com/build2mc](https://box3lab.com/build2mc)
2. 获取你作品的地图 **Hash**：
   - Hash 是标识神岛建筑数据的唯一凭证，**较为敏感，请勿泄露给他人**；
   - 加入 [QQ 交流群](https://qm.qq.com/cgi-bin/qm/qr?k=Eb8Si98qgQ2qjsbyu-yGWySrDg_W3RzQ&jump_from=webapi&authKey=gd9ytJNMgkQ9ndZGxr3HLiexbu5kUkHLi87kjN101IoQa1Y7dGJJY0bf1WA8WMzF)，向管理员说明你要导出的地图并索取合法可用的 Hash。
3. 在网页中填入 Hash，提交转换，下载生成的 `.gz` 文件。

## 2. 放入配置目录

模组从固定目录读取可导入的建筑文件：

1. 找到你的 Minecraft 游戏目录。
2. 进入 `config/box3/` 目录（如不存在则手动创建 `box3` 文件夹）。
3. 将下载的 `.gz` 文件复制到 `config/box3/` 中。

最终路径类似：`minecraft/config/box3/park.gz`

## 3. 在游戏中导入

准备好文件后，进入对应的世界，使用 `/box3import` 命令将建筑生成到世界中。

### 查看可导入的文件

```
/box3import
```

列出 `config/box3/` 目录下所有可导入的 `.gz` 文件。不确定有哪些文件时，可以先执行此命令。

### 基本导入

```
/box3import <fileName>
```

从 `config/box3/<fileName>.gz` 导入建筑。命令中**不需要带 `.gz` 后缀**，会自动补全。建筑将以玩家当前位置为基点生成。

**示例：**

```
/box3import park
```

### 忽略屏障

```
/box3import <fileName> <ignoreBarrier>
```

| 参数 | 效果 |
|------|------|
| `ignoreBarrier = true` | 跳过屏障方块，不在世界中放置 |
| `ignoreBarrier = false` | 正常导入所有方块（含屏障） |

当你只需要建筑的外观和结构、不希望带上隐形碰撞方块时，可以设为 `true`。

**示例：**

```
/box3import park true
```

### 处理神岛流体

```
/box3import <fileName> <ignoreBarrier> <ignoreWater>
```

| 参数 | 效果 |
|------|------|
| `ignoreWater = true` | 所有神岛流体替换为空气 |
| `ignoreWater = false` | 所有神岛流体替换为 Minecraft 原版水方块 |

**示例：**

```
/box3import park true true
```

（导入 `park`，忽略屏障，并将流体替换为空气）

## 导入注意事项

- **备份世界存档**：导入大体量建筑前建议先备份，以防位置不当或出现意外。
- **选择足够的空地**：大型建筑可能覆盖较大范围，尽量在开阔区域导入，避免压掉原有建筑。
- **Hash 安全**：地图 Hash 包含与你作品相关的敏感信息，`.gz` 文件同理——如果不是你愿意公开的作品，请勿分享给他人。
