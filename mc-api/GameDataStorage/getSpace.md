<script setup>
import '/style.css'
</script>

# 获取数据空间

数据存储功能采用基于键值对的存储系统，以 `Key-Value` 形式存储数据。

- **存储形式**：以键值对的形式存储数据，简单高效。
- **适用场景**：适合存储简单的数据结构，如玩家存档、排行榜等。

存储通过 `storage` 全局对象访问，支持两种空间类型：
- **项目隔离存储** (`getDataStorage`)：仅当前项目可访问
- **跨项目共享存储** (`getGroupStorage`)：所有项目可读写同一份数据

## 属性

#### <font id="API" /><font id="ReadOnly">只读</font>key<font id="Type">: string</font> {#key}

获取存储空间名称。MC 本地存储始终返回空字符串 `""`。

## 方法

#### <font id="API" />getDataStorage(<font id="Type">name: string</font>)<font id="Type">: GameDataStorage</font>{#getDataStorage}

打开或创建指定名称的数据存储空间 (项目隔离)。

不同项目使用同一 name 会访问不同文件。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| name       | 是         |              | string     | 命名空间 (可含 "/" 作为目录分隔) |

**返回值**

| **_类型_**       | **_说明_**         |
| ---------------- | ------------------ |
| GameDataStorage  | 数据存储空间对象   |

```javascript
const userStorage = storage.getDataStorage("users");
userStorage.set("player1", { score: 100, level: 5 });
```

---

#### <font id="API" />getGroupStorage(<font id="Type">name: string</font>)<font id="Type">: GameDataStorage</font>{#getGroupStorage}

获取跨项目共享存储 — 所有项目通过同一 name 读写同一份数据。

底层使用 `__shared__/` 前缀，适合全服排行榜、全局配置等场景。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| name       | 是         |              | string     | 命名空间 |

**返回值**

| **_类型_**       | **_说明_**         |
| ---------------- | ------------------ |
| GameDataStorage  | 数据存储空间对象   |

```javascript
const leaderboard = storage.getGroupStorage("leaderboard");
leaderboard.set("topScore", 9999);
```
