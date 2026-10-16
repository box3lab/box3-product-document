import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-cn",
  title: "VoxaEdit 用户手册",
  head: [["link", { rel: "icon", href: "/voxa.svg" }]],
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
  base: "/voxa/",
  outDir: "../dist/voxa",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/voxa.svg",
    nav: [{ text: "Arena 用户手册", link: "https://docs.box3lab.com/arena/" }],
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "基础知识",
        collapsed: false,
        items: [
          {
            text: "新手上路",
            link: "/index",
            collapsed: false,
            items: [
              { text: "创建第一个模型", link: "/getting-started/create" },
              { text: "白模搭建", link: "/getting-started/models-one" },
              { text: "模型颜色", link: "/getting-started/models-two" },
              { text: "骨骼动画", link: "/getting-started/models-three" },
              { text: "发布第一个模型", link: "/getting-started/publish" },
            ],
          },
          {
            text: "编辑器界面",
            collapsed: false,
            items: [
              { text: "通用布局", link: "/editor/universal" },
              {
                text: "部件界面布局",
                collapsed: true,
                link: "/editor/parts",
                items: [
                  { text: "视口窗", link: "/editor/parts/shortcutKeys" },
                  { text: "全局工具栏", link: "/editor/parts/globalToolbar" },
                  { text: "编辑工具栏", link: "/editor/parts/editToolbar" },
                  {
                    text: "辅助工具栏",
                    link: "/editor/parts/auxiliaryToolbar",
                  },
                  { text: "属性面板", link: "/editor/parts/propertiesPanel" },
                  { text: "部件/骨骼列表", link: "/editor/parts/bone" },
                ],
              },
              {
                text: "体素界面布局",
                collapsed: true,
                link: "/editor/voxels",
                items: [
                  { text: "视口窗", link: "/editor/voxels/shortcutKeys" },
                  { text: "全局工具栏", link: "/editor/voxels/globalToolbar" },
                  { text: "编辑工具栏", link: "/editor/voxels/editToolbar" },
                  {
                    text: "辅助工具栏",
                    link: "/editor/voxels/auxiliaryToolbar",
                  },
                  { text: "属性面板", link: "/editor/voxels/propertiesPanel" },
                ],
              },
              {
                text: "动画界面布局",
                collapsed: true,
                link: "/editor/animation",
                items: [
                  { text: "视口窗", link: "/editor/animation/shortcutKeys" },
                  {
                    text: "全局工具栏",
                    link: "/editor/animation/globalToolbar",
                  },
                  { text: "编辑工具栏", link: "/editor/animation/editToolbar" },
                  {
                    text: "属性面板",
                    link: "/editor/animation/propertiesPanel",
                  },
                  {
                    text: "动画面板",
                    link: "/editor/animation/animationPanel",
                  },
                  { text: "部件/骨骼列表", link: "/editor/animation/bone" },
                ],
              },
              { text: "物理界面布局", link: "/editor/hitbox" },
            ],
          },
          { text: "换肤模式", link: "/editor/skinningMode" },
        ],
      },
      {
        text: "模型进阶",
        collapsed: false,
        items: [
          { text: "模型制作进阶", link: "/advanced/models" },
          { text: "模型对性能的影响", link: "/advanced/help" },
        ],
      },
    ],
    editLink: {
      pattern:
        "https://gitee.com/box3lab/box3-product-document/blob/master/voxa/:path",
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
