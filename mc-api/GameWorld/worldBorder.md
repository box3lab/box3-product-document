<script setup>
import '/style.css'
</script>

# 世界边界

## 属性

#### <font id="API" />borderSize<font id="Type">: number</font> {#borderSize}

当前边界大小。

```javascript
console.log(world.borderSize);
```

## 方法

#### <font id="API" />setBorderCenter(<font id="Type">x: number, z: number</font>)<font id="Type">: void</font> {#setBorderCenter}

设置边界中心。

```javascript
world.setBorderCenter(0, 0);
```

#### <font id="API" />shrinkBorder(<font id="Type">targetSize: number, seconds: number</font>)<font id="Type">: void</font> {#shrinkBorder}

缩放边界到目标大小 (带动画)。

```javascript
world.shrinkBorder(100, 30); // 30 秒内缩到 100
```

#### <font id="API" />setBorderDamage(<font id="Type">damage: number</font>)<font id="Type">: void</font> {#setBorderDamage}

边界伤害 (每秒造成的伤害值)。

```javascript
world.setBorderDamage(2.0);
```

#### <font id="API" />setBorderWarning(<font id="Type">blocks: number</font>)<font id="Type">: void</font> {#setBorderWarning}

边界警告距离 (方块数)。

```javascript
world.setBorderWarning(10);
```

## 实战示例

### 缩圈竞技场

```javascript
// 游戏开始: 设置初始边界并缓慢缩圈
world.setBorderCenter(0, 0);
world.borderSize = 500;
world.setBorderDamage(2.0);
world.setBorderWarning(20);

// 每 60 秒缩圈一次, 共 5 阶段
const stages = [300, 150, 75, 30, 10];
let stage = 0;

const timerId = world.setInterval(() => {
    if (stage >= stages.length) {
        world.clearInterval(timerId);
        world.say("最终圈! 决出胜负!");
        return;
    }
    const target = stages[stage];
    world.shrinkBorder(target, 30); // 30 秒动画缩圈
    world.say(`⚠ 边界缩小至 ${target} 格!`);
    stage++;
}, 1200); // 60 秒间隔
```
