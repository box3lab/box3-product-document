# BOX3 本地引擎

BOX3 是基于网页的多人 3D 创作与游玩工具。创作者使用 Creator 和 Arena 制作地图、用 VOXA 编辑模型，再发布给玩家通过浏览器游玩。

本地引擎将创作、游玩和管理服务部署在自己的电脑或 Linux 服务器上，由服主管理地图、玩家、访问范围和数据。

<div class="engine-world-gallery" aria-label="BOX3 世界作品展示">
  <figure><img src="/65323a0de4b00c77210bdded_m.png" loading="lazy"></figure>
  <figure><img src="/65323a0de4b00c77210bddef_m.png" loading="lazy"></figure>
  <figure><img src="/65323a0de4b00c77210bddf1_m.png" loading="lazy"></figure>
  <figure><img src="/65323a0ee4b00c77210bddf5_m.png" loading="lazy"></figure>
</div>

## 快速开始

1. 选择[桌面版](/getting-started/desktop-installation)或[Linux 服务器版](/getting-started/linux-installation)并完成安装。
2. 按[首次启动](/getting-started/first-start)配置数据服务、密钥和访问范围。
3. 在 Creator 创建地图，预览并发布 `.boxplay`。
4. 在 Play 导入地图包，使用测试玩家验证游玩流程。

## 可以制作什么

BOX3 支持多人对战、冒险、经营、解谜、跑酷、社交空间和互动课堂等地图。地图组由一个主地图和可选副地图组成，可用于大厅、关卡和房间传送。

Arena 用于场景编辑和地图脚本；VOXA 用于制作模型、皮肤和动画。详细编辑操作请参阅 [Arena](https://docs.dao3.fun/arena/) 和 [VOXA](https://docs.dao3.fun/voxa/) 手册。

## 部署注意

电脑部署适合创作和测试；长期公网运行建议使用 Linux 服务器。服主需负责服务安全、数据库备份和日常维护。开始创作后，可继续阅读[作品管理](/guide/works)。

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
