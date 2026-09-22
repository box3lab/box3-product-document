# 客户端与服务器通信

我们已经分别学习了如何在服务器上创建实体和在客户端上创建 UI。但要制作出真正有趣的游戏，就必须让它们能够对话。这就是客户端与服务器通信（或称“远程通信”）的用武之地。

## 核心概念：`remoteChannel`

客户端和服务器之间的沟通桥梁是 `remoteChannel` 对象。它在客户端和服务器端都可以访问，但使用的方法略有不同。通信的核心思想是：将你要发送的“事件名称”和“数据”打包成一个对象，然后发送出去。

- **客户端 -> 服务器**: 使用 `remoteChannel.sendServerEvent(data)`
- **服务器 -> 客户端**: 使用 `remoteChannel.sendClientEvent(player, data)`
- **客户端接收**: 使用 `remoteChannel.onClientEvent(handler)`
- **服务器接收**: 使用 `remoteChannel.onServerEvent(handler)`

## 实践：一个“向服务器领奖”的按钮

我们的目标是创建一个完整的双向通信流程：

1.  **客户端**: 创建一个 UI 按钮，上面写着“领取每日奖励”。
2.  **客户端**: 玩家点击按钮后，向服务器发送一个包含事件名 `eventName: 'request_daily_reward'` 的数据包。
3.  **服务器**: 监听到事件，检查 `eventName`，执行发奖逻辑，然后向该玩家发回一个包含 `eventName: 'reward_granted'` 的确认消息。
4.  **客户端**: 监听到服务器的确认消息，检查 `eventName`，更新 UI，告诉玩家“领取成功！”

### 客户端代码 (`clientIndex.js`)

```javascript
// clientIndex.js

// 1. 创建一个按钮
const rewardButton = UiBox.create();
rewardButton.name = "RewardButton";
rewardButton.backgroundColor.copy(Vec3.create({ r: 40, g: 167, b: 69 }));
rewardButton.anchor.copy(Vec2.create({ x: 0.5, y: 1 }));
rewardButton.position.offset.copy(Vec2.create({ x: 0, y: -20 }));
rewardButton.size.offset.copy(Vec2.create({ x: 200, y: 50 }));

const buttonText = UiText.create();
buttonText.textContent = "领取每日奖励";
buttonText.textFontSize = 20;
buttonText.textColor.copy(Vec3.create({ r: 255, g: 255, b: 255 }));
buttonText.parent = rewardButton;
rewardButton.parent = ui;

// 2. 让按钮可以被点击
rewardButton.pointerEventBehavior = 2; // 2 = CLICK
rewardButton.events.on("pointerdown", () => {
  console.log("客户端：向服务器发送领奖请求...");
  buttonText.textContent = "正在领取...";
  // 3. 发送消息到服务器
  remoteChannel.sendServerEvent({
    eventName: "request_daily_reward",
    from: "client",
  });
});

// 4. 监听服务器的响应
remoteChannel.onClientEvent((event) => {
  const data = event.args;
  if (data.eventName === "reward_granted") {
    console.log(`客户端：收到服务器的响应: ${data.message}`);
    buttonText.textContent = "领取成功！";
    rewardButton.backgroundColor.copy(Vec3.create({ r: 108, g: 117, b: 125 })); // 变成灰色
  }
});
```

### 服务器代码 (`index.js`)

```javascript
// index.js

// 1. 监听客户端的请求
remoteChannel.onServerEvent((event) => {
  const playerEntity = event.entity;
  const data = event.args;

  // 检查事件名，确保我们只处理领奖请求
  if (data.eventName === "request_daily_reward") {
    if (!playerEntity || !playerEntity.isPlayer) {
      return;
    }

    console.log(`服务器：收到来自 ${playerEntity.player.name} 的领奖请求。`);

    // 2. 在这里可以添加你的游戏逻辑
    // ... (此处省略)

    console.log(`服务器：向 ${playerEntity.player.name} 发放奖励。`);

    // 3. 向发送请求的那个玩家发回确认消息
    remoteChannel.sendClientEvent(playerEntity, {
      eventName: "reward_granted",
      message: "奖励已到账！",
    });
  }
});
```

## 流程解析

1.  **客户端发送**: 在 `onPointerDown()` 函数中，我们调用 `remoteChannel.sendServerEvent()`。`remoteChannel.sendServerEvent({...})`。我们将事件名 `request_daily_reward` 作为数据对象的一个属性发送出去。
2.  **服务器接收**: 服务器的 `remoteChannel.onServerEvent(...)` 监听器被触发。它会收到**所有**来自客户端的事件，因此我们必须在函数内部检查 `event.args.eventName` 来判断这是不是我们想处理的事件。`event.entity` 告诉我们是哪个玩家发的。
3.  **服务器响应**: 服务器调用 `remoteChannel.sendClientEvent(player, {...})`。第一个参数 `playerEntity.player` 确保了消息只发给目标玩家。我们同样将事件名 `reward_granted` 作为数据的一部分发回。
4.  **客户端接收**: 客户端的 `remoteChannel.onClientEvent(...)` 监听器被触发。它同样会收到所有来自服务器的事件，所以我们也需要检查 `event.args.eventName` 来确认这是我们等待的响应，然后更新 UI。

现在，启动游戏，功能和之前一样，但底层的 API 调用已经是完全正确的了。

## 总结

恭喜你！你已经掌握了地图中客户端与服务器双向通信的流程。这种“将事件名作为数据一部分”的模式让你可以在统一的 `on...Event` 监听器中处理多种通信，是制作网络游戏功能的基础。
