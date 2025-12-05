# 仓库流水线

> 本文介绍如何在持续集成（CI）中使用 ArenaPro Vite CLI（`apc`），
> 以 GitHub Actions 为主进行示例，其他平台（Gitee Go、GitLab CI 等）可以按同样思路迁移。

## 1. 为什么要在仓库里跑流水线

在本地你通常会这样工作：

1. `npm run dev`：边写边看效果；
2. `npm run build`：发布前做一次正式构建。

在一个人开发的小 Demo 里，这样其实问题不大。但在**团队协作**里，如果每个人都只在本地随缘构建，很容易出现：

- 某个 PR 合并后，才发现类型不通过或构建失败；
- 不同人本地 Node / 依赖版本不一致，导致“我这边能过，你那边不过”；
- 有人忘了跑 `npm run build`，直接把未验证的改动合进主干。

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
  - 日常 PR / 分支的 CI，可以只做“类型检查 + 构建是否成功”，**不上传**到神岛；
  - 真正的上传动作可以只放在专门的发布流程里（例如打 tag、手动触发 workflow）。

结合 ArenaPro CLI 的实际场景，你可以这么理解：

- 本地 `npm run dev`：偏向“我自己调试”；
- CI 里的 `npm run build`：偏向“这版代码对团队来说是否健康、能不能构建”；
- 只有当“构建这一步”被自动化、标准化之后，后面基于构建结果的上传、预发回归、灰度等流程才有意义。

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

要在 CI 中自动上传，需要在 GitHub Actions 里写账户信息：

- 在仓库 Settings → Secrets and variables → Actions → Repository secrets 中，新增：
  - `VITE_DAO3_AUTH`
  - `VITE_DAO3_UA`
  - `VITE_DAO3_MAP_ID`

```yaml
name: 发布版本并构建到神岛

on:
  push:
    # 只在打 tag 时触发
    tags:
      # 只有推送 tag，并且 tag 名字 以 v 开头 时，这个 workflow 才会触发。
      - "v*"

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

      - name: 安装项目依赖
        run: npm ci

      - name: 解析当前版本号
        run: |
          VERSION="${GITHUB_REF#refs/tags/}"
          echo "VERSION=$VERSION" >> $GITHUB_ENV

      - name: 构建并上传到神岛
        env:
          VITE_CI: "true"
          VITE_VERSION: ${{ env.VERSION }}
          VITE_UPDATE_FILE: "true"
          VITE_DAO3_AUTH: ${{ secrets.VITE_DAO3_AUTH }}
          VITE_DAO3_UA: ${{ secrets.VITE_DAO3_UA }}
          VITE_DAO3_MAP_ID: ${{ secrets.VITE_DAO3_MAP_ID }}
        run: npm run build
```

这条发布流水线和前面的「构建检查流水线」最大的区别在于：

- **触发时机不同**：
  - 构建检查：日常 `push` / `pull_request`；
  - 发布流水线：只在打 tag 或手动触发时运行。
- **是否开启上传**：
  - 构建检查：`VITE_UPDATE_FILE="false"`，只看能不能构建过；
  - 发布流水线：`VITE_UPDATE_FILE="true"`，并从 Secrets 中读取账号和地图信息，真正执行上传。

**发布版本流水线**的作用是：

- 只在你**明确打了一个版本 tag** 时运行（例如 `v1.2.3`）；
- 在 CI 机器上按统一环境做一次正式构建；
- 带上账号信息，把这一版脚本上传到指定地图中；
- 把 tag 版本号写入 `VITE_VERSION`，方便在脚本里记录“这是哪个版本发的”；
- 通过 `VITE_CI` 标记“这次是 CI 上传的版本”，让 CLI 在生成的脚本文件名区分：
  - 是开发者本地上传，还是由流水线自动发布的版本。

可以简单理解为：

- **构建检查流水线**：帮你“每天检查代码能不能构建过”；
- **发布版本流水线**：在“我要发一个版本”的时候，把这次构建当成一个版本，上传到神岛。
