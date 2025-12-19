# UI 组件介绍

在神岛 React 中，我们通过 JSX 标签来描述 UI 组件，这些标签会被映射到具体的神岛 UI 类型上。

## 标签对照表

下表展示了常用 JSX 标签与实际神岛 UI 组件之间的对应关系：

| ArenaPro React 标签 | 对应 UI 组件  | 说明       |
| ------------------- | ------------- | ---------- |
| `<Box />`           | `UiBox`       | 容器组件   |
| `<Text />`          | `UiText`      | 文本组件   |
| `<Image />`         | `UiImage`     | 图片组件   |
| `<Input />`         | `UiInput`     | 输入组件   |
| `<ScrollBox />`     | `UiScrollBox` | 滚动框组件 |

导入方式：

```ts
import { Box, Text, Image, Input, ScrollBox } from "@dao3fun/react-ui";
```

在使用这些组件时，**神岛提供的 UI 属性（如尺寸、位置、图片资源等）统一通过 `style` 属性传入**，例如：

```tsx
<Image
  style={{
    image: "logo.png",
    imageDisplayMode: ImageDisplayMode.Contain,
  }}
/>
```

也就是说，这些组件本身只负责结构与交互，而具体的 UI 外观和布局，都通过 `style` 对应到神岛底层的 UI 属性。

## 组件事件与通用 Props

除了 `style` 这样的视觉与布局属性外，ArenaPro React 还为所有 UI 组件提供了一组 **通用交互 Props**：

### 通用属性（所有组件都有）

| 属性名                 | 作用范围 | 用途说明                                                                                                                            |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `style`                | 所有组件 | 配置尺寸、位置、图片、颜色等所有 UI 样式                                                                                            |
| `name`                 | 所有组件 | 元素名称，等价于在 `style.name`                                                                                                     |
| `visible`              | 所有组件 | 元素可见性，等价于在 `style.visible`                                                                                                |
| `pointerEventBehavior` | 所有组件 | 指针事件行为，等价于在 `style.pointerEventBehavior`                                                                                 |
| `x` / `y`              | 所有组件 | 简写位置：数值等价于在 `style.position.offset` 里设置 x / y，百分比字符串（如 `'50%'`）等价于在 `style.position.scale` 里设置 x / y |
| `onClick`              | 所有组件 | 点击组件时触发，例如点击按钮、卡片、面板                                                                                            |
| `onMouseDown`          | 所有组件 | 鼠标按下（或手指按下）时触发                                                                                                        |
| `onMouseUp`            | 所有组件 | 鼠标抬起（或手指抬起）时触发                                                                                                        |

### 各组件特有的事件 / 属性

| 组件    | 额外属性 / 事件                    | 说明                                                   |
| ------- | ---------------------------------- | ------------------------------------------------------ |
| `Box`   | —                                  | 主要作为布局和交互容器，使用通用事件即可               |
| `Text`  | `children` 文本内容                | 直接写在标签内部的文字，比如 `<Text>标题</Text>`       |
| `Image` | `onLoad(event)`                    | 图片资源加载完成后触发，适合做 loading 状态切换等      |
| `Image` | `src` / `mode`                     | 图片资源和展示方式                                     |
| `Input` | `children` 文本内容                | 直接写在标签内部的文字，比如 `<Input>标题</Input>`     |
| `Input` | `value` / `placeholder`            | 受控输入值和占位提示文字                               |
| `Input` | `onFocus(event)` / `onBlur(event)` | 输入框获得/失去焦点时触发                              |
| `Input` | `onChange(value, event)`           | 输入内容确认变更时触发（失去焦点时），返回当前文本内容 |

下面是一个综合使用样例：

