<template>
  <div class="home-banner">
    <XtxCarousel auto-play :sliders="sliders" />
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
export default {
  name: 'HomeBanner',
  data () {
    return {
      sliders: []
    }
  },
  async created () {
    const data = await findBanner()
    this.sliders = data.result
  }
}
</script>

<style scoped lang="less" >
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xtx-carousel {
    ::v-deep .carousel-btn.prev {
      left: 270px;
    }
    ::v-deep .carousel-indicator {
      padding-left: 250px;
    }
  }
}
</style>
