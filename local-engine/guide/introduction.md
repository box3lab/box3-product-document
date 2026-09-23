# BOX3 引擎介绍

奇梦岛 BOX3 引擎是一套基于网页的多人联机 3D 创作工具。创作者可以在浏览器中搭建场景、制作模型、设计界面，并通过 JavaScript 或 TypeScript 编写游戏逻辑，让静态的方块世界变成可以探索、互动和多人游玩的作品。

你可以把它理解为一个数字创作沙盒：既能像搭积木一样快速构建地形，也能通过代码实现对战、冒险、经营、社交、解谜等玩法。玩家不需要安装专用客户端，只要通过浏览器打开游玩页面，就可以进入已经发布的地图。

BOX3 本地引擎是在此基础上提供的本地部署版本。它将创作工具、游玩服务和管理后台部署在服主自己的电脑或服务器上，让作品、玩家和运行环境由服主自行管理。

<div class="engine-world-gallery" aria-label="BOX3 世界作品展示">
  <figure>
    <img src="/65323a0de4b00c77210bdded_m.png"  loading="lazy">
  </figure>
  <figure>
    <img src="/65323a0de4b00c77210bddef_m.png"  loading="lazy">
  </figure>
  <figure>
    <img src="/65323a0de4b00c77210bddf1_m.png"  loading="lazy">
  </figure>
  <figure>
    <img src="/65323a0ee4b00c77210bddf5_m.png"  loading="lazy">
  </figure>
</div>

## 可以创作什么

BOX3 不限定作品类型。常见方向包括：

- 多人对战和团队竞技
- 剧情冒险与角色扮演
- 生存、经营和养成玩法
- 跑酷、解谜和闯关地图
- 社交空间与虚拟展厅
- 编程教学与互动课堂
- 建筑展示和数字场景

地图可以由一个主地图和多个副地图组成。例如，玩家先在主地图大厅选择玩法，再被传送到不同的关卡或战斗房间。每张地图都可以拥有独立场景和脚本，也可以共享地图组中的数据与资源。

## 创作能力

### 场景与地形

Arena 提供基于方块的地形编辑能力，也支持在场景中放置实体、模型和交互对象。创作者可以先完成可视化搭建，再使用脚本控制场景变化。

### 模型与动画

VOXA 用于制作模型、皮肤和动画。完成的内容可以放入地图中，作为角色外观、场景物件、怪物、道具或装饰资源使用。

### 脚本与交互

地图逻辑主要通过 JavaScript 或 TypeScript 编写。脚本可以响应玩家进入、按键、交互、碰撞和计时事件，也可以控制实体、UI、房间流程和游戏规则。

不熟悉编程也可以先从场景搭建开始，再逐步学习简单事件和脚本。需要系统学习编辑器操作时，可以继续阅读 Arena、VOXA 和 CLI 手册。

### 多人联机

地图可以同时容纳多名玩家，并根据玩法创建不同房间。创作者可以设计合作、对抗、匹配、队伍和跨地图传送等多人流程。

## 本地部署带来的变化

普通在线创作平台通常由平台统一提供服务器。本地引擎则由服主决定运行位置和开放范围：

- 个人电脑可以只供自己创作和测试。
- 局域网环境可以供同一教室、工作室或家庭网络使用。
- Linux 服务器可以长期运行，并向互联网中的玩家开放。

服主可以自行决定安装哪些地图、允许谁参与管理、为地图分配多少资源，以及什么时候更新和备份数据。这也意味着服主需要负责服务器安全、数据库备份和日常维护。


## 从哪里开始

在个人电脑上使用时，请阅读[桌面版安装](/getting-started/desktop-installation)。使用无桌面服务器或云服务器时，请直接阅读[服务器版安装](/getting-started/linux-installation)。

如果本地引擎已经启动，可以继续阅读[作品管理](/guide/works)，了解如何创建和组织第一个作品。Arena、VOXA 和脚本开发的具体操作，请使用页面顶部对应的独立手册。

<style>
.engine-world-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin: 30px 0 38px;
}

.engine-world-gallery figure {
  overflow: hidden;
  margin: 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  box-shadow: 0 14px 32px -26px rgba(0, 0, 0, 0.48);
}

.engine-world-gallery img {
  display: block;
  width: 100%;
  aspect-ratio: 1.96 / 1;
  object-fit: cover;
}

@media (max-width: 640px) {
  .engine-world-gallery {
    grid-template-columns: 1fr;
    gap: 10px;
  }
}
</style>
