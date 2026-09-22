# 预览运行 Q&A

地图预览使用 `apc runtime` 管理 Creator 编辑器中已有的 Preview Run：

```bash
apc runtime status
apc runtime start
apc runtime restart
apc runtime stop
apc runtime logs --follow
```

它不会打开浏览器、发布游玩端、创建新的容器或上传脚本。需要先在 Creator 中打开目标地图，并确保工程已绑定正确的 Profile 和永久地图 ID。

## 1. 常用操作

```bash
# 查看 Preview Run 是否正在运行
apc runtime status

# 启动、重启、停止当前 Creator 编辑器的预览运行
apc runtime start
apc runtime restart
apc runtime stop

# 跟随全部控制台日志
apc runtime logs --follow

# 只查看服务端错误
apc runtime logs --follow --side server --level error
```

`runtime logs` 可以使用 `--side client|server`、`--level error|warn|info|debug` 和 `--grep <文本>` 过滤日志。开发构建会保留 sourcemap，CLI 可将部分堆栈定位回 TypeScript 源文件。

## 2. 预览命令失败如何排查？

1. 运行 `apc project info`，确认 Profile、永久地图 ID 和 Creator 连通性；
2. 在 Creator 中打开同一张地图，确认当前账号有运行控制权限；
3. 用 `apc runtime status` 查看当前状态；
4. 若日志无法连接，先运行 `apc profile test <profile>`，再检查 Token 是否具备运行控制权限。

可以使用 `--profile <名称>` 和 `--project <永久地图ID>` 临时指定目标，不会改写 `.env`。
