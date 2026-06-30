<script setup>
import '/style.css'
</script>

# 音乐音效

## 属性

#### <font id="API" />ambientSound<font id="Type">: string</font> {#ambientSound}

环境音效路径 (每 200 tick 在世界出生点自动播放, 0.3 音量)。

```javascript
world.ambientSound = "minecraft:ambient.cave";
```

#### <font id="API" />playerJoinSound<font id="Type">: string</font> {#playerJoinSound}

玩家加入音效路径 (玩家加入时自动播放)。

```javascript
world.playerJoinSound = "minecraft:block.note_block.pling";
```

#### <font id="API" />playerLeaveSound<font id="Type">: string</font> {#playerLeaveSound}

玩家离开音效路径 (玩家离开时自动播放)。

```javascript
world.playerLeaveSound = "minecraft:block.note_block.bass";
```

#### <font id="API" />placeVoxelSound<font id="Type">: string</font> {#placeVoxelSound}

方块放置音效路径 (放置方块时自动播放)。

```javascript
world.placeVoxelSound = "minecraft:block.stone.place";
```

#### <font id="API" />breakVoxelSound<font id="Type">: string</font> {#breakVoxelSound}

方块破坏音效路径 (破坏方块时自动播放)。

```javascript
world.breakVoxelSound = "minecraft:block.stone.break";
```

## 方法

#### <font id="API" />say(<font id="Type">message: string</font>)<font id="Type">: void</font> {#say}

向全服广播消息。

```javascript
world.say("欢迎来到服务器!");
```

#### <font id="API" />playSound(<font id="Type">path: string, x: number, y: number, z: number, volume: number, pitch: number</font>)<font id="Type">: void</font> {#playSound}

在指定位置向全服播放声音。也支持 `playSound(path, pos, volume, pitch)`。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| path | 是 | | string | 声音 ID (如 "minecraft:block.note_block.pling") |
| x/y/z | 是 | | number | 声源坐标 |
| volume | 是 | | number | 音量 (0-1) |
| pitch | 是 | | number | 音高 (0.5-2) |

```javascript
world.playSound("minecraft:entity.lightning_bolt.thunder", 100, 64, 100, 1.0, 1.0);
```

#### <font id="API" />sound(<font id="Type">config: string | { path: string; position?: GameVector3; volume?: number; pitch?: number }</font>)<font id="Type">: void</font> {#sound}

播放音效 (简写或完整配置)。

```javascript
// 简写
world.sound("minecraft:block.note_block.pling");

// 完整配置
world.sound({
    path: "minecraft:block.note_block.pling",
    position: new GameVector3(64, 10, 64),
    volume: 1.0,
    pitch: 1.5,
});
```
