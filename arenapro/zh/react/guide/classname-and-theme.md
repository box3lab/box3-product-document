# className 与主题扩展

在 ArenaPro React 里，视觉与布局相关的配置主要有两条路径：

- `className`：引用一份**预先注册**的样式（通过 `RC.Box` / `RC.Text` / `RC.define` / `RC.theme` 等注册）。
- `style`：直接在组件上写入**具体的底层 UI 属性**（等价于操作神岛底层的 UiX 对象）。

可以简单类比为：

- `className` 类似于「设计规范里命名好的样式 Token / 组件变体」，是一层**语义化的别名**。
- `style` 则是「直接改像素 / 颜色 / 尺寸」的**强覆盖通道**。

## 为什么要有 className 体系？

如果只用 `style`：

- 每个页面、每个组件都可能写一堆重复的配置（颜色、圆角、间距……），样式难以统一收敛。
- 想做“全局换主题”时，需要到处搜 `style`，很难一次性替换。

引入 className/RC 体系之后：

- 样式可以集中在一处注册，例如：
  - `RC.Box({ 'card.base': {...}, 'card.active': {...} })`
  - `RC.theme('dark', ...)`，一处改动即可影响所有使用该 class 的组件。
- className 本身是**语义化的**（如 `card.base`、`card.title`），便于产品、设计和前端之间沟通，也便于在文档中按语义分组展示。
- 配合 `RC.theme`，可以通过切换前缀（`light:card` / `dark:card`）实现主题切换，而不需要逐个组件改 `style`。

同时保留 `style` 的好处是：

- 在大部分场景使用 className 统一风格，需要**临时特殊处理**某个组件时，可以通过 `style` 做细粒度覆盖（例如临时把某个按钮变大一点）。
- 优先级上 `style` 高于 className，不会被预设样式“锁死”，保持灵活性。

## 按元素类型注册 className 样式

UI 层提供一个命名空间式的注册入口 `RC`：

```ts
import RC from "@dao3fun/react-ui";

// Box 专用样式
RC.Box({
  primary: {
    /* UiBox 的部分样式 */
  },
});

// Text 专用样式
RC.Text({
  primary: {
    /* UiText 的部分样式 */
  },
});
```

特点：

- 按元素类型拆分注册表：`Box` 只吃 `RC.Box` 注册的 class，`Text` 只吃 `RC.Text`，互不干扰。
- 保留全局注册表作为 fallback（内部的 `global` scope），便于一些跨元素的通用 className。

在组件里使用：

```tsx
<Box className="primary" />      // 命中 RC.Box 的注册
<Text className="primary" />     // 命中 RC.Text 的注册
```

好处是：样式按照元素类型隔离管理，既减少“同名 class 相互污染”的风险，又方便按组件语义拆分设计规范。

## `RC.cx`：更好用的 className 组合

`RC.cx` 是一个小工具函数，用来组合 className：

```ts
RC.cx("a", "b"); // 'a b'
RC.cx("a", false && "b"); // 'a'
RC.cx(["a", "b"]); // 'a b'
RC.cx({ a: true, b: false }); // 'a'
```

常见用法：按状态组合多个 className：

```tsx
<Box
  className={RC.cx(
    "card", // 基础样式
    active && "active", // 条件样式
    { disabled } // 对象写法：disabled === true 时才加 "disabled"
  )}
/>
```

最终都是一个普通的字符串，仍然走 className 注册表解析逻辑。

优先级说明（从低到高）：同一个元素上，className 先合并（后写的覆盖先写的），然后再由 `style` 覆盖 className，最后 `x/y` 会写入 `style.position`。

## `RC.define`：语义分组（如 `card.base`）

为了让 className 更有语义、好组织，你可以用 `RC.define` 按“语义分组”注册：

