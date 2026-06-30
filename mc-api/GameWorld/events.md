<script setup>
import '/style.css'
</script>

# 事件

所有 `world.onXxx()` 返回 `GameEventHandlerToken`, 调用 `.cancel()` 取消监听。

## 基础事件

#### <font id="API" /><font id="Event">事件</font>onTick(<font id="Type">handler: (info: TickInfo) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onTick}

每 tick 回调 (每秒 20 次)。

| **_参数_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ---------- |
| tick | number | 当前 tick 数 |
| prevTick | number | 上一 tick 数 |
| elapsedTimeMS | number | 自启动以来的毫秒数 |
| skip | number | 跳过的 tick 数 (MC 下始终为 0) |

```javascript
world.onTick(({ tick }) => {
    console.log(`tick: ${tick}`);
});
```

#### <font id="API" /><font id="Event">事件</font>onPlayerJoin(<font id="Type">handler: (entity: GamePlayerEntity, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onPlayerJoin}

玩家加入时触发。

```javascript
world.onPlayerJoin((entity, tick) => {
    world.say(`${entity.player.name} 加入了游戏`);
});
```

#### <font id="API" /><font id="Event">事件</font>onPlayerLeave(<font id="Type">handler: (entity: GamePlayerEntity, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onPlayerLeave}

玩家离开时触发。

```javascript
world.onPlayerLeave((entity, tick) => {
    world.say(`${entity.player.name} 离开了游戏`);
});
```

#### <font id="API" /><font id="Event">事件</font>onChat(<font id="Type">handler: (entity: GamePlayerEntity, message: string, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onChat}

聊天消息 (包括 /me) 时触发。

```javascript
world.onChat((entity, message, tick) => {
    console.log(`${entity.player.name}: ${message}`);
});
```

#### <font id="API" /><font id="Event">事件</font>onPlayerRespawn(<font id="Type">handler: (entity: GamePlayerEntity, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onPlayerRespawn}

玩家重生时触发。

```javascript
world.onPlayerRespawn((entity, tick) => {
    entity.player.directMessage("你已重生!");
});
```

#### <font id="API" /><font id="Event">事件</font>onButtonPressed(<font id="Type">handler: (entity: GamePlayerEntity, button: string, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onButtonPressed}

玩家按下按钮时触发。button 值为 `GameButtonType` 常量: `WALK` / `RUN` / `CROUCH` / `JUMP` / `FLY` / `ACTION0` / `ACTION1`。

```javascript
world.onButtonPressed((entity, button, tick) => {
    if (button === GameButtonType.JUMP) {
        console.log(`${entity.player.name} 跳跃了`);
    }
});
```

#### <font id="API" /><font id="Event">事件</font>onMessage(<font id="Type">handler: (sender: string, data: unknown) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onMessage}

跨项目消息回调。

```javascript
world.onMessage((sender, data) => {
    console.log(`来自 ${sender}: ${JSON.stringify(data)}`);
});
```

## 方块事件

#### <font id="API" /><font id="Event">事件</font>onBlockActivate(<font id="Type">handler: (entity: GamePlayerEntity, x: number, y: number, z: number, voxel: string, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onBlockActivate}

玩家右键方块时触发。

```javascript
world.onBlockActivate((entity, x, y, z, voxel, tick) => {
    console.log(`${entity.player.name} 右键了 ${voxel} 在 (${x}, ${y}, ${z})`);
});
```

#### <font id="API" /><font id="Event">事件</font>onVoxelDestroy(<font id="Type">handler: (entity: GamePlayerEntity, x: number, y: number, z: number, voxel: string, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onVoxelDestroy}

玩家破坏方块时触发。

```javascript
world.onVoxelDestroy((entity, x, y, z, voxel, tick) => {
    if (voxel === "minecraft:diamond_block") {
        entity.player.directMessage("你破坏了钻石块!");
    }
});
```

