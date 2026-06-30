<script setup>
import '/style.css'
</script>

# 基础信息

## 属性

#### <font id="API" /><font id="ReadOnly">只读</font>name<font id="Type">: string</font> {#name}

玩家名。

```javascript
console.log(entity.player.name); // "吉吉喵"
```

#### <font id="API" /><font id="ReadOnly">只读</font>userId<font id="Type">: string</font> {#userId}

玩家 UUID (与 entity.id 相同)。

```javascript
console.log(entity.player.userId); // "550e8400-e29b-41d4-a716-446655440000"
```

#### <font id="API" /><font id="ReadOnly">只读</font>position<font id="Type">: GameVector3</font> {#position}

当前世界坐标。Readonly ref — 可通过 `.set()` 修改，不可重新赋值。

```javascript
// 读取
const pos = entity.player.position;
// 修改
entity.player.position.set(10, 64, 10);
```

#### <font id="API" /><font id="ReadOnly">只读</font>velocity<font id="Type">: GameVector3</font> {#velocity}

当前速度 (运动向量)。Readonly ref — 可通过 `.set()` 修改。

```javascript
entity.player.velocity.set(0, 5, 0); // 向上弹起
```

#### <font id="API" /><font id="ReadOnly">只读</font>bounds<font id="Type">: GameVector3</font> {#bounds}

包围盒半尺寸 (x=宽/2, y=高/2, z=宽/2)。

#### <font id="API" /><font id="ReadOnly">只读</font>onGround<font id="Type">: boolean</font> {#onGround}

是否在地面上。

```javascript
if (entity.player.onGround) {
    console.log("玩家站在方块上");
}
```

#### <font id="API" />gameMode<font id="Type">: string | number</font> {#gameMode}

游戏模式。字符串或数字均可。

| 值 | 模式 |
| --- | --- |
| 0 / "survival" | 生存 |
| 1 / "creative" | 创造 |
| 2 / "adventure" | 冒险 |
| 3 / "spectator" | 观察者 |

```javascript
entity.player.gameMode = "creative";
console.log(entity.player.gameMode); // "creative"
```

#### <font id="API" />dimension<font id="Type">: string</font> {#dimension}

当前维度 ID (如 "minecraft:overworld")。

```javascript
console.log(entity.player.dimension); // "minecraft:overworld"
```

## 方法

#### <font id="API" />teleport(<font id="Type">pos: GameVector3</font>)<font id="Type">: void</font> {#teleport}

将玩家传送到指定坐标。

```javascript
entity.player.teleport(new GameVector3(100, 64, 100));
```

#### <font id="API" />kick(<font id="Type">reason?: string</font>)<font id="Type">: void</font> {#kick}

踢出玩家。

```javascript
entity.player.kick();              // 默认理由
entity.player.kick("违规行为");     // 自定义理由
```

#### <font id="API" />runCommand(<font id="Type">cmd: string</font>)<font id="Type">: void</font> {#runCommand}

以玩家身份执行 Minecraft 命令。

```javascript
entity.player.runCommand("say 你好");
entity.player.runCommand("give @s minecraft:diamond 1");
```
