<script setup>
import '/style.css'
</script>

# 世界效果

## 爆炸

#### <font id="API" />explode(<font id="Type">x: number, y: number, z: number, power: number, fire?: boolean</font>)<font id="Type">: void</font> {#explode}

在指定位置制造爆炸。也支持 `explode(pos: GameVector3, power: number, fire?: boolean)`。

```javascript
world.explode(100, 64, 100, 4);          // 爆炸强度 4
world.explode(100, 64, 100, 6, true);    // 爆炸 + 火焰
```

## 粒子

#### <font id="API" />spawnParticle(<font id="Type">type: string, x: number, y: number, z: number, count: number, dx: number, dy: number, dz: number, speed: number</font>)<font id="Type">: void</font> {#spawnParticle}

在指定位置生成粒子。也支持 `spawnParticle(type, pos, count, dx, dy, dz, speed)`。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| type | 是 | | string | 粒子 ID (如 "minecraft:flame") |
| x/y/z | 是 | | number | 位置 |
| count | 是 | | number | 数量 |
| dx | 是 | | number | X 扩散范围 |
| dy | 是 | | number | Y 扩散范围 |
| dz | 是 | | number | Z 扩散范围 |
| speed | 是 | | number | 粒子速度 |

```javascript
world.spawnParticle("minecraft:flame", 100, 65, 100, 20, 0.5, 0.5, 0.5, 0.1);
```

#### <font id="API" />spawnParticleCircle(<font id="Type">x: number, y: number, z: number, radius: number, type: string, count: number</font>)<font id="Type">: void</font> {#spawnParticleCircle}

在指定圆环上生成粒子。也支持 `spawnParticleCircle(pos, radius, type, count)`。

```javascript
world.spawnParticleCircle(100, 65, 100, 3, "minecraft:flame", 30);
```

## 烟花

#### <font id="API" />launchFirework(<font id="Type">x: number, y: number, z: number, color: string, shape: string</font>)<font id="Type">: void</font> {#launchFirework}

在指定位置发射烟花。也支持 `launchFirework(pos, color, shape)`。

| color | shape |
| --- | --- |
| "red" / "blue" / "green" / "yellow" / "gold" / "white" / "aqua" / "pink" / "purple" | "ball" / "large_ball" / "star" / "creeper" / "burst" |

```javascript
world.launchFirework(100, 80, 100, "red", "large_ball");
```

## 闪电

#### <font id="API" />strikeLightning(<font id="Type">x: number, y: number, z: number, damage?: number</font>)<font id="Type">: boolean</font> {#strikeLightning}

在指定位置召唤闪电。也支持 `strikeLightning(pos, damage?)`。

```javascript
world.strikeLightning(100, 80, 100);       // 无伤害闪电
world.strikeLightning(100, 80, 100, 10);   // 10 点伤害
```

## 掉落物

#### <font id="API" />dropItem(<font id="Type">x: number, y: number, z: number, itemId: string, count: number</font>)<font id="Type">: void</font> {#dropItem}

在指定位置生成掉落物。也支持 `dropItem(pos, itemId, count)`。

```javascript
world.dropItem(100, 65, 100, "minecraft:diamond", 3);
```

## 弹射物

#### <font id="API" />launchProjectile(<font id="Type">type: string, x: number, y: number, z: number, tx: number, ty: number, tz: number, speed: number</font>)<font id="Type">: GameEntity | null</font> {#launchProjectile}

从起点向目标发射弹射物。也支持 `launchProjectile(type, pos, target, speed)`。

```javascript
const arrow = world.launchProjectile(
    "minecraft:arrow",
    100, 65, 100,
    110, 65, 100,
    2.0
);
```

## 生物群系

#### <font id="API" />getBiome(<font id="Type">x: number, y: number, z: number</font>)<font id="Type">: string</font> {#getBiome}

获取指定位置的生物群系 ID。也支持 `getBiome(pos: GameVector3)`。

