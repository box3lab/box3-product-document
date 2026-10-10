# 桌面版安装准备

适用于 Windows、macOS 和带桌面环境的 Linux。无桌面或需要长期公网运行时，请使用[Linux 服务器安装](/getting-started/linux-installation)。

## 安装前按步骤检查

1. **确认电脑资源。** 建议至少 4 核 CPU、8 GB 内存和 30 GB 可用磁盘；保存较多地图或同时运行多个地图时，建议 50 GB 以上。
2. **安装 Docker。** Windows 和 macOS 安装 Docker Desktop；Linux 安装 Docker Engine 与 Compose v2。
3. **确认 Docker 已启动。** 在终端运行：

   ```bash
   docker info
   docker compose version
   ```

   两条命令都应正常输出。Compose v2 使用 `docker compose` 命令。

4. **确认网络可下载镜像。** 首次启动需要访问 `https://assets.box3.fun`。启动器会按需下载当前版本和架构对应的镜像，并在导入前校验 SHA-256。下载中断后可重试；验证通过的缓存会保留供后续复用。
5. **决定数据和访问方式。** PostgreSQL 可使用内置或外部服务；Redis 可使用内置、外部或关闭。首次使用建议选择本机访问，确认服务正常后再开放局域网或公网。
6. **下载匹配系统和 CPU 架构的安装包。** 前往[桌面启动器安装](/getting-started/desktop-installation)选择下载链接。

PostgreSQL 保存玩家、权限、审计记录和地图脚本等永久数据。不要通过删除数据库卷来解决连接问题；先检查配置并备份数据。
