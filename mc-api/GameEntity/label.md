<script setup>
import '/style.css'
</script>

# 标签与身份

## 属性

#### <font id="API" /><font id="ReadOnly">只读</font>id<font id="Type">: string</font> {#id}

实体 UUID (字符串格式，如 "550e8400-e29b-41d4-a716-446655440000")。

```javascript
console.log(entity.id); // "550e8400-e29b-41d4-a716-446655440000"
```

#### <font id="API" /><font id="ReadOnly">只读</font>entityType<font id="Type">: string</font> {#entityType}

实体类型标识符 (如 "minecraft:zombie")。

```javascript
if (entity.entityType === "minecraft:zombie") {
    console.log("这是一个僵尸");
}
```

## 方法

#### <font id="API" />addTag(<font id="Type">tag: string</font>)<font id="Type">: void</font> {#addTag}

添加一个标签。

```javascript
entity.addTag("boss");
```

#### <font id="API" />removeTag(<font id="Type">tag: string</font>)<font id="Type">: void</font> {#removeTag}

移除一个标签。

```javascript
entity.removeTag("boss");
```

#### <font id="API" />hasTag(<font id="Type">tag: string</font>)<font id="Type">: boolean</font> {#hasTag}

检查是否拥有指定标签。

```javascript
if (entity.hasTag("boss")) {
    console.log("这是 Boss 实体");
}
```

#### <font id="API" />tags()<font id="Type">: string[]</font> {#tags}

获取所有标签。

```javascript
const allTags = entity.tags();
console.log(allTags); // ["boss", "undead"]
```
