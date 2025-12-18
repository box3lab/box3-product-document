# Easing

React Motion 支持两种方式指定缓动（easing）：

- **字符串名称**：使用内置 easing，例如 `"quadOut"`、`"bounceOut"`。
- **自定义函数**：传入 `EasingFn`，也就是 `(t: number) => number`。

## EasingFn

缓动函数签名：

- `t`：归一化进度（0~1）
- 返回：缓动后的进度（0~1）

## EasingName

内置缓动预设名称（字符串）。命名规则：

- `xxxIn`：开始慢、后面快（加速）
- `xxxOut`：开始快、后面慢（减速）
- `xxxInOut`：前半段加速、后半段减速

## 在关键帧中使用

```ts
{ value: { textContent: '你好' }, duration: 400, ease: "quadOut" }
```

或：

```ts
 const ease = (t: number) => t * t;
{ value: { textContent: '你好' }, duration: 400, ease }
```

## 缓动效果可视化对比

 <script setup>
 import { onBeforeUnmount, onMounted, ref, watch } from "vue";
 
 const isPlaying = ref(true);
 const isLoop = ref(true);
 const durationMs = ref(2000);
 
 const names = [
   "linear",
   "sineIn",
   "sineOut",
   "sineInOut",
   "smoothstep",
   "smootherstep",
   "easeIn",
   "easeOut",
   "easeInOut",
   "quadIn",
   "quadOut",
   "quadInOut",
   "cubicIn",
   "cubicOut",
   "cubicInOut",
   "quartIn",
   "quartOut",
   "quartInOut",
   "quintIn",
   "quintOut",
   "quintInOut",
   "expoIn",
   "expoOut",
   "expoInOut",
   "circIn",
   "circOut",
   "circInOut",
   "backIn",
   "backOut",
   "backInOut",
   "bounceIn",
   "bounceOut",
   "bounceInOut",
   "springIn",
   "springOut",
   "springInOut",
   "elasticIn",
   "elasticOut",
   "elasticInOut",
 ];
 
 const canvasMap = new Map();
 const setCanvasRef = (name) => (el) => {
   if (el) canvasMap.set(name, el);
   else canvasMap.delete(name);
 };
 
 function clamp01(t) {
   if (t < 0) return 0;
   if (t > 1) return 1;
   return t;
 }
 
 function smoothstep(t) {
   t = clamp01(t);
   return t * t * (3 - 2 * t);
 }

 function smootherstep(t) {
   t = clamp01(t);
   return t * t * t * (t * (t * 6 - 15) + 10);
 }

 function makeIn(outFn) {
   return (t) => 1 - outFn(1 - t);
 }

 function makeInOut(outFn) {
   const inFn = makeIn(outFn);
   return (t) => (t < 0.5 ? inFn(t * 2) / 2 : outFn(t * 2 - 1) / 2 + 0.5);
 }

 function bounceOut(t) {
   t = clamp01(t);
   const n1 = 7.5625;
   const d1 = 2.75;
   if (t < 1 / d1) return n1 * t * t;
   if (t < 2 / d1) {
     t -= 1.5 / d1;
     return n1 * t * t + 0.75;
   }
   if (t < 2.5 / d1) {
     t -= 2.25 / d1;
     return n1 * t * t + 0.9375;
   }
   t -= 2.625 / d1;
   return n1 * t * t + 0.984375;
 }
 
 function elasticOut(t) {
   t = clamp01(t);
   if (t === 0 || t === 1) return t;
   const c4 = (2 * Math.PI) / 3;
   return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
 }
 
 function springOut(t) {
   t = clamp01(t);
   return 1 - Math.cos(t * Math.PI * 2.5) * Math.exp(-t * 6);
 }

 const bounceIn = makeIn(bounceOut);
 const bounceInOut = makeInOut(bounceOut);
 const elasticIn = makeIn(elasticOut);
 const elasticInOut = makeInOut(elasticOut);
 const springIn = makeIn(springOut);
 const springInOut = makeInOut(springOut);

 function expoOut(t) {
   t = clamp01(t);
   return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
 }

 const expoIn = makeIn(expoOut);
 const expoInOut = makeInOut(expoOut);

 function circOut(t) {
   t = clamp01(t);
   return Math.sqrt(1 - Math.pow(t - 1, 2));
 }

 const circIn = makeIn(circOut);
 const circInOut = makeInOut(circOut);

 function backOut(t) {
   t = clamp01(t);
   const c1 = 1.70158;
   const c3 = c1 + 1;
   return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
 }

 const backIn = makeIn(backOut);
 const backInOut = makeInOut(backOut);
 
 function resolveEase(name) {
   switch (name) {
     case "linear":
       return (t) => t;
     case "smoothstep":
       return smoothstep;
     case "smootherstep":
       return smootherstep;
     case "sineIn":
       return (t) => 1 - Math.cos((t * Math.PI) / 2);
     case "sineOut":
       return (t) => Math.sin((t * Math.PI) / 2);
     case "sineInOut":
       return (t) => -(Math.cos(Math.PI * t) - 1) / 2;
     case "easeIn":
       return (t) => t * t;
     case "easeOut":
       return (t) => 1 - (1 - t) * (1 - t);
     case "easeInOut":
       return (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
     case "quadIn":
       return (t) => t * t;
     case "quadOut":
       return (t) => 1 - (1 - t) * (1 - t);
     case "quadInOut":
       return (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
     case "cubicIn":
       return (t) => t * t * t;
     case "cubicOut":
       return (t) => 1 - Math.pow(1 - t, 3);
     case "cubicInOut":
       return (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
     case "quartIn":
       return (t) => t * t * t * t;
     case "quartOut":
       return (t) => 1 - Math.pow(1 - t, 4);
     case "quartInOut":
       return (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);
     case "quintIn":
       return (t) => t * t * t * t * t;
     case "quintOut":
       return (t) => 1 - Math.pow(1 - t, 5);
     case "quintInOut":
       return (t) => (t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2);
     case "expoIn":
       return expoIn;
     case "expoOut":
       return expoOut;
     case "expoInOut":
       return expoInOut;
     case "circIn":
       return circIn;
     case "circOut":
       return circOut;
     case "circInOut":
       return circInOut;
     case "backIn":
       return backIn;
     case "backOut":
       return backOut;
     case "backInOut":
       return backInOut;
     case "bounceIn":
       return bounceIn;
     case "bounceOut":
       return bounceOut;
     case "bounceInOut":
       return bounceInOut;
     case "elasticIn":
       return elasticIn;
     case "elasticOut":
       return elasticOut;
     case "elasticInOut":
       return elasticInOut;
     case "springIn":
       return springIn;
     case "springOut":
       return springOut;
     case "springInOut":
       return springInOut;
     default:
       return smoothstep;
   }
 }
 
 let rafId = 0;
 let lastTs = 0;
 let timeMs = 0;
 let direction = 1;
 
 function reset() {
   timeMs = 0;
   direction = 1;
 }
 
 function drawOne(canvas, name, t, p) {
   const ctx = canvas.getContext("2d");
   if (!ctx) return;
 
   const w = canvas.width;
   const h = canvas.height;
 
   ctx.clearRect(0, 0, w, h);
 
   ctx.fillStyle = "rgba(148,163,184,0.95)";
   ctx.font = "12px ui-sans-serif, system-ui";
   ctx.fillText(name, 10, 16);
 
   ctx.strokeStyle = "rgba(148,163,184,0.35)";
   ctx.lineWidth = 2;
   ctx.beginPath();
   ctx.moveTo(10, h / 2);
   ctx.lineTo(w - 10, h / 2);
   ctx.stroke();
 
   const x0 = 10;
   const x1 = w - 10;
   const x = x0 + (x1 - x0) * p;
   const y = h / 2;
 
   ctx.fillStyle = "#ff4081";
   ctx.beginPath();
   ctx.arc(x, y, 8, 0, Math.PI * 2);
   ctx.fill();
 
 }
 
 function drawAll() {
   const t = clamp01(timeMs / durationMs.value);
   for (const name of names) {
     const canvas = canvasMap.get(name);
     if (!canvas) continue;
     const e = clamp01(resolveEase(name)(t));
     const p = direction > 0 ? e : 1 - e;
     drawOne(canvas, name, t, p);
   }
 }
 
 function tick(ts) {
   if (!lastTs) lastTs = ts;
   const dt = ts - lastTs;
   lastTs = ts;
 
   if (isPlaying.value) {
     timeMs += dt;
     if (timeMs >= durationMs.value) {
       if (isLoop.value) {
         timeMs = timeMs % durationMs.value;
         direction *= -1;
       } else {
         timeMs = durationMs.value;
         isPlaying.value = false;
       }
     }
   }
 
   drawAll();
   rafId = requestAnimationFrame(tick);
 }
 
 onMounted(() => {
   rafId = requestAnimationFrame(tick);
 });
 
 onBeforeUnmount(() => {
   cancelAnimationFrame(rafId);
 });
 
 watch([durationMs], () => {
   reset();
 });
 </script>

 <div class="easingGrid">
   <div class="easingGrid__controls">
     <label class="easingGrid__label">
       duration
       <input v-model.number="durationMs" class="easingGrid__input" type="number" min="120" step="60" />
       ms
     </label>
     <label class="easingGrid__label">
       <input v-model="isLoop" type="checkbox" />
       循环
     </label>
     <button class="easingGrid__btn" @click="isPlaying = !isPlaying">
       {{ isPlaying ? '暂停' : '继续' }}
     </button>
     <button class="easingGrid__btn" @click="reset">重置</button>
   </div>
   <div class="easingGrid__grid">
     <div v-for="n in names" :key="n" class="easingGrid__card">
       <canvas :ref="setCanvasRef(n)" width="130" height="64" class="easingGrid__canvas"></canvas>
     </div>
   </div>
 </div>
 
 <style scoped>
 .easingGrid {
   border: 1px solid rgba(148, 163, 184, 0.25);
   border-radius: 12px;
   padding: 12px;
   margin: 12px 0 20px;
 }
 
 .easingGrid__controls {
   display: flex;
   flex-wrap: wrap;
   gap: 10px 12px;
   align-items: center;
   margin-bottom: 12px;
 }
 
 .easingGrid__label {
   display: inline-flex;
   gap: 8px;
   align-items: center;
   font-size: 13px;
   color: rgba(148, 163, 184, 0.95);
 }
 
 .easingGrid__input {
   padding: 6px 8px;
   border-radius: 8px;
   border: 1px solid rgba(148, 163, 184, 0.28);
   background: transparent;
   color: inherit;
   width: 96px;
 }
 
 .easingGrid__btn {
   padding: 6px 10px;
   border-radius: 8px;
   border: 1px solid rgba(148, 163, 184, 0.28);
   background: rgba(148, 163, 184, 0.08);
   color: inherit;
   cursor: pointer;
 }
 
 .easingGrid__btn:hover {
   background: rgba(148, 163, 184, 0.14);
 }
 
 .easingGrid__grid {
   display: grid;
   grid-template-columns: repeat(3, minmax(0, 1fr));
   gap: 10px;
 }
 
 @media (min-width: 960px) {
   .easingGrid__grid {
     grid-template-columns: repeat(4, minmax(0, 1fr));
   }
 }

@media (min-width: 1200px) {
.easingGrid\_\_grid {
grid-template-columns: repeat(5, minmax(0, 1fr));
}
}

.easingGrid\_\_card {
border: 1px solid rgba(148, 163, 184, 0.18);
border-radius: 10px;
padding: 8px;
}

.easingGrid\_\_canvas {
width: 100%;
height: 64px;
display: block;
}
</style>
