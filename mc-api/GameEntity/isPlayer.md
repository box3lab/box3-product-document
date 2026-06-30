<script setup>
import '/style.css'
</script>

# 玩家判断

## 方法

#### <font id="API" />isPlayer()<font id="Type">: this is GamePlayerEntity</font> {#isPlayer}

类型守卫 — 判断实体是否为玩家实体。返回 true 后 `player` 属性自动收窄为非 null。

```javascript
if (entity.isPlayer()) {
    // 此处 entity 类型收窄为 GamePlayerEntity
    console.log(`玩家: ${entity.player.name}`);
}
```

## 属性

#### <font id="API" />player<font id="Type">: GamePlayer | null</font> {#player}

玩家接口 — 仅当 `isPlayer()` 为 true 时非 null。

```javascript
// 先判断是否为玩家
if (entity.isPlayer()) {
    const player = entity.player; // GamePlayer (非 null)
    console.log(player.name);     // 玩家名
    console.log(player.userId);   // 玩家 UUID
}
```
