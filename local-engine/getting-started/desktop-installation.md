# 桌面安装

适合在 Windows、macOS 或 Linux 桌面上创作和开服。只想玩游戏，请前往[玩家启动器](/guide/player-launcher)。

## 1. 启动 Docker

先完成[安装前准备](/getting-started/requirements)。Windows、macOS 打开 Docker Desktop，等待它显示正在运行，再打开引擎。

## 2. 下载部署管理器

打开 [BOX3 本地引擎发布页](https://github.com/box3lab/box3-local-engine/releases)，选择引擎正式版本中的 **BOX-Local-Engine** ZIP 文件，不要下载页面底部的源码压缩包。

| 你的设备 | 文件名中的平台标识 |
| --- | --- |
| 常见 Intel / AMD Windows 电脑 | `windows-amd64` |
| Windows ARM 电脑 | `windows-arm64` |
| Apple M 系列 Mac | `macos-arm64` |
| Intel / AMD Linux 电脑 | `linux-amd64` |
| ARM Linux 电脑 | `linux-arm64` |

Windows 可在“设置 → 系统 → 系统信息”查看系统类型；Mac 可在“关于本机”查看芯片。实际可用文件以发布页为准。

普通使用选择正式版；带 `staging` 的是预发布测试版，带 `dev` 的是本地开发包。

## 3. 解压并打开

1. 将 ZIP **完整解压**到本机目录，不要在压缩包里直接运行。
2. 打开 **BOX3 Engine Launcher**。Mac 请将应用放入“应用程序”后打开。
3. 保持 Docker 运行，按界面提示进入配置。

安装包不需要提前包含所有服务。管理器会按你的选择下载需要的组件，首次启动时间取决于网速。

## 4. 完成首次配置

继续阅读[首次启动](/getting-started/first-start)，先让服务和账号正常运行，再制作地图。

打不开应用、Docker 未就绪或下载失败时，查看[常见问题](/operations/troubleshooting)。需要帮助可加入 QQ 群「Box3Local秘密基地」：[1107448537](https://qm.qq.com/q/yV2NR8skec)。
