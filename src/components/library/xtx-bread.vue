<script>
import { h } from 'vue'
export default {
  name: 'XtxBread',
  render () {
    // vue3.0中不会在函数中掺入h函数，createElement函数，可以按需导入
    // 需要得到插槽中的所有内容 this.$slots这是所有插槽 this.$slots.default()
    const items = this.$slots.default()
    const domTree = []
    items.forEach((item, i) => {
      domTree.push(item)
      if (i < (items.length - 1)) {
        domTree.push(h('i', { class: 'iconfont icon-angle-right' }))
      }
    })
    return h('div', { class: 'xtx-bread' }, domTree)
  }

}
</script>

<style lang='less'>
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
