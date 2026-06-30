<script setup>
import '/style.css'
</script>

# 摄像机视角

## 属性

#### <font id="API" />cameraMode<font id="Type">: string</font> {#cameraMode}

视角模式。

| 值 | 说明 |
| --- | --- |
| "FPS" | 第一人称视角 (默认) |
| "FOLLOW" | 第三人称跟随视角 |

```javascript
entity.player.cameraMode = GameCameraMode.FPS;
entity.player.cameraMode = GameCameraMode.FOLLOW;
```

#### <font id="API" />cameraEntity<font id="Type">: GameEntity | null</font> {#cameraEntity}

相机跟随的实体 (在 FOLLOW 模式下)。

```javascript
entity.player.cameraEntity = targetEntity; // 相机跟随目标
entity.player.cameraEntity = null;         // 恢复跟随自身
```

#### <font id="API" />cameraPitch<font id="Type">: number</font> {#cameraPitch}

相机俯仰角 (垂直旋转弧度)。

```javascript
entity.player.cameraPitch = Math.PI / 4; // 向下看 45°
```

#### <font id="API" />cameraYaw<font id="Type">: number</font> {#cameraYaw}

相机偏航角 (水平旋转弧度)。

```javascript
entity.player.cameraYaw = Math.PI; // 转向 180°
```

#### <font id="API" /><font id="ReadOnly">只读</font>facingDirection<font id="Type">: GameVector3</font> {#facingDirection}

玩家面朝方向 (单位向量)。

```javascript
const dir = entity.player.facingDirection;
console.log(`朝向: ${dir}`);
```

#### <font id="API" /><font id="ReadOnly">只读</font>cameraTarget<font id="Type">: GameVector3</font> {#cameraTarget}

玩家视线前方 5 格处的目标点。

```javascript
const target = entity.player.cameraTarget;
```

## 方法

#### <font id="API" />lookAt(<font id="Type">x: number, y: number, z: number</font>)<font id="Type">: void</font> {#lookAt}

让玩家看向指定坐标。也支持 `lookAt(pos: GameVector3)`。

```javascript
entity.player.lookAt(100, 64, 100);
entity.player.lookAt(new GameVector3(100, 64, 100));
```
