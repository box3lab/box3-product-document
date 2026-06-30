<script setup>
import '/style.css'
</script>

# 战斗与生命

## 属性

#### <font id="API" />hp<font id="Type">: number</font> {#hp}

当前生命值。

```javascript
entity.hp = 20; // 设置为满血
console.log(entity.hp); // 读取当前生命值
```

#### <font id="API" />maxHp<font id="Type">: number</font> {#maxHp}

最大生命值。

```javascript
entity.maxHp = 40; // 提高最大生命值
```

#### <font id="API" /><font id="ReadOnly">只读</font>destroyed<font id="Type">: boolean</font> {#destroyed}

实体是否已被移除/销毁 (true = 已移除)。

#### <font id="API" />invulnerable<font id="Type">: boolean</font> {#invulnerable}

是否无敌。

```javascript
entity.invulnerable = true; // 不受伤害
```

## 方法

#### <font id="API" />hurt(<font id="Type">amount: number</font>)<font id="Type">: void</font> {#hurt}

对实体造成伤害。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| amount     | 是         |              | number     | 伤害值 (半心) |

```javascript
entity.hurt(4); // 造成 2 心伤害
```

#### <font id="API" />heal(<font id="Type">amount: number</font>)<font id="Type">: void</font> {#heal}

治疗实体。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| amount     | 是         |              | number     | 治疗量 (半心) |

```javascript
entity.heal(2); // 治疗 1 心
```

#### <font id="API" />setFire(<font id="Type">ticks: number</font>)<font id="Type">: void</font> {#setFire}

设置实体着火 tick 数 (0 = 灭火)。

```javascript
entity.setFire(100); // 着火 5 秒 (20 tick/秒)
```

#### <font id="API" />clearFire()<font id="Type">: void</font> {#clearFire}

灭火。

```javascript
entity.clearFire();
```

#### <font id="API" />setPersistent(<font id="Type">v: boolean</font>)<font id="Type">: void</font> {#setPersistent}

设置为持久化实体 (防止被自然清除)。仅写方法，无 getter。

```javascript
entity.setPersistent(true); // 防止实体被自然清除
```

#### <font id="API" />addEffect(<font id="Type">effectId: string, duration: number, amplifier: number, hideParticles?: boolean</font>)<font id="Type">: void</font> {#addEffect}

添加状态效果。

**输入参数**

| **_参数_**      | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| --------------- | ---------- | ------------ | ---------- | ---------- |
| effectId        | 是         |              | string     | 效果 ID (如 "minecraft:speed") |
| duration        | 是         |              | number     | 持续时间 (tick) |
| amplifier       | 是         |              | number     | 等级 (0 = 一级) |
| hideParticles   | 否         | false        | boolean    | 是否隐藏粒子 |

```javascript
entity.addEffect("minecraft:speed", 200, 1); // 速度 II, 持续 10 秒
entity.addEffect("minecraft:regeneration", 100, 0, true); // 生命恢复 I, 隐藏粒子
```

#### <font id="API" />getAttribute(<font id="Type">attributeId: string</font>)<font id="Type">: number</font> {#getAttribute}

读取实体属性值。

**输入参数**

| **_参数_**   | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ------------ | ---------- | ------------ | ---------- | ---------- |
| attributeId  | 是         |              | string     | 属性 ID (如 "minecraft:generic.max_health") |

**返回值**

| **_类型_** | **_说明_** |
| ---------- | ---------- |
| number     | 当前属性值, 不支持的实体返回 0 |

#### <font id="API" />setAttribute(<font id="Type">attributeId: string, value: number</font>)<font id="Type">: void</font> {#setAttribute}

设置实体属性基础值。仅对 LivingEntity 有效。

**输入参数**

| **_参数_**   | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ------------ | ---------- | ------------ | ---------- | ---------- |
| attributeId  | 是         |              | string     | 属性 ID |
| value        | 是         |              | number     | 新基础值 |

```javascript
entity.setAttribute("minecraft:generic.movement_speed", 0.3);
```

#### <font id="API" />destroy()<font id="Type">: void</font> {#destroy}

销毁实体 (触发 setOnDestroy 注册的回调)。

```javascript
entity.destroy();
```

#### <font id="API" />setOnDestroy(<font id="Type">handler: (entity: GameEntity) => void</font>)<font id="Type">: void</font> {#setOnDestroy}

注册实体销毁回调。

```javascript
entity.setOnDestroy((e) => {
    console.log(`实体 ${e.id} 已被销毁`);
});
```
