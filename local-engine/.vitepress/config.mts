import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-cn",
  title: "BOX3 本地引擎",
  description: "BOX3 本地引擎安装、配置、使用与维护说明",
  head: [["link", { rel: "icon", href: "/local-engine/logo.svg" }]],
  base: "/local-engine/",
  outDir: "../dist/local-engine",
  cleanUrls: true,
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
      { text: "本地引擎", link: "/" },
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
          { text: "安装前准备", link: "/getting-started/requirements" },
          { text: "桌面版安装", link: "/getting-started/desktop-installation" },
          { text: "Linux 服务器安装", link: "/getting-started/linux-installation" },
          { text: "首次启动", link: "/getting-started/first-start" },
        ],
      },
      {
        text: "日常使用",
        collapsed: false,
        items: [
          { text: "使用启动器", link: "/guide/launcher" },
          { text: "访问范围与端口", link: "/guide/network" },
          { text: "创建并游玩地图", link: "/guide/create-and-play" },
          { text: "玩家管理后台", link: "/guide/player-admin" },
          { text: "地图与容器管理", link: "/guide/maps-and-containers" },
        ],
      },
      {
        text: "维护与排障",
        collapsed: false,
        items: [
          { text: "备份与恢复", link: "/operations/backup" },
          { text: "升级本地引擎", link: "/operations/upgrade" },
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
