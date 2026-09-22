# 创建你的第一个实体

在上一篇教程中，我们学会了如何监听事件并与玩家互动。现在，让我们来学习游戏开发中最核心的操作之一：在世界中创建和控制物体，也就是“实体” (Entity)。

## 什么是实体？

在地图运行时，任何非地形方块的物体都可以作为实体处理。这包括玩家、生物、掉落物和特效。你可以通过代码动态地创建、修改和销毁它们。

## 使用 `world.createEntity`

创建实体是服务器端的行为，因此我们需要使用服务器核心对象 `world` 的 `createEntity` 方法。这个方法接受一个配置对象作为参数，用于描述你想要创建的实体是什么样的。

### 准备模型

首先，你需要一个模型文件。你可以在编辑器中从资源库添加一个模型（比如一个简单的“箱子”），然后记下它的路径。通常是 `mesh/模型名.vb`。即使你把模型从场景中删掉，只要它还在项目文件列表中，代码就可以引用它。

### 编写代码

让我们来编写一个脚本：当玩家进入游戏时，在他面前创建一个可以点击的箱子。

打开你的服务器脚本 `index.js`，添加以下代码：

```javascript
// index.js

// 监听玩家加入事件
world.onPlayerJoin(({ entity: playerEntity }) => {
  console.log(`${playerEntity.player.name} 加入了游戏。`);

  // 计算箱子应该出现的位置（玩家面前2米处）
  const spawnPosition = playerEntity.position.add(
    playerEntity.player.facingDirection.mul(new GameVector3(2, 2, 2))
  );

  // 1. 创建实体
  const box = world.createEntity({
    mesh: "mesh/box.vb", // 你的模型路径
    position: spawnPosition, // 设置实体位置
    gravity: true, // 受重力影响，会掉到地上
    collides: true, // 开启物理碰撞
  });

  if (box) {
    console.log("箱子创建成功！");
    playerEntity.player.directMessage("一个神秘的箱子出现在你面前！");

    // 让箱子在10秒后自动消失
    setTimeout(() => {
      if (!box.destroyed) {
        // 检查实体是否还存在
        box.destroy();
        console.log("箱子已自动销毁。");
      }
    }, 10000); // 10000毫秒 = 10秒
  } else {
    console.error("箱子创建失败！");
  }
});

// 2. 添加全局点击事件
world.onClick(({ entity: clickedEntity }) => {
  // 判断被点击的是不是我们创建的箱子
  // 这里通过模型路径来简单识别
  if (clickedEntity && clickedEntity.mesh === "mesh/box.vb") {
    console.log("箱子被点击了！");
    clickedEntity.destroy(); // 销毁被点击的箱子
    world.say("箱子被点开了！"); // 向所有玩家广播消息
  }
});
```

## 代码解析

- **`playerEntity.position.add(playerEntity.player.facingDirection.mul(2))`**: 这是一个向量运算。我们获取玩家当前的位置 `position`，然后加上他们朝向 `facingDirection` 的两倍距离，从而计算出玩家面前的位置。
- **`world.createEntity({...})`**: 我们传入了一个配置对象。`mesh` 指定了模型，`position` 指定了位置，`gravity` 和 `collides` 让它表现得像一个真实的物理对象。
- **`setTimeout(() => {...}, 10000)`**: 这是一个标准的 JavaScript 函数，用于延迟执行代码。我们用它来实现“10 秒后自动销毁”的功能。
- **`box.destroyed`**: 在执行延迟操作（如 `setTimeout`）时，实体可能已经被其他方式销毁了（比如被玩家点击）。在操作实体前，最好检查 `isValid` 属性，确保它仍然存在。
- **`box.destroy()`**: 这个方法会立即从游戏中移除该实体。
- **`world.onClick(...)`**: 这是一个全局事件，任何实体被任何玩家点击时都会触发。我们在事件处理函数内部通过 `clickedEntity.mesh` 来判断被点击的是不是我们想要的箱子。这是一个简单的方法，更严谨的方式是给实体一个唯一的 `name` 或 `tag` 来识别。

现在，进入游戏。你会看到一个箱子从天而降落在你面前。你可以试着点击它，它会消失。如果你不去管它，它也会在 10 秒后自动消失。

## 接下来

你已经掌握了动态创建和销毁实体的能力！这是构建动态和交互式游戏世界的基础。接下来，你可以尝试：

- 创建一个会移动的实体（修改它的 `velocity` 属性）。
- 点击实体时，不是销毁它，而是改变它的颜色（`entity.player.color`）或大小（`entity.player.scale`）。
