# 如何阅读 API 手册

API（Application Programming Interface，应用程序编程接口）是不同软件应用程序之间的通信桥梁。

在本章节中，将会把学到的 JavaScript 语言与游戏 API 结合起来，完成地图功能开发。

在正式启程之前，掌握如何有效阅读并理解 API 手册将是不可或缺的一课，它将为你的游戏开发之路奠定坚实的基础。

API 类型说明可在 Creator 工程生成的类型定义文件中查看。

:::info
手册运用了关于`TypeScript`语言的知识，我们将在下一章节介绍它，这属于进阶章节。

你可以学完`TypeScript`语言章节后，再回来看这里。会有不同的收获。

手册中 `declare`关键字，表示该变量或类是编译时定义的，而不是运行时定义的。
:::

我们接下来举个简单的例子，带你看懂 API 手册。

## 🌏 游戏世界

从“游戏世界”类型说明中，我们可以得到以下信息：

```typescript
declare const world: GameWorld;
declare class GameWorld {
  //...
}
```

1. **`declare const world: GameWorld;`**：

   - 这行代码声明了一个名为`world`的常量，其类型为`GameWorld`。这意味着在脚本中已经存在了一个`GameWorld`类型的`world`常量。

2. **`declare class GameWorld { ... }`**：
   - 这行声明了一个名为`GameWorld`的类。

我们可以通过访问`world`常量来访问`GameWorld`。

## 属性

从 `projectName` 属性说明中，我们可以得到以下信息：

![](/QQ20240925-143355.png)

这段代码是一个类型声明代码。它声明了一个名为`projectName`的`只读`属性，其类型为`string`。

这意味着`projectName`是一个返回的数据是一个字符串。

所以，我们通过`world.projectName`可以获取当前地图的名称。

```javascript
console.log(world.projectName);
```

![](/QQ20240925-151110.png)

## 方法

从 `onPlayerJoin` 事件说明中，我们可以得到以下信息：

![](/QQ20240925-172033.png)

这段代码是一个函数声明的示例，它定义了一个名为`onPlayerJoin`的函数，该函数接受一个参数，并返回一个`GameEventHandlerToken`类型的值。下面是对这个声明的详细解释：

- `handler:(event:GameEntityEvent)=>void`：这是`onPlayerJoin`函数的唯一参数，名为`handler`。它是一个函数类型，意味着你需要传递一个函数给`onPlayerJoin`。这个`handler`函数接受一个参数`event`，其类型为`GameEntityEvent`，并且没有返回值（返回类型为`void`）。
  - `GameEntityEvent`：这是一个自定义类型，用于表示与游戏实体相关的事件。这个类型包含了事件发生时所需的所有信息。
  - `void`：表示`handler`函数不返回任何值。
- `GameEventHandlerToken`：`onPlayerJoin`函数返回一个`GameEventHandlerToken`类型的值。这个类型是一个用于标识或管理事件处理程序的令牌（token）。在事件驱动的编程中，这种令牌通常用于取消或管理事件监听器。它允许你之后来移除或禁用这个特定的`handler`函数。

## 接口

我们点击`GameEntityEvent`，可以得到以下信息：

![](/QQ20240925-173126.png)

这段代码描述了一个名为`GameEntityEvent`的接口（Interface），该接口用于定义一个特定类型的事件，这个事件在游戏中创建或销毁实体时被触发。

具体来说，`GameEntityEvent`接口定义了两个属性：

1. **entity**（类型：`GameEntity`）：这个属性表示了被创建或销毁的实体。`GameEntity`是玩家实体本身一个类，它定义了游戏玩家实体的属性和方法。

2. **tick**（类型：`number`）：这个属性表示事件发生的时间。在游戏开发中，`tick`通常指的是游戏循环中的某一时刻或帧数，它允许创作者知道事件是在游戏的哪个阶段发生的。这个信息对于调试、动画同步、时间管理等方面都非常有用。

`GameEntity` 与玩家实体的具体成员可在工程类型定义中查看。

所以，我们通过`world.onPlayerJoin`设置当玩家加入时，执行的操作。

```javascript
world.onPlayerJoin(({ entity }) => {
  console.log(`你好，${entity.player.name}`);
});
```

![](/QQ20240925-173602.png)

## 枚举

在玩家实体的类型说明中，`cameraMode` 属性包含以下信息：

![](/QQ20240925-183504.png)

这段代码的含义是：

- `cameraMode`：这是一个属性名，用于引用或存储与相机模式相关的信息。
- `GameCameraMode`：这是一个枚举（Enum），它定义了游戏中相机可以处于的不同模式。

我们点击`GameCameraMode`，可以得到以下信息：

![](/QQ20240925-183810.png)

这段代码定义了一个名为`GameCameraMode`的枚举，它用于表示游戏中玩家的相机视角模式。

以下是`GameCameraMode`枚举的详细解释：

- **FIXED**：这个成员表示第三人称固定视角模式。在这种模式下，相机位于一个固定的位置，并且不随玩家的移动而移动，为玩家提供了一个从外部观察游戏世界的视角。

- **FOLLOW**：这个成员表示第三人称跟随视角模式，并且被标记为`默认模式`。在这种模式下，相机会跟随玩家的移动，但始终保持在玩家后面的一定距离和角度，提供类似电影摄影机的效果。

- **FPS**：这个成员表示第一人称视角模式。在这种模式下，相机视角与玩家的视角完全一致，就像玩家直接通过角色的眼睛在看世界一样，这是许多射击游戏和第一人称冒险游戏所采用的视角。

- **RELATIVE**：这个成员表示相对于玩家位置的第三人称视角模式。在这种模式下，相机的位置可能会根据玩家的位置进行某种形式的动态调整。它用于在保持第三人称视角的同时，根据玩家的移动或朝向来调整相机的位置或角度。

所以，我们通过`entity.player.cameraMode`设置玩家摄像机视角 。

```javascript
world.onPlayerJoin(({ entity }) => {
  // 当玩家加入地图时候，设置玩家摄像机为第一人称视角
  entity.player.cameraMode = GameCameraMode.FPS;
});
```
