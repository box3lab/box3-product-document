# 数据空间

该文档描述了 `GameDataStorage` API 的数据空间功能，详细介绍了其优化背景和使用示例。

API 文档：[GameDataStorage](https://docs.box3lab.com/api/GameDataStorage/getSpace.html)

## 优化背景

### 修改原因

在官方原先提供的 d.ts 文件中，`GameDataStorage` API 接口的 `value` 字段被统一声明为 `any` 类型（更具体地说，是官方自定义的 `JSONValue` 类型，能同时容纳字符串、数值、布尔值、对象以及数组）。

为了确保数据空间下的类型一致性，我们引入了泛型约束。这一优化显著提升了代码的可读性和类型检查的准确性。

## 使用示例

### 默认用法（不加泛型）

默认情况下，`value` 字段为 `JSONValue` 类型：

![](/QQ20241022-192639.png)

### 泛型约束用法

添加泛型约束后，`value` 字段的类型更加明确：

![](/QQ20241022-193007.png)
