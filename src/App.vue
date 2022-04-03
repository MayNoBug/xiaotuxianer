<template>
  <RouterView />
</template>
<script>
// import request from '@/utils/request'
export default {
  created () {
    // $route 在组件初始化的时候需要时间去挂载
    // 可以是使用setTimeout，时间为0 来获取修改后的数据
    // setTimeout(() => {
    //   console.log(this.$route.fullPath)
    // }, 0)
    // request('/member/profile', 'get').then(data => {
    //   console.log(data)
    // }).catch(e => {
    //   // console.log(this.$route.fullPath)
    // })
    // request('/home/category/head', 'get').then(data => {
    //   console.log(data)
    // })
  }
}
</script>
<style lang="less">
</style>
