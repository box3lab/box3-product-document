<script setup>
import '/style.css'
</script>

# 导航与 AI

## 方法

#### <font id="API" />navigateTo(<font id="Type">x: number, y: number, z: number, speed: number</font>)<font id="Type">: boolean</font> {#navigateTo}

让生物导航到指定坐标。也支持 `navigateTo(pos: GameVector3, speed: number)`。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| x          | 是         |              | number     | 目标 X 坐标 |
| y          | 是         |              | number     | 目标 Y 坐标 |
| z          | 是         |              | number     | 目标 Z 坐标 |
| speed      | 是         |              | number     | 移动速度倍率 |

**返回值**

| **_类型_** | **_说明_** |
| ---------- | ---------- |
| boolean    | 路径计算成功返回 true, 非 PathfinderMob 返回 false |

```javascript
const success = entity.navigateTo(100, 64, 100, 1.0);
if (success) {
    console.log("生物开始移动");
}
```

#### <font id="API" />setTarget(<font id="Type">target: GameEntity</font>)<font id="Type">: void</font> {#setTarget}

设置生物的当前攻击目标 (生物将自动寻路并攻击)。

```javascript
entity.setTarget(targetEntity);
```

#### <font id="API" />clearTarget()<font id="Type">: void</font> {#clearTarget}

清除攻击目标，停止追击。

```javascript
entity.clearTarget();
```

#### <font id="API" />getTarget()<font id="Type">: GameEntity | null</font> {#getTarget}

获取当前攻击目标 (可能为 null)。

**返回值**

| **_类型_**        | **_说明_** |
| ----------------- | ---------- |
| GameEntity \| null | 攻击目标，或 null |

#### <font id="API" />setAI(<font id="Type">enabled: boolean</font>)<font id="Type">: void</font> {#setAI}

启用或禁用生物 AI (寻路/目标等)。

```javascript
entity.setAI(false); // 禁用 AI，生物停止自主行为
```
