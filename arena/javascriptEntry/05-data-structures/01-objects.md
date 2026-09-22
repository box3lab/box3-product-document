# 对象

对象是 JavaScript 中一种基本的数据结构，它允许你将相关的数据和功能组合在一起。对象是键值对的集合，其中键是字符串（也称为属性名），值可以是任何数据类型，包括其他对象或函数。

## 创建对象

你可以使用花括号 `{}` 来创建一个对象字面量。

```javascript
let player = {
  name: "Hero",
  health: 100,
  level: 1,
  isAlive: true,
};
```

在这个例子中，`player` 是一个对象，它有 `name`、`health`、`level` 和 `isAlive` 四个属性。

## 访问属性

你可以使用点表示法或方括号表示法来访问对象的属性。

### 点表示法

```javascript
console.log(player.name); // 输出: Hero
console.log(player.health); // 输出: 100
```

### 方括号表示法

方括号表示法在属性名是动态的或包含特殊字符时非常有用。

```javascript
console.log(player["level"]); // 输出: 1

let propertyName = "isAlive";
console.log(player[propertyName]); // 输出: true
```

## 修改属性

你可以像访问属性一样，使用赋值运算符来修改属性的值。

```javascript
player.health = 90;
console.log(player.health); // 输出: 90

player.level = 2;
console.log(player.level); // 输出: 2
```

## 添加属性

你可以通过简单地为一个新属性赋值来向对象添加新属性。

```javascript
player.mana = 50;
console.log(player.mana); // 输出: 50
```

## 对象中的方法

当对象的属性值是一个函数时，我们称之为**方法**。方法允许对象执行动作。

```javascript
let character = {
  name: "Wizard",
  health: 80,
  attack: function () {
    console.log("Wizard casts a spell!");
  },
};

character.attack(); // 输出: Wizard casts a spell!
```

对象是构建复杂应用程序的基础。在地图脚本中，你会经常使用对象来表示玩家、物品、敌人等游戏元素。
