<template>
  <div class="xtx-checkbox" @click="change()">
    <i class="iconfont icon-checked" v-if="checked"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { useVModel } from '@vueuse/core'
// 双向数据绑定
// vue2.0 让组件支持value属性数据获取，在组件内部改变的时候触发input事件
// id.sync="数据"  ====> 父传子 id   子传父  update:id
// vue3.0 让组件支持modelValue属性数据获取，在组件内部改变的时候触发update:modelValue事件
// vue3.0 v-model指令写法   v-model:id="数据"  ====> 父传子  id   子传父  update:id
export default {
  name: 'XtxCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  // props 父组件传的属性对象
  // 是对象（执行上下文）emit就是其中一个  触发自定义事件的
  setup (props, { emit }) {
    // 三个参数：组件的props对象，数据的key，emit函数
    // 得到一个响应式数据，获取的值就是父组件的值，但你修改值的时候触发自定义时间传给父组件
    const checked = useVModel(props, 'modelValue', emit)
    const change = () => {
      // 1. 假设此时是选中的  true
      // 2. 把false设置给checed.value  通知父组件
      // 3. 把修改后的值 false  通知给父组件
      const newChecked = !checked.value
      checked.value = newChecked
      // 相当于 emit('update:modelValue','值')
      emit('change', newChecked)
    }
    return { checked, change }
  }
}
</script>

<style scoped lang='less'>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
