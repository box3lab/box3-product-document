# 桌面版安装

桌面版适合在 Windows、macOS 或带桌面的 Linux 电脑上使用。启动器负责导入业务镜像、保存配置、启动和停止服务，以及查看运行状态。

## 下载安装包

1. 从正式发布页面下载与你的系统和 CPU 架构一致的安装包。
2. 完整解压 ZIP，不要直接在压缩包内运行。
3. 将应用放到固定位置，再启动程序。

常见安装包名称如下：

| 系统 | 安装包示例 |
| --- | --- |
| Windows x64 | `BOX3-Engine-Desktop-<版本>-windows-x64.zip` |
| Apple Silicon macOS | `BOX3-Engine-Desktop-<版本>-macos-arm64.zip` |
| Linux x64 | `BOX3-Engine-Desktop-<版本>-linux-x64.zip` |

安装包通常已经包含业务镜像。选择内置 PostgreSQL 或 Redis 时，第一次仍可能需要联网下载基础服务镜像。

## 启动 Docker

先打开 Docker Desktop，等待状态显示 Docker Engine 已启动，再打开 BOX3 Engine Launcher。

如果启动器提示无法连接 Docker：

1. 确认 Docker Desktop 正在运行。
2. 在终端执行 `docker info`。
3. 如果命令失败，先修复 Docker，再重开启动器。
4. 如果命令成功但启动器仍报错，完全退出启动器后重新打开。

## macOS 首次打开

首次打开下载的应用时，macOS 可能要求确认来源。请确认安装包来自正式发布渠道，再在“系统设置 → 隐私与安全性”中允许打开。

不要从不可信来源下载修改过的启动器或镜像归档。

## Windows 首次打开

Windows Defender SmartScreen 可能会显示安全提示。请核对发布者和下载来源。如果 Docker Desktop 使用 WSL 2，请确认 WSL 2 功能和虚拟化已启用。

## 导入与校验镜像

首次启动时，启动器会检查本地业务镜像。根据发行包形式，可能自动导入，也可能要求选择镜像归档。

导入期间：

- 不要关闭启动器或 Docker Desktop。
- 不要移动或删除安装包中的镜像文件。
- 等待所有镜像完成校验和导入。
- 如果磁盘空间不足，先清理无关 Docker 镜像后重试。

镜像导入只安装程序，不会自动启动 Play、Creator 等业务服务。

## 安装许可证

打开“许可证管理”，复制设备 ID，申请许可证并导入 `.boxlic` 文件。许可证有效后才能启动业务服务。

如果升级后许可证突然失效，不要删除许可证或数据目录。先检查是否更换了系统用户、应用数据目录，或丢失了设备安装密钥。

## 下一步

安装完成后，继续阅读[首次启动](/getting-started/first-start)，完成数据库、访问范围、端口和密钥配置。

::: tip
关闭启动器窗口不会停止已经运行的 Docker 容器。需要停止服务时，请在“服务总览”中操作。
:::
