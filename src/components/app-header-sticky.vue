<template>
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <div class="container" v-show="y >= 78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { useWindowScroll } from '@vueuse/core'
import AppHeaderNav from './app-header-nav'

export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  // 是vue3.0提供的钩子，在beforeCreate created之前执行
  setup () {
    // 定义响应式数据、定义函数，提供给模板使用（必须return）
    // 使用ref（） reactive（）定义响应数据
    const { y } = useWindowScroll()
    return { y }
  }
}

// import AppHeaderNav from './app-header-nav'
// export default {
//   name: 'AppHeaderSticky',
//   data () {
//     return {
//       show: false
//     }
//   },
//   components: { AppHeaderNav },
//   mounted () {
//     window.onscroll = () => {
//       const scrollTop = document.documentElement.scrollTop
//       // console.log(scrollTop)
//       this.show = scrollTop >= 78
//     }
//   }
// }
</script>
<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  //向上移动自身的高度，透明度是0
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
