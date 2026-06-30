<script setup>
import '/style.css'
</script>

# 外观

## 属性

#### <font id="API" />invisible<font id="Type">: boolean</font> {#invisible}

是否隐身。

```javascript
entity.player.invisible = true; // 玩家隐身
```

#### <font id="API" /><font id="ReadOnly">只读</font>scale<font id="Type">: number</font> {#scale}

模型缩放比例 (MC 原生, 非 Box3 scale)。

```javascript
console.log(entity.player.scale); // 1.0
```
