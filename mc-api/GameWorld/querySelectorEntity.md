<script setup>
import '/style.css'
</script>

# 实体查询

## 方法

#### <font id="API" />querySelector(<font id="Type">selector: string</font>)<font id="Type">: GameEntity | null</font> {#querySelector}

查询第一个匹配的实体 (或 null)。目前仅限玩家。

| 选择器 | 说明 |
| --- | --- |
| `"*"` | 所有玩家 |
| `"#uuid"` | 指定 UUID 的玩家 |
| `".tag"` | 拥有指定标签的玩家 |

```javascript
const player = world.querySelector("#550e8400-e29b-41d4-a716-446655440000");
if (player) {
    console.log(`找到玩家: ${player.player.name}`);
}
```

#### <font id="API" />querySelectorAll(<font id="Type">selector: string</font>)<font id="Type">: GameEntity[]</font> {#querySelectorAll}

查询所有匹配选择器的实体 (目前仅限玩家)。

```javascript
const allPlayers = world.querySelectorAll("*");
allPlayers.forEach(entity => {
    console.log(entity.player.name);
});
```

#### <font id="API" />entitiesInArea(<font id="Type">pos1: GameVector3, pos2: GameVector3</font>)<font id="Type">: GameEntity[]</font> {#entitiesInArea}

查询指定区域内的所有实体。

```javascript
const entities = world.entitiesInArea(
    new GameVector3(0, 0, 0),
    new GameVector3(100, 100, 100)
);
```

#### <font id="API" />entitiesInRadius(<font id="Type">x: number, y: number, z: number, radius: number</font>)<font id="Type">: GameEntity[]</font> {#entitiesInRadius}

查询指定半径内的所有实体。也支持 `entitiesInRadius(pos: GameVector3, radius: number)`。

```javascript
const nearby = world.entitiesInRadius(100, 64, 100, 16);
nearby.forEach(e => console.log(e.id));
```

#### <font id="API" />searchBox(<font id="Type">bounds: GameBounds3</font>)<font id="Type">: GameEntity[]</font> {#searchBox}

查询包围盒内的所有实体。

```javascript
const bounds = new GameBounds3(
    new GameVector3(0, 0, 0),
    new GameVector3(64, 64, 64)
);
const entities = world.searchBox(bounds);
```

## 射线检测

#### <font id="API" />raycast(<font id="Type">origin: GameVector3, direction: GameVector3, maxDistance?: number</font>)<font id="Type">: RaycastResult</font> {#raycast}

从起点向指定方向发射射线, 返回碰撞结果。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| origin | 是 | | GameVector3 | 起点 |
| direction | 是 | | GameVector3 | 方向向量 (自动归一化) |
| maxDistance | 否 | 5 | number | 最大距离 |

**RaycastResult**

| **_字段_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ---------- |
| hit | boolean | 是否命中 |
| x | number | 命中点 X |
| y | number | 命中点 Y |
| z | number | 命中点 Z |
| normalX | number | 表面法线 X |
| normalY | number | 表面法线 Y |
| normalZ | number | 表面法线 Z |
| distance | number | 命中距离 |
| voxel? | number | 命中的方块 ID |
| entity? | GameEntity | 命中的实体 |

```javascript
const result = world.raycast(
    entity.player.position,
    entity.player.facingDirection,
    10
);
if (result.hit) {
    console.log(`命中方块: ${result.voxel}, 距离: ${result.distance}`);
}
```
