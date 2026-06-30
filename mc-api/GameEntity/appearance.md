<script setup>
import '/style.css'
</script>

# 外观

## 属性

#### <font id="API" />meshInvisible<font id="Type">: boolean</font> {#meshInvisible}

是否不可见 (隐身)。

```javascript
entity.meshInvisible = true; // 隐藏实体
```

#### <font id="API" />glowing<font id="Type">: boolean</font> {#glowing}

是否发光 (轮廓高亮)。

```javascript
entity.glowing = true; // 实体发光
```

#### <font id="API" />nameTag<font id="Type">: string</font> {#nameTag}

名称标签文本 (空字符串 = 无)。

```javascript
entity.nameTag = "自定义名称";
```

## 方法

#### <font id="API" />setNameTag(<font id="Type">name: string</font>)<font id="Type">: void</font> {#setNameTag}

设置名称标签文本。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| name       | 是         |              | string     | 名称标签文本 |

#### <font id="API" />lookAt(<font id="Type">x: number, y: number, z: number</font>)<font id="Type">: void</font> {#lookAt}

让实体看向指定坐标。也支持 `lookAt(pos: GameVector3)`。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| x          | 是         |              | number     | 目标 X 坐标 |
| y          | 是         |              | number     | 目标 Y 坐标 |
| z          | 是         |              | number     | 目标 Z 坐标 |

```javascript
entity.lookAt(10, 64, 10);
// 或
entity.lookAt(new GameVector3(10, 64, 10));
```

## 装备

#### <font id="API" />setEquipment(<font id="Type">slot: string, itemId: string</font>)<font id="Type">: void</font> {#setEquipment}

给生物设置装备。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| slot       | 是         |              | string     | 槽位名称: "mainhand", "offhand", "head"/"helmet"/"helm", "chest"/"chestplate", "legs"/"leggings", "feet"/"boots" |
| itemId     | 是         |              | string     | 物品 ID (如 "minecraft:diamond_sword") |

```javascript
entity.setEquipment("mainhand", "minecraft:diamond_sword");
entity.setEquipment("head", "minecraft:iron_helmet");
```

#### <font id="API" />setDropChance(<font id="Type">slot: string, chance: number</font>)<font id="Type">: void</font> {#setDropChance}

设置装备掉落概率。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| slot       | 是         |              | string     | 槽位名称 或 "all" |
| chance     | 是         |              | number     | 掉落概率 (0-1) |

```javascript
entity.setDropChance("mainhand", 0.5);
entity.setDropChance("all", 0.0); // 不掉落任何装备
```

## 实战示例

### Boss 外观配置

```javascript
// 创建一个全副武装的发光 Boss
const boss = world.spawnEntity("minecraft:zombie", new GameVector3(100, 64, 100));

// 装备
boss.setEquipment("head", "minecraft:netherite_helmet");
boss.setEquipment("chest", "minecraft:netherite_chestplate");
boss.setEquipment("legs", "minecraft:netherite_leggings");
boss.setEquipment("feet", "minecraft:netherite_boots");
boss.setEquipment("mainhand", "minecraft:netherite_sword");

// 掉落设置: 武器 100% 掉落, 其他 30%
boss.setDropChance("mainhand", 1.0);
boss.setDropChance("head", 0.3);
boss.setDropChance("chest", 0.3);
boss.setDropChance("legs", 0.3);
boss.setDropChance("feet", 0.3);

// 外观
boss.glowing = true;
boss.setNameTag("§c§l地牢领主");
boss.meshInvisible = false;

// 看向最近的玩家
const players = world.querySelectorAll("*");
if (players.length > 0) {
    boss.lookAt(players[0].player.position);
}
```
