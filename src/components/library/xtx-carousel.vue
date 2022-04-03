<template>
  <div class="xtx-carousel" @mouseenter="end()" @mouseleave="start()">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        :class="{ fade: index === i }"
        v-for="(item, i) in sliders"
        :key="item.id"
      >
        <!-- 图片 -->
        <RouterLink v-if="item.imgUrl" :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
        <!-- 商品 -->
        <div v-else class="slider">
          <RouterLink
            v-for="goods in item"
            :key="goods.id"
            :to="`/product/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        @click="index = i"
        :class="{ active: index === i }"
        v-for="(item, i) in sliders"
        :key="item.id"
      ></span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    // 轮播间隔时长
    duration: {
      type: Number,
      default: 3000
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: false
    }
  },
  data () {
    // 通过索引切换轮播图，默认是第一张，索引是0
    return {
      index: 0
    }
  },
  watch: {
    sliders (newVal, oldVal) {
      if (newVal && newVal.length) {
        // 控制自动播放
        this.autoPlay && this.autoPlayFn()
      }
    }
  },
  methods: {
    end () {
      clearInterval(this.timer)
    },
    start () {
      this.autoPlay && this.autoPlayFn()
    },
    // 切换上一张下一张
    toggle (step) {
      this.index += step
      if (this.index < 0) {
        this.index = this.sliders.length - 1
      }
      if (this.index >= this.sliders.length) {
        this.index = 0
      }
    },
    // 自动播放
    autoPlayFn () {
      // 定一个定时器，隔一段时间去，切换一下索引
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.index++
        if (this.index >= this.sliders.length) {
          this.index = 0
        }
      }, this.duration)
    }
  },
  // vue3.0 的钩子，销毁时候执行
  beforeUnmount () {
    if (this.timer) window.clearInterval(this.timer)
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: @priceColor;
      margin-top: 15px;
    }
  }
}
</style>