#### <font id="API" /><font id="Event">事件</font>onBlockPlace(<font id="Type">handler: (entity: GamePlayerEntity, x: number, y: number, z: number, voxel: string, voxelId: number, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onBlockPlace}

玩家放置方块时触发。

```javascript
world.onBlockPlace((entity, x, y, z, voxel, voxelId, tick) => {
    console.log(`${entity.player.name} 放置了 ${voxel}`);
});
```

#### <font id="API" /><font id="Event">事件</font>onVoxelContact(<font id="Type">handler: (entity: GamePlayerEntity, voxelId: number, x: number, y: number, z: number, contactType: number, force: number, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onVoxelContact}

玩家移动到新方块时触发。

```javascript
world.onVoxelContact((entity, voxelId, x, y, z, contactType, force, tick) => {
    const name = voxels.name(voxelId);
    if (name === "minecraft:lava") {
        entity.player.directMessage("小心岩浆!");
    }
});
```

## 实体事件

#### <font id="API" /><font id="Event">事件</font>onInteract(<font id="Type">handler: (entity: GamePlayerEntity, target: GameEntity, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onInteract}

玩家右键实体时触发。

```javascript
world.onInteract((entity, target, tick) => {
    console.log(`${entity.player.name} 与 ${target.id} 互动`);
});
```

#### <font id="API" /><font id="Event">事件</font>onEntityDeath(<font id="Type">handler: (entity: GameEntity, killer: GameEntity | null, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onEntityDeath}

实体死亡时触发。

```javascript
world.onEntityDeath((entity, killer, tick) => {
    if (entity.isPlayer() && killer?.isPlayer()) {
        world.say(`${killer.player.name} 击杀了 ${entity.player.name}`);
    }
});
```

#### <font id="API" /><font id="Event">事件</font>onEntityDamage(<font id="Type">handler: (entity: GameEntity, amount: number, source: string, attacker: GameEntity | null, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onEntityDamage}

实体受伤时触发。

| **_参数_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ---------- |
| entity | GameEntity | 受伤的实体 |
| amount | number | 伤害值 |
| source | string | 伤害来源 |
| attacker | GameEntity \| null | 攻击者 |
| tick | number | 事件发生时间 |

```javascript
world.onEntityDamage((entity, amount, source, attacker, tick) => {
    console.log(`${entity.id} 受到 ${amount} 点伤害, 来源: ${source}`);
});
```

## 碰撞事件

#### <font id="API" /><font id="Event">事件</font>onFluidEnter(<font id="Type">handler: (entity: GamePlayerEntity, fluid: string, x: number, y: number, z: number, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onFluidEnter}

玩家进入水/熔岩时触发。

```javascript
world.onFluidEnter((entity, fluid, x, y, z, tick) => {
    console.log(`${entity.player.name} 进入了 ${fluid}`);
});
```

#### <font id="API" /><font id="Event">事件</font>onFluidLeave(<font id="Type">handler: (entity: GamePlayerEntity, fluid: string, x: number, y: number, z: number, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onFluidLeave}

玩家离开水/熔岩时触发。

```javascript
world.onFluidLeave((entity, fluid, x, y, z, tick) => {
    console.log(`${entity.player.name} 离开了 ${fluid}`);
});
```

#### <font id="API" /><font id="Event">事件</font>onEntityContact(<font id="Type">handler: (entityA: GameEntity, entityB: GameEntity, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onEntityContact}

两个实体碰撞时触发。

```javascript
world.onEntityContact((entityA, entityB, tick) => {
    console.log(`${entityA.id} 与 ${entityB.id} 碰撞`);
});
```

#### <font id="API" /><font id="Event">事件</font>onEntitySeparate(<font id="Type">handler: (entityA: GameEntity, entityB: GameEntity, tick: number) => void</font>)<font id="Type">: GameEventHandlerToken</font> {#onEntitySeparate}

两个实体不再碰撞时触发。

```javascript
world.onEntitySeparate((entityA, entityB, tick) => {
    console.log(`${entityA.id} 与 ${entityB.id} 分离`);
});
```
