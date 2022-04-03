import { createStore } from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'
// 创建vuex仓库并且导出去
export default createStore({
  state: {
    // 数据
  },
  mutations: {
    // 改数据函数
  },
  actions: {
    // 请求数据函数
  },
  modules: {
    // 分模块
    user,
    cart,
    category
  },
  getters: {
    // vuex的计算属性
  },
  // 1111
  // 使用插件
  plugins: [
    // 默认存储的地方 localstorage
    // 修改state后触发才可以看到本地存储数据的的变化。
    createPersistedstate({
      key: 'erabbit-client-pc-store',
      paths: ['user', 'cart']

    })
  ]
})
