<script setup>
import '/style.css'
</script>

# 物理

## 属性

#### <font id="API" /><font id="ReadOnly">只读</font>position<font id="Type">: GameVector3</font> {#position}

当前世界坐标。Readonly ref — 可通过 `.set()` 修改，不可重新赋值。

```javascript
// 读取
const pos = entity.position;
// 修改
entity.position.set(10, 64, 10);
```

#### <font id="API" /><font id="ReadOnly">只读</font>velocity<font id="Type">: GameVector3</font> {#velocity}

当前速度 (运动向量)。Readonly ref — 可通过 `.set()` 修改。

```javascript
entity.velocity.set(0, 5, 0); // 向上弹起
```

#### <font id="API" /><font id="ReadOnly">只读</font>bounds<font id="Type">: GameVector3</font> {#bounds}

包围盒半尺寸 (x=宽/2, y=高/2, z=宽/2)。

#### <font id="API" /><font id="ReadOnly">只读</font>onGround<font id="Type">: boolean</font> {#onGround}

是否在地面上。

```javascript
if (entity.onGround) {
    console.log("实体站在方块上");
}
```

#### <font id="API" /><font id="ReadOnly">只读</font>eyePosition<font id="Type">: GameVector3</font> {#eyePosition}

视线起始点 (眼部位置，用于射线检测的起点)。

#### <font id="API" />collides<font id="Type">: boolean</font> {#collides}

是否参与碰撞 (默认 true)。

```javascript
entity.collides = false; // 关闭碰撞
```

#### <font id="API" />fixed<font id="Type">: boolean</font> {#fixed}

是否固定 (默认 false)。true 时禁用重力并每 tick 清零速度。

```javascript
entity.fixed = true; // 固定实体位置
```

#### <font id="API" />gravity<font id="Type">: boolean</font> {#gravity}

是否受重力影响 (默认 true)。

```javascript
entity.gravity = false; // 禁用重力
```

#### <font id="API" />friction<font id="Type">: number</font> {#friction}

摩擦系数 (默认 0.0)。

#### <font id="API" />mass<font id="Type">: number</font> {#mass}

质量 (默认 1.0)。

#### <font id="API" />restitution<font id="Type">: number</font> {#restitution}

弹性系数 (默认 0.0)。值越大弹性越强。

## 实战示例

### 弹跳史莱姆

```javascript
// 创建一个高弹跳的史莱姆
const slime = world.spawnEntity("minecraft:slime", new GameVector3(100, 64, 100));
slime.bounds.set(1.5, 1.5, 1.5);
slime.gravity = true;
slime.friction = 0.1;
slime.restitution = 0.9; // 高弹性: 落地弹跳
slime.mass = 2.0;
slime.velocity.set(0, 8, 0);  // 初始向上弹起
slime.collides = true;

// 2 秒后固定在空中
world.setTimeout(() => {
    slime.fixed = true;
    slime.velocity.set(0, 0, 0);
}, 40);
```

### 抛射实体

```javascript
// 向目标方向发射一个实体
function launchEntity(entity, targetPos, speed) {
    const dx = targetPos.x - entity.position.x;
    const dy = targetPos.y - entity.position.y;
    const dz = targetPos.z - entity.position.z;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    entity.velocity.set(
        (dx / dist) * speed,
        (dy / dist) * speed,
        (dz / dist) * speed
    );
    entity.gravity = true;
    entity.collides = false; // 穿透飞行
}

const projectile = world.spawnEntity("minecraft:fireball", new GameVector3(100, 65, 100));
launchEntity(projectile, new GameVector3(110, 70, 100), 3.0);
```
