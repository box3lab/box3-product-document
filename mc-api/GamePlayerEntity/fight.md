<script setup>
import '/style.css'
</script>

# 战斗与生命值

## 属性

#### <font id="API" />hp<font id="Type">: number</font> {#hp}

当前生命值。

```javascript
entity.player.hp = 20; // 设置满血
console.log(entity.player.hp);
```

#### <font id="API" />maxHp<font id="Type">: number</font> {#maxHp}

最大生命值。

```javascript
entity.player.maxHp = 40;
```

#### <font id="API" />food<font id="Type">: number</font> {#food}

饥饿值 (0-20)。

```javascript
entity.player.food = 20; // 满饥饿值
```

#### <font id="API" />saturation<font id="Type">: number</font> {#saturation}

饱和度 (0-20)。

```javascript
entity.player.saturation = 10;
```

#### <font id="API" />xp<font id="Type">: number</font> {#xp}

经验等级。

```javascript
entity.player.xp = 10;
```

#### <font id="API" /><font id="ReadOnly">只读</font>dead<font id="Type">: boolean</font> {#dead}

是否已死亡。

```javascript
if (entity.player.dead) {
    console.log("玩家已死亡");
}
```

#### <font id="API" />spawnPoint<font id="Type">: GameVector3</font> {#spawnPoint}

重生点坐标 (可读写)。

```javascript
entity.player.spawnPoint.set(100, 64, 100);
```

## 方法

#### <font id="API" />setRespawnPoint(<font id="Type">pos: GameVector3</font>)<font id="Type">: void</font> {#setRespawnPoint}

设置重生点。

```javascript
entity.player.setRespawnPoint(new GameVector3(100, 64, 100));
```

#### <font id="API" />respawn()<font id="Type">: void</font> {#respawn}

强制重生 (仅在死亡状态下有效)。

```javascript
if (entity.player.dead) {
    entity.player.respawn();
}
```

#### <font id="API" />addExperienceLevels(<font id="Type">levels: number</font>)<font id="Type">: void</font> {#addExperienceLevels}

增加经验等级。

```javascript
entity.player.addExperienceLevels(5); // 增加 5 级
```

#### <font id="API" />addEffect(<font id="Type">effectId: string, duration: number, amplifier: number, hideParticles?: boolean</font>)<font id="Type">: void</font> {#addEffect}

添加状态效果。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| effectId | 是 | | string | 效果 ID (如 "minecraft:speed") |
| duration | 是 | | number | 持续时间 (tick) |
| amplifier | 是 | | number | 等级 (0 = 一级) |
| hideParticles | 否 | false | boolean | 是否隐藏粒子 |

```javascript
entity.player.addEffect("minecraft:speed", 200, 1); // 速度 II, 持续 10 秒
entity.player.addEffect("minecraft:regeneration", 100, 0, true); // 隐藏粒子
```

#### <font id="API" />clearEffects()<font id="Type">: void</font> {#clearEffects}

清除所有状态效果。

```javascript
entity.player.clearEffects();
```
