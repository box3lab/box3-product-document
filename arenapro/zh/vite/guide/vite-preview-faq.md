# 地图预览 Q&A：使用 `apc preview`

> 本文补充说明 `apc preview` 的行为：默认打开哪个页面、`play` 与创作页的区别、多环境下如何选择 `.env`、以及预览失败时的排查思路。

## 1. `apc preview` 默认打开哪里？

**问：直接执行 `apc preview`，会打开地图的哪个页面？**

**答：默认打开「创作页」。**

- 在不带参数的情况下：

  ```bash
  apc preview
  ```

  会从当前项目的 `.env[.mode]` 中读取：

  - `VITE_DAO3_EDIT_HASH`

  并在浏览器中打开：

  - `https://dao3.fun/edit/<VITE_DAO3_EDIT_HASH>`

适用场景：

- 想快速跳转到神岛的创作编辑界面，调整地图配置 / 资源等。

## 2. `apc preview play` 和默认预览有什么区别？

**问：`apc preview play` 和直接 `apc preview` 有什么不同？**

**答：`play` 会打开游玩页，默认则是创作页。**

- 打开创作页：

  ```bash
  apc preview
  ```

  - 使用 `VITE_DAO3_EDIT_HASH`；
  - 打开的链接形如：`https://dao3.fun/edit/<Hash>`。

- 打开游玩页：

  ```bash
  apc preview play
  ```

  - 使用 `VITE_DAO3_PLAY_HASH`；
  - 打开的链接形如：`https://dao3.fun/play/<Hash>`。

适用建议：

- 调整配置 / 资源：用 `apc preview`（创作页）；
- 体验玩法效果：用 `apc preview play`（游玩页）。

## 3. 多环境 / 多 `.env` 文件时怎么预览？

**问：有 `.env` / `.env.dev` / `.env.prod` 等多套配置时，`apc preview` 会用哪一个？可以指定吗？**

**答：可以通过 `--env` 参数指定要使用的 env 文件。**

示例：

```bash
# 使用 .env 中的 Hash 打开创作页
apc preview

# 使用 .env.dev 中的 Hash 打开创作页
apc preview --env dev

# 使用 .env.prod 中的 Hash 打开游玩页
apc preview play --env prod
```

行为说明：

- `--env dev` 会让 CLI 从 `.env.dev` 中读取：
  - `VITE_DAO3_MAP_ID`
  - `VITE_DAO3_MAP_NAME`
  - `VITE_DAO3_PLAY_HASH`
  - `VITE_DAO3_EDIT_HASH`
- 不带 `--env` 时，默认读取 `.env`。

## 4. 预览失败时，优先检查哪些问题？

**问：执行 `apc preview` 时，如果浏览器没打开或打开后报错，我应该先看什么？**

可以按下面的顺序排查：

### 4.1 `.env` 中是否已经绑定过地图？

- 当前使用的 `.env[.mode]` 中，是否已经有：
  - `VITE_DAO3_MAP_ID`
  - `VITE_DAO3_PLAY_HASH`
  - `VITE_DAO3_EDIT_HASH`
- 如果为空，建议按照推荐流程先绑定地图：

  ```bash
  apc list
  apc set <地图ID>
  ```

### 4.2 Hash 是否与地图不匹配？

- 如果你手动修改过 `.env` 里的 Hash，有可能导致链接与真实地图不匹配；
- 此时可以重新执行：

  ```bash
  apc list
  apc set <地图ID>
  ```

  让 CLI 从最新的全局缓存中重新写入 Hash。

### 4.3 浏览器 / 默认打开方式问题

- `apc preview` 底层是调用本机的默认浏览器打开链接；
- 如果本机对 http 链接没有正确关联浏览器，或默认浏览器启动异常，也可能导致看起来「没有任何反应」。
