<script setup>
import '/style.css'
</script>

# S-💾 游戏数据存储

**GameDataStorage** 是游戏中的数据存储系统，它提供了以下核心功能：

- 数据管理：以键值对形式存储和管理游戏数据
- 空间控制：支持项目隔离和跨项目共享的数据存储空间管理
- 原子操作：提供安全的数据读写和更新机制

你可以通过全局对象 `storage` 来使用这些功能。

## 类定义

```typescript
declare const storage: GameStorage;
interface GameStorage {
  //...
}
interface GameDataStorage {
  //...
}
```

## 属性列表

### GameStorage

- [`key`](./getSpace#key) : 始终返回空字符串 (MC 本地存储无 key, 只读)

### GameDataStorage

- [`key`](./getSpace#key-data) : 获取数据存储空间名称 (只读)

## 方法列表

### 空间管理 (GameStorage)

- [`getDataStorage`](./getSpace#getDataStorage) : 打开或创建指定名称的数据存储空间 (项目隔离)
- [`getGroupStorage`](./getSpace#getGroupStorage) : 获取跨项目共享存储

### 数据操作 (GameDataStorage)

- [`set`](./setSpace#set) : 存入一个键值对
- [`get`](./setSpace#get) : 读取键对应的值
- [`keys`](./setSpace#keys) : 获取当前存储空间中的所有键
- [`update`](./setSpace#update) : 原子更新键值
- [`remove`](./setSpace#remove) : 删除键
- [`increment`](./setSpace#increment) : 原子递增
- [`list`](./setSpace#list) : 分页查询存储条目
- [`destroy`](./setSpace#destroy) : 销毁该存储空间

## 接口定义

- [`QueryList`](./setSpace#QueryList) : 分页查询结果
- [`ReturnValue`](./setSpace#ReturnValue) : 单个存储条目 (包含元数据)
