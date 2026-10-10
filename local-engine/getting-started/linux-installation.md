# Linux 服务器安装

适用于无桌面 Linux 服务器。安装器会准备 Docker Engine 和 Compose v2，下载并校验发行包，导入管理端镜像并启动 Web 管理器。

::: tip 遇到问题？欢迎进群交流
安装或使用过程中遇到困难，可以加入 QQ 群「Box3Local秘密基地」：[1107448537](https://qm.qq.com/q/yV2NR8skec)
:::

## 安装步骤

### 1. 准备服务器

建议使用仍在安全支持期内的 Ubuntu 24/26 或 Alibaba Cloud Linux 3/4。准备有 `sudo` 权限的账号和足够的磁盘空间。

### 2. 运行安装命令

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh | sudo bash
```

安装器会识别 CPU 架构、检查或安装 Docker，并下载对应的服务器发行包。安装过程会启动 Linux Web 管理端；业务服务需在管理界面配置后启动。

### 3. 保存安装信息

安装完成后保存终端显示的管理地址、端口和两种密钥：

| 密钥 | 用途 |
| --- | --- |
| `BOX_SERVER_MANAGER_TOKEN` | 登录 Linux Web 管理器 |
| `BOX_PLAY_ADMIN_TOKEN` | 以 owner 身份登录玩家管理后台 |

两种密钥不可互换。不要将它们发到公开聊天、截图或日志中。

### 4. 配置防火墙并登录

默认管理端口为 TCP `3130`。云服务器需要同时在云安全组和系统防火墙放行该端口，然后使用安装完成时显示的地址和管理端登录密钥登录。

进入管理器后，按照[首次启动](/getting-started/first-start)配置 PostgreSQL、Redis、访问范围并启动业务服务。

## 仅允许本机访问管理端

如果不希望直接公开管理端，使用回环地址安装：

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh -o install.sh
sudo BOX3_MANAGER_BIND_IP=127.0.0.1 sh install.sh
```

在自己的电脑建立 SSH 隧道：

```bash
ssh -L 3130:127.0.0.1:3130 <服务器用户>@<服务器地址>
```

保持连接，并在本机浏览器打开 `http://127.0.0.1:3130`。

## 常用命令

```bash
cd /opt/box3-engine
./status.sh             # 查看状态
./start.sh              # 启动 Web 管理器
./logs.sh play          # 查看 Play 日志
./stop.sh               # 停止服务，不删除数据
```

安装失败时，先运行 `docker info`、`docker compose version` 和 `df -h /`，确认 Docker、Compose 与磁盘空间正常。下载问题请确认服务器可访问 `https://assets.box3.fun`。
