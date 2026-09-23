# 桌面版安装

桌面版适合在 Windows、macOS 或带桌面的 Linux 电脑上使用。启动器负责导入业务镜像、保存配置、启动和停止服务，以及查看运行状态。



## 安装流程

<div class="install-flow">
  <div class="install-step"><span class="install-step-number">01</span><strong>检查电脑</strong><p>确认系统架构、内存和磁盘空间。</p></div>
  <div class="install-step"><span class="install-step-number">02</span><strong>安装 Docker</strong><p>安装并启动 Docker Desktop。</p></div>
  <div class="install-step"><span class="install-step-number">03</span><strong>下载启动器</strong><p>解压与系统匹配的桌面版安装包。</p></div>
  <div class="install-step"><span class="install-step-number">04</span><strong>首次启动</strong><p>打开启动器，配置服务。</p></div>
</div>

## 1. 检查电脑配置


### 选择正确版本


| 项目 | 最低建议 | 推荐配置 |
| --- | --- | --- |
| CPU | 4 核 | 8 核及以上 |
| 内存 | 8 GB | 16 GB 及以上 |
| 可用磁盘 | 30 GB | 50 GB 及以上 |

镜像、地图工程、模型、数据库、运行时容器和本地备份都会占用磁盘空间。地图数量、脚本复杂度和同时运行的地图也会影响实际资源占用。

## 2. 安装 Docker

- 使用 [Docker Desktop](https://www.docker.com/products/docker-desktop/) 安装 Docker。

安装完成后打开 Docker Desktop，等待 Docker Engine 正常运行。可以在终端检查：

```bash
docker info
docker compose version
```

::: warning
桌面电脑适合个人创作、本机测试和小规模局域网联机。需要长期面向公网运行时，建议使用[服务器版安装](/getting-started/linux-installation)。
:::

## 3. 下载引擎启动器

1. 从下载页面下载与你的系统和 CPU 架构一致的 BOX3 Engine Launcher。
2. 完整解压 ZIP，不要直接在压缩包内运行。
3. 将应用放到固定位置，再启动程序。

## 4. 打开启动器

先确认 Docker 正常运行，再打开 BOX3 Engine Launcher。

<div class="install-platforms">
  <div class="install-platform-card"><strong>macOS</strong><p>系统要求确认来源时，请核对安装包来自正式渠道，再前往“系统设置 → 隐私与安全性”允许打开。</p></div>
  <div class="install-platform-card"><strong>Windows</strong><p>SmartScreen 显示提示时先核对发布者。Docker Desktop 使用 WSL 2 时，需要启用虚拟化和 WSL 2。</p></div>
</div>

Linux 桌面版需要保证当前用户可以访问 Docker Engine。不要从不可信来源下载修改过的启动器或镜像归档。


## 完成安装

安装完成后，继续阅读[首次启动](/getting-started/first-start)，完成数据库、访问范围、端口和密钥配置。

::: tip
关闭启动器窗口不会停止已经运行的 Docker 容器。需要停止服务时，请在“服务总览”中操作。
:::
