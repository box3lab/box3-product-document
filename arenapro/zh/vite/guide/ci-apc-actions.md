# 在 CI 中使用 `apc` 命令

> 本文介绍如何在持续集成（CI）中使用 ArenaPro Vite CLI（`apc`），
> 以 GitHub Actions 为主进行示例，其他平台（Gitee Go、GitLab CI 等）可以按同样思路迁移。

## 1. 为什么要在 CI 里跑 `apc`

在本地你通常会这样工作：

1. `apc dev`：边写边看效果；
2. `apc build`：发布前做一次正式构建。

在团队协作场景里，如果每个人都只在本地随缘构建，很容易出现：

- 某个 PR 合并后，才发现类型不通过或构建失败；
- 不同人本地环境不一致，导致“我这边能过，你那边不过”。

把 `apc tsc-check` / `apc build` 放进 CI，可以带来的好处：

- **统一入口**：所有分支统一在 CI 中跑一遍类型检查和构建；
- **尽早暴露问题**：PR 一提交，CI 就能告诉你这版有没有“能跑起来”；
- **与上传解耦**：CI 中只做“检查构建是否正常”，不必真的上传到神岛。

下面的示例会默认只做「类型检查 + 构建」，不做上传。

## 2. GitHub Actions 示例：只做构建检查

这是一个最小工作流，你可以把它保存为 `.github/workflows/build.yml`：

```yaml
# 工作流名称
name: 检查 ArenaPro Vite 是否正常构建

on:
  push:
    # 推送到 main 分支时触发
    branches: [main]
    # 任意 PR 也会触发
  pull_request:

jobs:
  # 定义一个名为 build 的任务
  build:
    # 使用官方提供的 Ubuntu 运行环境
    runs-on: ubuntu-latest

    steps:
      # 第一步：检出当前仓库代码
      - name: 检出仓库代码
        uses: actions/checkout@v4
      # 第二步：安装 / 配置 Node.js 环境
      - name: 安装 Node.js 运行环境
        uses: actions/setup-node@v4
        with:
          # 使用 Node.js 22 版本
          node-version: 22
      # 第三步：安装当前项目所有依赖
      - name: 安装项目依赖
        run: npm ci
      # 第四步：执行正式构建，但不上传至神岛地图中
      - name: 构建 ArenaPro Vite 项目
        env:
          # 显式关闭自动上传
          VITE_UPDATE_FILE: "false"
        run: npm run build
```

### 2.1 这个工作流具体做了什么？

触发条件：

- 推送到 `main` 分支；
- 任意分支发起的 Pull Request。

执行流程：

1. **Checkout 仓库代码**：
   - 相当于在 CI 机器上 clone 了当前仓库。
2. **安装 Node.js 22**：
   - 保证和推荐的运行版本一致。
3. **安装依赖**：
   - 使用 `npm ci`，基于 lockfile 做一次干净安装。
4. **正式构建（不上传）**：
   - 设置 `VITE_UPDATE_FILE="false"`，
   - 运行 `npm run build`（脚本内部调用 `apc build`），验证构建是否能完整跑通。

可以把它理解为：

> 每次 push / PR，自动帮你跑了一次 `npm run build`（内部调用 `apc build`），
> 用来提前发现“这版代码能不能顺利通过构建”。

### 2.2 可按需修改的部分

- **触发分支**：
  - 如果你用 `master` 或其他分支名，把 `branches: [main]` 改成对应名字即可。
- **Node 版本**：
  - 建议与文档推荐的版本保持一致（如 22）；
  - 如团队统一使用其他版本，可以相应替换。
- **是否需要类型检查步骤**：
  - 有些团队只关心构建是否能过，可以只保留 `apc build` 这一步；
  - 推荐保留 `apc tsc-check`，错误更容易读。

## 3. 如果需要在 CI 中自动上传怎么办？

> ⚠️ 这一小节属于「进阶用法」。只有在你非常确定需要在 CI 中自动部署到某张地图时，再考虑开启。

要在 CI 中自动上传，需要：

1. `VITE_UPDATE_FILE=true`；
2. 配置好账号和地图信息：
   - `VITE_DAO3_AUTH`（Token）
   - `VITE_DAO3_UA`（UA 标识）
   - `VITE_DAO3_MAP_ID`（地图 ID）

在 GitHub Actions 里，**不要把这些值写死在仓库里**，而是：

- 在仓库 Settings → Secrets and variables → Actions → Repository secrets 中，新增：
  - `VITE_DAO3_AUTH`
  - `VITE_DAO3_UA`
  - `VITE_DAO3_MAP_ID`

然后在 workflow 里这样写：

```yaml
- name: 构建 ArenaPro Vite 项目并同步神岛
  env:
    VITE_UPDATE_FILE: "true"
    VITE_DAO3_AUTH: ${{ secrets.VITE_DAO3_AUTH }}
    VITE_DAO3_UA: ${{ secrets.VITE_DAO3_UA }}
    VITE_DAO3_MAP_ID: ${{ secrets.VITE_DAO3_MAP_ID }}
  run: npx apc build
```

这代表：

- CI 会用 Secrets 中的账号信息做一次正式构建并上传；
- 上传到哪张地图，由 `.env` 和 Secrets 中的 `VITE_DAO3_MAP_ID` 决定。

> 建议：多数项目只需要在 **手动发布流程** 中使用自动上传，
> 日常 PR/分支 CI 依然推荐只做「类型检查 + 构建是否成功」。

## 4. 迁移到其他 CI 平台的思路

即使不是 GitHub Actions，只要 CI 支持执行自定义命令，思路都是类似的：

1. 准备 Node.js 环境；
2. 安装依赖：`npm ci`；
3. 运行 `npx apc tsc-check`；
4. 运行 `VITE_UPDATE_FILE=false npx apc build`；
5. 如需上传，再补充 Token / UA / MapId 等环境变量。

例如在 Gitee Go / GitLab CI 中，也可以按照上述 4 步翻译成对应的 YAML 格式即可。
