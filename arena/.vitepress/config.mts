import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-cn",
  title: "ArenaEdit 用户手册",
  head: [["link", { rel: "icon", href: "/arena.svg" }]],
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
  base: "/arena/",
  srcExclude: ["SEL/**", "plugIns/**"],
  outDir: "../dist/arena",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/arena.svg",
    nav: [{ text: "VOXA 用户手册", link: "https://docs.dao3.fun/voxa/" }],
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
            collapsed: true,
            items: [
              { text: "创建第一个地图", link: "/getting-started/create" },
              { text: "地形搭建", link: "/getting-started/helloWorld-models" },
              { text: "代码编写", link: "/getting-started/helloWorld-code" },
              { text: "发布第一个地图", link: "/getting-started/publish" },
            ],
          },
          {
            text: "编辑器界面",
            link: "/editor/index",
            collapsed: true,
            items: [
              { text: "场景编辑器", link: "/editor/scene" },
              { text: "UI编辑器", link: "/editor/ui" },
              { text: "层级管理器", link: "/editor/hierarchy" },
              { text: "资源管理器", link: "/editor/assets" },
              { text: "代码编辑器", link: "/editor/code" },
            ],
          },
          { text: "客户端与服务端", link: "/core/client-server-modules" },
        ],
      },
      {
        text: "功能模块",
        collapsed: false,
        items: [
          {
            text: "地形系统",
            link: "/features/terrain",
            collapsed: true,
            items: [
              { text: "方块", link: "/features/terrain/box" },
              {
                text: "模型系统",
                collapsed: true,
                items: [
                  { text: "模型", link: "/features/terrain/model/" },
                  { text: "资源树", link: "/features/terrain/model/tree" },
                  { text: "属性", link: "/features/terrain/model/attribute" },
                ],
              },
              { text: "场景", link: "/features/terrain/scene" },
            ],
          },
          {
            text: "玩家系统",
            link: "/features/player",
            collapsed: true,
            items: [
              { text: "皮肤", link: "/features/player/skin" },
              { text: "虚拟按键", link: "/features/player/key" },
            ],
          },
          {
            text: "2DUI系统",
            link: "/features/ui",
            collapsed: true,
            items: [
              { text: "屏幕", link: "/features/ui/screen" },
              { text: "资源树", link: "/features/ui/tree" },
              { text: "布局", link: "/features/ui/layout" },
              {
                text: "元素",
                link: "/features/ui/element",
                collapsed: true,
                items: [
                  { text: "UiNode 参考", link: "/features/ui/element/UiNode" },
                  {
                    text: "UiRenderable 参考",
                    link: "/features/ui/element/UiRenderable",
                  },
                  { text: "UiBox 参考", link: "/features/ui/element/UiBox" },
                  { text: "UiText 参考", link: "/features/ui/element/UiText" },
                  {
                    text: "UiInput 参考",
                    link: "/features/ui/element/UiInput",
                  },
                  {
                    text: "UiImage 参考",
                    link: "/features/ui/element/UiImage",
                  },
                  {
                    text: "UiScrollBox 参考",
                    link: "/features/ui/element/UiScrollBox",
                  },
                  { text: "UiScreen 参考", link: "/features/ui/screen" },
                ],
              },
            ],
          },
        ],
      },
      {
        text: "JavaScript 入门",
        collapsed: false,
        items: [
          {
            text: "1. 入门基础",
            collapsed: true,
            items: [
              {
                text: "什么是 JavaScript？",
                link: "/javascriptEntry/01-getting-started/01-what-is-javascript",
              },
              {
                text: "Hello, World!",
                link: "/javascriptEntry/01-getting-started/02-hello-world",
              },
              {
                text: "代码注释",
                link: "/javascriptEntry/01-getting-started/03-code-comments",
              },
            ],
          },

          {
            text: "2. 变量与数据类型",
            collapsed: true,
            items: [
              {
                text: "变量",
                link: "/javascriptEntry/02-variables-and-data-types/01-variables",
              },
              {
                text: "数据类型",
                link: "/javascriptEntry/02-variables-and-data-types/02-data-types",
              },
              {
                text: "运算符",
                link: "/javascriptEntry/02-variables-and-data-types/03-operators",
              },
            ],
          },
          {
            text: "3. 控制流",
            collapsed: true,
            items: [
              {
                text: "条件语句",
                link: "/javascriptEntry/03-control-flow/01-conditional-statements",
              },
              {
                text: "循环",
                link: "/javascriptEntry/03-control-flow/02-loops",
              },
            ],
          },
          {
            text: "4. 函数",
            collapsed: true,
            items: [
              {
                text: "定义函数",
                link: "/javascriptEntry/04-functions/01-defining-functions",
              },
              {
                text: "参数和返回值",
                link: "/javascriptEntry/04-functions/02-parameters-and-return-values",
              },
              {
                text: "作用域",
                link: "/javascriptEntry/04-functions/03-scope",
              },
            ],
          },
          {
            text: "5. 数据结构",
            collapsed: true,
            items: [
              {
                text: "对象",
                link: "/javascriptEntry/05-data-structures/01-objects",
              },
              {
                text: "数组",
                link: "/javascriptEntry/05-data-structures/02-arrays",
              },
            ],
          },
          {
            text: "6. 初步实践",
            collapsed: true,
            items: [
              {
                text: "数字与数学",
                link: "/javascriptEntry/02-core-fundamentals/01-numbers-and-math",
              },
              {
                text: "日期与时间",
                link: "/javascriptEntry/02-core-fundamentals/02-dates-and-time",
              },
              {
                text: "数字格式化",
                link: "/javascriptEntry/02-core-fundamentals/03-number-formatting",
              },
              {
                text: "随机与可复现随机",
                link: "/javascriptEntry/02-core-fundamentals/04-random-and-seeding",
              },
              {
                text: "向量基础（游戏常用）",
                link: "/javascriptEntry/02-core-fundamentals/05-vector-basics",
              },
            ],
          },

          {
            text: "7. 中级主题",
            collapsed: true,
            items: [
              {
                text: "类",
                link: "/javascriptEntry/06-advanced-topics/01-classes",
              },
              {
                text: "异步 JavaScript",
                link: "/javascriptEntry/06-advanced-topics/02-asynchronous-javascript",
              },
              {
                text: "错误处理",
                link: "/javascriptEntry/06-advanced-topics/03-error-handling",
              },
              {
                text: "JSON 详解",
                link: "/javascriptEntry/06-advanced-topics/04-json",
              },
              {
                text: "`this` 关键字详解",
                link: "/javascriptEntry/07-intermediate-topics/01-this-keyword",
              },
              {
                text: "原型与原型链",
                link: "/javascriptEntry/07-intermediate-topics/02-prototypes",
              },
              {
                text: "闭包 (Closures)",
                link: "/javascriptEntry/07-intermediate-topics/03-closures",
              },
              {
                text: "高级数组方法",
                link: "/javascriptEntry/07-intermediate-topics/04-advanced-array-methods",
              },
            ],
          },
          {
            text: "8. 高级主题",
            collapsed: true,
            items: [
              {
                text: "异步编程深入",
                link: "/javascriptEntry/08-advanced-topics/01-async-deep-dive",
              },
              {
                text: "事件循环",
                link: "/javascriptEntry/08-advanced-topics/02-event-loop",
              },
              {
                text: "JavaScript 设计模式",
                link: "/javascriptEntry/08-advanced-topics/03-design-patterns",
              },
              {
                text: "内存管理",
                link: "/javascriptEntry/08-advanced-topics/04-memory-management",
              },
              {
                text: "更多 ES6+ 特性",
                collapsed: true,
                items: [
                  {
                    text: "箭头函数",
                    link: "/javascriptEntry/06-advanced-topics/05-01-arrow-functions",
                  },
                  {
                    text: "默认参数与参数解构",
                    link: "/javascriptEntry/06-advanced-topics/05-02-default-params",
                  },
                  {
                    text: "增强的对象字面量",
                    link: "/javascriptEntry/06-advanced-topics/05-03-enhanced-object-literals",
                  },
                  {
                    text: "Map 与 Set",
                    link: "/javascriptEntry/06-advanced-topics/05-04-map-set",
                  },
                  {
                    text: "Promise 基础",
                    link: "/javascriptEntry/06-advanced-topics/05-05-promises-basics",
                  },
                  {
                    text: "模块化：import / export",
                    link: "/javascriptEntry/06-advanced-topics/05-06-modules",
                  },
                  {
                    text: "可选链与空值合并",
                    link: "/javascriptEntry/06-advanced-topics/05-07-optional-chaining-nullish",
                  },
                  {
                    text: "常用 Array / Object 方法",
                    link: "/javascriptEntry/06-advanced-topics/05-08-array-object-methods",
                  },
                  {
                    text: "Symbol 与迭代协议",
                    link: "/javascriptEntry/06-advanced-topics/05-09-symbol-iterator",
                  },
                  {
                    text: "WeakMap 与 WeakSet",
                    link: "/javascriptEntry/06-advanced-topics/05-10-weakmap-weakset",
                  },
                  {
                    text: "字符串新方法补充",
                    link: "/javascriptEntry/06-advanced-topics/05-11-string-methods",
                  },
                  {
                    text: "Number/Math 与 BigInt",
                    link: "/javascriptEntry/06-advanced-topics/05-12-number-math-bigint",
                  },
                  {
                    text: "Intl 国际化基础",
                    link: "/javascriptEntry/06-advanced-topics/05-13-intl-basics",
                  },
                  {
                    text: "标签模板（Tagged Templates）",
                    link: "/javascriptEntry/06-advanced-topics/05-14-tagged-templates",
                  },
                  {
                    text: "Proxy 与 Reflect",
                    link: "/javascriptEntry/06-advanced-topics/05-15-proxy-reflect",
                  },
                  {
                    text: "RegExp 增强",
                    link: "/javascriptEntry/06-advanced-topics/05-16-regexp-enhancements",
                  },
                  {
                    text: "Promise 进阶",
                    link: "/javascriptEntry/06-advanced-topics/05-17-promises-advanced",
                  },
                  {
                    text: "逻辑赋值运算符",
                    link: "/javascriptEntry/06-advanced-topics/05-19-logical-assignment",
                  },
                  {
                    text: "Class 字段与私有字段",
                    link: "/javascriptEntry/06-advanced-topics/05-21-class-fields-private",
                  },
                  {
                    text: "生成器与 yield",
                    link: "/javascriptEntry/06-advanced-topics/06-generators-and-yield",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: "JS×神岛API",
        collapsed: false,
        items: [
          // { text: "如何阅读API", link: "/javascriptDaoAPI/apiUsage" },
          {
            text: "API 入门：编写你的第一个游戏脚本",
            link: "/javascriptDaoAPI/02-getting-started",
          },
          {
            text: "创建你的第一个实体",
            link: "/javascriptDaoAPI/03-creating-entities",
          },
          {
            text: "创建你的第一个 UI",
            link: "/javascriptDaoAPI/04-creating-ui",
          },
          {
            text: "客户端与服务器通信",
            link: "/javascriptDaoAPI/05-client-server-communication",
          },
        ],
      },
    ],
    editLink: {
      pattern:
        "https://gitee.com/box3lab/box3-product-document/blob/master/arena/:path",
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
