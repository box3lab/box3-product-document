# 异步 JavaScript

JavaScript 本质上是单线程的，这意味着它一次只能执行一个任务。然而，在许多情况下，我们需要处理需要一些时间才能完成的操作，例如从服务器获取数据或等待玩家输入。如果这些操作是同步的（阻塞的），它们会冻结整个程序，直到完成为止。

异步 JavaScript 允许我们在等待这些长时间运行的操作完成时，继续执行其他代码。

## Promise

Promise 是处理异步操作的一种现代方式。一个 Promise 对象代表一个尚未完成但最终会完成的操作。Promise 可以处于以下三种状态之一：

- **Pending（进行中）**：初始状态，既不是成功，也不是失败。
- **Fulfilled（已成功）**：意味着操作成功完成。
- **Rejected（已失败）**：意味着操作失败。

### 使用 Promise

在游戏 API 中，许多函数会返回 Promise。你可以使用 `.then()` 方法来处理 Promise 成功（Fulfilled）的情况，并使用 `.catch()` 方法来处理失败（Rejected）的情况。

```javascript
// 这是一个返回 Promise 的示例函数（模拟 API 调用）
function fetchData() {
  return new Promise((resolve, reject) => {
    // 模拟一个需要 2 秒才能完成的网络请求
    setTimeout(() => {
      let success = true; // 切换这个值来测试成功和失败
      if (success) {
        resolve("数据获取成功！"); // 操作成功时调用 resolve
      } else {
        reject("无法获取数据。"); // 操作失败时调用 reject
      }
    }, 2000);
  });
}

console.log("开始获取数据...");

fetchData()
  .then((message) => {
    // 当 Promise 成功时，这里的代码会执行
    console.log("成功: " + message);
  })
  .catch((error) => {
    // 当 Promise 失败时，这里的代码会执行
    console.log("错误: " + error);
  });

console.log("代码继续执行，不会被阻塞。");
```

### `async/await`

`async/await` 是建立在 Promise 之上的语法糖，它使异步代码看起来和读起来更像同步代码。

- `async` 关键字用于声明一个异步函数。
- `await` 关键字只能在 `async` 函数中使用，它会暂停函数的执行，直到 Promise 被解决（Fulfilled 或 Rejected）。

```javascript
async function processData() {
  try {
    console.log("开始获取数据 (async/await)...");
    let result = await fetchData(); // 等待 Promise 完成
    console.log("结果: " + result);
  } catch (error) {
    console.log("捕获到错误: " + error);
  }
}

processData();
```

理解异步编程对于创建响应迅速且功能完整的地图脚本至关重要。
