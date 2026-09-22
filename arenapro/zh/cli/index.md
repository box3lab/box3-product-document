---
layout: home

hero:
  name: "ArenaPro CLI"
  text: "BOX Creator TypeScript 开发工具"
  tagline: 使用 Profile、CLI Token 和永久地图 ID 管理本地工程、资源同步、脚本上传与预览调试。
  image:
    src: /logo.png
    alt: ArenaPro CLI
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/cli/guide/
    - theme: alt
      text: 命令一览
      link: /zh/cli/guide/cli-commands

features:
  - title: "开箱即用的一站式脚手架"
    details: "安装 ArenaPro CLI 后，你可以通过一条命令创建并跑通第一个 ArenaPro 项目。<br>脚手架内置 Vite、TypeScript、标准化目录结构与构建配置，让你不必再从空目录与碎片化脚本开始搭建工程，将更多精力投入到玩法设计与内容创作。"
  - title: "围绕 Vite 打造的顺畅开发体验"
    details: "脚手架默认采用 TypeScript 并基于 Vite 构建，为你带来接近毫秒级的开发反馈。<br>在日常开发阶段，更关注“能不能跑起来”；在正式构建与 CI 流水线中，则结合 TypeScript / ESLint 等严格检查，兼顾开发效率与上线质量。"
  - title: "Profile、地图与工程一体化工作流"
    details: "通过 `apc profile`、`apc project`、`apc map`、`apc script` 与 `apc runtime` 管理 Creator 连接、永久地图 ID、资源和预览运行。<br>工程 `.env` 只保存 Profile 名称和地图 ID；CLI Token 保存在本机凭据或 CI Secret 中。"
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #b043ff 30%, #ff4d99);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #b043ff 50%, #ff4d99 50%);
  --vp-home-hero-image-filter: blur(40px);
}
</style>