```tsx
import React from "react";
import { Box, Text, Image, Input } from "@dao3fun/react-ui";
import { createRoot } from "@dao3fun/react-ui/dom";
function Panel() {
  return (
    <Box
      x={80}
      y={80}
      style={{
        backgroundOpacity: 0.6,
        size: {
          offset: Vec2.create({ x: 600, y: 500 }),
        },
      }}
      onClick={(e) => {
        console.log("点击容器", e.target);
      }}
    >
      <Text>登录面板</Text>

      <Input
        y={40}
        placeholder="请输入用户名"
        onFocus={() => console.log("输入框获得焦点")}
        onBlur={() => console.log("输入框失去焦点")}
        onChange={(value) => console.log("输入内容变更为", value)}
      />
      <Image
        y={80}
        src="https://assets.box3.fun/u226/tPFZnI2AJAEs/-0bEpcTk_LyJGrbOwW41DF32XUk0dbR2M65-JFJIOiE.png"
        mode={ImageDisplayMode.Contain}
        onLoad={() => {
          console.log("头像图片加载完成");
        }}
      />
    </Box>
  );
}
// ui 由神岛客户端提供，对应根 UI 节点
const root = createRoot(ui);
root.render(<Panel />);
```

## 组件树示例

以上示例中，当使用 `<Text>登录面板</Text>`时，文字会默认显示在父节点区域的中间位置，无需额外设置对齐或位置属性；如果不期望这种默认行为，可以通过在 `style.size` 中设置位置（offset 和 scale）手动覆盖。

### 用 Box 包装

```tsx
function App() {
  return (
    <Box>
      <Box>
        <Text>标题</Text>
        <Image style={{ image: "logo.png" }} />
      </Box>
      <Box>
        <Text>内容</Text>
        <Box>
          <Text>子内容</Text>
        </Box>
      </Box>
    </Box>
  );
}

render(<App />, ui);
```

对应的 DOM 树结构：

```
ui (App)
└── box
    ├── box
    │   ├── text ("标题")
    │   └── image (logo.png)
    └── box
        ├── text ("内容")
        └── box
            └── text ("子内容")
```

### 用 Fragment

```tsx
function App() {
  return (
    <>
      <Box>
        <Text>标题</Text>
        <Image style={{ image: "logo.png" }} />
      </Box>
      <Box>
        <Text>内容</Text>
        <Box>
          <Text>子内容</Text>
        </Box>
      </Box>
    </>
  );
}

render(<App />, ui);
```

对应的 DOM 树结构：

```
ui (App)
├── Box
│   ├── Text ("标题")
│   └── Image (logo.png)
└── Box
    ├── Text ("内容")
    └── Box
        └── Text ("子内容")
```

## render 与 createRoot

导入方式：

```ts
import { render, createRoot } from "@dao3fun/react-ui/dom";
```

`render` / `createRoot` 是 React 应用的入口点，它们负责将 React 组件渲染到指定的容器中。在神岛 React 中，它们的主要功能包括：

1. **初始化渲染**

   - 将 React 组件树转换为虚拟 DOM
   - 将虚拟 DOM 渲染到指定的 UI 容器中
   - 建立组件与 UI 的关联

2. **`render` 的参数说明**

   ```tsx
   render(element, container);
   ```

   - `element`: 要渲染的 React 元素（通常是根组件）
   - `container`: 渲染的目标容器，屏幕根节点（例 `ui`），或任意 UI 元素。

3. **`render` 使用示例**

```tsx
// 渲染单个组件
render(<App />, ui);

// 渲染多个组件
render(
  <Box>
    <App1 />
    <App2 />
  </Box>,
  ui
);
```

4. **使用 createRoot 的方式**

在某些场景下，你可能希望手动管理渲染根节点，此时可以使用 `createRoot`：

```tsx
import { Box } from "@dao3fun/react-ui";
import { createRoot } from "@dao3fun/react-ui/dom";

function App() {
  return <Box>你好，React！</Box>;
}

// ui 为神岛提供的根 UI 容器
const root = createRoot(ui);
root.render(<App />);
```

4. **注意事项**

   - 每个容器只能调用一次 `render`
   - 渲染后的组件会自动与容器建立绑定关系
   - 后续的更新会自动处理，不需要再次调用 `render`

5. **更新机制**
   - 当组件状态发生变化时，React 会自动重新渲染
   - 只会更新发生变化的部分，而不是整个树
   - 使用虚拟 DOM 进行高效的差异比较
