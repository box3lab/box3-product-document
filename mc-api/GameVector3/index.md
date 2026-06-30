<script setup>
import '/style.css'
</script>

# S-三维向量

三维向量是数学和物理学中非常重要的一个概念，它用于描述三维空间中的一个点相对于另一个点的位置变化，或者表示一个物体在三维空间中的速度、加速度、力等物理量的方向和大小。简单来说，三维向量是一个有三个分量的量，这些分量分别对应三维空间中的 X 轴、Y 轴和 Z 轴。

更多有关的数学知识，可以观看[3Blue1Brown 相关视频](https://www.bilibili.com/video/BV1ys411472E)。

## 构造函数

#### <font id="API" />GameVector3(<font id="Type">x: number, y: number, z: number</font>)<font id="Type">: GameVector3</font>{#GameVector3}

实例化一个三维向量对象

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| x          | 是         |              | number     | x 轴坐标   |
| y          | 是         |              | number     | y 轴坐标   |
| z          | 是         |              | number     | z 轴坐标   |

**返回值**

| **类型**    | **说明** |
| ----------- | -------- |
| GameVector3 | 三维向量 |

## 属性

#### <font id="API" />x<font id="Type">: number</font> {#x}

x 轴坐标

#### <font id="API" />y<font id="Type">: number</font> {#y}

y 轴坐标

#### <font id="API" />z<font id="Type">: number</font>{#z}

z 轴坐标

## 静态方法

#### <font id="API" />fromPolar(<font id="Type">mag: number, phi: number, theta: number</font>)<font id="Type">: GameVector3</font>{#fromPolar}

根据极坐标或球面坐标来创建三维向量。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_**                                                  |
| ---------- | ---------- | ------------ | ---------- | ----------------------------------------------------------- |
| mag        | 是         |              | number     | 向量的模长或半径，即从原点到点的直线距离。                  |
| phi        | 是         |              | number     | 表示从正 y 轴到点在 xy 平面上的投影的逆时针角度（即经度）。 |
| theta      | 是         |              | number     | 表示从 xz 平面向上或向下到点的角度（即纬度）。              |

## 方法

#### <font id="API" />set(<font id="Type">x: number, y: number, z: number</font>)<font id="Type">: GameVector3</font>{#set}

设置向量值，返回当前向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| x          | 是         |              | number     | x 轴坐标   |
| y          | 是         |              | number     | y 轴坐标   |
| z          | 是         |              | number     | z 轴坐标   |

#### <font id="API" />copy(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#copy}

将三维向量复制到当前三维向量中，返回当前向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />clone()<font id="Type">: GameVector3</font>{#clone}

克隆当前三维向量，返回新的向量

#### <font id="API" />add(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#add}

向量加法，返回新的向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />sub(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#sub}

向量减法，返回新的向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />mul(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#mul}

向量逐元素乘法，返回新的向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />div(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#div}

向量相除，返回新的向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />addEq(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#addEq}

向量加法，并覆盖当前向量，返回当前向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />subEq(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#subEq}

向量减法，并覆盖当前向量，返回当前向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />mulEq(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#mulEq}

向量逐元素乘法，并覆盖当前向量，返回当前向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />divEq(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#divEq}

向量相除，并覆盖当前向量，返回当前向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />dot(<font id="Type">v:GameVector3</font>)<font id="Type">: number</font>{#dot}

向量点积

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />cross(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#cross}

向量叉积，返回新的向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />scale(<font id="Type">n: number</font>)<font id="Type">: GameVector3</font>{#scale}

向量数乘，返回新的向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| n          | 是         |              | number     | 乘数       |

#### <font id="API" />lerp(<font id="Type">v:GameVector3,n: number</font>)<font id="Type">: GameVector3</font>{#lerp}

向量插值，返回新的向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_**   |
| ---------- | ---------- | ------------ | ----------- | ------------ |
| v          | 是         |              | GameVector3 | 目标三维向量 |
| n          | 是         |              | number(0-1) | 插值百分比   |

#### <font id="API" />towards(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#towards}

计算两向量的点之间的位置

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />mag()<font id="Type">: number</font>{#mag}

返回该向量的长度

#### <font id="API" />sqrMag()<font id="Type">: number</font>{#sqrMag}

返回向量的平方长度

#### <font id="API" />angle(<font id="Type">v:GameVector3</font>)<font id="Type">: number</font>{#angle}

返回两个向量之间的角度

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />distance(<font id="Type">v:GameVector3</font>)<font id="Type">: number</font>{#distance}

返回两个向量之间的距离

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />equals(<font id="Type">v:GameVector3</font>)<font id="Type">: boolean</font>{#equals}

检测两向量的值在容差内是否近似相等

容差值：0.000001

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />exactEquals(<font id="Type">v:GameVector3</font>)<font id="Type">: boolean</font>{#exactEquals}

检测两向量的值是否完全相等

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />max(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#max}

返回两向量的最大向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />min(<font id="Type">v:GameVector3</font>)<font id="Type">: GameVector3</font>{#min}

返回两向量的最小向量

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| v          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />normalize()<font id="Type">: GameVector3</font>{#normalize}

向量归一化，返回新的向量

#### <font id="API" />toString()<font id="Type">: string</font>{#toString}

返回向量格式化的字符串
