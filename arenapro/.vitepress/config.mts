import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/arenapro/",
  outDir: "../dist/arenapro",
  head: [["link", { rel: "icon", href: "/icon.png" }]],
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: "Tip",
      warningLabel: "Warning",
      dangerLabel: "Danger",
      infoLabel: "Info",
      detailsLabel: "Details",
      noteLabel: "Note",
      importantLabel: "Important",
      cautionLabel: "Caution",
    },
  },

  themeConfig: {
    // This is shared theme config that will be merged with locale-specific theme config
    logo: "/icon.png",
    search: {
      provider: "local",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Box3Lab/box3-editor-support-for-vscode",
      },
    ],
    footer: {
      message: "神岛实验室",
      copyright: "Copyright © 2024-2025",
    },
  },

  locales: {
    "zh/vite": {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/vite",
      title: "ArenaPro Creator",
      description: "支持VSCode与TypeScript的神岛游戏制作插件",

      themeConfig: {
        nav: [
          {
            text: "脚手架版本",
            items: [
              {
                text: "Webpack（稳定版）",
                link: "/zh/guide/01-introduction/00-toolbox-introduction",
              },
              { text: "Vite（预览版）", link: "/zh/vite/guide/" },
            ],
          },
          { text: "API手册", link: "https://docs.box3lab.com/apapi/" },
          {
            text: "创作者QQ群",
            link: "https://qm.qq.com/cgi-bin/qm/qr?authKey=LteV6YzMX0xKmrQSp8%2BaNi6YUdonwyVMc44npCKlNymwnoWVZBmG5Y4S4N9RwxEP&k=JeZQYLLnherYW6pGlbODkErutSmbkzr-&noverify=0",
          },
        ],
        outline: {
          level: [2, 3],
          label: "本页目录",
        },
        sidebar: [
          {
            text: "快速上手",
            collapsed: false,
            items: [
              {
                text: "认识 Vite",
                link: "/zh/vite/guide/",
              },
              {
                text: "Vite 脚手架创建",
                link: "/zh/vite/guide/quickstart",
              },

              {
                text: "配置神岛信息",
                link: "/zh/vite/guide/dao3-config",
              },

              {
                text: "项目结构总览",
                link: "/zh/vite/guide/structure",
              },
            ],
          },
          {
            text: "Vite 基础",
            collapsed: false,
            items: [
              {
                text: "Vite 专属能力",
                link: "/zh/vite/guide/vite-features",
              },
              {
                text: "根据 VITE_MODE 区分环境",
                link: "/zh/vite/guide/vite-mode-env",
              },
              {
                text: "环境变量的多种用法",
                link: "/zh/vite/guide/vite-env-files",
              },
              {
                text: "使用脚手架开发 NPM 包",
                link: "/zh/vite/guide/vite-npm-dev",
              },
              {
                text: "神岛配置文件",
                link: "/zh/vite/guide/dao3-config-ts",
              },
            ],
          },
          {
            text: "FAQ",
            collapsed: false,
            items: [
              {
                text: "脱离插件后同步资源与账号",
                link: "/zh/vite/guide/faq-sync-standalone",
              },
            ],
          },
        ],
        docFooter: {
          prev: "上一页",
          next: "下一页",
        },
      },
    },
    zh: {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/",
      title: "ArenaPro Creator",
      description: "支持VSCode与TypeScript的神岛游戏制作插件",

      themeConfig: {
        nav: [
          {
            text: "脚手架版本",
            items: [
              {
                text: "Webpack（稳定版）",
                link: "/zh/guide/01-introduction/00-toolbox-introduction",
              },
              { text: "Vite（预览版）", link: "/zh/vite/guide/" },
            ],
          },
          { text: "API手册", link: "https://docs.box3lab.com/apapi/" },
          {
            text: "创作者QQ群",
            link: "https://qm.qq.com/cgi-bin/qm/qr?authKey=LteV6YzMX0xKmrQSp8%2BaNi6YUdonwyVMc44npCKlNymwnoWVZBmG5Y4S4N9RwxEP&k=JeZQYLLnherYW6pGlbODkErutSmbkzr-&noverify=0",
          },
        ],
        outline: {
          level: [2, 3],
          label: "本页目录",
        },
        sidebar: [
          {
            text: "快速开始",
            collapsed: false,
            items: [
              { text: "插件简介", link: "/index" },
              {
                text: "认识你的“创作者工具箱”",
                link: "/zh/guide/01-introduction/00-toolbox-introduction",
              },
              {
                text: "ArenaPro 与 Arena 核心差异",
                link: "/zh/guide/03-basic-tutorial/02-whats-different",
              },
              {
                text: "第一步：安装与配置",
                link: "/zh/guide/02-getting-started/01-install",
              },
              {
                text: "第二步：创建你的第一个项目",
                link: "/zh/guide/02-getting-started/02-create-project",
              },
              {
                text: "第三步：连接到云端进行调试",
                link: "/zh/guide/02-getting-started/03-connect-to-cloud",
              },
            ],
          },
          {
            text: "核心开发工作流",
            collapsed: false,
            items: [
              {
                text: "Hello World 实战",
                link: "/zh/guide/03-basic-tutorial/01-hello-world-tutorial",
              },
              {
                text: "深入理解 TypeScript",
                link: "/zh/guide/03-basic-tutorial/typescript-vs-javascript",
              },
              {
                text: "代码调试",
                collapsed: true,
                items: [
                  {
                    text: "Debug vs. Release 模式",
                    link: "/zh/guide/04-development-workflow/debug",
                  },
                  {
                    text: "使用 HMR 实现代码热更新",
                    link: "/zh/guide/04-development-workflow/hmr",
                  },
                  {
                    text: "使用 VS Code 进行断点调试",
                    link: "/zh/guide/04-development-workflow/debugger",
                  },
                  {
                    text: "深入理解：两种构建模式的区别",
                    link: "/zh/guide/04-development-workflow/compilationPrinciple",
                  },
                ],
              },
              {
                text: "客户端与服务端开发",
                collapsed: true,
                items: [
                  {
                    text: "共享代码 (Single Source of Truth)",
                    link: "/zh/guide/05-best-practices/codeReuse",
                  },
                  {
                    text: "共享数据结构 (Type-Safe Events)",
                    link: "/zh/guide/05-best-practices/communicationAgreement",
                  },
                ],
              },
              {
                text: "Git 上手指南 (外部链接)",
                link: "https://liaoxuefeng.com/books/git/introduction/index.html",
              },
            ],
          },

          {
            text: "功能指南",
            collapsed: false,
            items: [
              {
                text: "UI 索引",
                link: "/zh/guide/06-advanced-topics/uiIndex-usage",
              },
              {
                text: "配置你的“代码管家”",
                link: "/zh/guide/06-advanced-topics/code-linting-and-formatting",
              },
              {
                text: "专业地管理游戏数据 (JSON)",
                link: "/zh/guide/06-advanced-topics/json",
              },

              {
                text: "可视化你的代码结构",
                link: "/zh/guide/06-advanced-topics/nodeGraph",
              },
              {
                text: "管理资源",
                link: "/zh/guide/06-advanced-topics/resources",
              },
              {
                text: "类型安全：同步游戏资源",
                link: "/zh/guide/06-advanced-topics/asset-synchronization",
              },
              {
                text: "国际化语言",
                link: "/zh/guide/06-advanced-topics/i18n",
              },
              {
                text: "客户端资源管理",
                link: "/zh/guide/06-advanced-topics/uploadResources",
              },
              {
                text: "在 VS Code 中使用工作区开发",
                link: "/zh/guide/06-advanced-topics/vscode-workspace",
              },
            ],
          },
          {
            text: "项目与构建",
            collapsed: false,
            items: [
              {
                text: "管理多套代码入口 (分包)",
                link: "/zh/guide/06-advanced-topics/bulidName",
              },
              // {
              //   text: "高级工作流：使用 Monorepo",
              //   link: "/zh/guide/06-advanced-topics/monorepo-workflow",
              // },
              {
                text: "管理环境变量",
                link: "/zh/guide/06-advanced-topics/env",
              },
              {
                text: "自定义构建流程 (Webpack)",
                link: "/zh/guide/06-advanced-topics/webpackPlugins",
              },
              {
                text: "导出代码到 Arena",
                link: "/zh/guide/06-advanced-topics/toArena",
              },
            ],
          },
          {
            text: "NPM包",
            collapsed: false,
            items: [
              {
                text: "安全地使用外部 NPM 包",
                link: "/zh/guide/06-advanced-topics/npmPackage",
              },
              {
                text: "在团队中使用本地私有 NPM 包",
                link: "/zh/guide/06-advanced-topics/local-npm-package",
              },

              {
                text: "制作自己的NPM包",
                collapsed: false,
                items: [
                  {
                    text: "发布你的第一个 NPM 包",
                    link: "/zh/guide/07-publishing/createNPMProject",
                  },
                  {
                    text: "投稿社区：发布NPM包",
                    link: "/zh/guide/06-advanced-topics/contributing-to-dao3fun",
                  },
                ],
              },
              {
                text: "用 Zod 做 JavaScript 运行时校验",
                link: "/zh/guide/06-advanced-topics/npm-zod-runtime-validation",
              },
              {
                text: "用 jest 引入自动化测试",
                link: "/zh/guide/06-advanced-topics/automated-testing",
              },
              {
                text: "使用 Remeda（类型友好的工具库）",
                link: "/zh/guide/06-advanced-topics/remeda",
              },
              {
                text: "gl-matrix 向量/矩阵/四元数实战",
                link: "/zh/guide/06-advanced-topics/gl-matrix",
              },
              {
                text: "simplex-noise 噪声在地形/资源生成中的实战",
                link: "/zh/guide/06-advanced-topics/simplex-noise",
              },
              {
                text: "pathfinding + rbush：寻路与空间加速",
                link: "/zh/guide/06-advanced-topics/pathfinding-rbush",
              },
            ],
          },
          {
            text: "框架与 API",
            collapsed: false,
            items: [
              {
                text: "ECS 组件系统",
                collapsed: true,
                items: [
                  {
                    text: "组件介绍",
                    link: "/zh/package/component/componentGuide/index",
                  },
                  {
                    text: "开发指南",
                    collapsed: true,
                    items: [
                      {
                        text: "创建组件",
                        link: "/zh/package/component/componentGuide/setup",
                      },
                      {
                        text: "组件执行",
                        link: "/zh/package/component/componentGuide/component",
                      },
                      {
                        text: "装饰器",
                        link: "/zh/package/component/componentGuide/decorator",
                      },
                      {
                        text: "生命周期",
                        link: "/zh/package/component/componentGuide/lifecycle",
                      },
                      {
                        text: "节点管理",
                        link: "/zh/package/component/componentGuide/create-destroy",
                      },
                      {
                        text: "访问组件",
                        link: "/zh/package/component/componentGuide/access-node-component",
                      },
                      {
                        text: "基础接口",
                        link: "/zh/package/component/componentGuide/basic-node-api",
                      },
                      {
                        text: "事件系统",
                        link: "/zh/package/component/componentGuide/event-node",
                      },
                      {
                        text: "世界事件",
                        link: "/zh/package/component/componentGuide/event-world",
                      },
                      {
                        text: "节点系统",
                        link: "/zh/package/component/componentGuide/system",
                      },
                      {
                        text: "时间管理",
                        link: "/zh/package/component/componentGuide/time",
                      },
                      {
                        text: "性能优化",
                        link: "/zh/package/component/componentGuide/performance",
                      },
                    ],
                  },
                  {
                    text: "时间回溯系统",
                    collapsed: true,
                    items: [
                      {
                        text: "时间回溯 - 入门",
                        link: "/zh/package/component/timeRewindSystem/timeRewindComponent",
                      },
                      {
                        text: "时间回溯 - 进阶",
                        link: "/zh/package/component/timeRewindSystem/intermediateTopics",
                      },
                      {
                        text: "时间回溯 - 高级",
                        link: "/zh/package/component/timeRewindSystem/advancedTopics",
                      },
                      {
                        text: "更多示例",
                        link: "/zh/package/component/example",
                      },
                    ],
                  },
                  {
                    text: "API 参考",
                    collapsed: true,
                    items: [
                      {
                        text: "EventEmitter",
                        link: "/zh/package/component/api/EventEmitter",
                      },
                      {
                        text: "EntityNode",
                        link: "/zh/package/component/api/EntityNode",
                      },
                      {
                        text: "Component",
                        link: "/zh/package/component/api/Component",
                      },
                      {
                        text: "NodeSystem",
                        link: "/zh/package/component/api/NodeSystem",
                      },
                      {
                        text: "NodeTime",
                        link: "/zh/package/component/api/NodeTime",
                      },
                    ],
                  },
                ],
              },
              {
                text: "React 驱动的 UI",
                collapsed: true,
                items: [
                  { text: "框架简介", link: "/zh/package/react" },
                  {
                    text: "开发指南",
                    collapsed: true,
                    items: [
                      {
                        text: "创建脚本",
                        link: "/zh/package/react/reactGuide/setup",
                      },
                      {
                        text: "XML 基础",
                        link: "/zh/package/react/reactGuide/xml",
                      },
                      {
                        text: "DOM 树",
                        link: "/zh/package/react/reactGuide/domTree",
                      },
                      {
                        text: "元素引用",
                        link: "/zh/package/react/reactGuide/refs",
                      },
                      {
                        text: "类型定义",
                        link: "/zh/package/react/reactGuide/tsType",
                      },
                      {
                        text: "多组件",
                        link: "/zh/package/react/reactGuide/multiComponent",
                      },
                      {
                        text: "事件处理",
                        link: "/zh/package/react/reactGuide/eventHandlers",
                      },
                      {
                        text: "钩子函数",
                        link: "/zh/package/react/reactGuide/hooks",
                      },
                      {
                        text: "API 参考",
                        link: "/zh/package/react/reactGuide/api",
                      },
                    ],
                  },
                  { text: "实战示例", link: "/zh/package/react/selectCode" },
                  {
                    text: "React 官方教程",
                    link: "https://react.dev/learn",
                  },
                ],
              },
            ],
          },
          {
            text: "配置与权限",
            collapsed: false,
            items: [
              {
                text: "与 Arena 的差异",
                collapsed: true,
                items: [
                  { text: "资源路径", link: "/zh/difference/resourcePath" },
                  {
                    text: "自定义实体",
                    link: "/zh/difference/customizeEntity",
                  },
                  { text: "对话框", link: "/zh/difference/dialog" },
                  { text: "节点查找", link: "/zh/difference/findChildByName" },
                  { text: "数据存储", link: "/zh/difference/storage" },
                  { text: "远程通道", link: "/zh/difference/remoteChannel" },
                  { text: "体素操作", link: "/zh/difference/voxel" },
                ],
              },
              {
                text: "项目配置",
                collapsed: true,
                items: [
                  { text: "脚手架架构", link: "/zh/dao3Cfg/file" },
                  { text: "配置属性", link: "/zh/dao3Cfg/attribute" },
                ],
              },
              {
                text: "特殊权限",
                collapsed: true,
                items: [{ text: "数据空间", link: "/zh/authority/storage" }],
              },
            ],
          },
          {
            text: "社区",
            collapsed: false,
            items: [
              { text: "社区贡献激励", link: "/zh/community/community-rewards" },

              { text: "⚠️ 行为准则", link: "/zh/community/CODE_OF_CONDUCT" },
              { text: "🙏 特别鸣谢", link: "/zh/community/special-thanks" },
              { text: "更新日志", link: "/zh/community/release-notes" },
            ],
          },
          {
            text: "MCP工具",
            collapsed: false,
            items: [
              { text: "插件MCP", link: "/zh/mcp/" },
              {
                text: "查询神岛知识库",
                link: "/zh/mcp/chat-only-knowledgebase",
              },
            ],
          },
        ],
        docFooter: {
          prev: "上一页",
          next: "下一页",
        },
      },
    },
  },
});
