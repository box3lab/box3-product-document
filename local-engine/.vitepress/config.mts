import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-cn",
  title: "BOX3 本地引擎",
  description: "安装 BOX3 本地引擎，完成首次启动、地图创作、服务器连接与备份更新",
  head: [
    ["link", { rel: "icon", href: "/local-engine/logo.svg" }],
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
      { text: "ARENA 手册", link: "https://docs.box3lab.com/arena/" },
      { text: "VOXA 手册", link: "https://docs.box3lab.com/voxa/" },
      { text: "创作 CLI", link: "https://docs.box3lab.com/arenapro/zh/cli/" },
      { text: "脚本 API", link: "https://docs.box3lab.com/api/" },
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
          { text: "安装前准备", link: "/getting-started/requirements" },
          {
            text: "安装部署",
            collapsed: false,
            items: [
              { text: "桌面版", link: "/getting-started/desktop-installation" },
              { text: "服务器版", link: "/getting-started/linux-installation" },
            ],
          },
          { text: "首次启动", link: "/getting-started/first-start" },
          { text: "局域网与公网访问", link: "/guide/network-access" },
        ],
      },
      {
        text: "作品与创作",
        collapsed: false,
        items: [
          { text: "创作、预览与发布", link: "/guide/create-and-play" },
          { text: "作品管理", link: "/guide/works" },
          { text: "地图组与地图", link: "/guide/maps-and-groups" },
        ],
      },
      {
        text: "游玩与管理",
        collapsed: false,
        items: [
          { text: "玩家启动器与下载", link: "/guide/player-launcher" },
          { text: "游玩地图管理", link: "/guide/play-maps" },
          { text: "玩家管理后台", link: "/guide/player-admin" },
          { text: "登录门户与模板", link: "/guide/login-portal" },
          { text: "地图运行与资源管理", link: "/guide/maps-and-containers" },
        ],
      },
      {
        text: "日常维护",
        collapsed: false,
        items: [
          { text: "备份与更新", link: "/operations/backup-and-update" },
          { text: "账号与访问安全", link: "/operations/security" },
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
