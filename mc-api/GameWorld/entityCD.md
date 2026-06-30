<script setup>
import '/style.css'
</script>

# 实体生成

## 方法

#### <font id="API" />spawnEntity(<font id="Type">type: string, pos: GameVector3</font>)<font id="Type">: GameEntity | null</font> {#spawnEntity}

在指定位置生成实体。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| type | 是 | | string | 实体类型 ID (如 "minecraft:zombie") |
| pos | 是 | | GameVector3 | 生成坐标 |

**返回值**

| **_类型_** | **_说明_** |
| ---------- | ---------- |
| GameEntity \| null | 生成的实体, 失败返回 null |

```javascript
const zombie = world.spawnEntity("minecraft:zombie", new GameVector3(100, 64, 100));
if (zombie) {
    zombie.hp = 40;
    zombie.addTag("boss");
}
```

#### <font id="API" />createEntity(<font id="Type">config: GameEntityConfig</font>)<font id="Type">: GameEntity | null</font> {#createEntity}

使用完整配置对象生成实体。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| type | 否 | | string | 实体类型 ID |
| position | 否 | | GameVector3 | 生成位置 |
| velocity | 否 | | GameVector3 | 初始速度 |
| fixed | 否 | false | boolean | 是否固定 |
| gravity | 否 | true | boolean | 是否受重力 |
| friction | 否 | 0.0 | number | 摩擦系数 |
| mass | 否 | 1.0 | number | 质量 |
| restitution | 否 | 0.0 | number | 弹性系数 |
| collides | 否 | true | boolean | 是否参与碰撞 |
| meshInvisible | 否 | false | boolean | 是否不可见 |
| hp | 否 | | number | 生命值 |
| maxHp | 否 | | number | 最大生命值 |
| tags | 否 | | string[] | 标签列表 |

```javascript
const entity = world.createEntity({
    type: "minecraft:skeleton",
    position: new GameVector3(100, 64, 100),
    hp: 30,
    maxHp: 30,
    tags: ["enemy", "undead"],
    collides: true,
});
```
