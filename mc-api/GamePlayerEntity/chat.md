<script setup>
import '/style.css'
</script>

# 对话与消息

## 方法

#### <font id="API" />directMessage(<font id="Type">msg: string</font>)<font id="Type">: void</font> {#directMessage}

发送仅该玩家可见的聊天消息。

```javascript
world.onPlayerJoin(({ entity }) => {
    entity.player.directMessage(`${entity.player.name}, 你好。`);
});
```

#### <font id="API" />actionBar(<font id="Type">message: string</font>)<font id="Type">: void</font> {#actionBar}

在动作栏 (快捷栏上方) 显示文字。

```javascript
entity.player.actionBar("§a当前状态: 战斗中");
```

#### <font id="API" />title(<font id="Type">title: string, subtitle: string, fadeIn?: number, stay?: number, fadeOut?: number</font>)<font id="Type">: void</font> {#title}

显示屏幕标题。

**输入参数**

| **_参数_** | **_必填_** | **_默认值_** | **_类型_** | **_说明_** |
| ---------- | ---------- | ------------ | ---------- | ---------- |
| title | 是 | | string | 主标题 |
| subtitle | 是 | | string | 副标题 |
| fadeIn | 否 | 10 | number | 淡入 tick |
| stay | 否 | 70 | number | 停留 tick |
| fadeOut | 否 | 20 | number | 淡出 tick |

```javascript
entity.player.title("Boss 击败!", "获得史诗战利品", 10, 70, 20);
```

#### <font id="API" />dialog(<font id="Type">config: { content?: string; options?: string[] }</font>)<font id="Type">: { index: number; value: string }</font> {#dialog}

弹出对话面板 (简化版, MC 目前仅发送文本)。

```javascript
const result = entity.player.dialog({
    content: "选择一个选项",
    options: ["是", "否"]
});
console.log(`选择了: ${result.index} - ${result.value}`);
```

#### <font id="API" />setPlayerListName(<font id="Type">name: string</font>)<font id="Type">: void</font> {#setPlayerListName}

设置玩家在 TAB 列表中的显示名称 (支持颜色代码)。

```javascript
entity.player.setPlayerListName("§6[VIP] §f吉吉喵");
```

## 事件

#### <font id="API" /><font id="Event">事件</font>onChat(<font id="Type">handler: (entity: GamePlayerEntity, message: string, tick: number) => boolean | void</font>)<font id="Type">: GameEventHandlerToken</font> {#onChat}

为该玩家注册聊天处理器 (覆盖全局 onChat)。

```javascript
entity.player.onChat((entity, message, tick) => {
    if (message === "grow") {
        entity.player.scale *= 2;
        return true; // 阻止消息广播
    }
});
```
