<script setup>
import '/style.css'
</script>

# 物品与背包

## 方法

#### <font id="API" />giveItem(<font id="Type">itemId: string, count: number</font>)<font id="Type">: void</font> {#giveItem}

给予玩家物品。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| itemId | 是 | | string | 物品 ID (如 "minecraft:diamond") |
| count | 是 | | number | 数量 (1-64) |

```javascript
entity.player.giveItem("minecraft:diamond", 10);
entity.player.giveItem("minecraft:golden_apple", 1);
```

#### <font id="API" />giveCustomItem(<font id="Type">id: string, count: number</font>)<font id="Type">: void</font> {#giveCustomItem}

给予玩家自定义物品 (基于 resourcepacks/box3js-items/items.json 配置)。

```javascript
entity.player.giveCustomItem("arena_trophy", 1);
```

#### <font id="API" />giveEnchantedItem(<font id="Type">itemId: string, count: number, enchants: Record<string, number></font>)<font id="Type">: void</font> {#giveEnchantedItem}

给予玩家附魔物品。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| itemId | 是 | | string | 物品 ID |
| count | 是 | | number | 数量 |
| enchants | 是 | | Record<string, number> | 附魔对象 (如 { "minecraft:sharpness": 5 }) |

```javascript
entity.player.giveEnchantedItem("minecraft:diamond_sword", 1, {
    "minecraft:sharpness": 5,
    "minecraft:unbreaking": 3
});
```

#### <font id="API" />giveNamedItem(<font id="Type">itemId: string, count: number, customName: string, lore: string[]</font>)<font id="Type">: void</font> {#giveNamedItem}

给予玩家带自定义名称和描述的命名物品。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| itemId | 是 | | string | 物品 ID |
| count | 是 | | number | 数量 |
| customName | 是 | | string | 自定义名称 |
| lore | 是 | | string[] | 描述文字数组 |

```javascript
entity.player.giveNamedItem(
    "minecraft:netherite_sword",
    1,
    "§6传说之剑",
    ["§7一把传说中的神剑", "§7攻击力 +10"]
);
```

#### <font id="API" />getHeldItem()<font id="Type">: { id: string; count: number }</font> {#getHeldItem}

获取手持物品信息。

```javascript
const held = entity.player.getHeldItem();
console.log(`手持: ${held.id} x${held.count}`);
```

#### <font id="API" />clearInventory()<font id="Type">: void</font> {#clearInventory}

清空背包。

```javascript
entity.player.clearInventory();
```

## 属性

#### <font id="API" />opLevel<font id="Type">: number</font> {#opLevel}

管理员权限等级 (0-4)。0=普通玩家, 4=最高权限。

```javascript
entity.player.opLevel = 4; // 给予最高管理员权限
```

## 成就

#### <font id="API" />grantAdvancement(<font id="Type">advancementId: string</font>)<font id="Type">: void</font> {#grantAdvancement}

授予该玩家一个成就/进度。

```javascript
entity.player.grantAdvancement("minecraft:story/mine_stone");
```

#### <font id="API" />revokeAdvancement(<font id="Type">advancementId: string</font>)<font id="Type">: void</font> {#revokeAdvancement}

撤销该玩家的一个成就/进度。

```javascript
entity.player.revokeAdvancement("minecraft:story/mine_stone");
```
