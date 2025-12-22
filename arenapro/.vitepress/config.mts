import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/arenapro/",
  outDir: "../dist/arenapro",
  head: [["link", { rel: "icon", href: "/icon.png" }]],
  vite: {
    plugins: [groupIconVitePlugin()],
  },
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },

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
    socialLinks: [],
    footer: {
      message: "神岛实验室",
      copyright: "Copyright © 2024-2025",
    },
  },

  locales: {
    "zh/react-motion": {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/react-motion",
      title: "ArenaPro React Motion",
      description:
        "用关键帧与时间轴驱动 UI 动效多动画编排。为神岛 UI 场景做了轻量实现与性能取舍。",

      themeConfig: {
        nav: [
          {
            text: "产品版本",
            items: [
              {
                text: "Creator",
                link: "/zh/",
              },
              { text: "CLI", link: "/zh/cli/" },
              { text: "React-UI", link: "/zh/react/" },
              { text: "React-Motion", link: "/zh/react-motion" },
            ],
          },
          { text: "React18 官方教程", link: "https://18.react.dev/learn" },
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
              { text: "什么是React Motion", link: "/zh/react-motion/guide" },
              {
                text: "关键帧动画",
                link: "/zh/react-motion/guide/useMotion-doc",
              },
              {
                text: "时间轴",
                link: "/zh/react-motion/guide/useTimeline-doc",
              },
              {
                text: "多动画编排",
                link: "/zh/react-motion/guide/useMotionOrchestrator-doc",
              },
              {
                text: "示例合集",
                link: "/zh/react-motion/guide/examples",
              },
            ],
          },
          {
            text: "API参考",
            collapsed: false,
            items: [
              { text: "Hooks", link: "/zh/react-motion/api/hooks" },
              { text: "Easing", link: "/zh/react-motion/api/easing" },
            ],
          },
        ],
        docFooter: {
          prev: "上一页",
          next: "下一页",
        },
      },
    },
    "zh/react": {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/react",
      title: "ArenaPro React",
      description:
        "面向神岛创作者的 React UI 框架，基于 React 视图库与组件化模式构建界面",

      themeConfig: {
        nav: [
          {
            text: "产品版本",
            items: [
              {
                text: "Creator",
                link: "/zh/",
              },
              { text: "CLI", link: "/zh/cli/" },
              { text: "React-UI", link: "/zh/react/" },
              { text: "React-Motion", link: "/zh/react-motion" },
            ],
          },
          { text: "React18 官方教程", link: "https://18.react.dev/learn" },
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
              { text: "什么是React", link: "/zh/react/guide" },
              {
                text: "第一个项目",
                link: "/zh/react/guide/quickstart",
              },
            ],
          },
          {
            text: "开发指南",
            collapsed: false,
            items: [
              {
                text: "神岛UI组件",
                link: "/zh/react/guide/components",
              },
              {
                text: "神岛钩子",
                link: "/zh/react/guide/hooks",
              },
              {
                text: "主题扩展",
                link: "/zh/react/guide/classname-and-theme",
              },
              {
                text: "react多语言",
                link: "/zh/react/guide/react-i18next",
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
    "zh/cli": {
      label: "简体中文",
      lang: "zh-CN",
      link: "/zh/cli",
      title: "ArenaPro CLI",
      description: "面向神岛创作者的命令行工具，连接本地终端与 Arena 编辑器",

      themeConfig: {
        nav: [
          {
            text: "产品版本",
            items: [
              {
                text: "Creator",
                link: "/zh/",
              },
              { text: "CLI", link: "/zh/cli/" },
              { text: "React-UI", link: "/zh/react/" },
              { text: "React-Motion", link: "/zh/react-motion" },
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
                text: "欢迎来到 CLI",
                link: "/zh/cli/guide/",
              },
              {
                text: "第一个项目",
                link: "/zh/cli/guide/quickstart",
              },

              {
                text: "配置信息",
                link: "/zh/cli/guide/dao3-config",
              },
              {
                text: "脚手架预装工具",
                link: "/zh/cli/guide/scaffold-builtins",
              },
              {
                text: "项目结构总览",
                link: "/zh/cli/guide/structure",
              },
            ],
          },
          {
            text: "使用基础",
            collapsed: false,
            items: [
              {
                text: "Vite 扩展能力",
                link: "/zh/cli/guide/vite-features",
              },

              {
                text: "根据 MODE 区分环境",
                link: "/zh/cli/guide/vite-mode-env",
              },

              {
                text: "环境变量的多种用法",
                link: "/zh/cli/guide/vite-env-files",
              },

              {
                text: "环境变量一览",
                link: "/zh/cli/guide/cli-env-vars",
              },

              {
                text: "CLI 命令一览",
                link: "/zh/cli/guide/cli-commands",
              },
              {
                text: "仓库流水线",
                link: "/zh/cli/guide/ci-apc-actions",
              },
            ],
          },
          {
            text: "NPM包使用",
            collapsed: false,
            items: [
              {
                text: "使用神岛社区 NPM 包",
                link: "/zh/cli/guide/vite-npm-install",
              },
              {
                text: "开发 NPM 包",
                link: "/zh/cli/guide/vite-npm-dev",
              },
            ],
          },
          {
            text: "VSCode扩展程序",
            collapsed: false,
            items: [
              {
                text: "颜色可视化拾色器",
                link: "/zh/cli/guide/colorProviderPlugin",
              },

              {
                text: "数据空间可视化编辑器",
                link: "/zh/cli/guide/dataSpacePlugin",
              },
            ],
          },
          {
            text: "FAQ",
            collapsed: false,
            items: [
              {
                text: "登录的不同方式",
                link: "/zh/cli/guide/vite-login-faq",
              },
              {
                text: "环境变量与地图绑定",
                link: "/zh/cli/guide/vite-env-faq",
              },
              {
                text: "资源同步",
                link: "/zh/cli/guide/vite-resource-faq",
              },

              {
                text: "地图预览",
                link: "/zh/cli/guide/vite-preview-faq",
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
            text: "产品版本",
            items: [
              {
                text: "Creator",
                link: "/zh/",
              },
              { text: "CLI", link: "/zh/cli/" },
              { text: "React-UI", link: "/zh/react/" },
              { text: "React-Motion", link: "/zh/react-motion" },
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
