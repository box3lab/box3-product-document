# 定义函数

函数是一段可重复使用的代码块，用于执行特定任务。通过使用函数，你可以将代码组织成更小、更易于管理的部分。

## 声明函数

你可以使用 `function` 关键字来声明一个函数。

```javascript
function greet() {
  console.log("你好，欢迎来到地图！");
}
```

### 调用函数

要执行函数，你需要“调用”它。通过使用函数名后跟括号 `()` 来调用函数。

```javascript
greet(); // 输出: 你好，欢迎来到地图！
```

## 函数表达式

你还可以将函数赋值给一个变量。这被称为函数表达式。

```javascript
const sayGoodbye = function () {
  console.log("再见！");
};

sayGoodbye(); // 输出: 再见！
```

## 箭头函数

箭头函数是编写函数表达式的一种更简洁的方式。它们在现代 JavaScript 中非常流行。

```javascript
const add = (a, b) => {
  return a + b;
};

console.log(add(5, 3)); // 输出: 8
```

如果函数只有一个表达式，你可以省略花括号 `{}` 和 `return` 关键字：

```javascript
const subtract = (a, b) => a - b;

console.log(subtract(10, 4)); // 输出: 6
```

### 为什么使用函数？

- **代码重用**：你可以在程序的不同部分多次调用同一个函数。
- **模块化**：将代码分解为小的、独立的函数，使代码更易于理解和维护。
- **可读性**：有意义的函数名可以使你的代码更具可读性。
