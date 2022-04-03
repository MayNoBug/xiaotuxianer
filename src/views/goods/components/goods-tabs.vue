<template>
  <div class="goods-tabs">
    <nav>
      <a
        :class="{ active: componentName === 'GoodsDetail' }"
        @click="clickTab('GoodsDetail')"
        href="javascript:;"
        >商品详情</a
      >
      <a
        :class="{ active: componentName === 'GoodsComment' }"
        @click="clickTab('GoodsComment')"
        href="javascript:;"
        >商品评价<span>({{ goods.commentCount }})</span></a
      >
    </nav>
    <!-- 商品详情组件或者商品评价组件 -->
    <keep-alive>
      <component :is="componentName" />
    </keep-alive>
  </div>
</template>
<script>
import { inject, ref } from 'vue'
import GoodsDetail from './goods-detail'
import GoodsComment from './goods-comment'
export default {
  name: 'GoodsTabs',
  // props: {
  //   goods: {
  //     type: Object,
  //     default: () => ({})
  //   }
  // },
  components: { GoodsDetail, GoodsComment },
  setup () {
    // 当前激活tab的名字
    const componentName = ref('GoodsDetail')
    const clickTab = (name) => {
      componentName.value = name
    }
    // 获取商品数据
    const goods = inject('goods')
    return { componentName, clickTab, goods }
  }
}
</script>
<style scoped lang="less">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
