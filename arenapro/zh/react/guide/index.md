# 欢迎来到 ArenaPro React

![](https://assets.box3.fun/u226/aGQaLqKp7_Hf/n5d34_8AP1OoRgIqPNohabG0OwjL_Qrlj_VPSbF2e20.gif)

这是一个由 Claude 3.7 搭建的神岛 React 示例项目：[双向选择器-示例](https://dao3.fun/exp/experience/detail/100429428)
（示例代码从设计到实现均由 AI 自动生成）

## 什么是 React？

[React](https://zh-hans.react.dev) 是由 Meta（原 Facebook）开源的一个用于构建用户界面的 JavaScript 库。  
它的核心特点包括：

- **声明式 UI**  
  你只需要描述「界面在不同状态下长什么样」，React 会负责把状态变化映射到实际界面更新。

- **组件化开发**  
  将页面拆成一个个可复用的组件（按钮、对话框、面板……），再像搭积木一样组合成完整界面。

- **单向数据流与可预测的状态**  
  数据自上而下流动，配合 Hooks 等机制，使状态变化更容易理解、调试和维护。

- **生态成熟**  
  拥有完善的社区与生态，是 Web 前端最主流的 UI 解决方案之一。

## 什么是 ArenaPro React？

**ArenaPro React 是基于 React 18 定制的、适用于神岛的 React 风格 UI 框架。**

- 在 **心智模型与 API 风格上贴近 React 18**，比如组件、Hooks、声明式 UI 等；
- 在 **实现层面与运行环境上做了针对神岛引擎的改造与裁剪**，以便更好地适配神岛的 UI 与性能需求。

### ArenaPro React 相对标准 React 的差异大致包括：

- **运行环境不同**  
  标准 React 主要面向浏览器 DOM 或 Native；  
  ArenaPro React 面向神岛引擎的 UI 系统和渲染管线。

- **API 与能力有取舍**  
  我们保留了大部分常用的 React 18 开发模式，同时对在神岛场景下不常用或不适配的部分做了精简与封装。

- **默认实践更贴近游戏创作场景**  
  在布局方式、组件抽象、性能优化策略等方面，都更加贴合神岛创作的实际项目需求。
