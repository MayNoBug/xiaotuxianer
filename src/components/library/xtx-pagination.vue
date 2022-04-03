<template>
  <div class="xtx-pagination">
    <a
      @click="changePage(myCurrentPage - 1)"
      v-if="myCurrentPage > 1"
      href="javascript:;"
      >上一页</a
    >
    <a v-else href="javascript:;" class="disabled">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      @click="changePage(btn)"
      v-for="btn in pager.arr"
      :key="btn"
      href="javascript:;"
      :class="{ active: myCurrentPage === btn }"
      >{{ btn }}</a
    >
    <span v-if="pager.end < pager.totalPage">...</span>
    <a
      @click="changePage(myCurrentPage + 1)"
      v-if="myCurrentPage < pager.totalPage"
      href="javascript:;"
      >下一页</a
    >
    <a v-else href="javascript:;" class="disabled">下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from 'vue'
export default {
  name: 'XtxPagination',
  props: {
    total: {
      type: Number,
      default: 100
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  setup (props, { emit }) {
    // 结论：按钮个数，当前页码，总页数(总条数，每页条数)，起始页码，结束页码，按钮数组

    // 按钮个数
    const btnCount = 5
    // 当前页码
    const myCurrentPage = ref(1)

    // 总条数
    const myTotal = ref(100)
    // 每页条数
    const myPageSize = ref(10)

    // 通过计算属性返回需要的数据
    const data = computed(() => {
      // 总页数
      const totalPage = Math.ceil(myTotal.value / myPageSize.value)
      // 开始计算起始页码和结束页码
      // 1. 理想情况
      let start = myCurrentPage.value - Math.floor(btnCount / 2)
      let end = start + btnCount - 1
      // 2. 当起始页码小于1
      if (start < 1) {
        start = 1
        end = (start + btnCount - 1) > totalPage ? totalPage : (start + btnCount - 1)
      }
      // 3. 当结束页码大于总页数
      if (end > totalPage) {
        end = totalPage
        start = (totalPage - 5 + 1) < 1 ? 1 : (totalPage - 5 + 1)
      }

      // 按钮数组
      const arr = []
      for (let i = start; i <= end; i++) {
        arr.push(i)
      }

      return { totalPage, start, end, arr }
    })

    // 监听props数据的变化
    watch(() => props, () => {
      myTotal.value = props.total
      myCurrentPage.value = props.currentPage
      myPageSize.value = props.pageSize
    }, { immediate: true, deep: true })

    // 切换页码事件
    const changePage = (newPage) => {
      if (myCurrentPage.value !== newPage) {
        // myCurrentPage.value = newPage
        // 触发current-change事件
        emit('current-change', newPage)
      }
    }

    // 返回模版需要的数据
    return { myCurrentPage, pager: data, changePage }
  }
}
</script>
<style scoped lang="less">
.xtx-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: @xtxColor;
    }
    &.active {
      background: @xtxColor;
      color: #fff;
      border-color: @xtxColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
