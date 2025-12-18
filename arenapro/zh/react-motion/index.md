---
layout: home

hero:
  name: "ArenaPro React Motion"
  text: "适用于神岛 React UI 的动画库"
  tagline: "用关键帧与时间轴驱动 UI 动效多动画编排。为神岛 UI 场景做了轻量实现与性能取舍。"
  image:
    src: /logo.png
    alt: ArenaPro React Motion
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/react-motion/guide
    # - theme: alt
    #   text: API 手册
    #   link: https://docs.box3lab.com/arenapro/zh/react-motion

features:
  - title: "关键帧驱动的动效系统"
    details: "用 `useMotion` 描述关键帧序列，让一个样式对象随时间过渡。<br>支持缓动（easing）、循环（loop）、往返（yoyo）、以及外部进度 driven。"
  - title: "时间轴与编排"
    details: "用 `useTimeline` 产出稳定的 0~1 进度，用于手写插值或驱动 motion。<br>用 `useMotionOrchestrator` 组合多个动画：并行、串行、错峰播放（stagger）。"
  - title: "为神岛 UI 场景做轻量实现"
    details: "不依赖浏览器 DOM，直接面向神岛 UI 样式对象插值。<br>提供一组内置缓动预设，并保持 API 直观、可组合、可维护。"
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #b043ff 30%, #ff4d99);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #b043ff 50%, #ff4d99 50%);
  --vp-home-hero-image-filter: blur(40px);
}
</style>
