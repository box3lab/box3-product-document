# 创作、预览与发布

先按[首次启动](/getting-started/first-start)准备服务和创作权限，再跟着下面的流程制作第一个作品。

<div class="install-flow" role="list" aria-label="从作品到游玩">
  <div class="install-step" role="listitem"><span class="install-step-number">01</span><strong>创建作品</strong><p>在 Creator 编辑地图、脚本和模型。</p></div>
  <div class="install-step" role="listitem"><span class="install-step-number">02</span><strong>预览并备份</strong><p>运行测试，导出可编辑工程。</p></div>
  <div class="install-step" role="listitem"><span class="install-step-number">03</span><strong>导出游戏包</strong><p>将完成的地图保存为发布版本。</p></div>
  <div class="install-step" role="listitem"><span class="install-step-number">04</span><strong>导入游玩端</strong><p>在后台开放地图，邀请玩家进入。</p></div>
</div>

## 1. 创建一个小作品

1. 从管理器打开 Creator，用已获授权的玩家账号登录。
2. 在作品列表点击“**新建作品**”，填写名称，首次可选较小的地图尺寸。
3. 进入 ARENA 编辑器，放置一些体素，保存地图。
4. 需要模型时，从项目模型库打开 VOXA，制作并保存后返回地图使用。

编辑器的具体操作见 [ARENA 手册](https://docs.box3lab.com/arena/)和 [VOXA 手册](https://docs.box3lab.com/voxa/)。

## 2. 预览并保存工程

在编辑器中运行或预览，确认地图和资源正常。修改脚本后，重新运行检查效果。

回到作品列表，在“**更多操作 → 导出**”中导出地图组工程，保留 `.boxproject` 文件。这是以后继续编辑和迁移的备份。

## 3. 导出游戏包

1. 保存所有地图、脚本和模型。
2. 在主地图的“**更多操作 → 导出 → 导出游戏包**”中开始导出。
3. 填写版本号，首次可用 `v1.0.0`。
4. 首次选择“**仅本地资源**”，无需另外配置对象存储。
5. 保存生成的 `.boxplay` 文件。

| 文件 | 用在哪里 |
| --- | --- |
| `.boxproject` | 导入 Creator，继续编辑 |
| `.boxplay` | 导入 Play，供玩家游玩 |

**不要用游戏包代替工程备份。** 游戏包保存的是发布时的快照，后续编辑不会自动更新它。

## 4. 导入并开放地图

1. 打开玩家管理后台，使用服主或有地图管理权限的管理员账号登录。
2. 进入“**游玩管理 → 游玩地图 → 导入游玩包**”。
3. 选择 `.boxplay`，查看地图和资源预览，确认导入。
4. 将地图组设置为“**开放**”，复制后台提供的游玩地址。

Creator 里的作品不会自动出现在 Play 列表中，必须完成这一步。

## 5. 邀请玩家测试

用玩家账号打开游玩地址，或在[玩家启动器](/guide/player-launcher)添加 Play 服务器。首次下载资源后进入地图。

测试多人时，使用不同浏览器配置或不同设备登录两个玩家账号；同一浏览器的两个标签页通常仍是同一玩家。

之后修改作品时，使用新的地图版本导出，再按[游玩地图管理](/guide/play-maps)更新。
