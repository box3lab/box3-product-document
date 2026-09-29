# 引擎桌面版安装

::: tip 遇到问题？欢迎进群交流
安装或使用过程中遇到困难，可以先加入 QQ 群「Box3Local秘密基地」提问交流：[1107448537](https://qm.qq.com/q/yV2NR8skec)
:::

BOX3 Engine Launcher 是管理本地引擎的桌面程序。它会调用 Docker 来导入 BOX3 服务镜像、创建和运行容器，并管理服务配置与运行状态。**安装启动器之前，先安装并启动 Docker；Windows 电脑还需要启用硬件虚拟化并安装 WSL 2。**

启动器支持 Windows、macOS 和带桌面的 Linux。下面先介绍所有系统都需要完成的准备，再分别说明 Windows、macOS 和 Linux 的 Docker 配置。

## 安装流程

<div class="install-flow">
  <div class="install-step"><span class="install-step-number">01</span><strong>检查电脑</strong><p>确认系统、处理器架构、内存和磁盘空间。</p></div>
  <div class="install-step"><span class="install-step-number">02</span><strong>准备 Docker</strong><p>Windows 启用虚拟化并安装 WSL 2，再安装 Docker Desktop。</p></div>
  <div class="install-step"><span class="install-step-number">03</span><strong>下载启动器</strong><p>下载与你的系统和处理器架构匹配的安装包。</p></div>
  <div class="install-step"><span class="install-step-number">04</span><strong>启动并检查</strong><p>启动 Docker，再打开 BOX3 Engine Launcher。</p></div>
</div>

## 1. 检查电脑配置

| 项目 | 最低配置 | 推荐配置 |
| --- | --- | --- |
| CPU | 4 核 | 8 核及以上 |
| 内存 | 8 GB | 16 GB 及以上 |
| 可用磁盘 | 15 GB | 30 GB 及以上 |

镜像、地图工程、模型、数据库、运行时容器和本地备份都会占用磁盘空间。地图数量、脚本复杂度以及同时运行的地图也会影响实际资源占用。下载启动器时，请同时确认系统类型和 CPU 架构（例如 Windows x64、macOS Apple 芯片或 Intel）。

## 2. 安装并启动 Docker

### Docker 是什么

Docker 是运行容器的工具。可以把容器理解为相互隔离、按需启动的服务运行环境。BOX3 本地引擎的服务以 Docker 镜像和容器的形式运行，因此启动器需要连接一台正在运行的 Docker Engine。只安装启动器不能代替安装 Docker。

### Windows：先启用虚拟化，再安装 WSL 2

Docker Desktop 在 Windows 上使用 WSL 2 运行 Linux 容器。WSL 2 需要 CPU 硬件虚拟化支持，并且 Windows 中已启用虚拟机平台功能。

1. **检查 Windows 版本。** 按 `Win + R`，输入 `winver` 并回车。建议先通过“设置 → Windows 更新”安装可用更新。`wsl --install` 适用于 Windows 11，或 Windows 10 版本 2004（内部版本 19041）及以上。
2. **检查虚拟化状态。** 按 `Ctrl + Shift + Esc` 打开任务管理器，选择“性能 → CPU”，查看“虚拟化”是否显示为“已启用”。
3. **如果显示为已禁用，请在 BIOS/UEFI 中开启。** 重启电脑并进入 BIOS/UEFI 设置，开启处理器虚拟化选项。选项名称因电脑厂商而异，常见名称包括 Intel Virtualization Technology（VT-x）或 AMD SVM Mode（AMD-V）。保存设置并重启。不同品牌进入 BIOS/UEFI 的按键和菜单位置不同，请参考电脑厂商说明；如果是公司管理的电脑且无法修改，请联系管理员。
4. **安装 WSL 2。** 在开始菜单中搜索“PowerShell”，右键选择“以管理员身份运行”，执行：

   ```powershell
   wsl --install
   ```

   该命令会启用 WSL 和虚拟机平台、设置 WSL 2，并通常安装 Ubuntu。按提示重启电脑。如果命令提示需要重启，请先重启，再继续后面的检查。

5. **确认 WSL 2 已就绪。** 重启后再次以管理员身份打开 PowerShell，执行：

   ```powershell
   wsl --update
   wsl --status
   wsl --list --verbose
   ```

   确认默认版本为 `2`，并且已安装的 Linux 发行版在 `VERSION` 列显示 `2`。如果发行版仍为版本 `1`，可以执行 `wsl --set-version Ubuntu 2`；如果发行版名称不是 Ubuntu，请将命令中的 `Ubuntu` 替换为 `wsl --list --verbose` 显示的名称。

6. **安装 Docker Desktop。** 从 [Docker Desktop 下载页面](https://www.docker.com/products/docker-desktop/)下载安装包并按安装程序提示完成安装。安装时选择 WSL 2 后端（如果安装程序提供该选项）。安装完成后打开 Docker Desktop，并等待界面显示 Docker Engine 正在运行。
7. **确认 Docker 可以使用。** 打开 PowerShell，执行：

   ```powershell
   docker version
   ```

   输出中同时出现 `Client` 和 `Server` 信息，表示命令行已连接到 Docker Engine。若只有 `Client` 或提示无法连接，请先确认 Docker Desktop 已启动并显示 Engine 正常运行。

::: tip
如果 `wsl --install` 提示命令不支持，先安装 Windows 更新并重启，然后重试。旧版 Windows 可能需要按 [Microsoft 的 WSL 安装说明](https://learn.microsoft.com/windows/wsl/install)手动启用“适用于 Linux 的 Windows 子系统”和“虚拟机平台”。如果仍提示虚拟化不可用，请回到 BIOS/UEFI 检查虚拟化是否已启用；虚拟机中的 Windows 还需要宿主机提供嵌套虚拟化。
:::

### macOS

从 [Docker Desktop 官方页面](https://www.docker.com/products/docker-desktop/)下载适用于 Mac 的版本，按提示安装并启动 Docker Desktop。根据 Mac 处理器选择 Apple 芯片或 Intel 版本。等待 Docker Desktop 显示 Docker Engine 已启动后再继续。

### Linux 桌面版

Linux 桌面版需要可访问的 Docker Engine。请按所用发行版的说明安装并启动 Docker Engine，并确认当前用户有权限访问 Docker。可在终端运行 `docker version` 检查连接状态；输出中应同时包含 `Client` 和 `Server` 信息。

## 3. 下载并安装 BOX3 Engine Launcher

1. 从 BOX3 提供的下载页面下载对应系统和 CPU 架构的 BOX3 Engine Launcher。请勿从不可信来源下载启动器或镜像归档。
2. 如果下载的是 ZIP 文件，先完整解压到本地目录，不要直接在压缩包内运行。
3. 将应用放到固定位置，再启动程序。macOS 若提示无法确认开发者，请先核对安装包来自正式渠道，再前往“系统设置 → 隐私与安全性”允许打开。
4. Windows SmartScreen 显示提示时，先核对应用名称和发布者，再按组织的安全要求决定是否继续。

## 4. 首次打开启动器

1. 确认 Docker Desktop（Windows/macOS）或 Docker Engine（Linux）仍在运行。
2. 打开 BOX3 Engine Launcher。若系统询问是否允许网络访问，请根据你的部署方式和网络策略处理。
3. 按启动器界面提示导入镜像并配置服务。首次导入镜像可能需要一些时间，并会占用磁盘空间。
4. 如果启动器提示无法连接 Docker，请先检查 Docker 是否已启动，再运行 `docker version`；确认命令行连接正常后重新打开启动器。

## 完成安装

安装完成后，继续阅读[首次启动](/getting-started/first-start)，完成数据库、访问范围、端口和密钥配置。

::: tip
关闭启动器窗口不会停止已经运行的 Docker 容器。需要停止服务时，请在“服务总览”中操作。关闭或退出 Docker Desktop 则可能使依赖它运行的本地服务无法继续工作。
:::
