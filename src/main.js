import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 重置样式的库
import 'normalize.css'
// 网站公用样式
import '@/assets/styles/common.less'
// mock数据
import './mock'
// 自己插件
import plugin from '@/components/library'

// 创建一个vue应用实例
createApp(App).use(store).use(router).use(plugin).mount('#app')
