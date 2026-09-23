# Linux 服务器安装

无桌面的 Linux 服务器可以使用一条命令安装本地引擎。安装器会识别 CPU 架构、准备 Docker Engine 和 Compose v2、下载发行包、导入镜像，并启动 Web 管理端。


## 安装流程

<div class="install-flow">
  <div class="install-step"><span class="install-step-number">01</span><strong>准备服务器</strong><p>确认系统、架构、磁盘和 sudo 权限。</p></div>
  <div class="install-step"><span class="install-step-number">02</span><strong>运行命令</strong><p>安装器准备 Docker 并下载发行包。</p></div>
  <div class="install-step"><span class="install-step-number">03</span><strong>保存密钥</strong><p>保存管理端和服主管理两类密钥。</p></div>
  <div class="install-step"><span class="install-step-number">04</span><strong>打开管理端</strong><p>安装许可证、配置数据并启动服务。</p></div>
</div>

## 1. 准备服务器

推荐使用仍在安全支持期内的系统：

- Ubuntu 22.04 或 24.04
- Debian 12
- Alibaba Cloud Linux 2 或 3


建议至少准备 4 核 CPU、8 GB 内存和 30 GB 可用磁盘；同时运行创作端和多个地图时，建议使用 8 核、16 GB 内存和 50 GB 以上空间。

## 2. 一键安装

使用具有 `sudo` 权限的账号执行：

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh | sudo bash
```

## 3. 保存安装结果

安装完成后，终端会显示：

- 局域网管理地址
- 公网管理地址
- 管理端登录密钥
- 服主管理密钥
- 需要放行的管理端端口

请立即保存两类密钥。它们用途不同：

| 密钥 | 用途 |
| --- | --- |
| 管理端登录密钥 `BOX_SERVER_MANAGER_TOKEN` | 登录 Linux Web 启动器，配置和启停服务 |
| 服主管理密钥 `BOX_PLAY_ADMIN_TOKEN` | 以 owner 身份登录玩家管理后台 |

不要把密钥放进地图脚本、网页代码、截图或公开日志。

### 安装器会做什么

一键安装器会依次完成：

1. 检查 Linux 发行版和 CPU 架构。
2. 检查 Docker Engine 与 Compose v2。
3. 在缺少 Docker 时安装并启动 Docker。
4. 从发布地址下载当前架构的服务器包。
5. 校验发行包并导入业务镜像。
6. 生成初始 `.env` 和随机管理密钥。
7. 启动 Linux Web 管理端。
8. 配置容器随 Docker 自动恢复运行。

安装器不会在没有有效许可证时擅自启动 Play、Creator 等业务服务。

## 4. 打开管理端

默认管理端监听：

```text
0.0.0.0:3130
```

在云服务器中，需要同时确认：

1. 云厂商安全组允许 TCP `3130`。
2. 系统防火墙允许 TCP `3130`。
3. `server-manager` 容器正在运行。

然后使用安装完成时显示的地址打开管理端，并输入 `BOX_SERVER_MANAGER_TOKEN`。

进入管理端后，按照[首次启动](/getting-started/first-start)安装许可证、选择 PostgreSQL 和 Redis、设置访问范围并启动服务。


## 其他安装方式

### 只允许本机访问管理端

如果不希望直接公开管理端，可以先下载安装器，再指定监听地址：

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh -o install.sh
sudo BOX3_MANAGER_BIND_IP=127.0.0.1 sh install.sh
```

然后在自己的电脑建立 SSH 隧道：

```bash
ssh -L 3130:127.0.0.1:3130 <服务器用户>@<服务器地址>
```

保持 SSH 连接，在本机浏览器打开：

```text
http://127.0.0.1:3130
```

### 指定版本或目录

需要安装指定版本或使用其他目录时：

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh -o install.sh
sudo BOX3_VERSION=0.2.0 BOX3_INSTALL_DIRECTORY=/opt/box3-engine sh install.sh
```

除非有明确的目录规划，建议保留默认安装目录，方便后续升级和排障。



## 常用命令

进入安装目录：

```bash
cd /opt/box3-engine
```

| 命令 | 作用 |
| --- | --- |
| `./status.sh` | 查看服务状态 |
| `./start.sh` | 按当前配置启动服务 |
| `./logs.sh play` | 查看 Play 日志 |
| `./logs.sh player-service` | 查看玩家服务日志 |
| `./stop.sh` | 停止服务，但不删除数据 |
| `./install.sh` | 重新校验并恢复管理端 |

## 安装失败时

先检查：

```bash
docker info
docker compose version
df -h /
```

如果下载失败，确认服务器可以访问 `https://assets.box3.fun`。CDN 的版本文件或发行包不可用时，安装器会尝试从同版本 GitHub Release 下载；两个来源都失败时才会停止。

安装完成后继续阅读[首次启动](/getting-started/first-start)。
