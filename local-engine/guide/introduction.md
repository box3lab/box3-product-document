# BOX3 本地引擎

在自己的电脑或服务器上制作地图、运行游戏，并邀请玩家一起游玩。你可以通过浏览器编辑和游玩，也可以使用玩家启动器连接服务器。

<div class="engine-world-gallery" aria-label="BOX3 世界作品展示">
  <figure><img src="/65323a0de4b00c77210bdded_m.png" alt="BOX3 作品场景" loading="lazy"></figure>
  <figure><img src="/65323a0de4b00c77210bddef_m.png" alt="BOX3 作品场景" loading="lazy"></figure>
  <figure><img src="/65323a0de4b00c77210bddf1_m.png" alt="BOX3 作品场景" loading="lazy"></figure>
  <figure><img src="/65323a0ee4b00c77210bddf5_m.png" alt="BOX3 作品场景" loading="lazy"></figure>
</div>

## 先选适合自己的入口

| 你想做什么 | 从这里开始 |
| --- | --- |
| 制作地图或在自己电脑试运行 | [桌面安装](/getting-started/desktop-installation) |
| 在云服务器长期运行 | [Linux 服务器安装](/getting-started/linux-installation) |
| 只连接别人的服务器玩游戏 | [玩家启动器](/guide/player-launcher)，无需 Docker |

## 这些应用分别做什么

| 应用 | 用途 |
| --- | --- |
| 部署管理器 | 配置环境、下载组件、启动服务、备份和更新 |
| Creator / ARENA | 管理作品，编辑地图与脚本，预览并导出 |
| VOXA | 制作模型、皮肤和动画 |
| Play | 展示和运行已导入的游戏地图 |
| 登录页面 | 注册和登录玩家账号 |
| 玩家管理后台 | 服主管理账号、权限、地图和运行状态 |
| 玩家启动器 | 玩家连接服务器、选择地图并游玩 |

部署管理器负责开服，玩家启动器负责玩游戏；不要混用安装包或访问地址。

## 最短使用路线

安装完成后，按[首次启动](/getting-started/first-start)配置数据库、启动服务并准备账号。

- **想创作**：获得创作权限 → 在 Creator 制作和预览 → 导出 `.boxplay` → 在后台导入并开放。
- **已有游戏包**：启动游玩端 → 在后台导入 `.boxplay` → 玩家登录进入。

编辑器操作可以继续阅读 [ARENA 手册](https://docs.box3lab.com/arena/)和 [VOXA 手册](https://docs.box3lab.com/voxa/)。

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
