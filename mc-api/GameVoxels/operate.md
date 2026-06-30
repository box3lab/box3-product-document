<script setup>
import '/style.css'
</script>

# 方块操作

## 属性

#### <font id="API" /><font id="ReadOnly">只读</font>shape<font id="Type">: [GameVector3](/GameVector3/)</font> {#shape}

世界最大尺寸 (x, y, z 均为世界高度)。

```javascript
console.log(voxels.shape); // [GameVector3](/GameVector3/)(256, 256, 256)
```

#### <font id="API" /><font id="ReadOnly">只读</font>VoxelTypes<font id="Type">: string[]</font> {#VoxelTypes}

所有可用的方块类型名称数组。

```javascript
console.log(voxels.VoxelTypes.length); // 方块类型总数
```

## 名称与 ID 映射

#### <font id="API" />id(<font id="Type">name: string</font>)<font id="Type">: number</font> {#id}

将方块名称转为数字 ID (如 "stone" 或 "minecraft:stone")。未知方块返回 0 (air)。

```javascript
const stoneId = voxels.id("stone");
const diamondId = voxels.id("minecraft:diamond_block");
```

#### <font id="API" />name(<font id="Type">id: number</font>)<font id="Type">: string</font> {#name}

将数字 ID 转为方块名称。未知 ID 返回 "air"。

```javascript
const blockName = voxels.name(125);
console.log(blockName); // "minecraft:dirt"
```

## 方块读取

#### <font id="API" />getVoxel(<font id="Type">x: number, y: number, z: number</font>)<font id="Type">: number</font> {#getVoxel}

获取方块数字 ID (不含旋转信息的基础 ID)。也支持 `getVoxel(pos: [GameVector3](/GameVector3/))`。空气返回 0。

```javascript
const id = voxels.getVoxel(100, 64, 100);
if (id === 0) {
    console.log("该位置是空气");
}
```

#### <font id="API" />getVoxelId(<font id="Type">x: number, y: number, z: number</font>)<font id="Type">: number</font> {#getVoxelId}

获取方块数字 ID (不含旋转信息的基础 ID)。也支持 `getVoxelId(pos: [GameVector3](/GameVector3/))`。

```javascript
const id = voxels.getVoxelId(100, 64, 100);
```

#### <font id="API" />getVoxelName(<font id="Type">x: number, y: number, z: number</font>)<font id="Type">: string</font> {#getVoxelName}

获取方块名称 (如 "minecraft:stone")。也支持 `getVoxelName(pos: [GameVector3](/GameVector3/))`。

```javascript
const name = voxels.getVoxelName(100, 64, 100);
console.log(name); // "minecraft:stone"
```

#### <font id="API" />getVoxelRotation(<font id="Type">x: number, y: number, z: number</font>)<font id="Type">: number</font> {#getVoxelRotation}

获取方块旋转值 (0-3, 对应南/西/北/东)。也支持 `getVoxelRotation(pos: [GameVector3](/GameVector3/))`。

| 值 | 朝向 |
| --- | --- |
| 0 | 南 |
| 1 | 西 |
| 2 | 北 |
| 3 | 东 |

```javascript
const rot = voxels.getVoxelRotation(100, 64, 100);
```

## 方块写入

#### <font id="API" />setVoxel(<font id="Type">x: number, y: number, z: number, voxel: string | number, rotation?: number | string</font>)<font id="Type">: number</font> {#setVoxel}

放置方块 (名称或 ID)。返回含旋转编码的完整 ID。也支持 `setVoxel(pos, voxel)` 和 `setVoxel(pos, voxel, rotation)`。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| x | 是 | | number | X 坐标 |
| y | 是 | | number | Y 坐标 |
| z | 是 | | number | Z 坐标 |
| voxel | 是 | | string \| number | 方块名称或数字 ID |
| rotation | 否 | | number \| string | 旋转值 0-3 (或字符串 "0"-"3") |

```javascript
voxels.setVoxel(100, 64, 100, "minecraft:diamond_block");
voxels.setVoxel(100, 64, 100, "stone", 2); // 朝北
voxels.setVoxel(100, 64, 100, "air");      // 删除方块
```

#### <font id="API" />setVoxelId(<font id="Type">x: number, y: number, z: number, voxel: number</font>)<font id="Type">: number</font> {#setVoxelId}

放置已含旋转编码的完整 ID 方块 (如 getVoxelId 返回值)。也支持 `setVoxelId(pos, voxel)`。

```javascript
const id = voxels.getVoxelId(100, 64, 100);
voxels.setVoxelId(200, 64, 200, id); // 复制方块到新位置
```

## 区域操作

#### <font id="API" />fillVoxel(<font id="Type">x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, voxel: string | number</font>)<font id="Type">: void</font> {#fillVoxel}

在两个对角顶点定义的区域内填充方块。也支持 `fillVoxel(pos1, pos2, voxel)`。

```javascript
// 填充一个 10x10x10 的石头区域
voxels.fillVoxel(100, 64, 100, 110, 74, 110, "stone");
```

#### <font id="API" />countVoxel(<font id="Type">x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, voxel: string | number</font>)<font id="Type">: number</font> {#countVoxel}

统计区域内指定方块的数量。也支持 `countVoxel(pos1, pos2, voxel)`。

```javascript
const count = voxels.countVoxel(0, 0, 0, 100, 100, 100, "minecraft:diamond_block");
console.log(`区域内钻石块数量: ${count}`);
```

## 刷怪笼

#### <font id="API" />setSpawner(<font id="Type">x: number, y: number, z: number, entityType: string</font>)<font id="Type">: void</font> {#setSpawner}

设置刷怪笼的生成实体类型。也支持 `setSpawner(pos, entityType)`。

```javascript
voxels.setSpawner(100, 64, 100, "minecraft:zombie");
voxels.setSpawner(100, 64, 100, "minecraft:skeleton");
```
