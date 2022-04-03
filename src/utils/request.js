// 1.初始化axios实例
// 2.请求拦截器：目的：带token
// 3.响应拦截器：拿出数据，拦截token失效
// 4.定义一个函数使用配置好的axios发请求
// 得到：工具函数
import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 初始化axios实例
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front.itheima.net/',
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // config是请求配置
  // 1.获取token
  const { token } = store.state.user.profile
  // 2.请求头设置token
  if (token) config.headers.Authorization = `Bearer${token}`
  return config
}, e => Promise.reject(e))

// 响应拦截器
instance.interceptors.response.use(res => res.data, e => {
  // 当token未传，已失效，响应状态码 401
  if (e.response && e.response.status === 401) {
    // 当你失败的时候，获取当前的路由地址(完整地址（哈希地址+？传参00）)
    // router===>$router  路径$route.path===>router.currentRoute.fullPath
    // 防止跳转的时候解析有问题，需要队redirectUrl进行转码
    const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
    // 跳转登录页面，并且传递当前路由地址（目的：登录完毕后可以回跳）
    router.push({ path: '/login', query: { redirectUrl } })
  }
  return Promise.reject(e)
})

// param{String} -url 请求地址
// param{String} -method 请求类型
// param{Object} -submitData 对象类型，提交数据
export default (url, method, submitData) => {
  // 使用配置好的axios来发请求
  // 返回axios的调用，返回的就是一个promise
  return instance({
    url,
    method,
    // params：get方式传单  data：其他方式，请求体
    // params: submitData,
    // data: submitData
    // toLowerCase()全转为小写
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
