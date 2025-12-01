# 按环境管理 `.env`：development / production 的用法

在 ArenaPro Vite 脚手架里，环境变量不仅决定「**账号信息 / 地图配置**」，也可以用来区分**开发环境**和**正式环境**的行为。

常见的环境配置文件有：

- `.env`
- `.env.development`
- `.env.production`
- `.env.example`

下面分别说明它们的作用和典型用法。

## 1. `.env`：所有环境的基础默认值

`.env` 里的变量在**所有模式**下都会生效，相当于「默认配置」。

典型内容示例：

```env
# 神岛账户 Token / UA（通常通过 npm run sync:auth 自动写入）
VITE_DAO3_AUTH=
VITE_DAO3_UA=

# 当前构建/上传的 bundle 名
VITE_CURRENT_FILE=

# 是否在构建后自动上传脚本
VITE_UPDATE_FILE=true
```

**适合放在 `.env` 的内容：**

- 所有环境都通用的开关（例如是否自动上传 `VITE_UPDATE_FILE`）；
- 和当前项目强绑定、不会因为 dev / prod 切环境而变化的配置。

> 注意：真实项目中，**不要把带有真实 Token 的 `.env` 提交到仓库**，而是提交一个无敏感信息的 `.env.example`（见后文）。

## 2. `.env.development`：仅开发模式生效

当你运行：

```bash
npm run dev
```

时，Vite 会优先读取 `.env.development` 中的变量（叠加在 `.env` 之上）。

示例：

```env
# 仅在开发模式下启用某些开关
VITE_FEATURE_ENABLE_DEV_PANEL=true
VITE_API_BASE_URL=https://dev-api.dao3.fun
```

**使用方式示例：**（这里假设你已经了解 `import.meta.env.MODE` 的含义

```ts
const mode = import.meta.env.MODE; // development / production

// 根据环境变量控制行为
if (import.meta.env.VITE_FEATURE_ENABLE_DEV_PANEL === "true") {
  showDevPanel();
}

// 统一从环境变量读取后端地址
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
```

**适合放在 `.env.development` 的内容：**

- 开发环境专用的接口域名（dev 环境后端）；
- 只想在本地开发时开启的调试开关、实验功能。

## 3. `.env.production`：仅正式构建时生效

当你运行：

```bash
npm run build
```

时，Vite 会优先读取 `.env.production` 中的变量（同样叠加在 `.env` 之上）。

示例：

```env
# 线上环境的 API 地址
VITE_API_BASE_URL=https://api.dao3.fun

# 线上关闭某些调试功能
VITE_FEATURE_ENABLE_DEV_PANEL=false
```

配合 `.env.development` 的例子，你可以做到：

- 开发时连 `https://dev-api.dao3.fun`；
- 正式构建连 `https://api.dao3.fun`；
- 代码里只关心 `import.meta.env.VITE_API_BASE_URL`，无需手动切换。

## 4. 覆盖规则与优先级

同一个变量如果同时出现在多个文件中，大致规则是：

- `.env` 提供基础默认值；
- `.env.development` / `.env.production` 在对应模式下**覆盖** `.env` 中的同名变量；
- 最终在代码中看到的是**合并后的结果**。

例如：

```env
# .env
VITE_API_BASE_URL=https://dev-api.dao3.fun

# .env.production
VITE_API_BASE_URL=https://api.dao3.fun
```

- `npm run dev` 时：`VITE_API_BASE_URL` 为 `https://dev-api.dao3.fun`；
- `npm run build` 时：`VITE_API_BASE_URL` 为 `https://api.dao3.fun`。

## 5. `.env.example`：给团队看的「模板」

`.env.example` **不会被 Vite 直接读取**，它的作用是：

- 告诉其他协作者「这个项目需要配置哪些环境变量」；
- 避免把真实 Token、私密信息提交到仓库；
- 作为新同学拉仓库后的参考模板。

典型内容：

```env
# 账号相关（自己本地填写真实值）
VITE_DAO3_AUTH=YOUR_TOKEN_HERE
VITE_DAO3_UA=YOUR_UA_HERE

# 构建行为
VITE_CURRENT_FILE=
VITE_UPDATE_FILE=true

# 接口地址（可根据团队约定填写默认值或留空）
VITE_API_BASE_URL=
```

**推荐实践：**

1. 仓库中只提交：
   - `.env.example`
   - 以及可能的 `.env.development` / `.env.production`（不含敏感信息时）
2. 每个开发者在本地：
   - 复制一份 `.env.example` 为 `.env`；
   - 根据需要再创建 `.env.development` / `.env.production`；
   - 通过 `npm run sync:auth` 写入自己的账号 Token / UA。

## 6. 和 `MODE` 结合使用

当你已经在代码中通过 `import.meta.env.MODE` 区分 `development` / `production` 时，可以同时利用：

- **不同文件**：`.env.development` / `.env.production` 调整「按环境」的默认值；
- **代码判断**：`MODE` 在运行时进一步细分行为。

一个组合示例：

```ts
const mode = import.meta.env.MODE;
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (mode === "development") {
  console.log("[DEV] using api:", apiBaseUrl);
}

if (mode === "production") {
  console.log("[PROD] using api:", apiBaseUrl);
}
```

这样，你就可以用最少的改动，在不同环境下复用同一套代码与配置。
