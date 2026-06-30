<script setup>
import '/style.css'
</script>

# S-RGB 颜色

RGB 颜色是计算机中表示颜色的常用方法，分别由红、绿、蓝三个颜色通道组成，每个颜色通道的值为 0-1 之间的浮点数，0 表示无颜色，1 表示纯色。例如，(1, 0, 0) 表示红色，(1, 1, 0) 表示黄色。

## 构造函数

#### <font id="API" />GameRGBColor(<font id="Type">r: number, g: number, b: number</font>)<font id="Type">: GameRGBColor</font>

实例化一个颜色对象

**输入参数**r

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_**   |
| ---------- | ---------- | ------------ | ----------- | ------------ |
| r          | 是         |              | number(0-1) | red 颜色值   |
| g          | 是         |              | number(0-1) | green 颜色值 |
| b          | 是         |              | number(0-1) | blue 颜色值  |

```javascript
//如果需要使用 RGB 255，可以将颜色值除于255，即可得到0-1的数值。
function rgb(r, g, b) {
  return new GameRGBColor(r / 255, g / 255, b / 255);
}

let red = rgb(255, 0, 0); // return GameRGBColor(1, 0, 0)
```

## 属性

#### <font id="API" />r<font id="Type">: number</font>

red 颜色值，范围 0~1

#### <font id="API" />g<font id="Type">: number</font>

green 颜色值，范围 0~1

#### <font id="API" />b<font id="Type">: number</font>

blue 颜色值，范围 0~1

## 静态方法

#### <font id="API" />random()<font id="Type">: GameRGBColor</font>

返回随机颜色

## 方法

#### <font id="API" />set(<font id="Type">r: number, g: number, b: number</font>)<font id="Type">: GameRGBColor</font>

设置颜色值，返回当前颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_**   |
| ---------- | ---------- | ------------ | ----------- | ------------ |
| r          | 是         |              | number(0-1) | red 颜色值   |
| g          | 是         |              | number(0-1) | green 颜色值 |
| b          | 是         |              | number(0-1) | blue 颜色值  |

#### <font id="API" />copy(<font id="Type">c:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

将颜色复制到当前颜色中，返回当前颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| c          | 是         |              | GameRGBColor | 颜色       |

#### <font id="API" />clone()<font id="Type">: GameRGBColor</font>

克隆当前颜色，返回新的颜色

#### <font id="API" />add(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

颜色相加，返回新的颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | 是         |              | GameRGBColor | 颜色       |

#### <font id="API" />sub(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

颜色相减，返回新的颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | 是         |              | GameRGBColor | 颜色       |

#### <font id="API" />mul(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

颜色相乘，返回新的颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | _是_       |              | GameRGBColor | 颜色       |

#### <font id="API" />div(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

颜色相除，返回新的颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | 是         |              | GameRGBColor | 颜色       |

#### <font id="API" />addEq(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

颜色相加，并覆盖当前颜色，返回当前颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | 是         |              | GameRGBColor | 颜色       |

#### <font id="API" />subEq(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

颜色相减，并覆盖当前颜色，返回当前颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | 是         |              | GameRGBColor | 颜色       |

#### <font id="API" />mulEq(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

颜色相乘，并覆盖当前颜色，返回当前颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | _是_       |              | GameRGBColor | 颜色       |

#### <font id="API" />divEq(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: GameRGBColor</font>

颜色相除，并覆盖当前颜色，返回当前颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | 是         |              | GameRGBColor | 颜色       |

#### <font id="API" />lerp(<font id="Type">rgb:GameRGBColor,n: number</font>)<font id="Type">: GameRGBColor</font>

颜色插值，返回新的颜色

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | 是         |              | GameRGBColor | 目标颜色   |
| n          | 是         |              | number(0-1)  | 插值百分比 |

#### <font id="API" />equals(<font id="Type">rgb:GameRGBColor</font>)<font id="Type">: boolean</font>

检测两颜色的值在容差内是否近似相等

容差值：0.000001

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**   | **_说明_** |
| ---------- | ---------- | ------------ | ------------ | ---------- |
| rgb        | 是         |              | GameRGBColor | 颜色       |

#### <font id="API" />toRGBA()<font id="Type">: GameRGBAColor</font>

将当前颜色 转换为 透明颜色（alpha 透明值 为 1），返回新的透明颜色

#### <font id="API" />toString()<font id="Type">: string</font>

返回颜色格式化的字符串
