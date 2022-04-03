import Mock from 'mockjs'
import category from './category'
import home from './home'
import goods from './goods'

// mock的配置
Mock.setup({
  // 随机延时500-1000毫秒
  timeout: '500-1000'
})

// 拦截请求，
// 第一个参数：url，使用正则去匹配
// 第二个参数：请求方式
// 第三个参数： 生成数据的函数
Mock.mock(/\/home\/category\/head/, 'get', category.headCategory)
Mock.mock(/\/home\/brand/, 'get', home.brand)
Mock.mock(/\/home\/banner/, 'get', home.banner)
Mock.mock(/\/home\/new/, 'get', home.new)
Mock.mock(/\/home\/hot/, 'get', home.hot)
Mock.mock(/\/home\/goods/, 'get', home.goods)
Mock.mock(/\/home\/special/, 'get', home.special)
// 注意下顺序
Mock.mock(/\/category\/sub\/filter/, 'get', category.filter)
Mock.mock(/\/category/, 'get', category.topCategory)
Mock.mock(/\/category\/goods/, 'post', category.goods)

Mock.mock(/\/goods\/relevant/, 'get', goods.relevant)
Mock.mock(/\/goods\/hot/, 'get', goods.hot)
