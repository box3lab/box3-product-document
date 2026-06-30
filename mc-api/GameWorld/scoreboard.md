<script setup>
import '/style.css'
</script>

# 计分板与队伍

## 计分板

#### <font id="API" />addScoreboard(<font id="Type">name: string, criteria?: string</font>)<font id="Type">: void</font> {#addScoreboard}

添加计分板目标 (默认 dummy 标准)。

```javascript
world.addScoreboard("kills");                // 默认 dummy
world.addScoreboard("health", "health");      // 自定义标准
```

#### <font id="API" />removeScoreboard(<font id="Type">name: string</font>)<font id="Type">: void</font> {#removeScoreboard}

移除计分板目标。

```javascript
world.removeScoreboard("kills");
```

#### <font id="API" />setScore(<font id="Type">entityOrName: string | GameEntity, objectiveName: string, value: number</font>)<font id="Type">: void</font> {#setScore}

设置实体/名称的分数。

```javascript
world.setScore(entity.player.name, "kills", 10);
world.setScore(entity, "kills", 5);
```

#### <font id="API" />getScore(<font id="Type">entityOrName: string | GameEntity, objectiveName: string</font>)<font id="Type">: number</font> {#getScore}

获取分数。

```javascript
const score = world.getScore(entity, "kills");
```

#### <font id="API" />showScoreboard(<font id="Type">slot: string, objectiveName: string</font>)<font id="Type">: void</font> {#showScoreboard}

在指定显示位置展示计分板。

| slot | 说明 |
| --- | --- |
| "sidebar" | 侧边栏 |
| "list" | TAB 列表 |
| "belowname" | 名称下方 |

```javascript
world.showScoreboard("sidebar", "kills");
```

#### <font id="API" />hideScoreboard(<font id="Type">slot: string</font>)<font id="Type">: void</font> {#hideScoreboard}

从显示位置隐藏计分板。

```javascript
world.hideScoreboard("sidebar");
```

#### <font id="API" />listScores(<font id="Type">objectiveName: string</font>)<font id="Type">: Array<{ name: string; value: number }></font> {#listScores}

列出计分板上所有玩家的分数。

```javascript
const scores = world.listScores("kills");
scores.forEach(({ name, value }) => {
    console.log(`${name}: ${value}`);
});
```

## Boss 血条

#### <font id="API" />showBossbar(<font id="Type">name: string, text: string, progress: number, color: string</font>)<font id="Type">: void</font> {#showBossbar}

显示或更新 Boss 血条。

| color |
| --- |
| "red" / "blue" / "green" / "yellow" / "purple" / "pink" / "white" |

```javascript
world.showBossbar("boss1", "§c远古巨龙", 0.75, "red");
```

#### <font id="API" />removeBossbar(<font id="Type">name: string</font>)<font id="Type">: void</font> {#removeBossbar}

移除 Boss 血条。

```javascript
world.removeBossbar("boss1");
```

## 队伍

#### <font id="API" />createTeam(<font id="Type">name: string, color: string</font>)<font id="Type">: void</font> {#createTeam}

创建一个队伍。

```javascript
world.createTeam("red", "red");
world.createTeam("blue", "blue");
```

#### <font id="API" />removeTeam(<font id="Type">name: string</font>)<font id="Type">: void</font> {#removeTeam}

删除队伍。

```javascript
world.removeTeam("red");
```

#### <font id="API" />joinTeam(<font id="Type">entityOrName: string | GameEntity, teamName: string</font>)<font id="Type">: void</font> {#joinTeam}

将实体/名称加入队伍。

```javascript
world.joinTeam(entity, "red");
world.joinTeam(entity.player.name, "blue");
```

#### <font id="API" />leaveTeam(<font id="Type">entityOrName: string | GameEntity</font>)<font id="Type">: void</font> {#leaveTeam}

将实体/名称移出队伍。

```javascript
world.leaveTeam(entity);
```

#### <font id="API" />getTeamOf(<font id="Type">entityOrName: string | GameEntity</font>)<font id="Type">: string | null</font> {#getTeamOf}

获取实体/名称所在的队伍名 (不在任何队伍返回 null)。

```javascript
const team = world.getTeamOf(entity);
if (team) {
    console.log(`队伍: ${team}`);
}
```

## 实战示例

### 击杀计数

```javascript
// 初始化计分板
world.addScoreboard("kills");
world.addScoreboard("deaths");
world.showScoreboard("sidebar", "kills");

// 监听击杀
world.onEntityDeath((entity, killer, tick) => {
    if (entity.isPlayer()) {
        // 被杀者死亡数 +1
        const deaths = world.getScore(entity.player.name, "deaths");
        world.setScore(entity.player.name, "deaths", deaths + 1);
    }
    if (killer?.isPlayer()) {
        // 击杀者击杀数 +1
        const kills = world.getScore(killer.player.name, "kills");
        world.setScore(killer.player.name, "kills", kills + 1);
        killer.player.directMessage(`击杀数: ${kills + 1}`);
    }
});
```

### 队伍对战

```javascript
// 创建红蓝两队
world.createTeam("red", "red");
world.createTeam("blue", "blue");

// 玩家加入时将玩家分到人数较少的一方
world.onPlayerJoin((entity, tick) => {
    const redCount = world.listScores("red_players").length;
    const blueCount = world.listScores("blue_players").length;
    const team = redCount <= blueCount ? "red" : "blue";
    world.joinTeam(entity, team);
    entity.player.directMessage(`你加入了${team}队`);
});
```

### Boss 血条

```javascript
// 生成 Boss 并绑定血条
const boss = world.spawnEntity("minecraft:wither_skeleton", new GameVector3(100, 64, 100));
boss.maxHp = 200;
boss.hp = 200;
boss.setNameTag("§4地牢守卫");
boss.addTag("boss");

world.showBossbar("dungeon_boss", "§4地牢守卫", 1.0, "red");

world.onEntityDamage((entity, amount, source, attacker, tick) => {
    if (entity.hasTag("boss")) {
        const progress = entity.hp / entity.maxHp;
        world.showBossbar("dungeon_boss", "§4地牢守卫", progress, "red");
        if (entity.hp <= 0) {
            world.removeBossbar("dungeon_boss");
        }
    }
});
```