```javascript
const biome = world.getBiome(100, 64, 100);
console.log(biome); // "minecraft:plains"
```

## 结构

#### <font id="API" />placeStructure(<font id="Type">x: number, y: number, z: number, structureId: string</font>)<font id="Type">: void</font> {#placeStructure}

在指定位置放置数据包中的 .nbt 结构。也支持 `placeStructure(pos, structureId)`。

```javascript
world.placeStructure(100, 64, 100, "minecraft:village/plains/houses/plains_small_house_1");
```

## 配方

#### <font id="API" />listRecipes(<font id="Type">filter: string</font>)<font id="Type">: string[]</font> {#listRecipes}

按物品名搜索配方 ID 列表。

```javascript
const recipes = world.listRecipes("sword");
console.log(recipes); // ["minecraft:iron_sword", "minecraft:diamond_sword", ...]
```

#### <font id="API" />removeRecipe(<font id="Type">recipeId: string</font>)<font id="Type">: boolean</font> {#removeRecipe}

移除指定 ID 的配方 (黑名单机制)。

```javascript
world.removeRecipe("minecraft:iron_sword");
```

#### <font id="API" />clearRecipes()<font id="Type">: void</font> {#clearRecipes}

清除所有配方黑名单, 恢复全部原始配方。

```javascript
world.clearRecipes();
```

## 实战示例

### 击杀特效

```javascript
// 实体死亡时在死亡位置生成粒子和掉落物
world.onEntityDeath((entity, killer, tick) => {
    const pos = entity.position;

    // 爆炸粒子
    world.spawnParticle("minecraft:flame", pos.x, pos.y + 1, pos.z, 30, 0.5, 0.5, 0.5, 0.2);

    // 圆环粒子
    world.spawnParticleCircle(pos.x, pos.y + 1, pos.z, 2, "minecraft:totem_of_undying", 20);

    // 掉落战利品
    world.dropItem(pos.x, pos.y, pos.z, "minecraft:diamond", 1);

    if (killer?.isPlayer()) {
        // 击杀位置闪电
        world.strikeLightning(pos.x, pos.y, pos.z, 0);
    }
});
```

### 胜利烟花

```javascript
// 游戏胜利时发射多色烟花
function celebrateWin(pos) {
    const colors = ["red", "gold", "green", "blue", "purple", "pink", "aqua"];
    const shapes = ["ball", "large_ball", "star", "burst", "creeper"];

    colors.forEach((color, i) => {
        // 每个烟花延迟 10 tick 发射
        const shape = shapes[i % shapes.length];
        setTimeout(() => {
            world.launchFirework(
                pos.x + (Math.random() - 0.5) * 10,
                pos.y,
                pos.z + (Math.random() - 0.5) * 10,
                color,
                shape
            );
        }, i * 200); // JS setTimeout, 毫秒
    });
}

// 使用示例
celebrateWin(new GameVector3(100, 64, 100));
```

### 弹射物齐射

```javascript
// 向周围所有方向发射箭矢
function arrowVolley(center, count) {
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const tx = center.x + Math.cos(angle) * 10;
        const tz = center.z + Math.sin(angle) * 10;
        world.launchProjectile(
            "minecraft:arrow",
            center.x, center.y + 2, center.z,
            tx, center.y, tz,
            1.5
        );
    }
}

arrowVolley(new GameVector3(100, 64, 100), 8);
```

## 自定义物品

#### <font id="API" />loadCustomItems(<font id="Type">packName: string</font>)<font id="Type">: void</font> {#loadCustomItems}

从资源包加载自定义物品配置。

```javascript
world.loadCustomItems("box3js-items");
```

## 成就

#### <font id="API" />grantAdvancement(<font id="Type">playerName: string, advancementId: string</font>)<font id="Type">: void</font> {#grantAdvancement}

为指定玩家授予成就/进度。

```javascript
world.grantAdvancement("吉吉喵", "minecraft:story/mine_stone");
```
