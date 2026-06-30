<script setup>
import '/style.css'
</script>

# 操作数据

## 属性

#### <font id="API" /><font id="ReadOnly">只读</font>key<font id="Type">: string</font> {#key-data}

获取数据存储空间名称。

```javascript
const userStorage = storage.getDataStorage("users");
console.log(userStorage.key); // "users"
```

## 方法

#### <font id="API" />set(<font id="Type">key: string, value: unknown</font>)<font id="Type">: void</font> {#set}

存入一个键值对。值必须是可 JSON 序列化的类型 (number | string | boolean | object | array | null)。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| key        | 是         |              | string     | 键 |
| value      | 是         |              | unknown    | 值 |

```javascript
const data = storage.getDataStorage("users");
data.set("player1", { score: 100, level: 5 });
data.set("player1_gold", 500);
data.set("player1_name", "吉吉喵");
```

---

#### <font id="API" />get(<font id="Type">key: string</font>)<font id="Type">: unknown</font> {#get}

读取键对应的值，不存在则返回 `null`。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| key        | 是         |              | string     | 键 |

**返回值**

| **_类型_** | **_说明_** |
| ---------- | ---------- |
| unknown    | 存储的值，不存在返回 null |

```javascript
const score = data.get("player1"); // { score: 100, level: 5 }
const missing = data.get("nonexistent"); // null
```

---

#### <font id="API" />keys()<font id="Type">: string[]</font> {#keys}

获取当前存储空间中的所有键。

**返回值**

| **_类型_** | **_说明_** |
| ---------- | ---------- |
| string[]   | 所有键的数组 |

```javascript
const allKeys = data.keys();
console.log(allKeys); // ["player1", "player1_gold", "player1_name"]
```

---

#### <font id="API" />update(<font id="Type">key: string, handler: (prevValue: unknown) => unknown</font>)<font id="Type">: void</font> {#update}

原子更新: 取出当前值, 用 `handler(currentValue)` 的结果覆盖。

如果键不存在，不会创建新条目。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| key        | 是         |              | string     | 键 |
| handler    | 是         |              | function   | (prevValue) => newValue |

```javascript
data.update("player1_gold", (prev) => prev + 100); // 增加 100 金币
```

---

#### <font id="API" />remove(<font id="Type">key: string</font>)<font id="Type">: unknown</font> {#remove}

删除键，返回旧值 (不存在则返回 `null`)。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| key        | 是         |              | string     | 键 |

**返回值**

| **_类型_** | **_说明_** |
| ---------- | ---------- |
| unknown    | 被删除的旧值，不存在返回 null |

```javascript
const oldValue = data.remove("player1_name");
console.log(oldValue); // "吉吉喵"
```

---

#### <font id="API" />increment(<font id="Type">key: string, delta?: number</font>)<font id="Type">: number</font> {#increment}

原子递增 (delta 默认为 1)。键不存在时从 `0 + delta` 开始。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| key        | 是         |              | string     | 键 |
| delta      | 否         | 1            | number     | 增量 |

**返回值**

| **_类型_** | **_说明_** |
| ---------- | ---------- |
| number     | 递增后的新值 |

```javascript
data.increment("visit_count"); // 1 (从 0+1 开始)
data.increment("visit_count", 5); // 6
```

---

#### <font id="API" />list(<font id="Type">options?: object</font>)<font id="Type">: QueryList</font> {#list}

分页查询存储条目。

**输入参数**

| **_参数_**               | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ------------------------ | ---------- | ------------ | ---------- | ---------- |
| options.cursor           | 否         |              | number     | 起始游标 (页码) |
| options.pageSize         | 否         | 100          | number     | 每页条目数 (1-100) |
| options.ascending        | 否         |              | boolean    | 是否升序排列 |
| options.max              | 否         |              | number     | 值的上限过滤 |
| options.min              | 否         |              | number     | 值的下限过滤 |
| options.constraintTarget | 否         |              | string     | 排序/过滤的目标路径 (如 "a.b.c") |

```javascript
const queryList = data.list({ cursor: 0, pageSize: 10, ascending: true });
while (true) {
    for (const entry of queryList.getCurrentPage()) {
        console.log(`${entry.key}: ${JSON.stringify(entry.value)}`);
    }
    if (queryList.isLastPage) break;
    queryList.nextPage();
}
```

---

#### <font id="API" />destroy()<font id="Type">: void</font> {#destroy}

销毁该存储空间 (删除对应 JSON 文件)。

```javascript
data.destroy();
```

## 接口

#### <font id="API" />QueryList {#QueryList}

分页查询结果 (由 `list()` 返回)。

| **_参数_**         | **_类型_**       | **_说明_** |
| ------------------ | ---------------- | ---------- |
| isLastPage         | boolean          | 是否已到达最后一页 |
| getCurrentPage()   | () => ReturnValue[] | 获取当前页的条目数组 |
| nextPage()         | () => void       | 移动到下一页 |

#### <font id="API" />ReturnValue {#ReturnValue}

单个存储条目 (包含元数据)。

| **_参数_**   | **_类型_** | **_说明_** |
| ------------ | ---------- | ---------- |
| key          | string     | 键名 |
| value        | unknown    | 值 |
| updateTime   | number     | 更新时间 (Unix 毫秒) |
| createTime   | number     | 创建时间 (Unix 毫秒) |
| version      | string     | 版本标识符 (可用于乐观锁) |
