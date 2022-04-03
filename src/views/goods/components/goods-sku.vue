<template>
  <div class="goods-sku">
    <dl v-for="spec in goods.specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="val in spec.values" :key="val.name">
          <img
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(spec.values, val)"
            v-if="val.picture"
            :src="val.picture"
            alt=""
          />
          <span
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSku(spec.values, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import powerSet from '@/vender/power-set'
// 根据现有skus数据得到可以走的路径集合
const spliter = '★'
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach(sku => {
    // 1. 过滤无效sku
    if (sku.inventory > 0) {
      // 2. 得到sku的值数组
      const valueArr = sku.specs.map(spec => spec.valueName)
      // 3. 得到sku值的子集
      const subSets = powerSet(valueArr)
      // 4. 遍历子集，将每个选项以★拼接成字符串作为pathMap的key
      subSets.forEach(subSet => {
        const key = subSet.join(spliter)
        // 5. 设置给字典对象
        if (pathMap[key]) {
          // 已经有key
          pathMap[key].push(sku.id)
        } else {
          // 没有key
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}
// 获取当前选择的值的数组，即使没选中也需要留坑
const getSelectedVal = (specs) => {
  const arr = []
  specs.forEach(spec => {
    const selectedVal = spec.values.find(val => val.selected)
    arr.push(selectedVal ? selectedVal.name : undefined)
  })
  return arr
}
// 更新所有按钮状态的方法，约定每一个按钮有disabled状态
const updateItemStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    // 获取当前选中的值数组
    const selectedArr = getSelectedVal(specs)
    spec.values.forEach(val => {
      // 已经选中跳过判断
      if (val.name === selectedArr[i]) return false
      // 将按钮代入数组
      selectedArr[i] = val.name
      // 剔除无用属性值，去拼接五角星，得到key
      const key = selectedArr.filter(item => item).join(spliter)
      val.disabled = !pathMap[key]
    })
  })
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    // 获取路径字典
    const pathMap = getPathMap(props.goods.skus)

    // 初始化更新禁用状态
    updateItemStatus(props.goods.specs, pathMap)

    // 通讯功能1：接收父组件skuId，默认激活按钮
    if (props.skuId) {
      const sku = props.goods.skus.find(sku => sku.id === props.skuId)
      props.goods.specs.forEach((spec, i) => {
        spec.values.forEach(val => {
          if (val.name === sku.specs[i].valueName) {
            val.selected = true
          }
        })
      })
    }

    // 约定每一个按钮拥有一个selected属性标识选中和取消
    const changeSku = (values, val) => {
      // 禁用状态，阻止行为
      if (val.disabled) return false
      // 1. 选中与取消选中
      if (val.selected) {
        // 1. 自己已经选中，自己取消
        val.selected = false
      } else {
        // 2. 自己没有选中，别人全部取消选中，自己选中
        values.forEach(val => {
          val.selected = false
        })
        val.selected = true
      }
      // 点击按钮，更新其他按钮状态
      updateItemStatus(props.goods.specs, pathMap)

      // 通讯功能2：
      // 当规格选择完毕通知父组件：{skuId,price,oldPrice,stock,attrsText}
      // 其他情况：{}
      const selectedArr = getSelectedVal(props.goods.specs)
      const validSelectedArr = selectedArr.filter(val => val)
      if (validSelectedArr.length === props.goods.specs.length) {
        const skuIds = pathMap[validSelectedArr.join(spliter)]
        const sku = props.goods.skus.find(sku => sku.id === skuIds[0])
        // 选完
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          stock: sku.inventory,
          attrsText: sku.specs.reduce((p, c) => (p += `${c.name}：${c.valueName} `), '').trim()
        })
      } else {
        // 没有
        emit('change', {})
      }
    }
    return { changeSku }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
