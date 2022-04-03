<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品 -->
    <div v-if="goodsList">
      <GoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" />
    </div>
  </div>
</template>
<script>
import { computed, ref } from 'vue'
import { findHotGoods } from '@/api/goods'
import GoodsItem from '@/views/category/components/goods-item'
export default {
  name: 'GoodsHot',
  components: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1
    },
    goodsId: {
      type: String
    }
  },
  setup (props) {
    const title = computed(() => {
      if (props.type === 3) return '总热销榜'
      if (props.type === 2) return '周热销榜'
      if (props.type === 1) return '24小时热销榜'
      return '24小时热销榜'
    })
    const goodsList = ref(null)
    findHotGoods({ id: props.goodsId, type: props.type }).then(data => {
      goodsList.value = data.result
    })
    return { title, goodsList }
  }
}
</script>
<style scoped lang="less">
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
