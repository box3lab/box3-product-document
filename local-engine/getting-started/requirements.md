# 安装前准备

如果你只是连接别人的服务器游玩，直接安装[玩家启动器](/guide/player-launcher)，不需要 Docker。只有创作或自己开服，才需要下面的环境。

## 选择安装方式

| 你要做什么 | 使用方式 |
| --- | --- |
| 在自己的电脑上制作地图、试运行 | [桌面部署管理器](/getting-started/desktop-installation) |
| 在云服务器上长期运行 | [Linux 服务器安装](/getting-started/linux-installation) |
| 连接服主提供的服务器玩游戏 | [玩家启动器](/guide/player-launcher) |

部署管理器和玩家启动器是两个应用，下载时请认准名称。

## 电脑或服务器配置

| 使用场景 | 建议 CPU | 建议内存 | 可用磁盘 |
| --- | --- | --- | --- |
| 小规模游玩服务器 | 4 核 | 8 GB | 30 GB 起 |
| 同时运行创作、模型编辑和游玩 | 8 核以上 | 16 GB 以上 | 50 GB 起 |

这些是起步建议，复杂地图和较多在线玩家需要更多资源。镜像、地图、备份会持续占用磁盘。

## 安装 Docker

- **Windows、macOS**：安装 [Docker Desktop](https://www.docker.com/products/docker-desktop/)，并等待它显示正在运行。Windows 需要启用虚拟化和 WSL 2。
- **Linux 桌面**：准备 Docker Engine 和 Compose v2。
- **Linux 服务器**：一键安装器会检查并准备 Docker，按[服务器安装指南](/getting-started/linux-installation)操作即可。

普通安装不需要下载源码，也不用安装 Node.js 或 Rust。

## 网络和数据

首次安装需要联网下载组件。开始前留出足够空间，避免关闭 Docker 或让电脑休眠。

首次使用建议选内置 PostgreSQL，Redis 可以关闭。数据库保存玩家账号和部分游戏数据；以后更换设备或升级前，记得[单独备份数据库](/operations/backup-and-update)。

下一步：[桌面安装](/getting-started/desktop-installation) · [服务器安装](/getting-started/linux-installation)。
