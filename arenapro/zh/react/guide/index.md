# 欢迎来到 ArenaPro React

![](https://assets.box3.fun/u226/1Jlf7TJjuX5k/Dxd5R5_KqkiTi7fwlh5rWRdCwr4ZL4ngkKNgzbxq-L0.gif)

这是一个由 Claude 3.7 搭建的神岛 React 示例项目：[双向选择器-示例](https://dao3.fun/exp/experience/detail/100429428)
（示例代码从设计到实现均由 AI 自动生成）

## 为什么要用 React 写 UI？

神岛引擎原生的 UI 操作方式偏“命令式”：你需要手动创建节点、设置 parent、逐个字段赋值、手动绑定事件。

这套方式在 UI **静态且简单**时还能接受，但一旦 UI 需要：

- **动态创建/销毁**（列表、弹窗栈、提示队列、根据状态切换 UI 结构）
- **频繁状态更新**（倒计时、冷却、进度条、多人状态面板）
- **可复用组件**（同一套 UI 逻辑在多个地方复用/组合）

就会很快变得“写起来痛苦、改起来更痛苦”。

下面用一个例子对比：同样是“点击更新文案并记录时间”。

![](https://assets.box3.fun/u226/r2i_IBHu5s2G/GI9EapRBbvOIQqPLmmsP_m2J3cbvzQRodWN2C9Ln0TI.gif)

```js [引擎自带（命令式）]
let count = -5;
const box = UiBox.create();
const headerText = UiText.create();
const history = [];
const items = [];
const updateHeaderText = () => {
  headerText.textContent =
    count > 0
      ? `很好，你一共点击了${count + 5}次`
      : `点击我，直到1次！还剩${-count}次！`;
};
const renderList = () => {
  for (let i = 0; i < history.length; i++) {
    let item = items[i];
    if (!item) {
      item = UiText.create();
      item.parent = box;
      items[i] = item;
    }
    item.visible = true;
    item.textContent = history[i];
    item.position.offset.copy(Vec2.create({ x: 0, y: (i + 1) * 20 }));
    item.size.scale.copy(Vec2.create({ x: 1, y: 1 }));
    item.size.offset.copy(Vec2.create({ x: 0, y: 0 }));
  }
  for (let i = history.length; i < items.length; i++) {
    items[i].visible = false;
  }
};
box.parent = ui;
box.backgroundColor.copy(Vec3.create({ r: 62, g: 185, b: 185 }));
box.position.offset.copy(Vec2.create({ x: 10, y: 20 }));
box.events.on("pointerdown", () => {
  count++;
  updateHeaderText();
  history.unshift(`第${count + 5}次点击时间： ${Date.now()}`);
  renderList();
});
headerText.parent = box;
headerText.size.scale.copy(Vec2.create({ x: 1, y: 1 }));
headerText.size.offset.copy(Vec2.create({ x: 0, y: 0 }));
headerText.position.offset.copy(Vec2.create({ x: 0, y: 0 }));
updateHeaderText();
renderList();
```

```tsx [React（声明式）]
function App() {
  const [count, setCount] = useState(-5);
  const [history, setHistory] = useState<string[]>([]);
  return (
    <Box
      style={{
        backgroundColor: Vec3.create({ r: 62, g: 185, b: 185 }),
        position: { offset: Vec2.create({ x: 10, y: 20 }) },
      }}
      onClick={() => {
        setCount((c) => {
          const next = c + 1;
          setHistory((h) => [`第${next + 5}次点击时间： ${Date.now()}`, ...h]);
          return next;
        });
      }}
    >
      {count > 0
        ? `很好，你一共点击了${count + 5}次`
        : `点击我，直到1次！还剩${-count}次！`}
      {history.map((item, index) => (
        <Text y={(index + 1) * 20}>{item}</Text>
      ))}
    </Box>
  );
}
createRoot(ui).render(<App />);
```

| 对比点         | 引擎自带（命令式）                                                                      | React（声明式）                                                |
| -------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| 状态放在哪里   | 你自己维护变量（例：`let count`、`history`、`items`）                                   | `useState` 托管状态（例：`count/history`）                     |
| UI 文案从哪来  | 需要把状态“写回 UI”（例：`headerText.textContent = ...`）                               | 直接把状态“写进 UI 描述”（JSX 表达式）                         |
| 列表怎么渲染   | 你要自己管理“有多少条”对应“有多少个节点”：创建、复用、摆放、隐藏（`renderList`）        | `history.map(...)`：数据有几条就渲染几项，少了就自然不渲染     |
| 更新链路       | 事件里：改状态 → **手动调用** `updateHeaderText()` / `renderList()` → 多处改 UI 属性    | 事件里：`setCount/setHistory` → **自动触发**重新渲染 → UI 同步 |
| 一致性风险     | 高：只要漏掉一次 `renderList()`、忘记隐藏多余节点、或顺序写错，就会出现旧 UI            | 低：UI 由状态推导；渲染是状态的“函数结果”                      |
| 结构变化成本   | 高：需求一变（多一个列表/多一种布局），要补一套 create / parent / position / 可见性逻辑 | 低：结构就是组件树；条件/列表渲染是表达式                      |
| 复用与组合     | 需要自己设计“创建/更新/销毁”的抽象接口                                                  | 天然组件化：抽成组件 + props 即可复用                          |
| 清理与生命周期 | 需要自己处理销毁、解绑事件、避免重复绑定等                                              | 生命周期集中在组件：创建/更新/卸载更可控（按 React 模式组织）  |
| 读代码心智负担 | 需要在多处追踪：状态怎么变、哪些节点会被复用/隐藏、哪些属性会被改                       | 通常只看：状态是什么、UI 在该状态下怎么渲染                    |
| 适用场景       | 一次性小 UI、极少更新、结构长期不变                                                     | 频繁更新、动态结构（列表/弹窗/队列）、长期维护/协作            |

## 什么是 ArenaPro React？

**ArenaPro React 是基于 React 18 定制的、适用于神岛的 React 风格 UI 框架。**

- 在 **心智模型与 API 风格上贴近 React 18**，比如组件、Hooks、声明式 UI 等；
- 在 **实现层面与运行环境上做了针对神岛引擎的改造与裁剪**，以便更好地适配神岛的 UI 与性能需求。

### ArenaPro React 相对标准 React 的差异大致包括：

- **运行环境不同**  
  标准 React 主要面向浏览器 DOM 或 Native；  
  ArenaPro React 面向神岛引擎的 UI 系统和渲染管线。

- **API 与能力有取舍**  
  我们保留了大部分常用的 React 18 开发模式，同时对在神岛场景下不常用或不适配的部分做了精简与封装。

- **默认实践更贴近游戏创作场景**  
  在布局方式、组件抽象、性能优化策略等方面，都更加贴合神岛创作的实际项目需求。
