<script setup>
import '/style.css'
</script>

# S-四元数

四元数是一种用于描述物体在三维空间中旋转的量。四元数由四个分量组成：`x`, `y`, `z` 和 `w`。虽然比起欧拉角、矩阵等方式，四元数略显晦涩，但由于四元数的运算更加高效、造成的数值误差更低，在 3D 游戏领域发挥着很大作用。

更多有关的数学知识可以观看[3Blue1Brown 相关视频](https://www.bilibili.com/video/BV1SW411y7W1/)。

## 构造函数

#### <font id="API" />GameQuaternion(<font id="Type">w: number, x: number, y: number, z: number</font>)<font id="Type">: GameQuaternion</font>

实例化一个四元数对象

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| w          | 是         |              | number     | w 实部     |
| x          | 是         |              | number     | x 虚部     |
| y          | 是         |              | number     | y 虚部     |
| z          | 是         |              | number     | z 虚部     |

## 属性

#### <font id="API" />w<font id="Type">: number</font>

w 实部

#### <font id="API" />x<font id="Type">: number</font>

x 虚部

#### <font id="API" />y<font id="Type">: number</font>

y 虚部

#### <font id="API" />z<font id="Type">: number</font>

z 虚部

静态方法

#### <font id="API" />fromAxisAngle(<font id="Type">axis:GameVector3,rad:number</font>)<font id="Type">: GameQuaternion</font>

根据旋转轴和旋转弧度计算四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| axis       | 是         |              | GameVector3 | 三维向量   |
| rad        | 是         |              | number      | 旋转弧度   |

#### <font id="API" />fromEuler(<font id="Type">x:number,y:number,z:number</font>)<font id="Type">: GameQuaternion</font>

根据欧拉角信息计算四元数，旋转顺序为 YZX，即先绕 Y 旋转，再绕 Z，最后绕 X 旋转。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| x          | 是         |              | number     | x 虚部     |
| y          | 是         |              | number     | y 虚部     |
| z          | 是         |              | number     | z 虚部     |

#### <font id="API" />rotationBetween(<font id="Type">a:GameVector3,b:GameVector3</font>)<font id="Type">: GameQuaternion</font>

从两个向量计算并创建一个四元数。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**  | **_说明_** |
| ---------- | ---------- | ------------ | ----------- | ---------- |
| a          | 是         |              | GameVector3 | 三维向量   |
| b          | 是         |              | GameVector3 | 三维向量   |

## 方法

#### <font id="API" />set(<font id="Type">w: number, x: number, y: number, z: number</font>)<font id="Type">: GameQuaternion</font>

设置四元数值，返回当前四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| w          | 是         |              | number     | w 实部     |
| x          | 是         |              | number     | x 虚部     |
| y          | 是         |              | number     | y 虚部     |
| z          | 是         |              | number     | z 虚部     |

#### <font id="API" />copy(<font id="Type">v:GameQuaternion</font>)<font id="Type">: GameQuaternion</font>

将四元数复制到当前四元数中，返回当前四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**     | **_说明_** |
| ---------- | ---------- | ------------ | -------------- | ---------- |
| v          | 是         |              | GameQuaternion | 四元数     |

#### <font id="API" />clone()<font id="Type">: GameQuaternion</font>

克隆当前四元数，返回新的四元数

#### <font id="API" />rotateX(<font id="Type">\_rad: number</font>)<font id="Type">: GameQuaternion</font>

四元数 X 虚部旋转，返回新的四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| \_rad      | 是         |              | number     | 旋转弧度   |

#### <font id="API" />rotateY(<font id="Type">\_rad: number</font>)<font id="Type">: GameQuaternion</font>

四元数 Y 虚部旋转，返回新的四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| \_rad      | 是         |              | number     | 旋转弧度   |

#### <font id="API" />rotateZ(<font id="Type">\_rad: number</font>)<font id="Type">: GameQuaternion</font>

四元数 Z 虚部旋转，返回新的四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| \_rad      | 是         |              | number     | 旋转弧度   |

#### <font id="API" />add(<font id="Type">v:GameQuaternion</font>)<font id="Type">: GameQuaternion</font>

四元数加法，返回新的四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| v          | 是         |              | GameQuate  |            |

#### <font id="API" />sub(<font id="Type">v:GameQuaternion</font>)<font id="Type">: GameQuaternion</font>

四元数减法，返回新的四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**     | **_说明_** |
| ---------- | ---------- | ------------ | -------------- | ---------- |
| v          | 是         |              | GameQuaternion | 四元数     |

#### <font id="API" />mul(<font id="Type">q:GameQuaternion</font>)<font id="Type">: GameQuaternion</font>

四元数乘法，返回新的四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**     | **_说明_** |
| ---------- | ---------- | ------------ | -------------- | ---------- |
| q          | 是         |              | GameQuaternion | 四元数     |

#### <font id="API" />inv()<font id="Type">: GameQuaternion</font>

四元数转置，返回新的四元数

#### <font id="API" />div(<font id="Type">q:GameQuaternion</font>)<font id="Type">: GameQuaternion</font>

四元数除法，返回新的四元数

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**     | **_说明_** |
| ---------- | ---------- | ------------ | -------------- | ---------- |
| q          | 是         |              | GameQuaternion | 四元数     |

#### <font id="API" />dot(<font id="Type">q:GameQuaternion</font>)<font id="Type">: number</font>

四元数点积
| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
|--- | --- | --- | --- | --- |
| q | 是 | | GameQuaternion | 四元数 |

#### <font id="API" />slerp(<font id="Type">q: GameQuaternion, n: number</font>)<font id="Type">: GameQuaternion</font>

四元数插值，返回新的四元数

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**     | **_说明_** |
| ---------- | ---------- | ------------ | -------------- | ---------- |
| q          | 是         |              | GameQuaternion | 目标四元数 |
| n          | 是         |              | number(0-1)    | 插值百分比 |

#### <font id="API" />angle(<font id="Type">q:GameQuaternion</font>)<font id="Type">: number</font>

返回两个四元数之间的角度

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**     | **_说明_** |
| ---------- | ---------- | ------------ | -------------- | ---------- |
| q          | 是         |              | GameQuaternion | 四元数     |

#### <font id="API" />getAxisAngle(<font id="Type">\_q:GameQuaternion</font>)<font id="Type">: {angle:number;axis:GameVector3}</font>

返回四元数的旋转弧度和旋转轴

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_**     | **_说明_** |
| ---------- | ---------- | ------------ | -------------- | ---------- |
| \_q        | 是         |              | GameQuaternion | 四元数     |

#### <font id="API" />mag()<font id="Type">: number</font>

返回该四元数的长度

#### <font id="API" />sqrMag()<font id="Type">: number</font>

返回四元数的平方长度

#### <font id="API" />equals(<font id="Type">v:GameQuaternion</font>)<font id="Type">: boolean</font>

检测两四元数的值在容差内是否近似相等

容差值：0.000001

**输入参数**
| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
|--- | --- | --- | --- | --- |
| v | 是 | | GameQuaternion | 四元数 |

#### <font id="API" />normalize()<font id="Type">: GameQuaternion</font>

四元数归一化，返回新的四元数

#### <font id="API" />toString()<font id="Type">: string</font>

返回四元数格式化的字符串
