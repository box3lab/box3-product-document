import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-cn",
  title: "神岛材质包Unity手册",
  head: [["link", { rel: "icon", href: "/unity.png" }]],
  description: "为创作者所有✨ 由创作者共建⚖️ 因创作者而生🎉",
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
  base: "/unity-package/",
  outDir: "../dist/unity-package",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/unity.png",
    nav: [
      {
        text: "我的世界神岛模组",
        link: "https://docs.box3lab.com/mc-mod/",
      },
    ],
    search: {
      provider: "local",
    },
    sidebar: [
      { text: "包简介", link: "/index" },
      {
        text: "快速入门",
        collapsed: false,
        items: [
          { text: "快速上手", link: "/getting-started" },
        ],
      },
      {
        text: "编辑器操作",
        collapsed: false,
        items: [
          { text: "方块库操作", link: "/art/AL-BuilderWorkflow" },
          { text: "地形导入", link: "/art/AL-GzImport" },
          { text: "地形导出", link: "/art/AL-GzExport" },
          { text: "Chunk 构建系统", link: "/art/AL-ChunkSystem" },
          { text: "资源管理", link: "/art/AL-AssetManagement" },
        ],
      },
      {
        text: "工作流实战",
        collapsed: false,
        items: [
          { text: "从 Minecraft 导入", link: "/art/AL-FromMinecraft" },
        ],
      },
      {
        text: "程序开发",
        collapsed: false,
        items: [
          {
            text: "API 概览与工程接入",
            link: "/programmer/PG-OverviewAndSetup",
          },
          { text: "Editor API 参考", link: "/programmer/API-Editor" },
          { text: "Runtime API 参考", link: "/programmer/API-Runtime" },
        ],
      },
      {
        text: "附录",
        collapsed: false,
        items: [
          { text: "菜单入口速查", link: "/appendix/menu-reference" },
          { text: "常见问题", link: "/appendix/faq" },
        ],
      },
    ],
    editLink: {
      pattern:
        "https://gitee.com/box3lab/box3-product-document/blob/master/unity-package/:path",
      text: "在 Gitee 上编辑此界面",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "short",
      },
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    externalLinkIcon: true,
    socialLinks: [
      {
        link: "https://gitee.com/box3lab/box3-product-document",
        icon: {
          svg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1726049913751" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1462" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 992C246.895625 992 32 777.104375 32 512S246.895625 32 512 32s480 214.895625 480 480-214.895625 480-480 480z m242.9521875-533.3278125h-272.56875a23.7121875 23.7121875 0 0 0-23.71125 23.7121875l-0.024375 59.255625c0 13.08 10.6078125 23.7121875 23.6878125 23.7121875h165.96c13.104375 0 23.7121875 10.6078125 23.7121875 23.6878125v11.855625a71.1121875 71.1121875 0 0 1-71.1121875 71.1121875h-225.215625a23.7121875 23.7121875 0 0 1-23.6878125-23.7121875V423.1278125a71.1121875 71.1121875 0 0 1 71.0878125-71.1121875h331.824375a23.7121875 23.7121875 0 0 0 23.6878125-23.71125l0.0721875-59.2565625a23.7121875 23.7121875 0 0 0-23.68875-23.7121875H423.08a177.76875 177.76875 0 0 0-177.76875 177.7921875V754.953125c0 13.1034375 10.60875 23.7121875 23.713125 23.7121875h349.63125a159.984375 159.984375 0 0 0 159.984375-159.984375V482.36a23.7121875 23.7121875 0 0 0-23.7121875-23.6878125z" fill="#C71D23" p-id="1463"></path></svg>',
        },
      },
    ],
  },
});
