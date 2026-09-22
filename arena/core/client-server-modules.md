# 客户端与服务端脚本架构

在 Arena 地图中进行游戏开发时，你需要与两种不同的脚本环境进行交互：**客户端（Client）**和**服务端（Server）**。这两种环境使用不同的 JavaScript 模块系统，理解它们的差异对于编写高效、无错的代码至关重要。

- **客户端**：运行在玩家的设备上，处理与玩家直接相关的逻辑，如 UI、输入和图形渲染。它使用 **ES Modules (MJS)**。
- **服务端**：运行在服务器上，处理核心游戏逻辑，如玩家数据、物理计算和游戏规则。它使用 **CommonJS (CJS)**。

## 客户端：ES Modules (MJS)

ES Modules (ESM) 是 JavaScript 的官方标准模块系统。它使用 `import` 和 `export` 关键字。

### 核心语法

**1. 导出 (Exporting)**

你可以导出函数、对象或基本类型。主要有两种导出方式：命名导出和默认导出。

- **命名导出 (Named Exports)**：一个文件可以有多个命名导出。

  ```javascript
  // utils.mjs
  export const PI = 3.14;
  export function greet(name) {
    return `Hello, ${name}`;
  }
  ```

- **默认导出 (Default Export)**：一个文件只能有一个默认导出。

  ```javascript
  // player.mjs
  export default class Player {
    constructor(name) {
      this.name = name;
    }
  }
  ```

**2. 导入 (Importing)**

- **导入命名导出**：使用花括号 `{}` 来导入特定的命名导出。

  ```javascript
  // main.mjs
  import { PI, greet } from "./utils.mjs";

  console.log(PI); // 3.14
  console.log(greet("Alice")); // Hello, Alice
  ```

- **导入默认导出**：直接为导入的模块指定一个名称。

  ```javascript
  // main.mjs
  import MyPlayer from "./player.mjs";

  const player1 = new MyPlayer("Bob");
  ```

### MJS 的特点

- **静态加载**：`import` 和 `export` 必须在代码的顶层。你不能在 `if` 语句或函数中动态地导入模块。
- **异步执行**：模块是异步加载的，这在需要加载大量脚本的客户端环境中非常高效。

## 服务端：CommonJS (CJS)

CommonJS 是 Node.js 环境中传统的模块系统。它使用 `require()` 和 `module.exports`。

### 核心语法

**1. 导出 (Exporting)**

通过给 `module.exports` 对象赋值来导出模块。

```javascript
// utils.cjs
const PI = 3.14;

function greet(name) {
  return `Hello, ${name}`;
}

// 导出一个包含多个成员的对象
module.exports = {
  PI: PI,
  greet: greet,
};
```

你也可以直接导出一个函数或类：

```javascript
// player.cjs
class Player {
  constructor(name) {
    this.name = name;
  }
}

module.exports = Player;
```

**2. 导入 (Importing)**

使用 `require()` 函数来导入模块。

```javascript
// main.cjs
const utils = require("./utils.cjs");
const Player = require("./player.cjs");

console.log(utils.PI); // 3.14
console.log(utils.greet("Alice")); // Hello, Alice

const player1 = new Player("Bob");
```

### CJS 的特点

- **动态加载**：你可以在代码的任何地方调用 `require()`，例如在函数或条件语句内部。
- **同步执行**：模块是同步加载的。当 `require()` 被调用时，程序会暂停执行，直到模块被加载和解析完毕。

## 总结

| 特性         | ES Modules (MJS) - 客户端   | CommonJS (CJS) - 服务端      |
| :----------- | :-------------------------- | :--------------------------- |
| **导入**     | `import ... from '...'`     | `const ... = require('...')` |
| **导出**     | `export` / `export default` | `module.exports = ...`       |
| **加载方式** | 异步                        | 同步                         |
| **环境**     | 浏览器 / 现代 JS            | Node.js / 传统服务端         |

在地图开发时，请务必根据你当前是在编写**客户端**还是**服务端**代码，来选择正确的模块语法。
