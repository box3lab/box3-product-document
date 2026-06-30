# Box3JS Minecraft Mod API 文档

Box3JS 是 Minecraft 模组脚本 API。所有 API 均为同步调用。

## 全局对象

| 全局变量 | 类型 | 说明 |
| --- | --- | --- |
| `world` | [GameWorld](/GameWorld/) | 世界控制与事件 |
| `voxels` | [GameVoxels](/GameVoxels/) | 方块读写 |
| `storage` | [GameStorage](/GameDataStorage/getSpace) | 持久化键值存储 |
| `console` | [GameConsole](/GameConsole/) | 服务端控制台输出 |

## 核心 API

### [GameWorld](/GameWorld/) — 世界控制与事件

- 世界状态：时间、天气、难度、游戏规则
- 实体管理：生成、查询、射线检测
- 事件系统：玩家加入/离开、方块交互、实体碰撞等
- 效果系统：爆炸、粒子、烟花、闪电、掉落物、弹射物
- 计分板与队伍、Boss 血条、世界边界、定时器

### [GameEntity](/GameEntity/) — 实体

- 身份与标签：UUID、类型、标签管理
- 物理：位置、速度、包围盒、碰撞、重力
- 战斗：生命值、伤害、治疗、状态效果、属性
- 外观：隐身、发光、名称标签、装备
- AI 与导航：寻路、攻击目标、AI 开关
- 玩家判断：`isPlayer()` 类型守卫

### [GamePlayer](/GamePlayerEntity/) — 玩家

通过 `entity.player` 访问 (仅当 `entity.isPlayer()` 为 true 时非 null)。

- 基础信息：名称、UUID、坐标、游戏模式
- 移动：行走/奔跑/飞行/游泳速度、跳跃、潜行
- 相机：视角模式、朝向、跟随目标
- 战斗：生命值、饥饿度、经验、重生
- 物品：给予物品、附魔物品、自定义物品、背包管理
- 消息：私信、标题、对话面板、链接
- 音效：向玩家播放声音

### [GameVoxels](/GameVoxels/) — 方块操作

- 方块读写：放置、获取、批量填充
- ID 映射：名称与数字 ID 互转
- 旋转：方块朝向管理
- 刷怪笼：设置生成类型

### [GameDataStorage](/GameDataStorage/) — 数据存储

- 键值持久化：set/get/remove/keys
- 原子操作：increment/update
- 分页查询：list
- 项目隔离存储与跨项目共享存储

### [GameConsole](/GameConsole/) — 控制台

- 日志输出：log/debug/warn/error
- 清屏与断言：clear/assert

## 数学类型

- [GameVector3](/GameVector3/) — 三维向量
- [GameBounds3](/GameBounds3/) — 轴对齐包围盒
- [GameQuaternion](/GameQuaternion/) — 四元数旋转
- [GameRGBColor](/GameRGBColor/) — RGB 颜色
- [GameRGBAColor](/GameRGBAColor/) — RGBA 颜色

## 其他类型

- [GameEventHandlerToken](/GameEventHandlerToken/) — 事件监听令牌
- [GameButtonType](/GameWorld/events#onButtonPressed) — 按钮类型常量
- [GameCameraMode](/GamePlayerEntity/camera#cameraMode) — 相机模式常量
- [GamePlayerMoveState](/GamePlayerEntity/input#moveState) — 移动状态常量
- [GamePlayerWalkState](/GamePlayerEntity/input#walkState) — 行走状态常量

## 全局函数

- `sleep(ms: number): void` — 阻塞当前执行线程 (毫秒)
