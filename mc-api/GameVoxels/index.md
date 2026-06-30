# S-🧱 游戏方块

**GameVoxels** 提供方块读写接口，通过全局对象 `voxels` 访问。

- 方块读写：放置、获取、批量填充
- ID 映射：名称与数字 ID 互转
- 区域操作：填充、统计
- 刷怪笼：设置生成类型

## 接口定义

```typescript
declare const voxels: GameVoxels;

interface GameVoxels {
  //...
}
```

## 属性列表

- [`shape`](./operate#shape) : 世界最大尺寸
- [`VoxelTypes`](./operate#VoxelTypes) : 所有可用方块类型名称数组

## 方法列表

### 名称与 ID 映射

- [`id`](./operate#id) : 将方块名称转为数字 ID
- [`name`](./operate#name) : 将数字 ID 转为方块名称

### 方块读取

- [`getVoxel`](./operate#getVoxel) : 获取方块数字 ID (不含旋转)
- [`getVoxelId`](./operate#getVoxelId) : 获取方块数字 ID (不含旋转)
- [`getVoxelName`](./operate#getVoxelName) : 获取方块名称
- [`getVoxelRotation`](./operate#getVoxelRotation) : 获取方块旋转值

### 方块写入

- [`setVoxel`](./operate#setVoxel) : 放置方块 (名称或 ID)
- [`setVoxelId`](./operate#setVoxelId) : 放置含旋转编码的完整 ID 方块

### 区域操作

- [`fillVoxel`](./operate#fillVoxel) : 填充区域
- [`countVoxel`](./operate#countVoxel) : 统计区域内方块数量

### 刷怪笼

- [`setSpawner`](./operate#setSpawner) : 设置刷怪笼生成类型
