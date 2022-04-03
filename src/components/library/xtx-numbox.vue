<template>
  <div class="xtx-numbox">
    <div v-if="label" class="label">{{ label }}</div>
    <div class="numbox">
      <a @click="change(-1)" href="javascript:;">-</a>
      <input type="text" readonly :value="count" />
      <a @click="change(1)" href="javascript:;">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxNumbox',
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 10000
    }
  },
  setup (props, { emit }) {
    const count = useVModel(props, 'modelValue', emit)
    // count.value 获取值，其实就是props.modelValue
    // count.value = 10 设置值，其实就是emit('update:modelValue', 10)
    const change = (step) => {
      const newCount = count.value + step
      if (newCount < props.min) return false
      if (newCount > props.max) return false
      // 合法情况
      count.value = newCount
      // 触发改变事件
      emit('change', newCount)
    }
    return { count, change }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
