<script setup>
import './voxelTable.css'
import {createColGroup} from './voxelTable.js'
</script>

# 方块id和名称对照表
::: info
  <span class="light">发光</span>：表示该种方块可以发光  
  <span class="fluidText">蓝色下划线</span>：表示该种方块为液体方块  
  <span class="animationText">左右边框</span>：表示该种方块为动态方块  
  若单元格左侧有绿色边框，代表该种方块为新增方块  
  名称和id鼠标右键/触屏长按可复制其内容  
  棋盘方块请将描述里的制表符叠加起来看
:::

<span v-on:click="createColGroup" class="voxButton" id="voxBotten">点击这里获取方块速查表</span>
<div id="voxelTable" style="max-height: 0px; overflow: hidden;"></div>

