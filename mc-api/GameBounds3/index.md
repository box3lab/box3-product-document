<script setup>
import '/style.css'
</script>

# S-三维空间

三维空间是指由长、宽、高三个维度所构成的空间，是我们日常生活中能够看得见、感受得到的空间。

## 构造函数

#### <font id="API" />GameBounds3(<font id="Type">lo:GameVector3,hi:GameVector3</font>)<font id="Type">: GameBounds3</font>

实例化一个三维空间对象

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_**     |
| ---------- | ---------- | ------------ | ----------- | -------------- |
| lo         | 是         |              | GameVector3 | 区域的低处顶点 |
| hi         | 是         |              | GameVector3 | 区域的高处顶点 |

## 属性

#### <font id="API" />hi<font id="Type">: GameVector3</font>

区域的高处顶点

#### <font id="API" />lo<font id="Type">: GameVector3</font>

区域的低处顶点

## 静态方法

#### <font id="API" />fromPoints(<font id="Type">...points:GameVector3[]</font>)<font id="Type">: GameBounds3</font>

任意数量的 3d 坐标点, 用来形成包围盒

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**    | **_说明_**   |
| ---------- | ---------- | ------------ | ------------- | ------------ |
| ...points  | 是         |              | GameVector3[] | 三维向量列表 |

## 方法

#### <font id="API" />set(<font id="Type">lox:number, loy:number, loz:number, hix:number, hiy:number, hiz:number</font>)<font id="Type">: GameBounds3</font>

设置空间值，返回该三维空间

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_**              |
| ---------- | ---------- | ------------ | ---------- | ----------------------- |
| lox        | 是         |              | number     | 区域的低处顶点的 X 坐标 |
| loy        | 是         |              | number     | 区域的低处顶点的 Y 坐标 |
| loz        | 是         |              | number     | 区域的低处顶点的 Z 坐标 |
| hix        | 是         |              | number     | 区域的高处顶点的 X 坐标 |
| hiy        | 是         |              | number     | 区域的高处顶点的 Y 坐标 |
| hiz        | 是         |              | number     | 区域的高处顶点的 Z 坐标 |

#### <font id="API" />copy(<font id="Type">b:GameBounds3</font>)<font id="Type">: GameBounds3</font>

将三维空间复制到当前三维空间中，返回当前三维空间

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| b          | 是         |              | GameBounds3 | 三维空间   |

#### <font id="API" />intersect(<font id="Type">b:GameBounds3</font>)<font id="Type">: GameBounds3</font>

计算与此包围盒相交的部分

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| b          | 是         |              | GameBounds3 | 三维空间   |

#### <font id="API" />intersects(<font id="Type">b:GameBounds3</font>)<font id="Type">: boolean</font>

检测是否与此包围盒相交

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| b          | 是         |              | GameBounds3 | 三维空间   |

#### <font id="API" />contains(<font id="Type">b:GameVector3</font>)<font id="Type">: boolean</font>

检测是否包围了这个 3d 点

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| b          | 是         |              | GameVector3 | 三维向量   |

#### <font id="API" />containsBounds(<font id="Type">b:GameBounds3</font>)<font id="Type">: boolean</font>

检测是否完全包围了此盒

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| b          | 是         |              | GameBounds3 | 三维空间   |

#### <font id="API" />toString()<font id="Type">: string</font>

返回三维空间格式化的字符串
