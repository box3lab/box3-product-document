# 类（Classes）

类是用于创建对象的蓝图或模板。它们是面向对象编程（OOP）的核心概念之一。通过使用类，你可以创建具有相同属性和方法但状态不同的多个对象。

## 定义一个类

你可以使用 `class` 关键字来定义一个类。类名通常以大写字母开头。

```javascript
class Player {
  // 构造函数
  constructor(name, health) {
    this.name = name;
    this.health = health;
    this.level = 1;
  }

  // 方法
  attack() {
    console.log(this.name + " 发起了攻击！");
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log(this.name + " 受到了 " + amount + " 点伤害。");
  }
}
```

### `constructor` 方法

`constructor` 是一个特殊的方法，用于创建和初始化类的实例。当你使用 `new` 关键字创建对象时，它会自动被调用。

### `this` 关键字

在类中，`this` 关键字引用该类的当前实例。你可以使用 `this` 来访问和修改实例的属性。

## 创建类的实例

要从类创建一个对象（也称为实例），请使用 `new` 关键字。

```javascript
// 创建两个 Player 实例
let player1 = new Player("Aris", 100);
let player2 = new Player("Bobo", 120);

// 访问属性
console.log(player1.name); // 输出: Aris
console.log(player2.health); // 输出: 120

// 调用方法
player1.attack(); // 输出: Aris 发起了攻击！
player2.takeDamage(20);
console.log(player2.health); // 输出: 100
```

`player1` 和 `player2` 都是 `Player` 类的实例。它们共享相同的结构（属性和方法），但拥有各自独立的数据。

## 继承（Inheritance）

继承允许一个类（子类）继承另一个类（父类）的属性和方法。这有助于代码重用。

```javascript
// Mage 类继承自 Player 类
class Mage extends Player {
  constructor(name, health, mana) {
    // super() 调用父类的构造函数
    super(name, health);
    this.mana = mana;
  }

  // 新的方法
  castSpell() {
    console.log(this.name + " 施放了一个火球术！");
  }

  // 重写父类的方法
  attack() {
    console.log(this.name + " 挥舞着法杖！");
  }
}

let mage1 = new Mage("Gandalf", 80, 150);

mage1.attack(); // 输出: Gandalf 挥舞着法杖！
mage1.castSpell(); // 输出: Gandalf 施放了一个火球术！
console.log(mage1.health); // 输出: 80
```

类是组织和构建大型、复杂代码的强大工具，在复杂地图脚本中非常有用。
