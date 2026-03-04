# 方块库工作流（与当前实现对齐）

菜单入口：`Box3/方块库`

## 界面结构

窗口分为三个区块：

- `World Root`
- `Editor Tool`
- `Block Library`

## World Root（根节点区）

当前有 3 个按钮：

1. `创建根节点`
2. `生成Chunk`
3. `清空根节点`

字段：

- `Root`：当前编辑根节点。

行为说明：

- `创建根节点`：新建用于方块编辑的根对象。
- `清空根节点`：删除 Root 下方块对象（谨慎操作）。
- `生成Chunk`：打开 Chunk 构建窗口，默认读取当前 Builder Root。

## Editor Tool（工具区）

### 工具标签

- `Place`
- `Erase`
- `Replace`
- `Rotate`

### 快捷键（当前实现）

- `Shift + 1`：切到 Place
- `Shift + 2`：切到 Erase
- `Shift + 3`：切到 Replace
- `Shift + 4`：切到 Rotate

### 画笔参数

- `Horizontal (X/Z)`：横向范围（输入框 + 滑条）
- `Height (Y)`：高度范围（输入框 + 滑条）

### 额外开关

- `Hollow Build (Shell Only)`：空心搭建，仅外壳。
- `Generate Collider`：放置时是否生成碰撞体。
- `Collider Mode`（仅在开启 Generate Collider 后显示）：
  - `Full`
  - `Top Only`
- `Spawn point light when placing emissive blocks`：发光方块放置时是否生成点光。

## Block Library（方块库区）

功能包含：

- 搜索框（`Search`）
- 分类侧栏
- 方块卡片网格（支持滚动）

卡片信息：

- 标题：方块名称
- 副标题：分类 + 特性（如动画、发光、透明）
- 右上角旋转徽标（R0/R90/R180/R270）

交互：

- 左键点击卡片：选中方块。
- 点击卡片右上旋转徽标：切换该方块默认放置朝向。

## Scene 交互行为

- Place：在命中面外侧放置（支持画笔体积）。
- Erase：删除命中方块/范围。
- Replace：将命中方块替换为当前选中方块。
- Rotate：旋转命中方块。

当场景中未命中碰撞体时，系统会使用无碰撞拾取与回退逻辑继续定位目标位置。

## 生成 Chunk（从 Builder 入口）

点击 `生成Chunk` 打开独立配置窗口，当前默认行为：

- `Source Root`：默认当前 Builder Root
- `Target Parent`：默认当前 Builder Root
- `Realtime Light`：默认 `DataOnly`

可配置参数：

- `Ignore Barrier`
- `Clear Previous`
- `Delete Source Blocks After Build`
- `Realtime Light`
- `Collider Mode`
- `Chunk Size`
- `Chunks Per Tick`
- `Voxels Per Tick`

## 推荐流程

1. 创建并指定 Root
2. 选方块并搭建主体
3. 用 Replace 统一材质风格
4. 用 Rotate 调整方向块
5. 大地图阶段使用“生成Chunk”做静态化

## 注意事项

- 大地图请按区域拆多个 Root，便于管理与性能调优。
- 若编辑明显卡顿，优先缩小画笔范围，并降低批量操作规模。
