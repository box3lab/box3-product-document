<script setup>
import '/style.css'
</script>

# 世界状态

## 属性

#### <font id="API" />projectName()<font id="Type">: string</font> {#projectName}

项目名称 (服务器 MOTD)。

```javascript
console.log(world.projectName());
```

#### <font id="API" />serverId<font id="Type">: string</font> {#serverId}

当前服务器 ID (可读写)。

```javascript
console.log(world.serverId);
```

#### <font id="API" />currentTick()<font id="Type">: number</font> {#currentTick}

当前服务端 tick 计数。

```javascript
console.log(world.currentTick());
```

#### <font id="API" />time<font id="Type">: number</font> {#time}

当前游戏内时间 (tick, 0-24000)。

| 值 | 对应时刻 |
| --- | --- |
| 0 | 黎明 |
| 6000 | 正午 |
| 12000 | 黄昏 |
| 18000 | 午夜 |

```javascript
world.time = 6000; // 设置为正午
```

#### <font id="API" />timeScale<font id="Type">: number</font> {#timeScale}

时间流速 (1=正常, 0=停止)。

```javascript
world.timeScale = 0; // 冻结时间
```

#### <font id="API" />difficulty<font id="Type">: string</font> {#difficulty}

当前难度。

| 值 |
| --- |
| "peaceful" |
| "easy" |
| "normal" |
| "hard" |

```javascript
world.difficulty = "hard";
```

#### <font id="API" /><font id="ReadOnly">只读</font>spawnPoint<font id="Type">: GameVector3</font> {#spawnPoint}

世界出生点坐标。

```javascript
console.log(world.spawnPoint);
```

#### <font id="API" />rainDensity<font id="Type">: number</font> {#rainDensity}

降雨强度 (0-1)。

```javascript
world.rainDensity = 0.8; // 大雨
```

#### <font id="API" />thunderDensity<font id="Type">: number</font> {#thunderDensity}

雷暴强度 (0-1)。

```javascript
world.thunderDensity = 0.5;
```

## 方法

#### <font id="API" />setTime(<font id="Type">time: number</font>)<font id="Type">: void</font> {#setTime}

设置游戏内时间 (tick, 0-24000)。

```javascript
world.setTime(0);     // 黎明
world.setTime(18000); // 午夜
```

#### <font id="API" />clearWeather()<font id="Type">: void</font> {#clearWeather}

清除天气 (晴天)。

```javascript
world.clearWeather();
```

#### <font id="API" />setWorldSpawn(<font id="Type">pos: GameVector3</font>)<font id="Type">: void</font> {#setWorldSpawn}

设置世界出生点。

```javascript
world.setWorldSpawn(new GameVector3(100, 64, 100));
```

#### <font id="API" />getGameRule(<font id="Type">name: string</font>)<font id="Type">: boolean | null</font> {#getGameRule}

读取游戏规则。

```javascript
const keepInv = world.getGameRule("keepInventory");
```

#### <font id="API" />setGameRule(<font id="Type">name: string, value: boolean | string</font>)<font id="Type">: void</font> {#setGameRule}

设置游戏规则。支持的规则:

| 规则名 | 说明 |
| --- | --- |
| doDaylightCycle | 日夜循环 |
| doWeatherCycle | 天气循环 |
| keepInventory | 死亡不掉落 |
| doMobSpawning | 生物生成 |
| doFireTick | 火焰蔓延 |
| mobGriefing | 生物破坏 |
| doImmediateRespawn | 立即重生 |

```javascript
world.setGameRule("keepInventory", true);
world.setGameRule("doDaylightCycle", false);
```

#### <font id="API" />runCommand(<font id="Type">cmd: string</font>)<font id="Type">: void</font> {#runCommand}

以服务端身份执行命令。

```javascript
world.runCommand("say 服务器重启中...");
world.runCommand("time set day");
```

#### <font id="API" />sendMessage(<font id="Type">target: string, data: unknown</font>)<font id="Type">: void</font> {#sendMessage}

向另一个项目发送消息。

```javascript
world.sendMessage("other-project", { type: "greeting", text: "你好" });
```

## 定时器

#### <font id="API" />setTimeout(<font id="Type">handler: () => void, ticks: number</font>)<font id="Type">: number</font> {#setTimeout}

设置一次性延时回调。返回定时器 ID。

```javascript
const id = world.setTimeout(() => {
    world.say("5 秒后执行");
}, 100); // 100 ticks = 5 秒
```

#### <font id="API" />setInterval(<font id="Type">handler: () => void, ticks: number</font>)<font id="Type">: number</font> {#setInterval}

设置循环定时回调。返回定时器 ID。

```javascript
const id = world.setInterval(() => {
    console.log("每秒执行");
}, 20); // 20 ticks = 1 秒
```

#### <font id="API" />clearTimeout(<font id="Type">id: number</font>)<font id="Type">: void</font> {#clearTimeout}

取消 setTimeout。

```javascript
world.clearTimeout(id);
```

#### <font id="API" />clearInterval(<font id="Type">id: number</font>)<font id="Type">: void</font> {#clearInterval}

取消 setInterval。

```javascript
world.clearInterval(id);
```

## 实战示例

### 日夜循环

```javascript
// 冻结时间在正午, 用于建造模式
world.timeScale = 0;
world.setTime(6000);
world.setGameRule("doDaylightCycle", false);
world.clearWeather();
```

### 倒计时竞技场

```javascript
// 30 秒倒计时后开始游戏
let countdown = 30;
world.say(`游戏将在 ${countdown} 秒后开始!`);

const timerId = world.setInterval(() => {
    countdown--;
    if (countdown <= 0) {
        world.clearInterval(timerId);
        world.say("游戏开始!");
        world.difficulty = "hard";
        world.setBorderDamage(1.0);
    } else if (countdown <= 5) {
        world.say(`§c${countdown}...`);
    } else {
        world.say(`${countdown}...`);
    }
}, 20); // 每秒一次 (20 ticks)
```

### 跨项目通信

```javascript
// 发送跨项目消息
world.sendMessage("lobby-server", {
    type: "match_end",
    winner: entity.player.name,
    score: world.getScore(entity, "kills"),
    timestamp: world.currentTick(),
});

// 接收跨项目消息
world.onMessage((sender, data) => {
    if (data.type === "match_end") {
        console.log(`来自 ${sender}: ${data.winner} 获胜, 击杀 ${data.score}`);
    }
});
```
