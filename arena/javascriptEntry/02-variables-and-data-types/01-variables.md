# 变量

变量是用于存储数据的容器。在 JavaScript 中，你可以使用 `var`、`let` 和 `const` 关键字来声明变量。

## 声明变量

### `let`

`let` 允许你声明一个块级作用域的局部变量，可以选择性地为其赋值。

```javascript
let message = "Hello, World!";
console.log(message); // 输出: Hello, World!

message = "Hello, BOX3!";
console.log(message); // 输出: Hello, BOX3!
```

### `const`

`const` 声明一个块级作用域的只读常量。常量在声明时必须被赋值，且不能被重新赋值。

```javascript
const name = "BOX3";
console.log(name); // 输出: BOX3

// 下面的代码会报错，因为常量不能被重新赋值
// name = "Box3";
```

### `var`

`var` 是声明变量的旧方法。它声明一个函数作用域或全局作用域的变量，可以选择性地为其赋值。在现代 JavaScript 中，我们推荐使用 `let` 和 `const` 来代替 `var`，因为它们提供了更好的作用域控制。

```javascript
var score = 100;
console.log(score); // 输出: 100
```

## 变量命名规则

- 变量名可以包含字母、数字、下划线（`_`）和美元符号（`$`）。
- 变量名必须以字母、下划线或美元符号开头。
- JavaScript 是大小写敏感的，所以 `myVariable` 和 `myvariable` 是两个不同的变量。
- 不能使用 JavaScript 的保留关键字（如 `let`、`const`、`if` 等）作为变量名。

选择有意义的变量名，可以让你的代码更易于理解。
