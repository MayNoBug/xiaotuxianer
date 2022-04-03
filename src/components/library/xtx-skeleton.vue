<template>
  <div
    class="xtx-skeleton"
    :style="{ width, height }"
    :class="{ shan: animated }"
  >
    <!-- 1.盒子 -->
    <div class="block" :style="{ backgroundColor: bg }"></div>
    <!-- 2.闪效果 -->
  </div>
</template>

<script>
export default {
  name: 'XtxSkeleton',
  // 使用的时候需要动态设置 高度、宽度、背景颜色，是否闪一下
  props: {
    bg: {
      type: String,
      default: '#efefef'
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '16px'
    },
    animated: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang='less'>
.xtx-skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  .block {
    width: 100%;
    height: 100%;
    background-color: var(--bg);
    border-radius: 2px;
  }
}
//注意：动画序列会加上唯一标识  style有scoped的时候
//粗暴：放到common.less作为公共样式
</style>
<style>
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
