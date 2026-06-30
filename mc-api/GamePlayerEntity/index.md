<script setup>
import '/style.css'
</script>

# S-👤 游戏玩家

**GamePlayer** 是玩家专属接口，通过 `entity.player` 访问。仅当 `entity.isPlayer()` 返回 true 时非 null。

- 基础信息：管理玩家的名称、UUID、坐标、游戏模式等基本属性
- 外观系统：控制玩家的隐身、缩放等视觉效果
- 相机系统：管理玩家的视角模式、朝向等
- 移动系统：控制玩家的行走、奔跑、飞行、游泳等移动参数
- 战斗系统：管理玩家的生命、饥饿、死亡、重生等状态
- 物品系统：给予物品、管理背包等
- 消息系统：发送私信、标题、对话框、链接等
- 音效系统：向玩家播放声音

## 接口定义

```typescript
// GamePlayerEntity 是类型别名 — entity.isPlayer() 为 true 时 player 属性收窄为非 null
type GamePlayerEntity = GameEntity & { player: GamePlayer };

interface GamePlayer {
  //...
}
```

## 属性列表

### 基础信息

- [`name`](./info#name) : 玩家名
- [`userId`](./info#userId) : 玩家 UUID
- [`position`](./info#position) : 当前坐标
- [`velocity`](./info#velocity) : 当前速度
- [`bounds`](./info#bounds) : 包围盒半尺寸
- [`onGround`](./info#onGround) : 是否在地面上

### 外观系统

- [`invisible`](./appearance#invisible) : 是否隐身
- [`scale`](./appearance#scale) : 模型缩放比例

### 相机系统

- [`cameraMode`](./camera#cameraMode) : 视角模式
- [`cameraEntity`](./camera#cameraEntity) : 相机跟随的实体
- [`cameraPitch`](./camera#cameraPitch) : 相机俯仰角
- [`cameraYaw`](./camera#cameraYaw) : 相机偏航角
- [`facingDirection`](./camera#facingDirection) : 玩家面朝方向
- [`cameraTarget`](./camera#cameraTarget) : 视线前方目标点

### 移动系统

- [`walkSpeed`](./input#walkSpeed) : 行走速度
- [`runSpeed`](./input#runSpeed) : 疾跑速度
- [`jumpPower`](./input#jumpPower) : 跳跃力度
- [`moveState`](./input#moveState) : 当前移动状态
- [`walkState`](./input#walkState) : 当前行走状态
- [`enableJump`](./input#enableJump) : 是否允许跳跃
- [`crouchSpeed`](./input#crouchSpeed) : 潜行速度
- [`swimSpeed`](./input#swimSpeed) : 游泳速度
- [`canFly`](./input#canFly) : 是否允许飞行
- [`flying`](./input#flying) : 是否正在飞行
- [`flySpeed`](./input#flySpeed) : 飞行速度
- [`collision`](./input#collision) : 碰撞开关
- [`spectator`](./input#spectator) : 是否为观察者模式
- [`disableFly`](./input#disableFly) : 是否禁用飞行

### 战斗系统

- [`hp`](./fight#hp) : 当前生命值
- [`maxHp`](./fight#maxHp) : 最大生命值
- [`food`](./fight#food) : 饥饿值
- [`saturation`](./fight#saturation) : 饱和度
- [`dead`](./fight#dead) : 是否已死亡
- [`spawnPoint`](./fight#spawnPoint) : 重生点坐标
- [`xp`](./fight#xp) : 经验等级

### 游戏模式

- [`gameMode`](./info#gameMode) : 游戏模式
- [`dimension`](./info#dimension) : 当前维度

## 方法

### 基础信息

- [`teleport`](./info#teleport) : 传送玩家
- [`kick`](./info#kick) : 踢出玩家
- [`runCommand`](./info#runCommand) : 以玩家身份执行命令
- [`lookAt`](./camera#lookAt) : 让玩家看向指定坐标

### 战斗系统

- [`setRespawnPoint`](./fight#setRespawnPoint) : 设置重生点
- [`respawn`](./fight#respawn) : 强制重生
- [`addEffect`](./fight#addEffect) : 添加状态效果
- [`clearEffects`](./fight#clearEffects) : 清除所有效果
- [`addExperienceLevels`](./fight#addExperienceLevels) : 增加经验等级

### 消息系统

- [`directMessage`](./chat#directMessage) : 发送私信
- [`actionBar`](./chat#actionBar) : 在动作栏显示文字
- [`title`](./chat#title) : 显示屏幕标题
- [`dialog`](./chat#dialog) : 弹出对话面板
- [`setPlayerListName`](./chat#setPlayerListName) : 设置 TAB 列表名称
- [`link`](./link#link) : 发送可点击链接

### 物品系统

- [`giveItem`](./inventory#giveItem) : 给予物品
- [`giveCustomItem`](./inventory#giveCustomItem) : 给予自定义物品
- [`giveEnchantedItem`](./inventory#giveEnchantedItem) : 给予附魔物品
- [`giveNamedItem`](./inventory#giveNamedItem) : 给予命名物品
- [`getHeldItem`](./inventory#getHeldItem) : 获取手持物品信息
- [`clearInventory`](./inventory#clearInventory) : 清空背包
- [`opLevel`](./inventory#opLevel) : 管理员权限等级

### 音效系统

- [`playSound`](./music#playSound) : 向该玩家播放声音

### 事件

- [`onChat`](./chat#onChat) : 注册玩家聊天处理器

### 成就

- [`grantAdvancement`](./inventory#grantAdvancement) : 授予成就
- [`revokeAdvancement`](./inventory#revokeAdvancement) : 撤销成就
