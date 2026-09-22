# Hello World - 代码篇

体验如何在控制台打印一个“Hello World”，并使用游戏 API 实现一个小案例，让玩家在进入地图时接收到欢迎信息。

学习 JavaScript 语言，具体的内容请参考 [JavaScript 语言基础](/javascriptEntry/01-getting-started/01-what-is-javascript)。

#### 1. 进入代码编辑器

在 Arena 地图编辑器中，寻找工具区的“代码”按钮，点击以进入代码编辑界面。

![](/QQ20240913-152031.png)

#### 2. 编写第一行代码

在服务端脚本的“index.js”文件中，编写以下代码以在控制台输出"Hello World"。

```js
console.log("Hello World");
```

运行此代码后，你将在控制台看到"Hello World"的输出。

#### 3. 运行地图

点击右上角的“运行”按钮，并开启左侧的调试模式（小虫子图标），以在控制台查看输出。

![](/QQ20240913-152456.png)

![](/QQ20240918-131047.png)

#### 4. 使用游戏 API 向玩家发送信息

接下来，我们将利用游戏 API 实现在玩家加入地图时发送欢迎信息的功能。

在`index.js`文件中，添加以下代码段以在玩家加入游戏时发送一条欢迎私信：

```js{3-5}
console.log("Hello World");

world.onPlayerJoin(({entity}) => {
    entity.player.directMessage(`你好，${entity.player.name}，欢迎来到地图！`);
});
```

这段代码将监听玩家加入事件，并使用`directMessage`方法向每位新加入的玩家发送一条包含其用户昵称的欢迎私信。

> **world.onPlayerJoin**：当玩家加入地图时触发。
>
> **entity.player.directMessage**：向玩家发送一条消息。

#### 5. 测试效果

![](/QQ20240918-130943.png)

重新运行地图，你将在游戏内收到包含用户昵称的个性化欢迎私信。

这章中，我们不仅学会了如何使用 JavaScript 在控制台输出“Hello World”，还掌握了如何使用游戏 API 增强地图的交互性。
