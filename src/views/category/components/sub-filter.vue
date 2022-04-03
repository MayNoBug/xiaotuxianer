<template>
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="changeBrand(brand.id)"
          :class="{ active: filterData.selectedBrand === brand.id }"
          href="javascript:;"
          v-for="brand in filterData.brands"
          :key="brand.id"
          >{{ brand.name }}</a
        >
      </div>
    </div>
    <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
      <div class="head">{{ p.name }}：</div>
      <div class="body">
        <a
          @click="changeAttr(p, attr.id)"
          :class="{ active: p.selectedAttr === attr.id }"
          href="javascript:;"
          v-for="attr in p.properties"
          :key="attr.id"
          >{{ attr.name }}</a
        >
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="39px" />
    <XtxSkeleton class="item" width="800px" height="39px" />
    <XtxSkeleton class="item" width="600px" height="39px" />
    <XtxSkeleton class="item" width="600px" height="39px" />
    <XtxSkeleton class="item" width="600px" height="39px" />
  </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category'
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    // 1. 获取数据
    // 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
    // 3. 完成渲染
    const route = useRoute()
    const filterData = ref(null)
    const filterLoading = ref(false)
    // 4. 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
    // vue3.0 watch 三个参数， 监听目标，数据变化后回调函数，配置对象
    // 监听目标，如果是ref申明的数据直接传人即可，其他响应式数据建议写成 函数返回改数据方式
    // 可以同时监听多个目标 [ref1,ref2]
    watch(() => route.params.id, (newVal, oldVal) => {
      // 当你从二级分类去顶级分类也会拿到ID，不能去加载数据因为它不是二级分类的ID
      if (route.path === ('/category/sub/' + newVal)) {
        filterLoading.value = true
        newVal && findSubCategoryFilter(route.params.id).then(({ result }) => {
          // 品牌全部
          result.selectedBrand = undefined
          result.brands.unshift({ id: undefined, name: '全部' })
          // 销售属性全部
          result.saleProperties.forEach(p => {
            p.selectedAttr = undefined
            p.properties.unshift({ id: undefined, name: '全部' })
          })
          filterData.value = result
          filterLoading.value = false
        })
      }
    }, { immediate: true })

    // 获取筛选参数
    const getFilterParams = () => {
      const filterParams = {}
      const attrs = []
      filterParams.brandId = filterData.value.selectedBrand
      filterData.value.saleProperties.forEach(p => {
        const attr = p.properties.find(attr => attr.id === p.selectedAttr)
        if (attr && attr.id !== undefined) {
          attrs.push({ groupName: p.name, propertyName: attr.name })
        }
      })
      if (attrs.length) filterParams.attrs = attrs
      return filterParams
    }

    // 选择品牌
    const changeBrand = (brandId) => {
      filterData.value.selectedBrand = brandId
      emit('change', getFilterParams())
    }
    // 选中属性
    const changeAttr = (p, attrId) => {
      p.selectedAttr = attrId
      emit('change', getFilterParams())
    }

    return { filterData, filterLoading, changeBrand, changeAttr }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    padding: 10px 0;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
