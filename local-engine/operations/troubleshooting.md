# 常见问题

排查时先记录时间、操作步骤、页面错误和服务日志。**不要删除数据目录或 Docker 卷来试错。**

## 页面打不开

依次检查 Docker、目标服务、地址和端口、访问范围及防火墙。Linux 可运行：

```bash
cd /opt/box3-engine
./status.sh
docker ps
```

云服务器还需确认云安全组已放行对应端口。首页可打开、刷新子页面返回 404 时，检查反向代理是否将前端路由转发到应用入口。

## 接口返回 503

1. 确认 Player Service 和 PostgreSQL 正常运行。
2. 查看日志：

   ```bash
   ./logs.sh player-service
   ./logs.sh managed-postgres
   ```

3. 检查数据库连接配置、迁移状态和 Docker Socket 权限。

## 登录失败或被限流

停止重复尝试，等待临时限制结束。确认使用的是正确账号与凭据：`BOX_SERVER_MANAGER_TOKEN` 登录 Linux Web 管理器，`BOX_PLAY_ADMIN_TOKEN` 用于 owner 身份。再确认管理员账号没有停用、浏览器没有保留旧会话。

## PostgreSQL 无法连接

检查主机、端口、数据库名、用户名、密码和 SSL。如果已有数据卷但 `.env` 丢失，不要生成新密码连接旧卷；恢复创建数据卷时使用的配置，并先备份数据。

## 地图包导入失败

1. 确认导入的是兼容版本 Creator 发布的 `.boxplay`，不是 `.boxproject`。
2. 不要手工修改包内清单；从 Creator 重新发布后再试。
3. 检查上传是否完成、磁盘临时空间是否充足。
4. 记录请求时间和错误信息，再查看 Play 与玩家服务日志。

导入前可以预览地图 ID、主副地图、脚本和资源；预览不会执行脚本。

## 地图容器未显示或启动失败

1. 确认地图确实创建了运行时容器。
2. 确认后台与桌面启动器连接同一个 Docker Engine。
3. 检查 Player Service 是否可以访问 Docker Socket。
4. 查看运行时容器和日志：

   ```bash
   docker ps --filter label=com.docker.compose.project=box-local-engine-runtime
   docker logs <容器名称>
   ```

5. 检查地图配置、资源组、镜像、磁盘空间和内存上限。

内存不足时先检查脚本是否持续创建对象、计时器或缓存，再评估是否提高资源组上限。不要给所有地图设置无限或过高上限。

## 桌面镜像下载中断

1. 确认可以访问 `https://assets.box3.fun`，代理没有拦截 Range 请求。
2. 确认磁盘空间足够，不要手动编辑或清理 `engine-images/` 缓存文件。
3. 在启动器中重试。启动器会尝试断点续传，并在导入前校验 SHA-256。
4. 仍失败时，记录启动器版本、系统架构和错误信息。

## 找回 Linux 管理端密钥

```bash
cd /opt/box3-engine
sed -n 's/^BOX_SERVER_MANAGER_TOKEN=//p' .env
```

该命令读取管理端登录密钥。服主管理后台使用 `BOX_PLAY_ADMIN_TOKEN`，两者不可混用。

## 联系维护者前

准备本地引擎版本、操作系统和 CPU 架构、Docker 与 Compose 版本、复现步骤、服务状态及已脱敏日志。不要发送 `.env`、Token、密码、Cookie、玩家 IP 或未脱敏的数据包。
