# GitHub Actions：构建与 Creator 上传

> 本文使用 GitHub Actions 说明如何验证 Creator 工程构建，以及如何在受控流程中上传脚本。GitLab CI、Gitee Go 等平台可使用相同的环境变量与 APC 命令。

## 1. 为什么要在仓库里跑流水线

本地开发使用 `npm run dev` 监听并构建脚本；CI 应承担两项独立工作：

1. 对提交和 Pull Request 执行不上传的构建检查；
2. 在明确的发布触发条件下，使用独立 Token 上传脚本。

在一个人开发的小 Demo 里，这样其实问题不大。但在**团队协作**里，如果每个人都只在本地随缘构建，很容易出现：

- 某个 PR 合并后，才发现类型不通过或构建失败；
- 不同人本地 Node / 依赖版本不一致，导致“我这边能过，你那边不过”；
- 有人忘了跑 `build`，直接把未验证的改动合进主干。

把「类型检查 + 构建」放进 CI，可以带来的好处可以分几类来看：

- **统一入口，避免“口口相传”的约定**：
  - 不再依赖“大家记得手动跑一下构建”；
  - 规范写在 workflow 里，新同学 clone 项目就知道：什么操作是“必跑”的。
- **尽早暴露问题，而不是上线才发现**：
  - PR 一提交，CI 就能告诉你这版有没有“能跑起来”；
  - 把“能通过构建”当成合并前的最低门槛。
- **环境可重复，排查问题更容易**：
  - CI 机器的 Node 版本、依赖安装方式是固定的；
  - 当 CI 过、本地不过时，你更容易定位是“本地环境问题”；
  - 反过来，如果本地过、CI 挂了，也能逼着团队统一到同一套环境上。
- **与上传解耦，降低风险**：
  - 日常 PR / 分支的 CI，可以只做“类型检查 + 构建是否成功”，**不上传**到 Creator 地图；
  - 真正的上传动作可以只放在专门的发布流程里（例如打 tag、手动触发 workflow）。

结合 Creator 工程的实际场景，可以这样理解：

- 本地 `dev`：监听源码变化、重新构建，并按环境变量决定是否上传；
- CI `build`：验证该提交能否由干净环境构建；
- CI 上传：仅在受控分支、标签或手动审批后执行。

## 2. GitHub Actions 示例：只做构建检查

这是一个最小工作流，你可以把它保存为 `.github/workflows/build.yml`：

```yaml
# 工作流名称
name: 检查项目是否正常构建

on:
  push:
    # 推送到 main 分支时触发
    branches: [main]
    # 任意 PR 也会触发
  pull_request:

permissions:
  contents: read

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
          cache: npm
      # 第三步：安装当前项目所有依赖
      - name: 安装项目依赖
        run: npm ci
      # 第四步：执行正式构建，但不上传至 Creator 地图
      - name: 只构建，不上传脚本
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
   - 运行 `npm run build`，验证构建是否能完整跑通。

可以把它理解为：

> 每次 push / PR，自动帮你跑了一次 `npm run build`，
> 用来提前发现“这版代码能不能顺利通过构建”。

### 2.2 可按需修改的部分

- **触发分支**：
  - 如果你用 `master` 或其他分支名，把 `branches: [main]` 改成对应名字即可。
- **Node 版本**：
  - 建议与文档推荐的版本保持一致（如 22）；
  - 如团队统一使用其他版本，可以相应替换。

### 2.3 可选：在流水线中增加单元测试

是否要在流水线中跑单元测试，可以按项目体量和复杂度来决定：

- **推荐打开**：
  - 项目里有较多逻辑（数值计算、状态管理、复杂交互等）；
  - 仓库会被多人长期维护，希望避免“改一处、坏一片”。
- **可以暂时不打开**：
  - 纯展示型 Demo、逻辑非常薄；
  - 当前阶段主要目的是先把构建流程稳定下来。

推荐做法是：

1. 在 `package.json` 里约定一个统一入口，例如：

   ```json
   {
     "scripts": {
       "test": "vitest"
     }
   }
   ```

   > 提醒：脚手架里**不会自带 Vitest** ，需要你根据团队习惯自行安装（例如：`npm install -D vitest`），再通过 `scripts.test` 把它挂到 `npm test` 上。

   无论底层用 Vitest / Jest 还是其他框架，只要保证 `npm test` 在本地和 CI 中行为一致即可。

2. 在 GitHub Actions 的工作流中，把“测试”这一步放在构建之前：

   ```yaml
   - name: 运行单元测试
     run: npm test

   - name: 构建 ArenaPro Vite 项目
     env:
       VITE_UPDATE_FILE: "false"
     run: npm run build
   ```

这样一来：

- 单测挂了，后面的构建不会继续，PR / 合并会直接标红；
- CI 实际流程就变成了：“装依赖 → 跑测试 → 跑构建”，既保证能跑起来，也尽量保证逻辑不被意外改坏。

## 3. 发布版本流水线

上面的示例主要解决的是「日常 push / PR 是否能正常构建」的问题，也就是“这版代码能不能顺利构建出来”。

要在 CI 中自动上传，需要为流水线创建独立、最小权限的 CLI Token。不要复用个人 Token。

在仓库 **Settings → Secrets and variables → Actions** 中配置：

| 名称 | 放置位置 | 说明 |
| --- | --- | --- |
| `BOX_CREATOR_TOKEN` | Repository secret | 必填。Creator CLI Token，绝不写进仓库、日志或 `.env`。 |
| `BOX_CREATOR_ENDPOINT` | Repository variable 或 secret | 必填。Creator 服务地址，例如 `https://creator.example`。 |
| `BOX_CREATOR_PROJECT_ID` | Repository variable 或 secret | 必填。目标地图的永久地图 ID。 |

