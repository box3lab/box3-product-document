# JavaScript 数字与数学基础

本节介绍 JavaScript 中的数字类型与常用数学计算，涵盖四舍五入、随机数、幂/开方、三角函数、精度问题与实战示例。

## 数字与 Number

- 所有常规数字都是 64 位浮点数（IEEE 754）。
- 常见常量：`Number.MAX_SAFE_INTEGER`、`Number.MIN_SAFE_INTEGER`、`Number.EPSILON`。
- 解析：`Number("123")`、`parseInt("101", 10)`、`parseFloat("3.14")`。
- 检查：`Number.isNaN(x)`、`Number.isFinite(x)`。

示例：
```js
const a = Number("42");           // 42
const b = parseInt("101", 10);    // 101
const c = parseFloat("3.14");     // 3.14
Number.isNaN(NaN);                 // true
Number.isFinite(1/0);              // false
```

## 常用 Math API

- 绝对值与取整：`Math.abs(x)`、`Math.floor(x)`、`Math.ceil(x)`、`Math.round(x)`、`Math.trunc(x)`
- 幂与根：`Math.pow(a, b)`、`a ** b`、`Math.sqrt(x)`、`Math.cbrt(x)`
- 最值与夹取：`Math.min(...)`、`Math.max(...)`、`Math.clamp(v, min, max)`(自定义)
- 随机数：`Math.random()` 返回 [0, 1) 的均匀随机
- 三角函数：`Math.sin`、`Math.cos`、`Math.tan`、`Math.atan2`

示例：
```js
Math.abs(-3.2);         // 3.2
Math.floor(3.9);        // 3
Math.ceil(3.1);         // 4
Math.round(3.5);        // 4
2 ** 10;                // 1024
Math.sqrt(16);          // 4
Math.max(1, 7, 3);      // 7
```

随机数与区间：
```js
// [min, max] 闭区间的随机整数
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// [min, max) 半开区间的随机小数
function randFloat(min, max) {
  return Math.random() * (max - min) + min;
}
```

自定义 clamp：
```js
function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}
```

## 精度与误差

浮点运算会有误差：
```js
0.1 + 0.2 === 0.3; // false
```
减轻误差的方法：
- 放大为整数计算再缩小：
```js
const sum = (0.1 * 100 + 0.2 * 100) / 100; // 0.3
```
- 使用 `toFixed` 做显示层面的四舍五入：
```js
(0.1 + 0.2).toFixed(2); // "0.30"
```

## 在 BOX3 地图中实战

- 计算两点距离（比如玩家与目标点之间）：
```js
function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const dz = a.z - b.z;
  return Math.sqrt(dx*dx + dy*dy + dz*dz);
}

const playerPos = { x: 10, y: 3, z: 5 };
const chestPos  = { x: 16, y: 3, z: 9 };
const d = distance(playerPos, chestPos); // 7.21...
```

- 在一定范围内随机生成道具/敌人：
```js
function spawnRandomInRange(center, radius) {
  const rx = randFloat(-radius, radius);
  const rz = randFloat(-radius, radius);
  return { x: center.x + rx, y: center.y, z: center.z + rz };
}

const pos = spawnRandomInRange({ x: 0, y: 2, z: 0 }, 5);
// TODO: 在该位置生成你的实体
```

- 速度限制（夹取）：
```js
let speed = 23.7;
speed = clamp(speed, 0, 20); // 最大速度不超过 20
```

- 角度与弧度：
```js
const deg2rad = deg => deg * Math.PI / 180;
const rad2deg = rad => rad * 180 / Math.PI;
Math.cos(deg2rad(60)); // 0.5
```

## 进阶：BigInt（了解）

当需要安全表示超大整数时，可以用 `BigInt`：
```js
const big = 9007199254740993n; // 超过 MAX_SAFE_INTEGER 的安全整数
big + 2n;                      // 9007199254740995n
```
注意：`BigInt` 不能与 `Number` 混算，需先转型。

## 推荐阅读（第三方教程）

- MDN JavaScript 指南（中文）：
  - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide
- MDN Math 对象：
  - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math
- MDN Number：
  - https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number
- MDN 学习区（JavaScript 教程）：
  - https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript

本章内容为你在游戏逻辑里进行数值处理打下基础，建议结合上面的链接进一步系统学习。
