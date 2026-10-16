# Linux 服务器安装

适合在云服务器或没有桌面的 Linux 设备上开服。安装完成后，通过浏览器管理，不需要在服务器上打开图形界面。

## 1. 准备服务器

准备 Ubuntu、Debian 或 Alibaba Cloud Linux 3 / 4，以及有 `sudo` 权限的账号。支持常见的 AMD64、ARM64 架构；配置建议见[安装前准备](/getting-started/requirements)。

## 2. 运行安装命令

在服务器终端执行：

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh | sudo bash
```

安装器会准备 Docker、下载服务器包并启动 Web 管理器。此时还没有启动全部创作和游玩服务。

## 3. 保存地址和密钥

安装完成后，保存终端显示的管理地址、部署目录和密钥。

| 名称 | 用途 |
| --- | --- |
| 管理端登录密钥 `BOX_SERVER_MANAGER_TOKEN` | 登录 Web 部署管理器 |
| 服主密钥 `BOX_PLAY_ADMIN_TOKEN` | 登录玩家管理后台 |

两种密钥不能互换，也不要发到群聊或公开截图中。

## 4. 打开管理器

默认管理端口为 **3130**。云服务器需在安全组和系统防火墙中允许你的电脑访问这个端口，再打开安装器给出的地址，例如 `http://服务器IP:3130`。

输入管理端登录密钥后，继续[首次启动](/getting-started/first-start)。为玩家配置域名和 HTTPS，见[局域网与公网访问](/guide/network-access)。

::: tip 地址不要填成 127.0.0.1
在你电脑的浏览器里，`127.0.0.1` 指你自己的电脑。连接云服务器时使用服务器 IP 或域名。
:::

## 仅通过 SSH 访问管理器（可选）

不直接开放管理端口时，可按以下方式安装：

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh -o install.sh
sudo BOX3_MANAGER_BIND_IP=127.0.0.1 sh install.sh
```

然后在自己的电脑运行：

```bash
ssh -L 3130:127.0.0.1:3130 用户名@服务器IP
```

保持终端连接，再打开 `http://127.0.0.1:3130`。

## 查看状态和日志

进入安装器显示的部署目录；默认目录是 `/opt/box3-engine`：

```bash
cd /opt/box3-engine
./status.sh             # 查看状态
./start.sh              # 启动 Web 管理器
./logs.sh play          # 查看游玩端日志
./stop.sh               # 停止服务，保留数据
```

日常启停业务服务优先使用管理页面。升级或迁移前先阅读[备份与更新](/operations/backup-and-update)。