若地址或地图 ID 也属于内部信息，可同样放入 Secret，随后把示例中的 `vars` 改为 `secrets`。

```yaml
name: 发布版本并上传到 Creator

on:
  push:
    # 只在打 tag 时触发
    tags:
      # 只有推送 tag，并且 tag 名字 以 v 开头 时，这个 workflow 才会触发。
      - "v*"

permissions:
  contents: read

concurrency:
  group: creator-upload-production
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 检出仓库代码
        uses: actions/checkout@v4

      - name: 安装 Node.js 运行环境
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: 安装项目依赖
        run: npm ci

      - name: 安装 APC
        run: npm install -g @box3lab/arenapro-cli

      - name: 配置 Creator Profile
        env:
          BOX_CREATOR_ENDPOINT: ${{ vars.BOX_CREATOR_ENDPOINT }}
          BOX_CREATOR_TOKEN: ${{ secrets.BOX_CREATOR_TOKEN }}
        run: |
          apc profile add production \
            --endpoint "$BOX_CREATOR_ENDPOINT" \
            --token "$BOX_CREATOR_TOKEN"

      - name: 构建并上传脚本
        env:
          VITE_BOX_CREATOR_PROFILE: production
          VITE_BOX_CREATOR_PROJECT_ID: ${{ vars.BOX_CREATOR_PROJECT_ID }}
          VITE_UPDATE_FILE: "true"
          VITE_BOX_CREATOR_VERSION: "true"
        run: npm run build
```

### 3.1 发布任务会做什么

这条流程按以下顺序执行：

1. 从 lockfile 安装依赖；
2. 全局安装 APC；
3. 在这台临时 CI 机器上创建 `production` Profile，并将 Token 保存到 APC 私密配置；
4. 将 Profile 名称与永久地图 ID 作为公开 Vite 环境变量传给构建；
5. 使用 `VITE_UPDATE_FILE="true"` 构建并上传脚本；
6. 使用 `VITE_BOX_CREATOR_VERSION="true"` 在远程脚本名中追加根 `package.json` 的版本号。

CI 任务结束后，虚拟机及本机 Profile 凭据都会被销毁；它不会改写仓库中的 `.env`。

这条发布流水线和前面的「构建检查流水线」最大的区别在于：

- **触发时机不同**：
  - 构建检查：日常 `push` / `pull_request`；
  - 发布流水线：只在打 tag 或手动触发时运行。
- **是否开启上传**：
  - 构建检查：`VITE_UPDATE_FILE="false"`，只看能不能构建过；
  - 发布流水线：`VITE_UPDATE_FILE="true"`，先临时配置 Creator Profile，再使用永久地图 ID 执行上传。

**发布版本流水线**的作用是：

- 只在你**明确打了一个版本 tag** 时运行（例如 `v1.2.3`）；
- 在 CI 机器上按统一环境做一次正式构建；
- 使用独立 Token，把这一版脚本上传到指定 Creator 地图；
- `VITE_BOX_CREATOR_VERSION="true"` 时，CLI 使用根 `package.json` 的版本号追加远程脚本文件名；
- Token 只在当前任务环境中存在，不写入工程 `.env` 或构建产物。

### 3.2 Token 最小权限

仅上传脚本的 Token 至少需要 `scripts.update`。不要为构建上传授予数据空间、资源管理或预览运行控制权限；这些能力需要单独的受控任务和相应 scope。

如果发布流程还需要同步 Creator 资源索引，再额外授予读取资源所需权限，并在上传前显式执行：

```bash
apc map resource --type assets --profile production --project <permanentMapId>
```

这一步会写入工程生成的资源索引，应只在确实需要将生成文件纳入构建时启用。

## 4. 失败排查

| 现象 | 优先检查 |
| --- | --- |
| `apc: command not found` | 确认工作流已执行 `npm install -g @box3lab/arenapro-cli`。 |
| Profile 添加失败 | 检查 `BOX_CREATOR_ENDPOINT` 是否为空、协议是否正确，以及 CI 网络是否能访问 Creator。 |
| 地图或上传返回 401/403 | 检查 `BOX_CREATOR_TOKEN`、Token 是否被撤销、是否具备目标地图的 `scripts.update` 权限。 |
| 找不到地图 | 核对 `BOX_CREATOR_PROJECT_ID` 是永久地图 ID，而非名称、版本号或临时 hash。 |
| CI 只想构建却发生上传 | 显式传入 `VITE_UPDATE_FILE: "false"`，不要依赖环境文件的默认值。 |
| 上传到错误环境 | 为每个环境使用独立 Profile 名、地图 ID 和 Token，并用 GitHub Environment 或受保护标签限制生产任务。 |

可以简单理解为：

- **构建检查流水线**：帮你“每天检查代码能不能构建过”；
- **发布版本流水线**：在“我要发一个版本”的时候，使用独立 Token 构建并上传到指定 Creator 地图。
