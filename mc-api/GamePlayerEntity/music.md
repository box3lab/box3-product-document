<script setup>
import '/style.css'
</script>

# 音乐音效

## 方法

#### <font id="API" />playSound(<font id="Type">path: string, volume: number, pitch: number</font>)<font id="Type">: void</font> {#playSound}

向该玩家播放声音。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| path | 是 | | string | 声音 ID (如 "minecraft:block.note_block.pling") |
| volume | 是 | | number | 音量 (0-1) |
| pitch | 是 | | number | 音高 (0.5-2) |

```javascript
entity.player.playSound("minecraft:block.note_block.pling", 1.0, 1.0);
entity.player.playSound("minecraft:entity.experience_orb.pickup", 0.5, 1.5);
```
