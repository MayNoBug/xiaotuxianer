<template>
  <HomePanel title="新鲜好物" sub-title="新鲜好物 品质靠谱" ref="target">
    <template v-slot:right>
      <XtxMore />
    </template>
    <Transition name="fade">
      <ul v-if="goods && goods.length" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton bg="#f0f9f4" v-else />
    </Transition>
  </HomePanel>
</template>
<script>
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { useLazyData } from '@/hooks'
import { findNew } from '@/api/home'
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  // data () {
  //   return {
  //     goods: []
  //   }
  // },
  // async created () {
  //   const { result } = await findNew()
  //   this.goods = result
  // }
  setup () {
    // // 商品数据
    // const goods = ref([])
    // // 面板容器，dom对象或者组件实例
    // const target = ref(null)
    // // target 事观察的目标容器
    // const { stop } = useIntersectionObserver(
    //   target,
    //   ([{ isIntersecting }], observerElement) => {
    //     if (isIntersecting) {
    //       // stop 停止观察
    //       stop()
    //       // 进入可视区域，加载数据即可
    //       findNew().then(data => {
    //         goods.value = data.result
    //       })
    //     }
    //   }
    // )

    const { target, result } = useLazyData(findNew)
    return { goods: result, target }
  }
}
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
