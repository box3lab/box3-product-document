# BOX3 玩家启动器

BOX3 Player Launcher 是供玩家使用的桌面应用。添加服主提供的游玩服务器后，即可登录账号、选择地图并开始游玩。玩家无需安装 Docker。

启动器支持保存服务器、搜索地图、收藏与最近游玩记录，以及本机地图资源缓存管理。它需要连接正在运行的游玩服务器。

## 1. 下载安装

根据系统和处理器架构选择安装包：

| 系统与处理器 | 下载 |
| --- | --- |
| Windows x64 | [下载安装程序](https://assets.box3.fun/box-player-launcher/player-v0.1.0/BOX3-Player-Launcher-0.1.0-windows-amd64.exe) |
| Windows ARM64 | [下载安装程序](https://assets.box3.fun/box-player-launcher/player-v0.1.0/BOX3-Player-Launcher-0.1.0-windows-arm64.exe) |
| macOS Apple 芯片（ARM64） | [下载 DMG](https://assets.box3.fun/box-player-launcher/player-v0.1.0/BOX3-Player-Launcher-0.1.0-macos-arm64.dmg) |
| Linux x64 | [下载 AppImage](https://assets.box3.fun/box-player-launcher/player-v0.1.0/BOX3-Player-Launcher-0.1.0-linux-amd64.AppImage) |
| Linux ARM64 | [下载 AppImage](https://assets.box3.fun/box-player-launcher/player-v0.1.0/BOX3-Player-Launcher-0.1.0-linux-arm64.AppImage) |

- **Windows**：打开 `.exe`，按提示完成安装。
- **macOS**：打开 `.dmg`，将应用拖入“应用程序”后打开。
- **Linux**：为 `.AppImage` 添加执行权限，再打开文件：

  ```bash
  chmod +x BOX3-Player-Launcher-0.1.0-linux-*.AppImage
  ```


## 2. 添加服务器并游玩

1. 打开启动器，选择“添加服务器”。
2. 输入服主提供的 **Play 游玩地址**。
3. 使用该服务器的玩家账号登录。
4. 搜索或选择地图，点击开始游玩。

不同服务器的账号与登录状态分别保存。地址或账号有问题时，请联系对应服务器的服主。

## 3. 管理本机缓存

打开“本机存储”，选择服务器和地图，可查看或清理已缓存资源。清理后，下次游玩会重新下载所需资源；地图运行时需先退出游玩再清理。

地图缓存只用于加快加载，游玩仍需连接服务器。服主部署服务请阅读[首次启动](/getting-started/first-start)，管理玩家请阅读[玩家管理后台](/guide/player-admin)。
