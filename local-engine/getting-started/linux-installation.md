# Linux 服务器安装

无桌面的 Linux 服务器可以使用一条命令安装本地引擎。安装器会识别 CPU 架构、准备 Docker Engine 和 Compose v2、下载发行包、导入镜像，并启动 Web 管理端。

## 一键安装

使用具有 `sudo` 权限的账号执行：

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh | sudo bash
```

默认安装目录是：

```text
/opt/box3-engine
```

安装器完成后会显示：

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

## 安装器会做什么

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

## 打开管理端

默认管理端监听：

```text
0.0.0.0:3130
```

在云服务器中，需要同时确认：

1. 云厂商安全组允许 TCP `3130`。
2. 系统防火墙允许 TCP `3130`。
3. `server-manager` 容器正在运行。

然后使用安装完成时显示的地址打开管理端，并输入 `BOX_SERVER_MANAGER_TOKEN`。

::: warning
直接通过 HTTP 暴露管理端时，登录密钥会经过未加密连接。完成首次配置后，建议使用 HTTPS 反向代理、VPN 或来源 IP 白名单保护管理端。
:::

## 只允许本机访问管理端

如果不希望直接公开管理端，可以先下载安装器，再指定监听地址：

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh -o install.sh
sudo BOX3_MANAGER_BIND_IP=127.0.0.1 sh install.sh
rm install.sh
```

然后在自己的电脑建立 SSH 隧道：

```bash
ssh -L 3130:127.0.0.1:3130 <服务器用户>@<服务器地址>
```

保持 SSH 连接，在本机浏览器打开：

```text
http://127.0.0.1:3130
```

## 指定版本或目录

需要安装指定版本或使用其他目录时：

```bash
curl -fsSL https://assets.box3.fun/local-engine/install.sh -o install.sh
sudo BOX3_VERSION=0.2.0 BOX3_INSTALL_DIRECTORY=/opt/box3-engine sh install.sh
rm install.sh
```

除非有明确的目录规划，建议保留默认安装目录，方便后续升级和排障。

## 已安装 Docker 时

安装器会先检查现有 Docker。Docker Engine 和 Compose v2 都可用时会直接复用，不会重复安装。只有缺少组件或服务不可用时，才会进入对应系统的安装流程。

Alibaba Cloud Linux 3 使用 `alinux3-plus` 仓库，Alibaba Cloud Linux 2 使用阿里云 Docker CE 镜像仓库。安装结束前会再次验证 Docker 和 Compose。

## 重复执行与自动启动

重复执行同一条一键安装命令会升级启动器和业务镜像，并保留：

- `.env` 配置
- 许可证
- Creator 地图工程
- Play 地图库
- VOXA 模型数据
- 启动器备份
- PostgreSQL 和 Redis 数据卷

升级前正在运行的业务服务会使用新镜像重建；原本未运行的服务不会自动开启。

容器采用 `restart: unless-stopped`。服务器重启并恢复 Docker 后，此前运行且没有被手工停止的容器会自动恢复。

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
