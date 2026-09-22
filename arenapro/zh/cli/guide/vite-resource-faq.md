# 资源同步 Q&A

资源同步使用 `apc map resource`。它只会写入 CLI 生成的资源索引和 DTS，不会修改 `client/src`、`server/src`、`shares` 中的业务代码。

## 1. 有哪些同步类型？

```bash
# 同步 Creator 地图的模型、图片、音频和 UI 索引（默认）
apc map resource --type assets

# 仅同步公开的服务端和客户端 DTS
apc map resource --type dts

# 依次同步 DTS 与地图资源索引
apc map resource --type all

# 只为 HUD 开头的 UI 节点生成索引
apc map resource --type assets --ui-prefix HUD
```

`assets` 需要读取绑定地图的权限，会使用 `.env` 的 `VITE_BOX_CREATOR_PROFILE` 和 `VITE_BOX_CREATOR_PROJECT_ID`。`dts` 从公开源同步，不需要 Profile、地图 ID 或 Token。

## 2. 会生成什么？

资源索引包含模型、图片、音频、UI 屏幕和 UI 节点路径的 TypeScript 类型。它们是派生文件：不要手动编辑；Creator 中的资源或 UI 变更后，重新执行 `apc map resource --type assets`。

可用 `--project <永久地图ID>` 和 `--profile <名称>` 临时指定目标，不会改动工程 `.env`：

```bash
apc map resource --type assets --profile staging --project <permanentMapId>
```

## 3. 同步失败如何排查？

按以下顺序检查：

1. 检查 Profile 和服务器连接：

   ```bash
   apc profile test local
   ```

2. 确认地图 ID 存在且当前 Token 有资源读取权限：

   ```bash
   apc map list --profile local
   apc project info
   ```

3. 检查工程 `.env` 中是否已配置 `VITE_BOX_CREATOR_PROFILE` 与 `VITE_BOX_CREATOR_PROJECT_ID`；缺失时重新绑定：

   ```bash
   apc project bind <permanentMapId> --profile local
   ```

4. 只在 DTS 同步失败时，检查本机是否能访问其公开下载源；该操作与 Creator Token 无关。

## 4. 什么时候执行？

- 新工程绑定地图后执行一次 `apc map resource --type all`；
- 在 Creator 中更改模型、图片、音频或 UI 后执行 `apc map resource --type assets`；
- 切换 Profile 或永久地图 ID 后，再同步该目标的资源索引。
