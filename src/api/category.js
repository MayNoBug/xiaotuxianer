// 定义分类模块相关的接口函数
import request from '@/utils/request'

/**
 * 获取顶级分类信息（包含每个二级分类及对应的推荐商品）
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

/**
 * 获取二级类目的筛选区域数据
 * @param {String} id - 二级类目ID
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

/**
 * 获取商品列表根据分类ID和其他参数
 * @param {Object} params - 查询参数对象
 */
export const findGoodsByCategory = (params) => {
  return request('/category/goods', 'post', params)
}
