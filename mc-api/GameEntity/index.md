<script setup>
import '/style.css'
</script>

# S-🏠 游戏实体

**GameEntity** 是游戏世界中的基础对象，代表一个玩家或生物。通过 `world.querySelector()`, `world.querySelectorAll()` 或事件回调获取。

## 类定义

```typescript
interface GameEntity {
  //...
}
```

## 属性列表

### 身份

- [`id`](./label#id) : 实体 UUID (只读)
- [`entityType`](./label#entityType) : 实体类型标识符 (如 "minecraft:zombie", 只读)
- [`isPlayer`](./isPlayer#isPlayer) : 是否为玩家实体 (类型守卫)
- [`player`](./isPlayer#player) : 玩家接口 (仅当 isPlayer 为 true 时非 null)

### 位置与运动

- [`position`](./physics#position) : 当前世界坐标 (只读, 可通过 .set() 修改)
- [`velocity`](./physics#velocity) : 当前速度 (只读, 可通过 .set() 修改)
- [`bounds`](./physics#bounds) : 包围盒半尺寸 (只读)
- [`onGround`](./physics#onGround) : 是否在地面上 (只读)
- [`eyePosition`](./physics#eyePosition) : 视线起始点 (眼部位置, 只读)

### 生命状态

- [`hp`](./fight#hp) : 当前生命值
- [`maxHp`](./fight#maxHp) : 最大生命值
- [`destroyed`](./fight#destroyed) : 实体是否已被移除/销毁 (只读)

### 外观

- [`meshInvisible`](./appearance#meshInvisible) : 是否不可见 (隐身)
- [`glowing`](./appearance#glowing) : 是否发光 (轮廓高亮)
- [`nameTag`](./appearance#nameTag) : 名称标签文本

### 物理

- [`collides`](./physics#collides) : 是否参与碰撞
- [`fixed`](./physics#fixed) : 是否固定
- [`gravity`](./physics#gravity) : 是否受重力影响
- [`friction`](./physics#friction) : 摩擦系数
- [`mass`](./physics#mass) : 质量
- [`restitution`](./physics#restitution) : 弹性系数

### 无敌与持久化

- [`invulnerable`](./fight#invulnerable) : 是否无敌
- [`setPersistent`](./fight#setPersistent) : 设置为持久化实体

## 方法列表

### 标签系统

- [`addTag`](./label#addTag) : 添加一个标签
- [`removeTag`](./label#removeTag) : 移除一个标签
- [`hasTag`](./label#hasTag) : 检查是否拥有指定标签
- [`tags`](./label#tags) : 获取所有标签

### 伤害与恢复

- [`hurt`](./fight#hurt) : 对实体造成伤害
- [`heal`](./fight#heal) : 治疗实体
- [`setFire`](./fight#setFire) : 设置实体着火 tick 数
- [`clearFire`](./fight#clearFire) : 灭火

### 外观控制

- [`setNameTag`](./appearance#setNameTag) : 设置名称标签文本
- [`lookAt`](./appearance#lookAt) : 让实体看向指定坐标

### 效果与属性

- [`addEffect`](./fight#addEffect) : 添加状态效果
- [`getAttribute`](./fight#getAttribute) : 读取实体属性值
- [`setAttribute`](./fight#setAttribute) : 设置实体属性基础值

### 装备

- [`setEquipment`](./appearance#setEquipment) : 给生物设置装备
- [`setDropChance`](./appearance#setDropChance) : 设置装备掉落概率

### 导航与 AI

- [`navigateTo`](./input#navigateTo) : 让生物导航到指定坐标
- [`setTarget`](./input#setTarget) : 设置攻击目标
- [`clearTarget`](./input#clearTarget) : 清除攻击目标
- [`getTarget`](./input#getTarget) : 获取当前攻击目标
- [`setAI`](./input#setAI) : 启用或禁用生物 AI

### 生命周期

- [`destroy`](./fight#destroy) : 销毁实体
- [`setOnDestroy`](./fight#setOnDestroy) : 注册销毁回调
