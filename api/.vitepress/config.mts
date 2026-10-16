import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-cn",
  title: "ArenaEdit API手册",
  head: [["link", { rel: "icon", href: "/arena.svg" }]],
  description: "为创作者所有✨ 由创作者共建⚖️ 因创作者而生🎉",
  base: "/api/",
  outDir: "../dist/api",
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
    nav: [
      {
        text: "本地部署神岛版AI",
        link: "/localAI",
      },
      { text: "Arena用户手册", link: "https://docs.box3lab.com/arena/" },
      {
        text: "ArenaPro Creator用户手册",
        link: "https://docs.box3lab.com/arenapro/",
      },
    ],
    logo: "/arena.svg",
    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: "编写须知",
        collapsed: false,
        items: [
          { text: "导读页", link: "/" },
          { text: "脚本规范说明", link: "/notice/exportAndImport" },
          { text: "事件函数与异步处理机制", link: "/notice/eventDiff" },
          { text: "JSDoc注解", link: "/notice/jsdoc" },
        ],
      },
      {
        text: "服务端脚本",
        collapsed: false,
        items: [
          {
            text: "🌏游戏世界",
            link: "/GameWorld/index",
            collapsed: false,
            items: [
              { text: "地图信息", link: "/GameWorld/mapInfo" },
              { text: "地图区域", link: "/GameWorld/mapZone" },
              { text: "玩家进入/离开地图", link: "/GameWorld/playerJL" },
              {
                text: "🏕环境与视觉",
                collapsed: true,
                items: [
                  { text: "物理", link: "/GameWorld/physics" },
                  { text: "音乐音效", link: "/GameWorld/music" },
                  { text: "动画", link: "/GameWorld/animate" },
                  {
                    text: "天气",
                    collapsed: true,
                    items: [
                      { text: "雾", link: "/GameWorld/weather/fog" },
                      { text: "雨", link: "/GameWorld/weather/rain" },
                      { text: "雪", link: "/GameWorld/weather/snow" },
                      { text: "光照", link: "/GameWorld/weather/illumination" },
                    ],
                  },
                ],
              },
              {
                text: "🙋聊天频道",
                collapsed: true,
                items: [
                  { text: "常驻", link: "/GameWorld/chat/resident" },
                  { text: "临时", link: "/GameWorld/chat/temporary" },
                ],
              },
              {
                text: "🛋实体操作",
                collapsed: true,
                items: [
                  { text: "实体创建与销毁", link: "/GameWorld/entityCD" },
                  { text: "搜索实体", link: "/GameWorld/querySelectorEntity" },
                ],
              },
              { text: "点击与互动", link: "/GameWorld/input" },
              { text: "战斗与生命值", link: "/GameWorld/fight" },
              { text: "副本传送", link: "/GameWorld/teleport" },
              { text: "商城", link: "/GameWorld/shopping" },
            ],
          },
          {
            text: "🧱游戏方块",
            link: "/GameVoxels/index",
            collapsed: false,
            items: [
              { text: "操作方块", link: "/GameVoxels/operate" },
              { text: "方块速查表", link: "/GameVoxels/cheatSheet" },
            ],
          },
          {
            text: "🏠游戏实体",
            link: "/GameEntity/index",
            collapsed: false,
            items: [
              { text: "是否为玩家", link: "/GameEntity/isPlayer" },
              {
                text: "🏕环境与视觉",
                collapsed: true,
                items: [
                  { text: "外观", link: "/GameEntity/appearance" },
                  { text: "动画与模型动作", link: "/GameEntity/animate" },
                  { text: "物理", link: "/GameEntity/physics" },
                  { text: "音乐音效", link: "/GameEntity/music" },
                  { text: "粒子效果", link: "/GameEntity/particle" },
                ],
              },
              { text: "标签", link: "/GameEntity/label" },
              { text: "点击与互动", link: "/GameEntity/input" },
              { text: "销毁与生命值", link: "/GameEntity/fight" },
            ],
          },
          {
            text: "💾游戏资产管理",
            link: "/GameAssetListEntry/index",
            collapsed: false,
            items: [{ text: "资产树", link: "/GameAssetListEntry/ls" }],
          },
          {
            text: "🕺游戏模型动作",
            link: "/GameMotionController/index",
            collapsed: false,
            items: [
              { text: "控制器", link: "/GameMotionController/controller" },
              { text: "处理器", link: "/GameMotionController/handler" },
            ],
          },
          {
            text: "👤游戏玩家",
            link: "/GamePlayerEntity/index",
            collapsed: false,
            items: [
              { text: "玩家信息", link: "/GamePlayerEntity/info" },
              {
                text: "🏕环境与视觉",
                collapsed: true,
                items: [
                  { text: "外观", link: "/GamePlayerEntity/appearance" },
                  { text: "动画", link: "/GamePlayerEntity/animate" },
                  { text: "摄像机视角", link: "/GamePlayerEntity/camera" },
                  { text: "音乐音效", link: "/GamePlayerEntity/music" },
                  { text: "画面滤镜", link: "/GamePlayerEntity/colorLUT" },
                ],
              },
              { text: "战斗与生命值", link: "/GamePlayerEntity/fight" },
              { text: "按键与行动", link: "/GamePlayerEntity/input" },
              { text: "对话与互动", link: "/GamePlayerEntity/chat" },
              { text: "跳转网站", link: "/GamePlayerEntity/link" },
              { text: "商城与投喂", link: "/GamePlayerEntity/shopping" },
            ],
          },
          {
            text: "📈游戏数据存储",
            link: "/GameDataStorage/index",
            collapsed: false,
            items: [
              { text: "获取数据空间", link: "/GameDataStorage/getSpace" },
              { text: "操作数据", link: "/GameDataStorage/setSpace" },
            ],
          },
          {
            text: "🔊游戏跨端通讯",
            link: "/RemoteChannel/Server/index",
            collapsed: false,
            items: [
              {
                text: "服务端->客户端",
                link: "/RemoteChannel/Server/serverToClient",
              },
              {
                text: "客户端->服务端",
                link: "/RemoteChannel/Server/clientToServer",
              },
            ],
          },
          {
            text: "🔗游戏外部数据请求",
            link: "/GameHttpAPI/index",
            collapsed: false,
            items: [
              { text: "请求", link: "/GameHttpAPI/request" },
              { text: "响应", link: "/GameHttpAPI/response" },
            ],
          },
          {
            text: "🗣️游戏实时语音通讯",
            link: "/GameRTC/index",
            collapsed: false,
            items: [
              { text: "新建通道", link: "/GameRTC/create" },
              { text: "操作", link: "/GameRTC/operate" },
            ],
          },
          // {
          //   text: "📊游戏数据分析",
          //   link: "/GameAnalytics/index",
          //   collapsed: false,
          //   items: [
          //     { text: "神策埋点", link: "/GameAnalytics/GameSensorAnalytics" },
          //   ],
          // },
          {
            text: "🟰游戏数学",
            collapsed: false,
            items: [
              { text: "三维向量", link: "/GameVector3/index" },
              { text: "三维空间", link: "/GameBounds3/index" },
              { text: "四元数", link: "/GameQuaternion/index" },
              { text: "RGB颜色", link: "/GameRGBColor/index" },
              { text: "RGBA颜色", link: "/GameRGBAColor/index" },
            ],
          },
          { text: "音乐对象", link: "/Sound/" },
          { text: "动画对象", link: "/GameAnimation/" },
          { text: "事件监听", link: "/GameEventHandlerToken/" },
        ],
      },
      {
        text: "客户端脚本",
        collapsed: false,
        items: [
          {
            text: "🔊游戏跨端通讯",
            link: "/RemoteChannel/Client/index",
            collapsed: false,
            items: [
              {
                text: "服务端->客户端",
                link: "/RemoteChannel/Client/serverToClient",
              },
              {
                text: "客户端->服务端",
                link: "/RemoteChannel/Client/clientToServer",
              },
            ],
          },
          {
            text: "🌏游戏世界",
            link: "/ClientWorld/index",
            collapsed: false,
            items: [{ text: "输入", link: "/ClientWorld/input" }],
          },
          {
            text: "🖼️游戏用户界面",
            link: "/ClientUI/index",
            collapsed: false,
            items: [
              {
                text: "🔱UI元素",
                collapsed: true,
                items: [
                  { text: "UI父类", link: "/ClientUI/UiNode" },
                  { text: "UI屏幕", link: "/ClientUI/UiScreen" },
                  { text: "UI可渲染基类", link: "/ClientUI/UiRenderable" },
                  {
                    text: "🔱界面可见元素",
                    collapsed: true,
                    items: [
                      { text: "框架", link: "/ClientUI/node/UiBox" },
                      { text: "滚动框", link: "/ClientUI/node/UiScrollBox" },
                      { text: "图片", link: "/ClientUI/node/UiImage" },
                      { text: "文字", link: "/ClientUI/node/UiText" },
                      { text: "输入", link: "/ClientUI/node/UiInput" },
                    ],
                  },
                ],
              },
              { text: "监听输入事件", link: "/ClientUI/input" },
              { text: "事件监听处理", link: "/ClientUI/UiEvent" },
            ],
          },
          {
            text: "📺游戏屏幕",
            link: "/ClientScreen/index",
            collapsed: false,
            items: [{ text: "输入", link: "/ClientScreen/input" }],
          },
          {
            text: "🎵游戏音频",
            link: "/ClientAudio/index",
            collapsed: false,
            items: [{ text: "媒体错误码", link: "/ClientAudio/mediaError" }],
          },
          {
            text: "🎙游戏录音",
            link: "/ClientMedia/index",
            collapsed: false,
            items: [{ text: "输入输出", link: "/ClientMedia/media" }],
          },
          {
            text: "🧭游戏导航器",
            link: "/ClientNavigator/index",
            collapsed: false,
            items: [{ text: "屏幕信息", link: "/ClientNavigator/navigator" }],
          },
          {
            text: "🔗游戏外部数据请求",
            link: "/ClientHttp/index",
            collapsed: false,
            items: [
              { text: "请求响应", link: "/ClientHttp/requestAndResponse" },
            ],
          },
          {
            text: "🟰游戏数学",
            collapsed: false,
            items: [
              { text: "图像映射中区域的坐标", link: "/ClientUI/maths/Coord2" },
              { text: "UI缩放", link: "/ClientUI/maths/UiScale" },
              { text: "三维向量", link: "/ClientUI/maths/Vec3" },
              { text: "二维向量", link: "/ClientUI/maths/Vec2" },
            ],
          },
        ],
      },
    ],
    editLink: {
      pattern:
        "https://gitee.com/box3lab/box3-product-document/blob/master/api/:path",
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
