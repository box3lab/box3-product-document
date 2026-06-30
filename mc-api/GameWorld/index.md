<script setup>
import '/style.css'
</script>

# S-🌏 游戏世界

**GameWorld** 是整个游戏世界的主要接口，通过全局对象 `world` 访问。

- 世界状态：管理时间、天气、难度、游戏规则等全局属性
- 实体管理：生成和搜索游戏中的实体对象
- 事件系统：监听玩家加入/离开、聊天、方块交互、实体碰撞等事件
- 音效系统：播放全局音效和环境音
- 效果系统：爆炸、粒子、烟花、闪电、掉落物、弹射物
- 计分板：管理计分板、队伍、Boss 血条
- 定时器：setTimeout/setInterval
- 世界边界：管理世界边界

## 接口定义

```typescript
declare const world: GameWorld;

interface GameWorld {
  //...
}
```

## 属性列表

### 世界状态

- [`projectName`](./mapInfo#projectName) : 项目名称
- [`serverId`](./mapInfo#serverId) : 服务器 ID
- [`currentTick`](./mapInfo#currentTick) : 当前 Tick 计数
- [`time`](./mapInfo#time) : 当前游戏内时间
- [`timeScale`](./mapInfo#timeScale) : 时间流速
- [`difficulty`](./mapInfo#difficulty) : 当前难度
- [`spawnPoint`](./mapInfo#spawnPoint) : 世界出生点
- [`rainDensity`](./mapInfo#rainDensity) : 降雨强度
- [`thunderDensity`](./mapInfo#thunderDensity) : 雷暴强度

### 音效属性

- [`ambientSound`](./music#ambientSound) : 环境音效
- [`playerJoinSound`](./music#playerJoinSound) : 玩家加入音效
- [`playerLeaveSound`](./music#playerLeaveSound) : 玩家离开音效
- [`placeVoxelSound`](./music#placeVoxelSound) : 方块放置音效
- [`breakVoxelSound`](./music#breakVoxelSound) : 方块破坏音效

### 世界边界

- [`borderSize`](./worldBorder#borderSize) : 当前边界大小

## 方法

### 世界状态

- [`setTime`](./mapInfo#setTime) : 设置游戏内时间
- [`clearWeather`](./mapInfo#clearWeather) : 清除天气
- [`setWorldSpawn`](./mapInfo#setWorldSpawn) : 设置世界出生点
- [`getGameRule`](./mapInfo#getGameRule) : 读取游戏规则
- [`setGameRule`](./mapInfo#setGameRule) : 设置游戏规则

### 实体管理

- [`spawnEntity`](./entityCD#spawnEntity) : 生成实体
- [`createEntity`](./entityCD#createEntity) : 使用配置生成实体
- [`querySelector`](./querySelectorEntity#querySelector) : 查询第一个匹配实体
- [`querySelectorAll`](./querySelectorEntity#querySelectorAll) : 查询所有匹配实体
- [`entitiesInArea`](./querySelectorEntity#entitiesInArea) : 查询区域内实体
- [`entitiesInRadius`](./querySelectorEntity#entitiesInRadius) : 查询半径内实体
- [`searchBox`](./querySelectorEntity#searchBox) : 包围盒查询
- [`raycast`](./querySelectorEntity#raycast) : 射线检测

### 广播与命令

- [`say`](./music#say) : 向全服广播消息
- [`runCommand`](./mapInfo#runCommand) : 以服务端身份执行命令

### 音效

- [`playSound`](./music#playSound) : 在指定位置播放声音
- [`sound`](./music#sound) : 播放音效 (简写或完整配置)

### 世界效果

- [`explode`](./worldEffects#explode) : 制造爆炸
- [`spawnParticle`](./worldEffects#spawnParticle) : 生成粒子
- [`spawnParticleCircle`](./worldEffects#spawnParticleCircle) : 圆环粒子
- [`launchFirework`](./worldEffects#launchFirework) : 发射烟花
- [`strikeLightning`](./worldEffects#strikeLightning) : 召唤闪电
- [`dropItem`](./worldEffects#dropItem) : 生成掉落物
- [`launchProjectile`](./worldEffects#launchProjectile) : 发射弹射物
- [`getBiome`](./worldEffects#getBiome) : 获取生物群系
- [`placeStructure`](./worldEffects#placeStructure) : 放置 NBT 结构

### 配方与物品

- [`listRecipes`](./worldEffects#listRecipes) : 搜索配方
- [`removeRecipe`](./worldEffects#removeRecipe) : 移除配方
- [`clearRecipes`](./worldEffects#clearRecipes) : 清除配方黑名单
- [`loadCustomItems`](./worldEffects#loadCustomItems) : 加载自定义物品

### 计分板与队伍

- [`addScoreboard`](./scoreboard#addScoreboard) : 添加计分板
- [`removeScoreboard`](./scoreboard#removeScoreboard) : 移除计分板
- [`setScore`](./scoreboard#setScore) : 设置分数
- [`getScore`](./scoreboard#getScore) : 获取分数
- [`showScoreboard`](./scoreboard#showScoreboard) : 展示计分板
- [`hideScoreboard`](./scoreboard#hideScoreboard) : 隐藏计分板
- [`listScores`](./scoreboard#listScores) : 列出所有分数
- [`createTeam`](./scoreboard#createTeam) : 创建队伍
- [`removeTeam`](./scoreboard#removeTeam) : 删除队伍
- [`joinTeam`](./scoreboard#joinTeam) : 加入队伍
- [`leaveTeam`](./scoreboard#leaveTeam) : 离开队伍
- [`getTeamOf`](./scoreboard#getTeamOf) : 获取队伍
- [`showBossbar`](./scoreboard#showBossbar) : 显示 Boss 血条
- [`removeBossbar`](./scoreboard#removeBossbar) : 移除 Boss 血条

### 世界边界

- [`setBorderCenter`](./worldBorder#setBorderCenter) : 设置边界中心
- [`shrinkBorder`](./worldBorder#shrinkBorder) : 缩放边界
- [`setBorderDamage`](./worldBorder#setBorderDamage) : 边界伤害
- [`setBorderWarning`](./worldBorder#setBorderWarning) : 边界警告距离

### 定时器

- [`setTimeout`](./mapInfo#setTimeout) : 一次性延时回调
- [`setInterval`](./mapInfo#setInterval) : 循环定时回调
- [`clearTimeout`](./mapInfo#clearTimeout) : 取消 setTimeout
- [`clearInterval`](./mapInfo#clearInterval) : 取消 setInterval

### 跨项目消息

- [`sendMessage`](./mapInfo#sendMessage) : 向另一个项目发送消息

### 成就

- [`grantAdvancement`](./worldEffects#grantAdvancement) : 授予玩家成就

## 事件

- [`onTick`](./events#onTick) : 每 tick 回调
- [`onPlayerJoin`](./events#onPlayerJoin) : 玩家加入
- [`onPlayerLeave`](./events#onPlayerLeave) : 玩家离开
- [`onChat`](./events#onChat) : 聊天消息
- [`onPlayerRespawn`](./events#onPlayerRespawn) : 玩家重生
- [`onBlockActivate`](./events#onBlockActivate) : 方块右键激活
- [`onVoxelDestroy`](./events#onVoxelDestroy) : 方块破坏
- [`onBlockPlace`](./events#onBlockPlace) : 方块放置
- [`onVoxelContact`](./events#onVoxelContact) : 方块接触
- [`onInteract`](./events#onInteract) : 实体交互
- [`onEntityDeath`](./events#onEntityDeath) : 实体死亡
- [`onEntityDamage`](./events#onEntityDamage) : 实体受伤
- [`onFluidEnter`](./events#onFluidEnter) : 流体进入
- [`onFluidLeave`](./events#onFluidLeave) : 流体离开
- [`onEntityContact`](./events#onEntityContact) : 实体碰撞
- [`onEntitySeparate`](./events#onEntitySeparate) : 实体分离
- [`onButtonPressed`](./events#onButtonPressed) : 按钮按下
- [`onMessage`](./events#onMessage) : 跨项目消息
