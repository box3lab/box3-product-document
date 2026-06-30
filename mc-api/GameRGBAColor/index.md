<script setup>
import '/style.css'
</script>

# S-RGBA 颜色

RGBA 颜色基于 RGB 颜色新增 alpha 通道，用来表示颜色的不透明度。

## 构造函数

#### <font id="API" />GameRGBAColor(<font id="Type">r: number, g: number, b: number, a: number</font>)<font id="Type">: GameRGBAColor</font>

实例化一个透明颜色对象

**输入参数**r

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_**   |
| ---------- | ---------- | ------------ | ----------- | ------------ |
| r          | 是         |              | number(0-1) | red 颜色值   |
| g          | 是         |              | number(0-1) | green 颜色值 |
| b          | 是         |              | number(0-1) | blue 颜色值  |
| a          | 是         |              | number(0-1) | alpha 透明值 |

```javascript
//如果需要使用 RGB 255，可以将颜色值除于255，即可得到0-1的数值。
function rgba(r, g, b, a = 255) {
  return new GameRGBAColor(r / 255, g / 255, b / 255, a / 255);
}

let red = rgba(255, 0, 0, 1); // return GameRGBAColor(1, 0, 0, 1)
```

## 属性

#### <font id="API" />r<font id="Type">: number</font>

red 颜色值，范围 0~1

#### <font id="API" />g<font id="Type">: number</font>

green 颜色值，范围 0~1

#### <font id="API" />b<font id="Type">: number</font>

blue 颜色值，范围 0~1

#### <font id="API" />a<font id="Type">: number</font>

alpha 透明值，范围 0~1

## 方法

#### <font id="API" />set(<font id="Type">r: number, g: number, b: number, a: number</font>)<font id="Type">: GameRGBAColor</font>

设置透明颜色值，返回该透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_**   |
| ---------- | ---------- | ------------ | ----------- | ------------ |
| r          | 是         |              | number(0-1) | red 颜色值   |
| g          | 是         |              | number(0-1) | green 颜色值 |
| b          | 是         |              | number(0-1) | blue 颜色值  |
| a          | 是         |              | number(0-1) | alpha 透明值 |

#### <font id="API" />copy(<font id="Type">c:GameRGBAColor</font>)<font id="Type">: GameRGBAColor</font>

将透明颜色复制到当前透明颜色中，返回该透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| c          | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />clone()<font id="Type">: GameRGBAColor</font>

克隆当前透明颜色，返回新的透明颜色

#### <font id="API" />add(<font id="Type">rgba:GameRGBAColor</font>)<font id="Type">: GameRGBAColor</font>

颜色相加，返回新的透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| rgba       | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />sub(<font id="Type">rgba:GameRGBAColor</font>)<font id="Type">: GameRGBAColor</font>

颜色相减，返回新的透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| rgba       | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />mul(<font id="Type">rgba:GameRGBAColor</font>)<font id="Type">: GameRGBAColor</font>

颜色相乘，返回新的透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| rgba       | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />div(<font id="Type">rgba:GameRGBAColor</font>)<font id="Type">: GameRGBAColor</font>

颜色相除，返回新的透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| rgba       | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />addEq(<font id="Type">rgba:GameRGBAColor</font>)<font id="Type">: GameRGBAColor</font>

颜色相加，并覆盖当前颜色，返回当前透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| rgba       | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />subEq(<font id="Type">rgba:GameRGBAColor</font>)<font id="Type">: GameRGBAColor</font>

颜色相减，并覆盖当前颜色，返回当前透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| rgba       | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />mulEq(<font id="Type">rgba:GameRGBAColor</font>)<font id="Type">: GameRGBAColor</font>

颜色相乘，并覆盖当前颜色，返回当前透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| rgba       | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />divEq(<font id="Type">rgba:GameRGBAColor</font>)<font id="Type">: GameRGBAColor</font>

颜色相除，并覆盖当前颜色，返回当前透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| rgba       | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />lerp(<font id="Type">rgba: GameRGBAColor, n: number</font>)<font id="Type">: GameRGBAColor</font>

颜色插值，返回新的透明颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_**   |
| ---------- | ---------- | ------------ | ------------- | ------------ |
| rgba       | 是         |              | GameRGBAColor | 目标透明颜色 |
| n          | 是         |              | number(0-1)   | 插值百分比   |

#### <font id="API" />equals(<font id="Type">rgba:GameRGBAColor</font>)<font id="Type">: boolean</font>

检测两颜色的值在容差内是否近似相等

容差值：0.000001

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_** |
| ---------- | ---------- | ------------ | ------------- | ---------- |
| rgba       | 是         |              | GameRGBAColor | 透明颜色   |

#### <font id="API" />blendEq(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

基于给定的参数颜色作为背景，返回该背景颜色与当前透明颜色叠加后的最终显示颜色。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | 是         |              | GameRGBColor | 颜色       |

#### <font id="API" />toString()<font id="Type">: string</font>

返回颜色格式化的字符串
