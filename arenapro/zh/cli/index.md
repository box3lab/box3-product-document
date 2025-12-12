---
layout: home

hero:
  name: "ArenaPro CLI"
  text: "专业、高效的神岛游戏创作解决方案"
  tagline: 告别刀耕火种式的手动配置，拥抱现代 Node.js 地图开发流程。用一套命令行工作流串起脚手架、构建上传、登录与地图资源管理。
  image:
    src: /logo.png
    alt: ArenaPro CLI
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/cli/guide/
    - theme: alt
      text: API手册
      link: https://docs.box3lab.com/apapi/

features:
  - title: "开箱即用的一站式脚手架"
    details: "安装 ArenaPro CLI 后，你可以通过一条命令创建并跑通第一个 ArenaPro 项目。<br>脚手架内置 Vite、TypeScript、标准化目录结构与构建配置，让你不必再从空目录与碎片化脚本开始搭建工程，将更多精力投入到玩法设计与内容创作。"
  - title: "围绕 Vite 打造的顺畅开发体验"
    details: "脚手架默认采用 TypeScript 并基于 Vite 构建，为你带来接近毫秒级的开发反馈。<br>在日常开发阶段，更关注“能不能跑起来”；在正式构建与 CI 流水线中，则结合 TypeScript / ESLint 等严格检查，兼顾开发效率与上线质量。"
  - title: "账号、地图与工程一体化的工作流"
    details: "通过 `apc login`、`apc list`、`apc set`、`apc resource` 等命令，ArenaPro CLI 将账号登录、地图绑定与资源同步串联为一体化工作流。<br>配合 `dao3.config.ts` 与多环境 `.env` 配置，实现项目配置的完整代码化管理，不依赖特定 IDE，只需 Node.js 与终端，即可完成从本地开发到地图上线的全流程。"
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #b043ff 30%, #ff4d99);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #b043ff 50%, #ff4d99 50%);
  --vp-home-hero-image-filter: blur(40px);
}
</style>
