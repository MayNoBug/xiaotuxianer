// 定义首页需要的接口函数
import request from '@/utils/request'
// 此方法获取首页头部分类数据 返回的是一个promise
export const findHeadCategory = () => {
  return request('/home/category/head', 'get')
}
export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}
export const findBanner = () => {
  return request('home/banner', 'get')
}
export const findNew = () => {
  return request('home/new', 'get')
}
export const findHot = () => {
  return request('home/hot', 'get')
}
export const findProduct = () => {
  return request('home/goods', 'get')
}
export const findSpecial = () => {
  return request('home/special', 'get')
}
