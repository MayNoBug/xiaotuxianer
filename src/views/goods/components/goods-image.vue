<template>
  <div class="goods-image">
    <!-- 大图 -->
    <div
      class="large"
      v-show="isShow"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, largePosition]"
    ></div>
    <!-- 中图 -->
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩 -->
      <div class="layer" v-show="isShow" :style="layerPosition"></div>
    </div>
    <!-- 小图 -->
    <ul class="small">
      <li
        :class="{ active: currIndex === i }"
        v-for="(img, i) in images"
        :key="img"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const currIndex = ref(0)
    // 放大镜效果
    // 1. 遮罩容器-->定位数据，大图容器-->背景定位，显示和隐藏
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    const largePosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    const isShow = ref(false)
    // 2. 在鼠标移动的时候来设置以上数据
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], () => {
      // elementX,elementY  区分三种情况设置定位
      if (elementX.value < 100) layerPosition.left = 0
      else if (elementX.value > 300) layerPosition.left = 200
      else layerPosition.left = elementX.value - 100

      if (elementY.value < 100) layerPosition.top = 0
      else if (elementY.value > 300) layerPosition.top = 200
      else layerPosition.top = elementY.value - 100
      // 设置
      largePosition.backgroundPositionX = -2 * layerPosition.left + 'px'
      largePosition.backgroundPositionY = -2 * layerPosition.top + 'px'
      layerPosition.left = layerPosition.left + 'px'
      layerPosition.top = layerPosition.top + 'px'
      isShow.value = !isOutside.value
    })
    // 3. 使用坐标数据即可
    return { currIndex, target, layerPosition, largePosition, isShow }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
