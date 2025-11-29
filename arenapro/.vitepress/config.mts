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
    root: {
      label: "English",
      lang: "en",
      link: "/en/",
      title: "ArenaPro Creator",
      description:
        "A Minecraft server plugin that supports VSCode and TypeScript for game development.",

      themeConfig: {
        nav: [
          { text: "API Reference", link: "https://docs.box3lab.com/apapi/" },
        ],
        sidebar: [
          {
            text: "Getting Started",
            collapsed: false,
            items: [
              { text: "Introduction", link: "/index" },
              {
                text: "Meet Your Creator's Toolbox",
                link: "/en/guide/01-introduction/00-toolbox-introduction",
              },
              {
                text: "Step 1: Installation and Configuration",
                link: "/en/guide/02-getting-started/01-install",
              },
              {
                text: "Step 2: Create Your First Project",
                link: "/en/guide/02-getting-started/02-create-project",
              },
              {
                text: "Step 3: Connect to the Cloud for Debugging",
                link: "/en/guide/02-getting-started/03-connect-to-cloud",
              },
            ],
          },
          {
            text: "Core Development Workflow",
            collapsed: false,
            items: [
              {
                text: "Code Debugging",
                collapsed: true,
                items: [
                  {
                    text: "Debug vs. Release Mode",
                    link: "/en/guide/04-development-workflow/debug",
                  },
                  {
                    text: "Hot Module Replacement with HMR",
                    link: "/en/guide/04-development-workflow/hmr",
                  },
                  {
                    text: "In-depth: Differences Between Build Modes",
                    link: "/en/guide/04-development-workflow/compilationPrinciple",
                  },
                ],
              },
              {
                text: "Client and Server Development",
                collapsed: true,
                items: [
                  {
                    text: "Shared Code (Single Source of Truth)",
                    link: "/en/guide/05-best-practices/codeReuse",
                  },
                  {
                    text: "Shared Data Structures (Type-Safe Events)",
                    link: "/en/guide/05-best-practices/communicationAgreement",
                  },
                ],
              },
              {
                text: "Git Getting Started Guide (External)",
                link: "https://git-scm.com/book/en/v2",
              },
            ],
          },
          {
            text: "Feature Guides",
            collapsed: false,
            items: [
              {
                text: "UI Index Usage",
                link: "/en/guide/06-advanced-topics/uiIndex-usage",
              },
              {
                text: "Configure Your 'Code Butler'",
                link: "/en/guide/06-advanced-topics/code-linting-and-formatting",
              },
              {
                text: "Manage Game Data with JSON",
                link: "/en/guide/06-advanced-topics/json",
              },
              {
                text: "Introduce Automated Testing",
                link: "/en/guide/06-advanced-topics/automated-testing",
              },
              {
                text: "Visualize Your Code with Dependency Graphs",
                link: "/en/guide/06-advanced-topics/nodeGraph",
              },
              {
                text: "Managing Resources",
                link: "/en/guide/06-advanced-topics/resources",
              },
              {
                text: "Client Asset Management",
                link: "/en/guide/06-advanced-topics/uploadResources",
              },
              {
                text: "Develop with VS Code Workspaces",
                link: "/en/guide/06-advanced-topics/vscode-workspace",
              },
              {
                text: "Type-Safe Asset Synchronization",
                link: "/en/guide/06-advanced-topics/asset-synchronization",
              },
              {
                text: "Internationalization Language",
                link: "/en/guide/06-advanced-topics/i18n",
              },
            ],
          },
          {
            text: "Project and Build",
            collapsed: false,
            items: [
              {
                text: "Managing Multiple Build Entries",
                link: "/en/guide/06-advanced-topics/buildName",
              },
              {
                text: "Advanced Workflow: Using a Monorepo",
                link: "/en/guide/06-advanced-topics/monorepo-workflow",
              },
              {
                text: "Managing Environment Variables",
                link: "/en/guide/06-advanced-topics/env",
              },
              {
                text: "Customizing the Build Process (Webpack)",
                link: "/en/guide/06-advanced-topics/webpackPlugins",
              },
              {
                text: "Using External NPM Packages Safely",
                link: "/en/guide/06-advanced-topics/npmPackage",
              },
              {
                text: "Using Local Private NPM Packages in Your Team",
                link: "/en/guide/06-advanced-topics/local-npm-package",
              },
              {
                text: "📦 Publishing Your First NPM Package",
                link: "/en/guide/07-publishing/createNPMProject",
              },
              {
                text: "Contributing to the Community (dao3fun)",
                link: "/en/guide/06-advanced-topics/contributing-to-dao3fun",
              },
              {
                text: "Exporting Code to Arena",
                link: "/en/guide/06-advanced-topics/toArena",
              },
            ],
          },
          {
            text: "Frameworks and API",
            collapsed: false,
            items: [
              {
                text: "ECS Component System",
                collapsed: true,
                items: [
                  {
                    text: "Component Introduction",
                    link: "/en/package/component/componentGuide/index",
                  },
                  {
                    text: "Development Guide",
                    collapsed: true,
                    items: [
                      {
                        text: "Creating Components",
                        link: "/en/package/component/componentGuide/setup",
                      },
                      {
                        text: "Component Execution",
                        link: "/en/package/component/componentGuide/component",
                      },
                      {
                        text: "Decorators",
                        link: "/en/package/component/componentGuide/decorator",
                      },
                      {
                        text: "Lifecycle",
                        link: "/en/package/component/componentGuide/lifecycle",
                      },
                      {
                        text: "Node Management",
                        link: "/en/package/component/componentGuide/create-destroy",
                      },
                      {
                        text: "Accessing Components",
                        link: "/en/package/component/componentGuide/access-node-component",
                      },
                      {
                        text: "Basic Node API",
                        link: "/en/package/component/componentGuide/basic-node-api",
                      },
                      {
                        text: "Event System",
                        link: "/en/package/component/componentGuide/event-node",
                      },
                      {
                        text: "World Events",
                        link: "/en/package/component/componentGuide/event-world",
                      },
                      {
                        text: "Node System",
                        link: "/en/package/component/componentGuide/system",
                      },
                      {
                        text: "Time Management",
                        link: "/en/package/component/componentGuide/time",
                      },
                      {
                        text: "Performance Optimization",
                        link: "/en/package/component/componentGuide/performance",
                      },
                    ],
                  },
                  {
                    text: "Time Rewind System",
                    collapsed: true,
                    items: [
                      {
                        text: "Time Rewind - Getting Started",
                        link: "/en/package/component/timeRewindSystem/timeRewindComponent",
                      },
                      {
                        text: "Time Rewind - Intermediate",
                        link: "/en/package/component/timeRewindSystem/intermediateTopics",
                      },
                      {
                        text: "Time Rewind - Advanced",
                        link: "/en/package/component/timeRewindSystem/advancedTopics",
                      },
                      {
                        text: "More Examples",
                        link: "/en/package/component/example",
                      },
                    ],
                  },
                  {
                    text: "API Reference",
                    collapsed: true,
                    items: [
                      {
                        text: "EventEmitter",
                        link: "/en/package/component/api/EventEmitter",
                      },
                      {
                        text: "EntityNode",
                        link: "/en/package/component/api/EntityNode",
                      },
                      {
                        text: "Component",
                        link: "/en/package/component/api/Component",
                      },
                      {
                        text: "NodeSystem",
                        link: "/en/package/component/api/NodeSystem",
                      },
                      {
                        text: "NodeTime",
                        link: "/en/package/component/api/NodeTime",
                      },
                    ],
                  },
                ],
              },
              {
                text: "React-driven UI",
                collapsed: true,
                items: [
                  { text: "Framework Introduction", link: "/en/package/react" },
                  {
                    text: "Development Guide",
                    collapsed: true,
                    items: [
                      {
                        text: "Creating Scripts",
                        link: "/en/package/react/reactGuide/setup",
                      },
                      {
                        text: "XML Basics",
                        link: "/en/package/react/reactGuide/xml",
                      },
                      {
                        text: "DOM Tree",
                        link: "/en/package/react/reactGuide/domTree",
                      },
                      {
                        text: "Element References",
                        link: "/en/package/react/reactGuide/refs",
                      },
                      {
                        text: "Type Definitions",
                        link: "/en/package/react/reactGuide/tsType",
                      },
                      {
                        text: "Multiple Components",
                        link: "/en/package/react/reactGuide/multiComponent",
                      },
                      {
                        text: "Event Handling",
                        link: "/en/package/react/reactGuide/eventHandlers",
                      },
                      {
                        text: "Hooks",
                        link: "/en/package/react/reactGuide/hooks",
                      },
                      {
                        text: "API Reference",
                        link: "/en/package/react/reactGuide/api",
                      },
                    ],
                  },
                  {
                    text: "Practical Example",
                    link: "/en/package/react/selectCode",
                  },
                  {
                    text: "React Official Tutorial",
                    link: "https://react.dev/learn",
                  },
                ],
              },
            ],
          },
          {
            text: "Configuration and Permissions",
            collapsed: false,
            items: [
              {
                text: "Differences with Arena",
                collapsed: true,
                items: [
                  {
                    text: "Resource Path",
                    link: "/en/difference/resourcePath",
                  },
                  {
                    text: "Custom Entity",
                    link: "/en/difference/customizeEntity",
                  },
                  { text: "Dialog", link: "/en/difference/dialog" },
                  {
                    text: "Node Lookup",
                    link: "/en/difference/findChildByName",
                  },
                  { text: "Data Storage", link: "/en/difference/storage" },
                  {
                    text: "Remote Channel",
                    link: "/en/difference/remoteChannel",
                  },
                  { text: "Voxel Operations", link: "/en/difference/voxel" },
                ],
              },
              {
                text: "Project Configuration",
                collapsed: true,
                items: [
                  {
                    text: "Scaffolding Architecture",
                    link: "/en/dao3Cfg/file",
                  },
                  {
                    text: "Configuration Properties",
                    link: "/en/dao3Cfg/attribute",
                  },
                ],
              },
              {
                text: "Special Permissions",
                collapsed: true,
                items: [{ text: "Data Space", link: "/en/authority/storage" }],
              },
            ],
          },
          {
            text: "MCP Tools",
            collapsed: false,
            items: [
              { text: "MCP Introduction", link: "/en/mcp/" },
              {
                text: "Only Knowledge Base Mode",
                link: "/en/mcp/chat-only-knowledgebase",
              },
            ],
          },
          {
            text: "Community",
            collapsed: false,
            items: [
              {
                text: "Community Rewards",
                link: "/en/community/community-rewards",
              },

              {
                text: "⚠️ Code of Conduct",
                link: "/en/community/CODE_OF_CONDUCT",
              },
              { text: "🎉 AP Event History", link: "/en/community/events" },
              {
                text: "🙏 Special Thanks",
                link: "/en/community/special-thanks",
              },
              { text: "Release Notes", link: "/en/community/release-notes" },
            ],
          },
        ],
        outline: {
          label: "On This Page",
        },
        docFooter: {
          prev: "Previous page",
          next: "Next page",
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