```ts
RC.define("card", (t) => {
  t.Box({
    base: { backgroundOpacity: 0.9 },
    active: { backgroundColor: Vec3.create({ r: 0, g: 255, b: 0 }) },
    disabled: { backgroundOpacity: 0.3 },
  });

  t.Text({
    title: { textColor: Vec3.create({ r: 69, g: 149, b: 68 }) },
    meta: { textColor: Vec3.create({ r: 160, g: 160, b: 160 }) },
    button: { textColor: Vec3.create({ r: 255, g: 255, b: 255 }) },
  });
});
```

内部会自动加上前缀 `card.`，实际注册为：

- `card.base`
- `card.active`
- `card.disabled`
- `card.title`
- `card.meta`
- `card.button`

使用方式：

```tsx
<Box
  className={RC.cx("card.base", active && "card.active", {
    "card.disabled": disabled,
  })}
>
  <Text className="card.title">标题</Text>
  <Text className="card.meta">说明文字</Text>
  <Text className="card.button">按钮</Text>
</Box>
```

约定：

- `card` 表示“语义组件”，如卡片、按钮等。
- `base/active/disabled/title/meta/button` 表示“状态或子角色”。

这样在设计规范文档里，也可以按 `card` 分组展示所有相关样式。

## `RC.theme`：light / dark 等主题

在 `define` 之上，又封了一层 `theme`，用于区分不同主题（如 light/dark）：

```ts
// light 主题
RC.theme("light", (define) => {
  define("card", (t) => {
    t.Box({
      base: { backgroundOpacity: 0.9 },
      active: { backgroundColor: Vec3.create({ r: 0, g: 255, b: 0 }) },
      disabled: { backgroundOpacity: 0.3 },
    });

    t.Text({
      title: { textColor: Vec3.create({ r: 69, g: 149, b: 68 }) },
      meta: { textColor: Vec3.create({ r: 160, g: 160, b: 160 }) },
      button: { textColor: Vec3.create({ r: 255, g: 255, b: 255 }) },
    });
  });
});

// dark 主题
RC.theme("dark", (define) => {
  define("card", (t) => {
    t.Box({
      base: {
        backgroundOpacity: 1,
        backgroundColor: Vec3.create({ r: 30, g: 30, b: 30 }),
      },
      active: { backgroundColor: Vec3.create({ r: 80, g: 160, b: 255 }) },
      disabled: { backgroundOpacity: 0.4 },
    });

    t.Text({
      title: { textColor: Vec3.create({ r: 230, g: 230, b: 230 }) },
      meta: { textColor: Vec3.create({ r: 150, g: 150, b: 150 }) },
      button: { textColor: Vec3.create({ r: 255, g: 255, b: 255 }) },
    });
  });
});
```

内部注册的 className 实际为：

- `light:card.base / light:card.active / ...`
- `dark:card.base / dark:card.active / ...`

在组件里可以按当前主题选择前缀：

```tsx
const [isDark, setIsDark] = useState(false);
const themePrefix = isDark ? "dark:card" : "light:card";

<Box
  className={RC.cx(`${themePrefix}.base`, active && `${themePrefix}.active`, {
    [`${themePrefix}.disabled`]: disabled,
  })}
>
  <Text className={`${themePrefix}.title`}>
    当前主题：{isDark ? "Dark" : "Light"}
  </Text>

  <Text
    className={`${themePrefix}.button`}
    onClick={() => setIsDark((v) => !v)}
  >
    切换主题
  </Text>
</Box>;
```

注意：

- `theme` 只是对 `define` 再封一层前缀：`themeName:namespace.key`。
- 你仍然可以单独使用 `RC.define('card', ...)`，与主题前缀并存。

## 未注册 className 的延迟告警

如果组件传入了某个 className，但在对应的注册表中查不到（当前元素类型 + global），系统会在**渲染结束后**输出一条 `console.warn`：

```text
未注册的 className：Box.card
```

这有助于在开发阶段快速发现拼写错误或漏注册的 className。
