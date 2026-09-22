# 数据类型

在 JavaScript 中，每个值都有一个数据类型。数据类型定义了值的性质和可以对其执行的操作。JavaScript 有几种内置的数据类型。

## 基本数据类型

### 字符串（String）

字符串是一系列字符，用于表示文本。字符串必须用单引号（`'`）或双引号（`"`）括起来。

```javascript
let greeting = "Hello, World!";
let name = "BOX3";
```

### 数字（Number）

数字类型用于表示整数和浮点数。

```javascript
let age = 18;
let price = 99.9;
```

### 布尔值（Boolean）

布尔值只有两个值：`true` 和 `false`。它们通常用于条件判断。

```javascript
let isReady = true;
let hasError = false;
```

### `null`

`null` 表示一个空值或“无”值。它是一个被赋给变量的“无”值。

```javascript
let emptyValue = null;
```

### `undefined`

`undefined` 表示一个未定义的值。如果一个变量被声明了但没有被赋值，它的值就是 `undefined`。

```javascript
let notAssigned;
console.log(notAssigned); // 输出: undefined
```

## 复合数据类型

### 对象（Object）

对象是键/值对的集合。我们将在后面的章节中详细介绍对象。

```javascript
let player = {
  name: "Alex",
  score: 100,
};
```

### 数组（Array）

数组是值的有序集合。我们将在后面的章节中详细介绍数组。

```javascript
let scores = [100, 95, 88];
```

## `typeof` 操作符

你可以使用 `typeof` 操作符来检查变量的数据类型。

```javascript
let message = "Hello";
console.log(typeof message); // 输出: string

let count = 10;
console.log(typeof count); // 输出: number
```
