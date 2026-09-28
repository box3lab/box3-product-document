import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-cn",
  title: "BOX3 本地引擎",
  description: "BOX3 本地引擎安装、配置、使用与维护说明",
  head: [
    ["link", { rel: "icon", href: "/local-engine/logo.svg" }],
    ["link", { rel: "stylesheet", href: "/local-engine/install-guide.css" }],
  ],
  base: "/local-engine/",
  outDir: "../dist/local-engine",
  // Keep the .html suffix so static nginx deployments can resolve deep links
  // on a direct request, not only after client-side navigation.
  cleanUrls: false,
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
    logo: "/logo.svg",
    nav: [
      { text: "Arena 手册", link: "https://docs.dao3.fun/arena/" },
      { text: "Voxa 手册", link: "https://docs.dao3.fun/voxa/" },
      { text: "API 手册", link: "https://docs.dao3.fun/apapi/" },
      { text: "CLI 手册", link: "https://docs.dao3.fun/arenapro/zh/cli/" },
    ],
    footer: {
      message: "深圳奇梦岛科技有限公司",
      copyright: "Copyright © 2021–2026",
    },
    search: { provider: "local" },
    sidebar: [
      {
        text: "开始使用",
        collapsed: false,
        items: [
          { text: "本地引擎介绍", link: "/guide/introduction" },
          {
            text: "安装部署",
            collapsed: false,
            items: [
              { text: "桌面版", link: "/getting-started/desktop-installation" },
              { text: "服务器版", link: "/getting-started/linux-installation" },
            ],
          },
          { text: "首次启动", link: "/getting-started/first-start" },
        ],
      },
      {
        text: "作品与创作",
        collapsed: true,
        items: [
          { text: "作品管理", link: "/guide/works" },
          { text: "地图组与地图", link: "/guide/maps-and-groups" },
          { text: "创作、预览与发布", link: "/guide/create-and-play" },
        ],
      },
      {
        text: "游玩与管理",
        collapsed: true,
        items: [
          { text: "游玩地图管理", link: "/guide/play-maps" },
          { text: "玩家管理后台", link: "/guide/player-admin" },
          { text: "容器与资源管理", link: "/guide/maps-and-containers" },
        ],
      },
      {
        text: "安全与排障",
        collapsed: true,
        items: [
          { text: "安全建议", link: "/operations/security" },
          { text: "常见问题", link: "/operations/troubleshooting" },
        ],
      },
    ],
    lastUpdated: {
      text: "最后更新于",
      formatOptions: { dateStyle: "short", timeStyle: "short" },
    },
    docFooter: { prev: "上一页", next: "下一页" },
    outline: { level: [2, 3], label: "本页内容" },
    returnToTopLabel: "返回顶部",
    sidebarMenuLabel: "目录",
    darkModeSwitchLabel: "外观",
    externalLinkIcon: true,
  },
});
