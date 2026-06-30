<script setup>
import '/style.css'
</script>

# 移动

## 属性

#### <font id="API" />walkSpeed<font id="Type">: number</font> {#walkSpeed}

行走速度 (基础值)。

```javascript
entity.player.walkSpeed = 0.3;
```

#### <font id="API" />runSpeed<font id="Type">: number</font> {#runSpeed}

疾跑速度 (≈ walkSpeed × 1.3)。

```javascript
entity.player.runSpeed = 0.4;
```

#### <font id="API" />jumpPower<font id="Type">: number</font> {#jumpPower}

跳跃力度。

```javascript
entity.player.jumpPower = 0.5;
```

#### <font id="API" /><font id="ReadOnly">只读</font>moveState<font id="Type">: string</font> {#moveState}

当前移动状态。

| 值 | 说明 |
| --- | --- |
| "GROUND" | 在地上 |
| "FLYING" | 飞行中 |
| "SWIM" | 游泳中 |
| "FALL" | 下落中 |
| "JUMP" | 跳跃中 |

```javascript
if (entity.player.moveState === GamePlayerMoveState.FLYING) {
    console.log("玩家正在飞行");
}
```

#### <font id="API" /><font id="ReadOnly">只读</font>walkState<font id="Type">: string</font> {#walkState}

当前行走状态。

| 值 | 说明 |
| --- | --- |
| "NONE" | 静止 |
| "CROUCH" | 潜行 |
| "WALK" | 步行 |
| "RUN" | 奔跑 |

```javascript
if (entity.player.walkState === GamePlayerWalkState.RUN) {
    console.log("玩家正在奔跑");
}
```

#### <font id="API" />enableJump<font id="Type">: boolean</font> {#enableJump}

是否允许跳跃 (默认 true, false 时清除跳跃力)。

```javascript
entity.player.enableJump = false; // 禁止跳跃
```

#### <font id="API" />crouchSpeed<font id="Type">: number</font> {#crouchSpeed}

潜行速度 (默认 0.0)。

```javascript
entity.player.crouchSpeed = 0.1;
```

#### <font id="API" />swimSpeed<font id="Type">: number</font> {#swimSpeed}

游泳速度 (映射到 WATER_MOVEMENT_EFFICIENCY 属性)。

```javascript
entity.player.swimSpeed = 0.5;
```

#### <font id="API" />canFly<font id="Type">: boolean</font> {#canFly}

是否允许飞行。

```javascript
entity.player.canFly = true;
```

#### <font id="API" />flying<font id="Type">: boolean</font> {#flying}

是否正在飞行。

```javascript
entity.player.flying = true; // 开始飞行
```

#### <font id="API" />flySpeed<font id="Type">: number</font> {#flySpeed}

飞行速度。

```javascript
entity.player.flySpeed = 2.0;
```

#### <font id="API" />collision<font id="Type">: boolean</font> {#collision}

碰撞开关 (通过队伍碰撞规则实现)。

```javascript
entity.player.collision = false; // 关闭碰撞
```

#### <font id="API" /><font id="ReadOnly">只读</font>spectator<font id="Type">: boolean</font> {#spectator}

是否为观察者模式。

```javascript
if (entity.player.spectator) {
    console.log("玩家是观察者");
}
```

#### <font id="API" />disableFly<font id="Type">: boolean</font> {#disableFly}

是否禁用飞行 (不允许且自动关闭飞行)。

```javascript
entity.player.disableFly = true; // 强制禁止飞行
```
