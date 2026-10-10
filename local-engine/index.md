---
layout: home

hero:
  name: "BOX3 本地引擎"
  text: "安装、创作与运行"
  tagline: 在自己的电脑或 Linux 服务器上部署创作、游玩与玩家管理环境。
  image:
    src: /hero-logo.png
    alt: BOX3 本地引擎
  actions:
    - theme: brand
      text: 开始安装
      link: /getting-started/desktop-installation
    - theme: alt
      text: 首次启动
      link: /getting-started/first-start
    - theme: alt
      text: 下载玩家启动器
      link: /guide/player-launcher

features:
  - title: "从安装到启动的完整部署流程"
    details: "桌面版通过图形化启动器按需下载并校验服务镜像、配置数据服务并启停容器；Linux 服务器也可以使用一条命令完成安装。<br>统一管理 Creator、VOXA、Play、玩家管理与登录页面。"
  - title: "连接创作、发布与多人游玩"
    details: "使用 Creator 管理地图工程，使用 VOXA 制作模型、皮肤与动画，再将发布后的地图包导入 Play。<br>支持主地图与副地图、多人房间、局域网和公网访问，方便完成从内容制作到实际游玩的完整测试。"
  - title: "面向服主的管理与运维能力"
    details: "通过玩家管理后台配置玩家、管理员、权限组、封禁、审计记录、CLI 令牌、游玩地图和地图容器。<br>结合资源组、运行状态、备份与日志排查，让日常管理和服务器维护集中在同一套界面中完成。"
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #ff6534 20%, #ff9f0a 80%);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #b043ff 50%, #ff4d99 50%);
  --vp-home-hero-image-filter: blur(40px);
}
</style>
