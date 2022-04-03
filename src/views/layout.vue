<template>
  <!-- 顶部通栏 -->
  <AppTopnav />
  <!-- 头部 -->
  <AppHeaderSticky />
  <AppHeader />
  <!-- 主体内容 -->
  <main class="app-body">
    <RouterView />
  </main>
  <!-- 底部 -->
  <AppFooter />
</template>
<script>
import AppTopnav from '@/components/app-topnav'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky'
export default {
  name: 'Layout',
  components: {
    AppTopnav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  created () {
    this.$store.dispatch('category/getCategory')
  }
}
</script>
<style scoped lang="less">
.app-body {
  min-height: 600px;
}
</style>
