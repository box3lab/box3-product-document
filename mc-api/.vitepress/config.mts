import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-cn",
  title: "Box3JS API 文档",
  head: [["link", { rel: "icon", href: "/arena.svg" }]],
  description: "Box3JS Minecraft Mod 脚本 API 参考文档",
  base: "/mc-api/",
  outDir: "../dist/mc-api",
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详细信息",
      noteLabel: "信息",
      importantLabel: "重要",
      cautionLabel: "注意",
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: {
      level: [2, 4],
      label: "本页目录",
    },
    nav: [{ text: "模组下载", link: "https://modrinth.com/mod/box3js" }],
    logo: "/arena.svg",
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "开始",
        collapsed: false,
        items: [{ text: "导读页", link: "/" }],
      },
      {
        text: "核心 API",
        collapsed: false,
        items: [
          {
            text: "🌏 游戏世界",
            link: "/GameWorld/index",
            collapsed: false,
            items: [
              { text: "世界状态", link: "/GameWorld/mapInfo" },
              { text: "音乐音效", link: "/GameWorld/music" },
              { text: "实体生成", link: "/GameWorld/entityCD" },
              { text: "实体查询", link: "/GameWorld/querySelectorEntity" },
              { text: "事件", link: "/GameWorld/events" },
              { text: "计分板与队伍", link: "/GameWorld/scoreboard" },
              { text: "世界边界", link: "/GameWorld/worldBorder" },
              { text: "世界效果", link: "/GameWorld/worldEffects" },
            ],
          },
          {
            text: "🧱 游戏方块",
            link: "/GameVoxels/index",
            collapsed: false,
            items: [
              { text: "方块操作", link: "/GameVoxels/operate" },
              { text: "方块速查表", link: "/GameVoxels/cheatSheet" },
            ],
          },
          {
            text: "🏠 游戏实体",
            link: "/GameEntity/index",
            collapsed: false,
            items: [
              { text: "是否为玩家", link: "/GameEntity/isPlayer" },
              { text: "外观", link: "/GameEntity/appearance" },
              { text: "物理", link: "/GameEntity/physics" },
              { text: "标签", link: "/GameEntity/label" },
              { text: "AI 与导航", link: "/GameEntity/input" },
              { text: "战斗与生命", link: "/GameEntity/fight" },
            ],
          },
          {
            text: "游戏玩家",
            link: "/GamePlayerEntity/index",
            collapsed: false,
            items: [
              { text: "玩家信息", link: "/GamePlayerEntity/info" },
              { text: "外观", link: "/GamePlayerEntity/appearance" },
              { text: "摄像机视角", link: "/GamePlayerEntity/camera" },
              { text: "按键与行动", link: "/GamePlayerEntity/input" },
              { text: "战斗与生命", link: "/GamePlayerEntity/fight" },
              { text: "对话与互动", link: "/GamePlayerEntity/chat" },
              { text: "音乐音效", link: "/GamePlayerEntity/music" },
              { text: "跳转网站", link: "/GamePlayerEntity/link" },
              { text: "物品与背包", link: "/GamePlayerEntity/inventory" },
            ],
          },
          {
            text: "📈 游戏数据存储",
            link: "/GameDataStorage/index",
            collapsed: false,
            items: [
              { text: "获取数据空间", link: "/GameDataStorage/getSpace" },
              { text: "操作数据", link: "/GameDataStorage/setSpace" },
            ],
          },
        ],
      },
      {
        text: "数学类型",
        collapsed: false,
        items: [
          { text: "三维向量 (GameVector3)", link: "/GameVector3/index" },
          { text: "包围盒 (GameBounds3)", link: "/GameBounds3/index" },
          { text: "四元数 (GameQuaternion)", link: "/GameQuaternion/index" },
          { text: "RGB 颜色", link: "/GameRGBColor/index" },
          { text: "RGBA 颜色", link: "/GameRGBAColor/index" },
        ],
      },
      {
        text: "其他",
        collapsed: false,
        items: [
          { text: "控制台输出", link: "/GameConsole/" },
          { text: "事件监听令牌", link: "/GameEventHandlerToken/" },
        ],
      },
    ],
    editLink: {
      pattern:
        "https://gitee.com/box3lab/box3-product-document/blob/master/mc-api/:path",
      text: "在 Gitee 上编辑此界面",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
  },
});
