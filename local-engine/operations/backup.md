# 备份与恢复

完整备份需要同时保护文件数据、PostgreSQL 和关键配置。只在启动器中创建地图备份，不能替代数据库备份。

## 需要备份的数据

| 数据 | 主要内容 | 备份方式 |
| --- | --- | --- |
| Creator 工程 | 可编辑地图工程 | 启动器备份或复制工程目录 |
| Play 地图库 | 已安装的 `.boxplay` 地图 | 启动器备份或复制地图库 |
| VOXA 数据 | 模型、皮肤和动画 | 启动器备份或复制数据目录 |
| PostgreSQL | 玩家、权限、审计和地图脚本永久数据 | `pg_dump` 或数据库快照 |
| 配置 | 端口、密钥、数据库连接和安装标识 | 备份 `.env` 或启动器配置目录 |
| 许可证 | 当前设备的许可证文件 | 备份许可证目录 |

Redis、构建结果和运行时缓存可以重新生成，通常不作为永久数据源。

## 使用启动器创建备份

1. 打开“数据与备份”。
2. 选择创建备份。
3. 填写便于识别的名称。
4. 等待备份完成。
5. 将备份导出到启动器数据目录之外。

建议在下面的时间点创建备份：

- 导入或更新重要地图前
- 修改存储目录前
- 升级本地引擎前
- 批量修改玩家或权限前
- 恢复历史数据前

::: warning
启动器文件备份不包含 PostgreSQL。玩家账号、管理员、权限组和审计记录需要单独备份数据库。
:::

## 备份内置 PostgreSQL

先找到 PostgreSQL 容器名称：

```bash
docker ps --format '{{.Names}}' | grep postgres
```

然后使用数据库实际的用户名和数据库名执行 `pg_dump`。示例：

```bash
docker exec <PostgreSQL容器名> pg_dump \
  -U <数据库用户> \
  -d <数据库名> \
  -Fc > box3-postgres.dump
```

`-Fc` 会生成 PostgreSQL 自定义格式，恢复时可以使用 `pg_restore`。

备份完成后检查文件不是空文件：

```bash
ls -lh box3-postgres.dump
```

## 备份外部 PostgreSQL

外部数据库可以在数据库服务器执行：

```bash
pg_dump \
  --host=<数据库地址> \
  --port=<端口> \
  --username=<数据库用户> \
  --dbname=<数据库名> \
  --format=custom \
  --file=box3-postgres.dump
```

如果使用云数据库，也可以使用服务商提供的自动快照。确认快照保留周期符合你的恢复要求。

## Linux 配置备份

Linux 默认安装目录为 `/opt/box3-engine`。至少保存：

```text
.env
license/
apps/local-engine/projects/
apps/local-engine/play-worlds/
apps/local-engine/backups/
apps/voxa/data/
```

实际目录可能因版本和自定义数据目录不同而变化。应以当前安装目录与管理端显示的位置为准。

必须保留 `.env` 中的安装密钥和已有数据库凭据。只复制数据卷、不保留原凭据，可能导致新环境无法连接原数据库。

## 恢复文件备份

1. 确认目标版本兼容备份。
2. 停止 Creator、VOXA、Play 和玩家服务。
3. 在“数据与备份”中导入备份。
4. 核对备份信息后执行恢复。
5. 恢复完成后启动服务。
6. 检查工程、地图和模型是否完整。

不要在服务仍持续写入时直接覆盖数据目录。

## 恢复 PostgreSQL

恢复前先创建当前数据库的额外备份。然后根据部署方式将备份文件传入 PostgreSQL 容器或数据库服务器，并使用 `pg_restore`。

示例：

```bash
cat box3-postgres.dump | docker exec -i <PostgreSQL容器名> pg_restore \
  -U <数据库用户> \
  -d <数据库名> \
  --clean \
  --if-exists
```

`--clean` 会先删除备份中已有的对象，属于高风险操作。只能对确认过的目标数据库执行。

## 验证备份

备份完成不代表一定可以恢复。应定期在隔离环境中验证：

- 备份文件可以读取
- PostgreSQL 备份可以列出内容
- 地图工程可以打开
- Play 可以加载恢复后的地图
- 玩家和管理员可以登录
- 权限组和审计记录完整

至少保留一份不在当前设备上的备份，避免磁盘损坏同时丢失服务和备份。
